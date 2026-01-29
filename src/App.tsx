"use client"

import { useState, useEffect } from 'react'

import './styles/App.css'
import projects from './data/projects.json'
import {EthernetPort} from 'lucide-react';
import {SiGithub} from '@icons-pack/react-simple-icons';
import { ReactLenis } from 'lenis/react'
import { Button } from './components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
import { Card, CardContent } from './components/ui/card';
import Hero from './components/hero';
import ResponsiveHero from './components/responsiveHero';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ReactLenis root>
      {isMobile ? <ResponsiveHero /> : <Hero />}
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
                <CarouselItem key={item["title"].replaceAll(" ", "-")} className="md:basis-1/2 lg:basis-1/3">
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
