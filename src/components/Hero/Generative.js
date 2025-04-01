import * as THREE from 'three';

/**
 * Creates and animates a single centered generative 3D particle shape
 * @param {Object} params - Configuration parameters
 * @param {THREE.Scene} params.scene - The Three.js scene
 * @param {number} params.seed - Random seed value
 * @param {boolean} params.developmentMode - Flag to disable generation
 * @returns {Object} - Animation and cleanup functions
 */
const Generative = ({ scene, seed, developmentMode }) => {
  // Seeded random function
  const rng = (min, max) => min + (max - min) * ((seed % 1) || Math.random());
  
  // Detect high-resolution displays and adjust settings accordingly
  const isHighResolution = window.innerWidth >= 3000 || window.innerHeight >= 3000;
  
  // Performance settings based on display resolution
  const performanceSettings = {
    particleCount: isHighResolution ? 40000 : 80000,
    particleSize: isHighResolution ? 0.14 : 0.12,
    updateFrameSkip: isHighResolution ? 2 : 1,
    animationSpeed: 0.1,
    coreParticleRatio: 0.7
  };
  
  // Track frame count for animation timing
  let frameCount = 0;
  let particleSystem = null;
  
  // Define shape constants at the outer scope so they're available to the animation function
  const coreSpread = 70;
  const outerSpread = 100;

  // Setup a single generative shape
  if (!developmentMode) {
    // Create a cube/square shape with extended particles
    const shapeType = 'cube';
    
    // Create geometry for the shape
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(performanceSettings.particleCount * 3);
    const initialPositions = new Float32Array(performanceSettings.particleCount * 3);
    const colors = new Float32Array(performanceSettings.particleCount * 3);
    
    // Calculate how many particles to allocate to the core shape
    const coreParticleCount = Math.floor(performanceSettings.particleCount * performanceSettings.coreParticleRatio);
    const outerParticleCount = performanceSettings.particleCount - coreParticleCount;
    
    // Generate particle positions
    for (let i = 0; i < performanceSettings.particleCount; i++) {
      const index = i * 3;
      
      // Determine if this is a core or outer particle
      const isCore = i < coreParticleCount;
      
      if (isCore) {
        // CORE PARTICLES - Create a defined cube shape
        let x = (Math.random() - 0.5);
        let y = (Math.random() - 0.5);
        let z = (Math.random() - 0.5);
        
        // Create strong edge bias for cube definition
        const edgeBias = 0.15;
        
        if (Math.random() < edgeBias) {
          // Force one or two dimensions to be at the edge
          const edgeCount = Math.random() < 0.4 ? 2 : 1;
          const dimensions = [0, 1, 2];
          
          // Shuffle dimensions for random selection
          for (let j = dimensions.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [dimensions[j], dimensions[k]] = [dimensions[k], dimensions[j]];
          }
          
          // Apply edge positioning
          for (let j = 0; j < edgeCount; j++) {
            const dim = dimensions[j];
            const sign = Math.random() > 0.5 ? 1 : -1;
            
            if (dim === 0) x = sign * 0.5;
            else if (dim === 1) y = sign * 0.5;
            else z = sign * 0.5;
          }
        }
        
        // Scale to core size
        positions[index] = x * coreSpread;
        positions[index + 1] = y * coreSpread;
        positions[index + 2] = z * coreSpread;
        
        // Bright white for core particles
        colors[index] = 1.0;
        colors[index + 1] = 1.0;
        colors[index + 2] = 1.0;
      } else {
        // OUTER PARTICLES - Create a sparse distribution extending outward
        // Distribution gets sparser as it extends outward
        
        // Random direction vector
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = coreSpread + (outerSpread - coreSpread) * Math.random();
        
        // Calculate outward position
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);
        
        // Scale based on distance from center
        const distanceFactor = (r - coreSpread) / (outerSpread - coreSpread);
        
        positions[index] = x * r;
        positions[index + 1] = y * r;
        positions[index + 2] = z * r;
        
        // Fade opacity as particles extend outward
        const brightness = 1.0 - (distanceFactor * 0.8);
        colors[index] = brightness;
        colors[index + 1] = brightness;
        colors[index + 2] = brightness;
      }
      
      // Store initial positions for animation reference
      initialPositions[index] = positions[index];
      initialPositions[index + 1] = positions[index + 1];
      initialPositions[index + 2] = positions[index + 2];
    }

    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('initialPosition', new THREE.BufferAttribute(initialPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Use points material with maximum visibility
    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: performanceSettings.particleSize,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Create the particle system and add to scene
    particleSystem = new THREE.Points(geometry, material);
    particleSystem.name = 'particleSystem';
    
    // Move slightly closer to camera for better visibility
    particleSystem.position.z = -10;
    
    scene.add(particleSystem);
  }

  // Animation function using sin waves for smooth motion
  const animateParticles = () => {
    frameCount++;
    
    // Skip frames on high resolution displays
    if (isHighResolution && frameCount % performanceSettings.updateFrameSkip !== 0) {
      return;
    }
    
    // Find our particle system
    if (!particleSystem) {
      particleSystem = scene.children.find(child => child.name === 'particleSystem');
      if (!particleSystem) return;
    }
    
    const time = frameCount * 0.01 * performanceSettings.animationSpeed;
    const positions = particleSystem.geometry.attributes.position.array;
    const initialPositions = particleSystem.geometry.attributes.initialPosition.array;
    
    // Minimum z distance from camera to prevent particles from getting too close
    const minZDistance = 50;
    
    // Use different animation for core vs outer particles
    for (let i = 0; i < positions.length; i += 3) {
      // Determine if this is a core or outer particle by looking at initial position magnitude
      const ix = initialPositions[i];
      const iy = initialPositions[i+1];
      const iz = initialPositions[i+2];
      const distanceFromCenter = Math.sqrt(ix*ix + iy*iy + iz*iz);
      const isCore = distanceFromCenter <= coreSpread;
      
      if (isCore) {
        // Core particles - less movement for better shape definition
        const wave1 = Math.sin(time + i * 0.0001) * 4;
        const wave2 = Math.cos(time * 0.7 + i * 0.0002) * 4;
        const wave3 = Math.sin(time * 1.3 + i * 0.0003) * 4;
        
        positions[i] = initialPositions[i] + wave1;
        positions[i + 1] = initialPositions[i + 1] + wave2;
        positions[i + 2] = initialPositions[i + 2] + wave3;
      } else {
        // Outer particles - more drift and movement
        const distanceFactor = (distanceFromCenter - coreSpread) / (outerSpread - coreSpread);
        const amplitude = 5 + distanceFactor * 10; // More movement on outer particles
        
        const wave1 = Math.sin(time * 0.8 + i * 0.00008) * amplitude;
        const wave2 = Math.cos(time * 0.6 + i * 0.00009) * amplitude;
        const wave3 = Math.sin(time * 1.1 + i * 0.0001) * amplitude;
        
        positions[i] = initialPositions[i] + wave1;
        positions[i + 1] = initialPositions[i + 1] + wave2;
        positions[i + 2] = initialPositions[i + 2] + wave3;
      }
      
      // Check if the particle is too close to the camera and push it back if needed
      // Remember that particleSystem is positioned at z = -10, so we need to account for that
      if (positions[i + 2] + particleSystem.position.z > minZDistance) {
        positions[i + 2] = minZDistance - particleSystem.position.z;
      }
    }
    
    // Mark for update
    particleSystem.geometry.attributes.position.needsUpdate = true;
  };

  // Clean up function
  const cleanup = () => {
    if (particleSystem) {
      scene.remove(particleSystem);
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
      particleSystem = null;
    }
  };

  return {
    animateParticles,
    cleanup
  };
};

export default Generative; 