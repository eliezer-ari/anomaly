import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import setupGenerativeScene from './Generative';
import './Hero.css';

const HeroSection = () => {
  const mountRef = useRef(null);
  const [seed, setSeed] = useState(null);
  
  // Define a development mode flag
  const developmentMode = false; // Set to false to enable generative code

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

    // Get parent dimensions
    const parent = mountRef.current.parentElement;
    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;
    
    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(parentWidth, parentHeight);
    renderer.setClearColor(0x000000, 1); // Black background
    renderer.toneMapping = THREE.ReinhardToneMapping; // Use HDR tone mapping
    mountRef.current.appendChild(renderer.domElement);

    // Add post-processing components
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(parentWidth, parentHeight),
      0.1, // Strength
      0.1, // Radius
      0.9  // Threshold
    );
    composer.addPass(bloomPass);

    // Setup generative particles using the imported module
    const generativeScene = setupGenerativeScene({
      scene,
      seed,
      developmentMode
    });

    camera.position.z = 80; // Bring the camera closer

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Use the animation function from our generative module
      generativeScene.animateParticles();
      
      composer.render();
    };

    animate();

    const handleResize = () => {
      const parent = mountRef.current.parentElement;
      const newWidth = parent.clientWidth;
      const newHeight = parent.clientHeight;
      
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
    <div id="hero" style={{ width: '100%', height: 'fit-content', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute'}} />
      
      {/* Hero Content Overlay */}
      <div className="hero-container">
        <div className="hero-inner">
        <h1 className="hero-title">
          Web Design for Startups
        </h1>
        
        <p className="hero-description">
          Full-service design & development with fast delivery.
        </p>
        
        <button className="hero-cta-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
          Reach out now
        </button>
        </div>
        <div className="testimonials-section">
          {[
                  {
                    text: "They delivered our website in record time. Exactly what we needed!",
                    author: "Rishi T., Founder and COO of Hotplate ",
                    hasYC: true,
                    ycBatch: "S20"
                  },
                  {
                    text: "The best design team we've worked with. Period.",
                    author: "Eric M., Founder and CEO of Fynn ",
                    hasYC: true,
                    ycBatch: "S19"
                  },
                  {
                    text: "Professional, creative, and incredibly responsive. Highly recommend!",
                    author: "Blake E., Founder and CEO of KeepItSimple"
                  }
        
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-item">
                           <p className="testimonial-text">
                "{testimonial.text}"
              </p>
              <p className="testimonial-author">
                — {testimonial.author}
                {testimonial.hasYC && (
             <span className="yc-logo">
                   {"("}
                    <img 
                      src="/images/yc_square.png" 
                      alt="Y Combinator" 
                      width="14" 
                      height="14" 
                      style={{ verticalAlign: 'middle', marginBottom: '2px', marginLeft: '2px' }}
                    />
                    {" "}
                    <span className="yc-batch">{testimonial.ycBatch}{")"}</span>     
                  </span>
                )}
              </p>
              <a 
                href="#"
                className="testimonial-link"
              >
                link to website
              </a>
            </div>
          ))}
        </div>

        {/* Move the seed display above testimonials */}
        {seed && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              color: 'white',
              fontSize: '16px',
              padding: '5px 10px',
              pointerEvents: 'none',
              opacity: '50%',
              zIndex: 1,
            }}
          >
            {/* SEED: {seed} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
