'use client';
import './About.css'
import { useState, useEffect, useRef } from 'react';

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    const websites = [
        "https://hotplate.com",
        "https://scalacomputing.com",
        "https://keepingitsimple.io/",
        "https://legal.fynncredit.com/",
    ];
    
    // Website thumbnails to use on mobile
    const websiteThumbnails = [
        "/images/hotplate_still.png",
        "/images/scala_still.png",
        "/images/kis_still.png",
        "/images/fynn_still.png",

    ];

    useEffect(() => {
        // Check screen size on mount and window resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Set initial value
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to handle hiding the overlay after transition completes
    useEffect(() => {
        if (!isTransitioning && isVisible) {
            // Set a timeout to match the transition duration (0.3s)
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning, isVisible]);

    const nextSlide = () => {
        // First make the overlay visible
        setIsVisible(true);
        
        // Then start transition (overlay fades in)
        setTimeout(() => {
            setIsTransitioning(true);
            
            // Wait for overlay to fully fade in
            setTimeout(() => {
                // Change slide
                setCurrentSlide((prev) => (prev + 1) % websites.length);
                
                // Give content time to load before fading out the overlay
                // Use shorter duration for mobile (images) vs desktop (iframes)
                const loadTime = isMobile ? 300 : 1000;
                setTimeout(() => {
                    // Start fading out overlay
                    setIsTransitioning(false);
                    // isVisible will be set to false after animation completes via useEffect
                }, loadTime);
            }, 500);
        }, 20); // Small delay to ensure visibility happens first
    };

    const prevSlide = () => {
        // First make the overlay visible
        setIsVisible(true);
        
        // Then start transition (overlay fades in)
        setTimeout(() => {
            setIsTransitioning(true);
            
            // Wait for overlay to fully fade in
            setTimeout(() => {
                // Change slide
                setCurrentSlide((prev) => (prev - 1 + websites.length) % websites.length);
                
                // Give content time to load before fading out the overlay
                // Use shorter duration for mobile (images) vs desktop (iframes)
                const loadTime = isMobile ? 300 : 1000;
                setTimeout(() => {
                    // Start fading out overlay
                    setIsTransitioning(false);
                    // isVisible will be set to false after animation completes via useEffect
                }, loadTime);
            }, 500);
        }, 20); // Small delay to ensure visibility happens first
    };

    return (
        <div id='about' className='standard-container about'>
            <div id='services' className='services-inner'>
                <h1 className='services-title padding'>Services</h1>
                <div className='service-item-container'>
                    <div className='service-item'>
                    <div className='service-content'>
                            <h3>Logo Design</h3>
                            <p>One svg vector logo and one flat logo.</p>
                            <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                            <p className='service-item-price'>Reach out for a custom quote.</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        
                    </div>

                    <div className='service-item'>
            
                    <div className='service-content'>
                            <h2>Landing Page Design</h2>
                            <p>Three mockups and two revisions in Figma.</p>
                            <p className='service-item-timeline'>Timeline: 2-3 weeks</p>
                            <p className='service-item-price'>Reach out for a custom quote.</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        
                    </div>

                    <div className='service-item indent'>

                    <div className='service-content'>
                            <h2>Landing Page Development</h2>
                            <p>One landing page with two revisions.</p>
                            <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                            <p className='service-item-price'>Reach out for a custom quote.</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        
                        <div className='service-image'>
                        <h1 className='services-title'>Featured Work</h1>
                            <div className='iframe-container'>
                                {isMobile ? (
                                    <div className="thumbnail-container" style={{ position: 'relative' }}>
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'white',
                                                opacity: isTransitioning ? 1 : 0,
                                                visibility: isVisible ? 'visible' : 'hidden',
                                                transition: 'opacity 0.3s ease',
                                                zIndex: 5
                                            }}
                                        ></div>
                                        <a 
                                            href={websites[currentSlide]} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="thumbnail-link"
                                        >
                                            <img 
                                                src={websiteThumbnails[currentSlide]} 
                                                alt={`${websites[currentSlide]} screenshot`} 
                                                className="website-thumbnail"
                                            />
                                        </a>
                                    </div>
                                ) : (
                                    <>
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'white',
                                                opacity: isTransitioning ? 1 : 0,
                                                visibility: isVisible ? 'visible' : 'hidden',
                                                transition: 'opacity 0.3s ease',
                                                zIndex: 5
                                            }}
                                        ></div>
                                        <iframe 
                                            src={websites[currentSlide]} 
                                            title="Portfolio example"
                                        ></iframe>
                                    </>
                                )}
                            </div>
                            <div className='carousel-controls'>
                                <button onClick={prevSlide}>Previous</button>
                                <span>{currentSlide + 1} / {websites.length}</span>
                                <button onClick={nextSlide}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='service-item indent'>
                    <div className='service-content'>
                        <h3>Add-On: Conversion Rate Optimization</h3>
                        <p>A/B testing and user research to improve your website's CTR.</p>
                        <p2>Timeline: 3 months</p2>
                        <p3>Price: $10,000</p3>
                        </div>
                    <div className='service-image'>
                        <img src="/placeholder-brand.jpg" alt="Brand Design" />
                    </div>
                </div>

                <div className='service-item indent' style={{ fontSize: '0.9em' }}>  
                  <div className='service-content'>
                        <h3>Add-On: SEO Optimization</h3>
                        <p>Description: We develop and implement a comprehensive SEO strategy to improve your website's organic traffic, including keyword research, blog posts, and link building. **think about this one</p>
                        <p2>Timeline: 3 months</p2>
                        <p3>Price: $10,000</p3>
                  </div>
                  <div className='service-image'>
                        <img src="/placeholder-seo.jpg" alt="SEO Optimization" />
                  </div>
                </div> */}
            </div>
        </div>
    )
}

