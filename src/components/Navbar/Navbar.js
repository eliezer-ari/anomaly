'use client';
import './Navbar.css';
import Image from 'next/image';
import WhiteLogo from '@/../public/anomalylogo.png';
import { useState, useEffect } from 'react';


export default function Navbar(){
    
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Current scroll position
      const viewportHeight = window.innerHeight; // Height of the viewport
      
      if (scrollY < viewportHeight * 0.9) { // Set isScrolled to false if scrollY is less than viewport height
        setIsScrolled(false);
      } 

      else if (scrollY > 2 * viewportHeight * 0.9) { // Set isScrolled to false if scrollY is greater than 2x viewport height minus 10% of viewport height
        setIsScrolled(false);
      } 

      else { // Set isScrolled to true if scrollY is between viewport height and 2x viewport height
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return(
        <div className={isScrolled ? "navbar-container active" : "navbar-container"} >
            <Image src={WhiteLogo} alt="oops"/>
        </div>
    )
}