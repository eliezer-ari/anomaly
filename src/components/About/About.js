'use client';
import './About.css'
import { useState } from 'react';

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const websites = [
        "https://keepingitsimple.io/",
        "https://hotplate.com",
        "https://legal.fynncredit.com/",
        "https://discoverframe.com",
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % websites.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + websites.length) % websites.length);
    };

    return (
        <div id='about' className='standard-container about'>
            <div className='services-container'>
                <h1 className='services-title'>Services</h1>
                <div className='service-item-container'>
                    <div className='service-item'>
                        <div className='service-content'>
                            <h2>Landing Page Design & Development</h2>
                            <p>Description: We build landing pages that meet WAI-ARIA accessibility standards with customer-focused design and a sleek and minimalist touch.</p>
                            <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                            <p className='service-item-price'>Price: $5,000</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        
                        <div className='carousel'>
                        <h3 className='past-work-title-1'>Past Work</h3>
                            <div className='iframe-container'>
                                <iframe src={websites[currentSlide]} title="Portfolio example"></iframe>
                            </div>
                            <div className='carousel-controls'>
                                <button onClick={prevSlide}>Previous</button>
                                <span>{currentSlide + 1} / {websites.length}</span>
                                <button onClick={nextSlide}>Next</button>
                            </div>
                        </div>
                    </div>

                    <div className='service-item indent'>
                        <div className='service-content'>
                            <h3>Logo Design</h3>
                            <p>We create distinctive, adaptable logos that are easy to remember and brand-specific.</p>
                            <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                            <p className='service-item-price'>Price: $2,500</p>
                            <button className="about-reach-out-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Reach out now</button>
                        </div>
                        <div className='service-image'>
                            <h3 className='past-work-title-2'>Past Work</h3>
                            <div className='image-grid'>
                                <img src="/images/circelogo.png" alt="Logo 1" />
                                <img src="/images/framelogo.png" alt="Logo 2" />
                                <img src="/images/judelogo.png" alt="Logo 3" />
                                <img src="/images/makeadifferencelogo.png" alt="Logo 4" />
                                <img src="/images/plantedlogo.png" alt="Logo 5" />
                                <img src="/images/projectomnilogo.png" alt="Logo 6" />
                                {/* Add more images as needed */}
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

