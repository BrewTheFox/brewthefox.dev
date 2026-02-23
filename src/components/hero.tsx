import { useState, useRef } from 'react';
import Starfield from './starfield';
import '../styles/desktopHero.css'
import { Button } from './ui/button';
import Fox from '../assets/Fox.svg?react'
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { Sparkle, ArrowDown, Mail } from 'lucide-react';
import { SiYoutube, SiGithub, SiDiscord } from '@icons-pack/react-simple-icons';
import { useTotalPageVh } from '../hooks/useTotalPageVh';

type Animation = 'infinite' | 0

const STAR_COLOR: [number, number, number] = [255, 255, 255];
const QUOTE = ["I'm a backend developer!", "24vw"];

export default function Hero() {
  const websiteSizeInVh = useTotalPageVh();
  const localDotSix = (300 / websiteSizeInVh) * 0.6;
  const localDotFive = (300 / websiteSizeInVh) * 0.5;
  const localDotFour = (300 / websiteSizeInVh) * 0.4;
  const localDotSeven = (300 / websiteSizeInVh) * 0.7;
  const localDotEight = (300 / websiteSizeInVh) * 0.8;

  const [animationIterations, setAnimationIterations] = useState<Animation>("infinite");
  const [scrollAdviseOpacity, setScrollAdviseOpacity] = useState(1);

  const { scrollYProgress } = useScroll();
  const firstItemOpacity = useTransform(scrollYProgress, [localDotSix, localDotSeven], [0, 1]);
  const secondItemOpacity = useTransform(scrollYProgress, [localDotSeven, localDotEight], [0, 1]);
  const translateXFox = useTransform(scrollYProgress, [0, localDotSix], ["0vw", "-25vw"]);
  const translateYFox = useTransform(scrollYProgress, [0, localDotSix], ["0vw", "1.4vw"]);
  const translateYTitle = useTransform(scrollYProgress, [0, localDotFive], ["0vw", "-30vh"]);
  const translateXTitle = useTransform(scrollYProgress, [localDotFour, localDotSix], ["0vw", "21vw"]);
  const translateYSubtitle = useTransform(scrollYProgress, [0, localDotFive], ["0vw", "30vh"]);
  const translateXSubtitle = useTransform(scrollYProgress, [localDotFour, localDotSix], ["0vw", QUOTE[1]]);


  const wasAtTop = useRef(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isAtTop = latest === 0;
    
    if (isAtTop !== wasAtTop.current) {
      wasAtTop.current = isAtTop;
      if (isAtTop) {
        setAnimationIterations('infinite');
        setScrollAdviseOpacity(1);
      } else {
        setAnimationIterations(0);
        setScrollAdviseOpacity(0);
      }
    }
  });

  function calcFox(clientX: number, clientY: number, innerHeight: number, innerWidth: number) {
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    const rotationX = -y * 5;
    const rotationY = x * 5;
    const foxElement = document.getElementById('fox-svg');
    if (foxElement) {
      foxElement.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
  }

  return (
    <div className='scrollContainer'>
      <div className='stickyScroll' style={{ position: 'sticky' }} onMouseMove={(e) => {
        calcFox(e.clientX, e.clientY, window.innerHeight, window.innerWidth)
      }}>
        <Starfield
          starCount={1000}
          starColor={STAR_COLOR}
          speedFactor={0.05}
          backgroundColor="black"
        />
        <div className='subMain'>
          <div style={{ zIndex: 10, position: 'relative' }}>
            <motion.div style={{
              position: 'relative',
              translateY: translateYTitle,
              translateX: translateXTitle
            }}>
              <h1 className='title'>BrewTheFox</h1>
            </motion.div>
            <motion.div style={{
              display: 'flex',
              translateX: translateXSubtitle,
              translateY: translateYSubtitle
            }}>
              <div>
                <Sparkle size="2vw" color='white' style={{ marginTop: '4vh', marginRight: "1vw" }}></Sparkle>
              </div>
              <div>
                <h2 className='subtitle'>{QUOTE[0]}</h2>
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
              className="pcFloat-1"
              style={{ position: 'absolute', top: '20%', left: '-10%', opacity: firstItemOpacity }}
            >
              <a href='https://github.com/BrewTheFox' rel="noopener noreferrer" target='_blank'>
                <Button className="pcSocialButton" variant='ghost'>
                  <SiGithub />
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="pcFloat-2"
              style={{ position: 'absolute', top: '10%', right: '-10%', opacity: secondItemOpacity }}
            >
              <Button className="pcSocialButton" variant='ghost'>
                <Mail />
              </Button>
            </motion.div>

            <motion.div
              className="pcFloat-3"
              style={{ position: 'absolute', bottom: '30%', left: '-15%', opacity: secondItemOpacity }}
            >
              <a href='https://discord.com/users/383044282669465622' rel="noopener noreferrer" target='_blank'>
                <Button className="pcSocialButton" variant='ghost'>
                  <SiDiscord />
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="pcFloat-4"
              style={{ position: 'absolute', bottom: '25%', right: '-15%', opacity: firstItemOpacity }}
            >
              <a href='https://www.youtube.com/@BrewTheFox' rel="noopener noreferrer" target='_blank'>
                <Button className="pcSocialButton" variant='ghost'>
                  <SiYoutube />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
            <ArrowDown size='3vw' className='pcArrows' style={{ animationIterationCount: animationIterations, opacity: scrollAdviseOpacity }} ></ArrowDown>
            <span className='scrollAdvisePC' style={{ animationIterationCount: animationIterations, opacity: scrollAdviseOpacity }}>Scroll to know more</span>
            <ArrowDown size='3vw' className='pcArrows' style={{ animationIterationCount: animationIterations, opacity: scrollAdviseOpacity }}></ArrowDown>
          </div>
        </div>
      </div>
    </div>
  )
}