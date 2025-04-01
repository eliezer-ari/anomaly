"use client";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Work from "@/components/Work/Work";
// import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";


export default function Home() {
  return (
    <div>
      <Loading/>
      <Header/>
            <Hero />
            <About /> 
            <Contact/>
            <Footer/>
        
      
      {/* <Work/> */}

    </div>
  );
}

