'use client';
import './Header.css';
import Image from 'next/image';
import WhiteLogo from '@/../public/anomalylogo.png';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isInverted, setIsInverted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Function to check scroll position and update navbar
    const checkNavbarState = () => {
      const heroSection = document.getElementById('hero');
      
      // If hero section doesn't exist, exit early
      if (!heroSection) {
        console.log('Hero section not found');
        return;
      }
      
      // Get the scroll position
      const scrollPosition = window.scrollY;
      
      // Get hero height - this is more reliable than getBoundingClientRect
      // since it doesn't change with scrolling
      const heroHeight = heroSection.offsetHeight;
      
      // Set active state when not at the top of the page
      const shouldBeActive = scrollPosition > 0;
      
      // Simple threshold check - once we scroll past the hero section, invert
      // Add a small buffer (e.g., navbar height) if needed
      const navbarHeight = 0;
      const shouldInvert = scrollPosition >= (heroHeight - navbarHeight);
      
      console.log({
        scrollY: scrollPosition,
        heroHeight,
        shouldBeActive,
        shouldInvert,
        currentlyActive: isActive,
        currentlyInverted: isInverted
      });
      
      // Only update states if they changed
      if (isActive !== shouldBeActive) {
        setIsActive(shouldBeActive);
      }
      
      if (isInverted !== shouldInvert) {
        setIsInverted(shouldInvert);
      }
    };
    
    // Run initial check
    checkNavbarState();
    
    // Add scroll event listener with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkNavbarState();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInverted, isActive]); // Both states are in the dependency array

  // Apply the appropriate class names based on scroll state
  const getNavbarClassName = () => {
    // For debugging - log the current state values
    console.log("Class calculation:", { isActive, isInverted });
    
    if (isInverted) return "navbar-container invert";
    if (isActive) return "navbar-container active";
    return "navbar-container";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to handle smooth scrolling with offset
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      // Calculate the position with 64px offset
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 74;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const className = getNavbarClassName();
  console.log("Final className:", className);

  return (
    <div className={className}>
      <div className="navbar-inner">
        <div className="logo-container">
          <Image src={WhiteLogo} alt="Anomaly Logo"/>
        </div>
        
        <ul className="desktop-nav-links">
          <li>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection('services', e)}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#featured-work" 
              onClick={(e) => scrollToSection('featured-work', e)}
            >
              Featured Work
            </a>
          </li>
        </ul>
        
        <div className="right-nav">
          <button 
            className={`reach-out-button ${isActive ? "active" : ""} ${isInverted ? "invert" : ""}`} 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 64;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Contact Us
          </button>
          
          <button 
            className={`hamburger-menu ${menuOpen ? "open" : ""} ${isActive ? "active" : ""} ${isInverted ? "invert" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""} ${isActive ? "active" : ""} ${isInverted ? "invert" : ""}`}>
          <ul>
            <li>
              <a 
                href="#services" 
                onClick={(e) => {
                  scrollToSection('services', e);
                  setMenuOpen(false);
                }}
              >
                Services
              </a>
              <div className="mobile-menu-divider"></div>
            </li>
            <li>
              <a 
                href="#featured-work" 
                onClick={(e) => {
                  scrollToSection('featured-work', e);
                  setMenuOpen(false);
                }}
              >
                Featured Work
              </a>
              <div className="mobile-menu-divider"></div>
            </li>
            <li>
              <button 
                className="mobile-contact-button"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 64;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                    });
                  }
                  setMenuOpen(false);
                }}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>  
  );
}