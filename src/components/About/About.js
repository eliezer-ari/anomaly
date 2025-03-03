'use client';
import './About.css'

export default function About(){
    return(
        <div className='standard-container about'>
            <div className='about-container'>
                {/* <h1>PAST WORK</h1> */}
                <a href="https://keeping-it-simple-staging.netlify.app/" target="_blank" rel="noopener noreferrer">
                   <div className="shape hexagon"></div>
                </a>
                <a href="https://ariroseman.com" target="_blank" rel="noopener noreferrer">
                   <div className="shape triangle"></div>
                </a>
                <a href="https://www.delirium-ent.com" target="_blank" rel="noopener noreferrer">
                   <div className="shape circle"> </div>
                </a>
                <a href="https://www.discoverframe.com" target="_blank" rel="noopener noreferrer">
                   <div className="shape square"></div>
                </a>
                <a href="https://www.austinmahone.com" target="_blank" rel="noopener noreferrer">
                   <div className="shape pentagon"></div>
                </a>
         
            </div>
        </div>
    )
}

