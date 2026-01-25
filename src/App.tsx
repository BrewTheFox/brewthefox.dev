"use client"

import './App.css'
import { useState } from 'react'
import Starfield from './components/starfield';
import {Sparkle, ArrowDown} from 'lucide-react';
import { ReactLenis } from 'lenis/react'
import Fox from './assets/Fox.svg?react'
import { useMotionValueEvent, useScroll, useTransform, motion } from "motion/react"
import { useTotalPageVh } from './hooks/useTotalPageVh';

function App() {
  type Animation = 'infinite' | 0
  const websiteSizeInVh = useTotalPageVh();
  const localDotSix = (300 / websiteSizeInVh) * 0.6
  const localDotFive = (300 / websiteSizeInVh) * 0.5
  const localDotFour = (300 / websiteSizeInVh) *0.4
  const [animationIterations, setAnimationIterations] = useState<Animation>("infinite")
  const [quote, setQuote] = useState(["I'm a backend developer!", "24.5vw"])
  const { scrollYProgress } = useScroll()
  const [scrollAdviseOpacity, setScrollAdviseOpacity] = useState(1) 
  const scaleFox = useTransform(scrollYProgress, [0, localDotSix], [1, 1.05]);
  const translateXFox = useTransform(scrollYProgress, [0, localDotSix], ["0vw", "-25vw"]);
  const translateYFox = useTransform(scrollYProgress, [0, localDotSix], ["0vw", "1.4vw"]); 
  const translateYTitle = useTransform(scrollYProgress, [0, localDotFive], ["0vw", "-30vh"])
  const translateXTitle = useTransform(scrollYProgress, [localDotFour, localDotSix], ["0vw", "21vw"])
  const translateYSubtitle = useTransform(scrollYProgress, [0,localDotFive], ["0vw", "30vh"])
  const translateXSubtitle = useTransform(scrollYProgress, [localDotFour,localDotSix], ["0vw", quote[1]])

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
      setQuote(["I'm a backend developer!", "24.5vw"])
    }
    else {
      setAnimationIterations(0)
      setScrollAdviseOpacity(0)
      setQuote(["I'm a backend developer!", "24.5vw"])
    }
  })

  return (
    <ReactLenis root>
    <div className='scrollContainer'>
      <div className='stickyScroll' style={{position:'sticky'}} onMouseMove={(e) => {
        calcFox(e.clientX, e.clientY, window.innerHeight, window.innerWidth)
      }}>
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
          backgroundColor="black"
        />
        <div className='subMain'>
          <div style={{zIndex: 10, position: 'relative'}}>
            <motion.div style={{
              position:'relative',
              translateY: translateYTitle,
              translateX: translateXTitle
            }}>
              <h1 className='title'>BrewTheFox</h1>
            </motion.div>
            <motion.div style={{display:'flex', 
              translateX: translateXSubtitle,
              translateY: translateYSubtitle
            }}>
              <div>
                <Sparkle size="2vw" color='white' style={{marginTop:'4vh', marginRight:"1vw"}}></Sparkle>
              </div>
              <div>
                <h2 className='subtitle'>{quote[0]}</h2>
              </div>
            </motion.div>
          </div>
          <motion.div style={{
            scale: scaleFox,
            translateX: translateXFox,
            translateY: translateYFox,
            zIndex: 1, 
            position: 'relative'
          }}>
            <Fox id="fox-svg" className='fox fill-white' style={{ transition: 'transform 0.1s ease-out' }}></Fox>
          </motion.div>
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
    <div>
      
    </div>
    </ReactLenis>
  )
}

export default App
