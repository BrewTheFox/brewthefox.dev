"use client"

import { useState, useEffect } from 'react'

import './styles/App.css'
import projects from './data/projects.json'
import {SiGithub} from '@icons-pack/react-simple-icons';
import { ArrowUpRight } from 'lucide-react';
import { ReactLenis } from 'lenis/react'
import { Button } from './components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
import Hero from './components/hero';
import ResponsiveHero from './components/responsiveHero';
import { Separator } from './components/ui/separator';
import { CardSpotlight } from "@/components/ui/card-spotlight";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
  }, []);

  return (
    <ReactLenis root>
      {isMobile ? <ResponsiveHero /> : <Hero />}
      <div className='ProjectContainer' style={{
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
                <CarouselItem key={item["title"].replaceAll(" ", "-")} className="md:basis-1/2 lg:basis-1/3">
                  <div style={{ padding: '0.5rem' }}>
                    <CardSpotlight radius={340} color={item["color"]} className='projectCard'>
                      <div className="aspect-square z-20" style={{display:'flex', flexDirection:'column'}}>
                          <div className='z-20 mb-2 justify-center text-center w-full'>
                            <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600 }}>
                              {item["title"]}
                            </span>
                          </div>
                        <Separator className='mb-3 z-20'></Separator>
                        <span className='z-20' style={{color: 'white', fontSize: '1.1rem'}}>
                          {item["description"]}
                        </span>
                        <div className='z-20 gap-1 w-full flex' style={{ marginTop: 'auto' }}>
                          {item["githubLink"] && (
                            <a className='flex-5' href={item['githubLink']} rel="noopener noreferrer" target='_blank'>
                              <Button className='w-full'>
                                Github
                                <SiGithub/>
                              </Button>
                            </a>
                          )
                        }
                        {item['website'] && (
                            <a className='flex-1' href={item['website']} rel="noopener noreferrer" target='_blank'>
                              <Button className='w-full'>
                                <ArrowUpRight/>
                              </Button>
                            </a>
                          )
                        }
                        </div>
                      </div>
                    </CardSpotlight>
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
