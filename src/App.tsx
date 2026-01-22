"use client"

import './App.css'
import { useState, useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

function App() {
  type Position = 'sticky' | 'relative';
  const [scrollStatus, setScrollStatus] = useState<Position>("sticky") 
  return (
    <>
    <div className='scrollContainer'>
      <div className='stickyScroll' style={{position:scrollStatus}}>
        <h1 className='title'>BrewTheFox</h1>
      </div>
    </div>
    </>
  )
}

export default App
