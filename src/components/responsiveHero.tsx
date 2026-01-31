import Starfield from './starfield';
import '../styles/responsiveHero.css'
import Fox from '../assets/Fox.svg?react'
import { Button } from './ui/button';
import { Sparkle, Mail, ArrowDown } from 'lucide-react';
import { SiYoutube, SiGithub, SiDiscord } from '@icons-pack/react-simple-icons';

export default function ResponsiveHero() {
    return (
        <div className='heroMain'>
            <Starfield
                starCount={200}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor="black"
            />
            
            <div className='heroContent'>
                {/* Left side: Title and subtitle */}
                <div className='heroText'>
                    <h1 className='heroTitle'>BrewTheFox</h1>
                    
                    <div className='heroSubtitle'>
                        <Sparkle size={20} color='white' />
                        <h2>I'm a backend developer!</h2>
                    </div>
                    
                    <div className='socialLinks'>
                        <a href='https://github.com/BrewTheFox' rel="noopener noreferrer" target='_blank' className='float-1'>
                            <Button className="socialButton" variant='ghost'>
                                <SiGithub />
                            </Button>
                        </a>
                        <a href='' className='float-2'>
                            <Button className="socialButton" variant='ghost'>
                                <Mail />
                            </Button>
                        </a>
                        <a href='https://discord.com/users/383044282669465622' rel="noopener noreferrer" target='_blank' className='float-3'>
                            <Button className="socialButton" variant='ghost'>
                                <SiDiscord />
                            </Button>
                        </a>
                        <a href='https://www.youtube.com/@BrewTheFox' rel="noopener noreferrer" target='_blank' className='float-4'>
                            <Button className="socialButton" variant='ghost'>
                                <SiYoutube />
                            </Button>
                        </a>
                    </div>
                </div>
                
                {/* Right side: Fox */}
                <Fox 
                    id="fox-svg" 
                    className='heroFox fill-white'
                />
            </div>
            
            <div className='scrollIndicator'>
                <ArrowDown size={20} className='arrows' />
                <span className='scrollAdvise'>Scroll to know more</span>
                <ArrowDown size={20} className='arrows' />
            </div>
        </div>
    )
}