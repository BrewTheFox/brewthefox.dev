"use client"

import './App.css'
import { useState, useEffect } from 'react'
import Starfield from './components/starfield';
import {Sparkle, ArrowDown} from 'lucide-react';
import { ReactLenis } from 'lenis/react'
import Fox from './assets/Fox.svg?react'
import { useMotionValueEvent, useScroll } from "motion/react"

function App() {
  type Position = 'sticky' | 'fixed' | 'relative';
  type Animation = 'infinite' | 0
  const [stickyStatus, setStickyStatus] = useState<Position>("sticky")
  const [animationIterations, setAnimationIterations] = useState<Animation>("infinite")
  const [quote, setQuote] = useState("I'm a backend developer!")
  const { scrollYProgress } = useScroll()
  const [scrollAdviseOpacity, setScrollAdviseOpacity] = useState(1) 

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
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest == 0) {
      setAnimationIterations('infinite')
      setScrollAdviseOpacity(1)
    }
    else {
      setAnimationIterations(0)
      setScrollAdviseOpacity(0)
    }
  })

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
        <div className='subMain'>
          <div>
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
        <div>
          <div style={{display:'flex', justifyContent:'center', justifyItems:'center'}}>
            <ArrowDown size='3vw' className='arrows' style={{animationIterationCount:animationIterations, opacity:scrollAdviseOpacity}} ></ArrowDown>
            <span className='scrollAdvise' style={{animationIterationCount:animationIterations, opacity:scrollAdviseOpacity}}>Scroll to know more</span>
            <ArrowDown size='3vw' className='arrows' style={{animationIterationCount:animationIterations, opacity:scrollAdviseOpacity}}></ArrowDown>
          </div>
        </div>
      </div>
    </div>
    </ReactLenis>
  )
}

export default App
