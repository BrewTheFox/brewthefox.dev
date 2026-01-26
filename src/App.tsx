"use client"

import './App.css'
import { useState } from 'react'
import Starfield from './components/starfield';
import {Sparkle, ArrowDown, Mail} from 'lucide-react';
import {SiYoutube, SiGithub, SiDiscord} from '@icons-pack/react-simple-icons';
import { ReactLenis } from 'lenis/react'
import Fox from './assets/Fox.svg?react'
import { useMotionValueEvent, useScroll, useTransform, motion } from "motion/react"
import { useTotalPageVh } from './hooks/useTotalPageVh';
import { Button } from './components/ui/button';

function App() {
  type Animation = 'infinite' | 0
  const websiteSizeInVh = useTotalPageVh();
  const localDotSix = (300 / websiteSizeInVh) * 0.6
  const localDotFive = (300 / websiteSizeInVh) * 0.5
  const localDotFour = (300 / websiteSizeInVh) * 0.4
  const localDotSeven = (300 / websiteSizeInVh) * 0.7
  const localDotEight = (300 / websiteSizeInVh) *0.8
  const [animationIterations, setAnimationIterations] = useState<Animation>("infinite")
  const [quote, setQuote] = useState(["I'm a backend developer!", "24vw"])
  const { scrollYProgress } = useScroll()
  const [scrollAdviseOpacity, setScrollAdviseOpacity] = useState(1)
  const FirstItemOpacity = useTransform(scrollYProgress, [localDotSix, localDotSeven], [0,1])
  const SecondItemOpacity = useTransform(scrollYProgress, [localDotSeven, localDotEight], [0,1])
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
      setQuote(["I'm a backend developer!", "24vw"])
    }
    else {
      setAnimationIterations(0)
      setScrollAdviseOpacity(0)
      setQuote(["I'm a backend developer!", "24vw"])
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
              translateX: translateXFox,
              translateY: translateYFox,
              zIndex: 1, 
              position: 'relative'
            }}>
              <Fox id="fox-svg" className='fox fill-white' style={{ transition: 'transform 0.1s ease-out' }}></Fox>

              <motion.div
                style={{ position: 'absolute', top: '20%', left: '-10%', opacity:FirstItemOpacity }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button onClick={() => {window.location.href = 'https://github.com/BrewTheFox'}} className="socialButton" variant='ghost'>
                  <SiGithub />
                </Button>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', top: '10%', right: '-10%', opacity:SecondItemOpacity }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Button onClick={() => {window.location.href = 'https://discord.com/users/383044282669465622'}} className="socialButton" variant='ghost'>
                  <Mail />
                </Button>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', bottom: '30%', left: '-15%', opacity:SecondItemOpacity }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Button onClick={() => {window.location.href = 'https://discord.com/users/383044282669465622'}} className="socialButton" variant='ghost'> 
                  <SiDiscord />
                </Button>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', bottom: '25%', right: '-15%', opacity:FirstItemOpacity}}
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Button onClick={() => {window.location.href = 'https://www.youtube.com/@BrewTheFox'}} className="socialButton" variant='ghost'>
                  <SiYoutube />
                </Button>
              </motion.div>

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
    </ReactLenis>
  )
}

export default App
