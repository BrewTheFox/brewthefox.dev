"use client"

import './App.css'
import { useState, useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Starfield from 'react-starfield';
import {Sparkle} from 'lucide-react';
import Fox from './assets/Fox.svg?react'

function App() {
  type Position = 'sticky' | 'relative';
  const [scrollStatus, setScrollStatus] = useState<Position>("sticky")

  return (
    <>
    <div className='scrollContainer'>
      <div className='stickyScroll' style={{position:scrollStatus}}>
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
                <h2 className='subtitle'>I'm a backend developer!</h2>
              </div>
            </div>
          </div>
          <div>
            <Fox className='fox fill-white'></Fox>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
