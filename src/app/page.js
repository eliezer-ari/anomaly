"use client";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Work from "@/components/Work/Work";
// import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import About from "@/components/About/About";



export default function Home() {
  return (
    <div>
      <Loading/>
      <Navbar/>
      <ParallaxProvider>
        <div className='parallax-container'>
            <Hero />
            <About /> 
        </div>
        
        
      </ParallaxProvider>
      
      {/* <Work/> */}
      {/* <Contact/> */}
      {/* <Footer/> */}
    </div>
  );
}

