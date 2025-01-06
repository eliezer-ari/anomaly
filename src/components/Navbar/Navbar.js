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
      if (scrollY > viewportHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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