'use client';
import './About.css'
import { useState, useEffect } from 'react';

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    
    const websites = [
        "https://scalacomputing.com",
        "https://keepingitsimple.io/",
        "https://hotplate.com",
        "https://legal.fynncredit.com/",
    ];
    
    // Website thumbnails to use on mobile
    const websiteThumbnails = [
        "/images/scala_still.png",
        "/images/kis_still.png",
        "/images/hotplate_still.png",
        "/images/fynn_still.png",
    ];

    useEffect(() => {
        // Check screen size on mount and window resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };
        
        // Set initial value
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setFadeOut(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % websites.length);
            setFadeOut(false);
        }, 300); // Match this with the CSS transition duration
    };

    const prevSlide = () => {
        setFadeOut(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + websites.length) % websites.length);
            setFadeOut(false);
        }, 300); // Match this with the CSS transition duration
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
                            <p className='service-item-price'>Price: $2,000</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        
                    </div>

                    <div className='service-item'>
            
                    <div className='service-content'>
                            <h2>Landing Page Design</h2>
                            <p>Three mockups and two revisions in Figma.</p>
                            <p className='service-item-timeline'>Timeline: 2-3 weeks</p>
                            <p className='service-item-price'>Price: $2,000</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        
                    </div>

                    <div className='service-item indent'>
                       
                    <div className='service-content'>
                            <h2>Landing Page Development</h2>
                            <p>One landing page with two revisions.</p>
                            <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                            <p className='service-item-price'>Price: $4,000</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        <div className='service-image'>                            {/* <div className='image-grid'>
                                <img src="/images/circelogo.png" alt="Logo 1" />
                                <img src="/images/framelogo.png" alt="Logo 2" />
                                <img src="/images/judelogo.png" alt="Logo 3" />
                                <img src="/images/makeadifferencelogo.png" alt="Logo 4" />
                                <img src="/images/plantedlogo.png" alt="Logo 5" />
                                <img src="/images/projectomnilogo.png" alt="Logo 6" />
                            </div> */}

                            <div className='carousel'>
                                <h3 id='featured-work' className='services-title'>Featured Work</h3>
                                <div className='iframe-container'>
                                    {isMobile ? (
                                        <a 
                                            href={websites[currentSlide]} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="thumbnail-link"
                                        >
                                            <img 
                                                src={websiteThumbnails[currentSlide]} 
                                                alt={`${websites[currentSlide]} screenshot`} 
                                                className={`website-thumbnail ${fadeOut ? 'fade-out' : 'fade-in'}`}
                                            />
                                        </a>
                                    ) : (
                                        <iframe 
                                            src={websites[currentSlide]} 
                                            title="Portfolio example"
                                        ></iframe>
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

