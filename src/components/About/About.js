'use client';
import './About.css'

export default function About() {
    return (
        <div id='about' className='standard-container about'>
            <div className='services-container'>
                <h1 className='services-title'>Services</h1>
                <div className='service-item-container'>
                <div className='service-item'>
                    <div className='service-content'>
                        <h2>Landing Page Design & Development</h2>
                        <p>Description: We update your landing page to WAI-ARIA accessibility standards, with a sleek and minimalist touch.</p>
                        <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                        <p className='service-item-price'>Price: $5,000</p>
                        </div>
                    <div className='service-image'>
                        <img src="/placeholder-landing.jpg" alt="Landing Page Design" />
                    </div>
                </div>

                <div className='service-item indent'>
                    <div className='service-content'>
                        <h3>Logo Design</h3>
                        <p>We create a distinctive, adaptable logo.</p>
                        <p className='service-item-timeline'>Timeline: 3-4 weeks</p>
                        <p className='service-item-price'>Price: $2,500</p>
                        </div>
                    <div className='service-image'>
                        <img src="/placeholder-logo.jpg" alt="Logo Design" />
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

