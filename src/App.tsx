"use client"

import './App.css'
import { useState, useEffect } from 'react'
import Starfield from 'react-starfield';
import {Sparkle} from 'lucide-react';
import { ReactLenis } from 'lenis/react'
import Fox from './assets/Fox.svg?react'

function App() {
  type Position = 'sticky' | 'relative';
  const [stickyStatus, setStickyStatus] = useState<Position>("sticky")
  const [quote, setQuote] = useState("I'm a backend developer!")
  function calcFox(clientX:number, clientY:number, innerHeight:number, innerWidth:number) {
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;

    const rotationX = -y * 5; // Max 20 degrees
    const rotationY = x * 5; // Max 20 degrees
    const foxElement = document.getElementById('fox-svg');

    if (foxElement) {
          foxElement.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
  }
  return (
    <ReactLenis root>
    <div className='scrollContainer'>
      <div className='stickyScroll' style={{position:stickyStatus}} onMouseMove={(e) => {
        calcFox(e.clientX, e.clientY, window.innerHeight, window.innerWidth)
      }}>
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
          backgroundColor="black"
        />
        <div style={{display:'flex'}}>
          <div className='scrollTextContainer'>
            <h1 className='title'>BrewTheFox</h1>
            <div style={{display:'flex'}}>
              <div>
                <Sparkle size="2vw" color='white' style={{marginTop:'4vh', marginRight:"1vw"}}></Sparkle>
              </div>
              <div>
                <h2 className='subtitle'>{quote}</h2>
              </div>
            </div>
          </div>
          <div>
            <Fox id="fox-svg" className='fox fill-white' style={{ transition: 'transform 0.1s ease-out' }}></Fox>
          </div>
        </div>
      </div>
    </div>
    </ReactLenis>
  )
}

export default App
