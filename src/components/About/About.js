'use client';
import './About.css'

export default function About(){
    return(
        <div className='standard-container about'>
            About
        </div>
    )
}

echo "# anomaly" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/eliezer-ari/anomaly.git
git push -u origin main