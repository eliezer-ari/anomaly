'use client';
import './Header.css';
import Image from 'next/image';
import WhiteLogo from '@/../public/anomalylogo.png';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isInverted, setIsInverted] = useState(false);

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
      
      // Simple threshold check - once we scroll past the hero section, invert
      // Add a small buffer (e.g., navbar height) if needed
      const navbarHeight = 0;
      const shouldInvert = scrollPosition >= (heroHeight - navbarHeight);
      
      console.log({
        scrollY: scrollPosition,
        heroHeight,
        shouldInvert,
        currentlyInverted: isInverted
      });
      
      // Only update state if it changed
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
  }, [isInverted]); // It's OK to include isInverted here with the ESLint rule disabled

  // Optional: Disable the exhaustive-deps ESLint rule for this specific line
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className={isInverted ? "navbar-container invert" : "navbar-container"}>
      <Image src={WhiteLogo} alt="Anomaly Logo"/>
    </div>
  );
}