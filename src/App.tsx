"use client"

import { useState, useEffect } from 'react'

import './styles/App.css'
import { ReactLenis } from 'lenis/react'
import Hero from './components/hero';
import ResponsiveHero from './components/responsiveHero';
import MyProjects from './components/projects';

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
      <div className='OutContainer' style={{
        backgroundColor: '#0f0f0f',
        padding: '5rem 0',
      }}>
        <MyProjects/>
      </div>
    </ReactLenis>
  )
}

export default App
