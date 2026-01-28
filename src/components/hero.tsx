
import Starfield from './starfield';
import { Button } from './ui/button';
import Fox from '../assets/Fox.svg?react'
import { motion, MotionValue } from "motion/react"
import {Sparkle, ArrowDown, Mail} from 'lucide-react';
import {SiYoutube, SiGithub, SiDiscord} from '@icons-pack/react-simple-icons';

type Animation = 'infinite' | 0

interface Props {
    quote: Array<string>,
    animationIterations:Animation,
    translateYTitle: MotionValue,
    translateXTitle: MotionValue,
    translateYSubtitle: MotionValue,
    translateXSubtitle:MotionValue,
    translateXFox: MotionValue,
    translateYFox: MotionValue,
    firstItemOpacity: MotionValue,
    secondItemOpacity: MotionValue,
    scrollAdviseOpacity: number
}

export default function Hero(props: Props) {
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
                translateY: props.translateYTitle,
                translateX: props.translateXTitle
              }}>
                <h1 className='title'>BrewTheFox</h1>
              </motion.div>
              <motion.div style={{display:'flex', 
                translateX: props.translateXSubtitle,
                translateY: props.translateYSubtitle
              }}>
                <div>
                  <Sparkle size="2vw" color='white' style={{marginTop:'4vh', marginRight:"1vw"}}></Sparkle>
                </div>
                <div>
                  <h2 className='subtitle'>{props.quote[0]}</h2>
                </div>
              </motion.div>
            </div>
            <motion.div style={{
              translateX: props.translateXFox,
              translateY: props.translateYFox,
              zIndex: 1, 
              position: 'relative'
            }}>
              <Fox id="fox-svg" className='fox fill-white' style={{ transition: 'transform 0.1s ease-out' }}></Fox>

              <motion.div
                style={{ position: 'absolute', top: '20%', left: '-10%', opacity:props.firstItemOpacity }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <a href='https://github.com/BrewTheFox'>
                  <Button className="socialButton" variant='ghost'>
                    <SiGithub />
                  </Button>
                </a>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', top: '10%', right: '-10%', opacity:props.secondItemOpacity }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >

                <Button className="socialButton" variant='ghost'>
                  <Mail />
                </Button>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', bottom: '30%', left: '-15%', opacity:props.secondItemOpacity }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <a href='https://discord.com/users/383044282669465622'>
                  <Button className="socialButton" variant='ghost'> 
                    <SiDiscord />
                  </Button>
                </a>
              </motion.div>

              <motion.div
                style={{ position: 'absolute', bottom: '25%', right: '-15%', opacity:props.firstItemOpacity}}
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <a href='https://www.youtube.com/@BrewTheFox'>
                  <Button className="socialButton" variant='ghost'>
                    <SiYoutube />
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
          <div>
            <div style={{display:'flex', justifyContent:'center', justifyItems:'center'}}>
              <ArrowDown size='3vw' className='arrows' style={{animationIterationCount:props.animationIterations, opacity:props.scrollAdviseOpacity}} ></ArrowDown>
              <span className='scrollAdvise' style={{animationIterationCount:props.animationIterations, opacity:props.scrollAdviseOpacity}}>Scroll to know more</span>
              <ArrowDown size='3vw' className='arrows' style={{animationIterationCount:props.animationIterations, opacity:props.scrollAdviseOpacity}}></ArrowDown>
            </div>
          </div>
        </div>
      </div>
    )
}