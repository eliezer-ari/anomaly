import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const Generative = () => {
  const mountRef = useRef(null);
  const [seed, setSeed] = useState(null);

  useEffect(() => {
    const generateSeed = () => {
      const date = new Date();
      const timeSeed = date.getTime(); // Time-based seed
      const randomSeed = Math.random() * 10000; // Add randomness
      const finalSeed = Math.floor(timeSeed + randomSeed); // Round seed to integer
      setSeed(finalSeed); // Set the seed
    };

    generateSeed(); // Generate seed on component mount
  }, []);

  useEffect(() => {
    if (seed === null) return; // Wait for seed to be set

    const rng = (min, max) => min + (max - min) * ((seed % 1) || Math.random()); // Seeded random function

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewportWidth, viewportHeight);
    renderer.setClearColor(0x000000, 1); // Black background
    renderer.toneMapping = THREE.ReinhardToneMapping; // Use HDR tone mapping
    mountRef.current.appendChild(renderer.domElement);

    // Add post-processing components
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(viewportWidth, viewportHeight),
      0.1, // Strength
      0.1, // Radius
      0.9  // Threshold
    );
    composer.addPass(bloomPass);

    // Randomly determine the number of shape sources (e.g., 2-4 sources)
    const numSources = Math.floor(rng(2, 7));
    const particleSize = rng(0.015, 0.03); // Particle size
    const velocityFactor = rng(0.01, 0.05); // Subtle particle motion

    const generateShape = (type, spread, count, offset) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3); // Each particle has x, y, z
      const velocities = new Float32Array(count * 3); // Velocity for random motion

      for (let i = 0; i < count; i++) {
        const index = i * 3;

        if (type === 'sphere') {
          const r = Math.random() * spread;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          positions[index] = r * Math.sin(phi) * Math.cos(theta) + offset.x;
          positions[index + 1] = r * Math.sin(phi) * Math.sin(theta) + offset.y;
          positions[index + 2] = r * Math.cos(phi) + offset.z;
        } else if (type === 'cube') {
          positions[index] = (Math.random() - 0.5) * spread + offset.x;
          positions[index + 1] = (Math.random() - 0.5) * spread + offset.y;
          positions[index + 2] = (Math.random() - 0.5) * spread + offset.z;
        } else if (type === 'cylinder') {
          const theta = Math.random() * Math.PI * 2;
          const radius = Math.random() * spread / 2;
          positions[index] = radius * Math.cos(theta) + offset.x;
          positions[index + 1] = radius * Math.sin(theta) + offset.y;
          positions[index + 2] = (Math.random() - 0.5) * spread + offset.z;
        } else if (type === 'disk') {
          const r = Math.random() * spread / 2;
          const theta = Math.random() * Math.PI * 2;
          positions[index] = r * Math.cos(theta) + offset.x;
          positions[index + 1] = r * Math.sin(theta) + offset.y;
          positions[index + 2] = offset.z;
        } else {
          // Default to grid
          positions[index] = (Math.random() - 0.5) * spread + offset.x;
          positions[index + 1] = (Math.random() - 0.5) * spread + offset.y;
          positions[index + 2] = (Math.random() - 0.5) * spread + offset.z;
        }

        velocities[index] = (Math.random() - 0.5) * velocityFactor;
        velocities[index + 1] = (Math.random() - 0.5) * velocityFactor;
        velocities[index + 2] = (Math.random() - 0.5) * velocityFactor;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      return geometry;
    };

    // Create multiple shape sources
    for (let i = 0; i < numSources; i++) {
      const shapeType = ['grid', 'sphere', 'cube', 'cylinder', 'disk'][Math.floor(rng(0, 5))];
      const spread = rng(20, 50); // Random spread for each source
      const particleCount = Math.floor(rng(10000, 50000)); // Random particle count per source

      // Generate random offsets to skew shapes away from the center
      const offset = {
        x: rng(-20, 20),
        y: rng(-20, 20),
        z: rng(-20, 20),
      };

      const geometry = generateShape(shapeType, spread, particleCount, offset);

      const material = new THREE.PointsMaterial({
        color: 0xffffff, // Fixed white color
        size: particleSize,
        transparent: true,
        opacity: 0.8, // Slightly transparent for blending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
    }

    camera.position.z = 80; // Bring the camera closer

    const animate = () => {
      requestAnimationFrame(animate);

      scene.children.forEach((child) => {
        if (child.isPoints) {
          const positions = child.geometry.attributes.position.array;
          const velocities = child.geometry.attributes.velocity.array;

          for (let i = 0; i < positions.length / 3; i++) {
            const index = i * 3;

            positions[index] += velocities[index];
            positions[index + 1] += velocities[index + 1];
            positions[index + 2] += velocities[index + 2];

            if (positions[index] > 50 || positions[index] < -50) velocities[index] *= -1;
            if (positions[index + 1] > 50 || positions[index + 1] < -50) velocities[index + 1] *= -1;
            if (positions[index + 2] > 50 || positions[index + 2] < -50) velocities[index + 2] *= -1;
          }

          child.geometry.attributes.position.needsUpdate = true;
        }
      });

      composer.render();
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [seed]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      {seed && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            color: 'white',
            fontSize: '16px',
            fontFamily: '"Sen", sans-serif',
            padding: '5px 10px',
            pointerEvents: 'none',
            // opacity: '75%',
          }}
        >
          SEED: {seed}
        </div>
      )}
    </div>
  );
};

export default Generative;
