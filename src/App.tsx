"use client"

import './App.css'
import projects from './data/projects.json'
import { useState } from 'react'
import {EthernetPort} from 'lucide-react';
import {SiGithub} from '@icons-pack/react-simple-icons';
import { ReactLenis } from 'lenis/react'
import { useMotionValueEvent, useScroll, useTransform} from "motion/react"
import { useTotalPageVh } from './hooks/useTotalPageVh';
import { Button } from './components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
import { Card, CardContent } from './components/ui/card';
import Hero from './components/hero';

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
  const firstItemOpacity = useTransform(scrollYProgress, [localDotSix, localDotSeven], [0,1])
  const secondItemOpacity = useTransform(scrollYProgress, [localDotSeven, localDotEight], [0,1])
  const translateXFox = useTransform(scrollYProgress, [0, localDotSix], ["0vw", "-25vw"]);
  const translateYFox = useTransform(scrollYProgress, [0, localDotSix], ["0vw", "1.4vw"]); 
  const translateYTitle = useTransform(scrollYProgress, [0, localDotFive], ["0vw", "-30vh"])
  const translateXTitle = useTransform(scrollYProgress, [localDotFour, localDotSix], ["0vw", "21vw"])
  const translateYSubtitle = useTransform(scrollYProgress, [0,localDotFive], ["0vw", "30vh"])
  const translateXSubtitle = useTransform(scrollYProgress, [localDotFour,localDotSix], ["0vw", quote[1]])  
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
      <Hero animationIterations={animationIterations}
      quote={quote}
      scrollAdviseOpacity={scrollAdviseOpacity}
      firstItemOpacity={firstItemOpacity}
      secondItemOpacity={secondItemOpacity}
      translateXFox={translateXFox}
      translateYFox={translateYFox}
      translateXTitle={translateXTitle}
      translateYTitle={translateYTitle}
      translateYSubtitle={translateYSubtitle}
      translateXSubtitle={translateXSubtitle}
      />
      <div style={{
        backgroundColor: '#0f0f0f',
        padding: '4rem 0',
        minHeight: '100vh'
      }}>
        <div style={{
          maxWidth: '80%',
          margin: '0 auto',
          padding: '0 3rem'
        }}>
          <h1 id='projects' style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>My Projects</h1>
          <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
            <CarouselContent>
              {projects.map((item, _) => 
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div style={{ padding: '0.5rem' }}>
                    <Card style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                      <CardContent className="aspect-square" style={{display:'flex', flexDirection:'column'}}>
                        <div className='justify-center text-center w-full'>
                          <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600 }}>
                            {item["title"]}
                          </span>
                        </div>
                        <span>
                          {item["description"]}
                        </span>
                        <div className='gap-1 w-full flex'>
                          {item["githubLink"] && (
                            <a className='flex-1' href={item['githubLink']}>
                              <Button className='w-full'>
                                Github
                                <SiGithub/>
                              </Button>
                            </a>
                          )
                        }
                        {item['website'] && (
                            <a className='flex-1' href={item['website']}>
                              <Button className='w-full'>
                                Website
                                <EthernetPort/>
                              </Button>
                            </a>
                          )
                        }
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #333' }} />
            <CarouselNext style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #333' }} />
          </Carousel>
        </div>
      </div>
    </ReactLenis>
  )
}

export default App
