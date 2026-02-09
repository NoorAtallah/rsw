'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function RSWHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const purple = '#432c96'
  const white = '#ffffff'

  return (
    <div className="min-h-screen h-screen overflow-hidden relative" style={{ background: purple }}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .text-vertical-lr {
          writing-mode: vertical-lr;
          text-orientation: mixed;
        }
        .link-hover {
          position: relative;
        }
        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: ${white};
          transition: width 0.4s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
        .hero-video-overlay {
          background: linear-gradient(
            135deg,
            rgba(67, 44, 150, 0.25) 0%,
            rgba(67, 44, 150, 0.15) 50%,
            rgba(67, 44, 150, 0.10) 100%
          );
        }
        .hero-video-overlay-vignette {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(67, 44, 150, 0.08) 100%
          );
        }
        .stat-glow {
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.15);
        }
        .glass-border-purple {
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .glass-bg-purple {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      {/* Full Page Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
         
        >
          <source src="/1.mp4" />
          <source src="/videos/rsw-hero.webm" type="video/webm" />
        </video>
        
        {/* Purple Video Overlays */}
        <div className="hero-video-overlay absolute inset-0" />
        <div className="hero-video-overlay-vignette absolute inset-0" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{

            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Ambient white glows */}
      <div 
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[200px] pointer-events-none opacity-20 md:opacity-25 z-[1]"
        style={{ background: 'rgba(255, 255, 255, 0.15)' }}
      />
      
      <div 
        className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] pointer-events-none opacity-15 z-[1]"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      />

      {/* Main Container */}
      <div className="relative h-full z-10">

        {/* Main Title Section */}
        <motion.section
          className="absolute z-20 px-4 md:px-0"
          style={{
            top: '22%',
            left: '4%',
            right: '4%',
            maxWidth: '800px',
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="w-6 md:w-10 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }} />
            <span 
              className="text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Space Mono, monospace' }}
            >
              Diversified Investment Group
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light leading-[1.05] mb-4 md:mb-6"
            style={{ color: white, fontFamily: 'Outfit, sans-serif' }}
          >
            Building
            <span className="block font-bold mt-1 md:mt-2 stat-glow" style={{ color: white }}>
              Tomorrow's Success
            </span>
          </h1>
          
          {/* Description */}
          <p 
            className="text-base md:text-xl font-light leading-relaxed mb-8 md:mb-12 max-w-xl"
            style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'Outfit, sans-serif' }}
          >
            A world-class investment hub spanning Real Estate, Construction, and Advanced Technology across the UAE and beyond.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <button 
              className="group flex items-center gap-3 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-opacity-90 hover:shadow-2xl hover:scale-105"
              style={{
                background: white,
                color: purple,
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
              }}
            >
              <span className="text-sm md:text-base tracking-wider">Explore Ventures</span>
              <ArrowUpRight 
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                strokeWidth={2}
              />
            </button>
            
            <button 
              className="group flex items-center gap-3 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-white hover:text-[#432c96] hover:shadow-xl glass-bg-purple glass-border-purple"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                color: white
              }}
            >
              <span className="text-sm md:text-base tracking-wider">Investor Relations</span>
              <ArrowUpRight 
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                strokeWidth={2}
              />
            </button>
          </div>
        </motion.section>

        {/* Vertical Text - Right Side */}
        <motion.div
          className="hidden md:block absolute bottom-[15%] right-[2%] z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span 
            className="text-vertical-lr text-xs tracking-[0.5em] uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.3)', fontFamily: 'Space Mono, monospace' }}
          >
            Diversified Investment Solutions
          </span>
        </motion.div>

        {/* Large RSW Watermark */}
        <motion.div
          className="hidden lg:block absolute top-1/2 -translate-y-1/2 z-[5] pointer-events-none"
          style={{ right: '8%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.03 : 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        >
          <span 
            className="text-[280px] font-bold tracking-wider leading-none"
            style={{ color: white, fontFamily: 'Outfit, sans-serif' }}
          >
            RSW
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.div
            className="w-[1px] h-12"
            style={{ background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent)` }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span 
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Space Mono, monospace' }}
          >
            Scroll
          </span>
        </motion.div>

        {/* Decorative Corner Lines */}
        <motion.div
          className="hidden md:block absolute w-20 h-px z-20"
          style={{ 
            top: '24%', 
            left: '20%',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent)'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        
        <motion.div
          className="hidden md:block absolute w-px h-20 z-20"
          style={{ 
            top: '24%', 
            left: '20%',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)'
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        />

        {/* CTA Card - Bottom Right */}
        <motion.div
          className="hidden lg:block absolute z-30"
          style={{
            bottom: '20%',
            right: '4%',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div 
            className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl glass-bg-purple glass-border-purple"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p 
                  className="text-sm font-semibold"
                  style={{ color: white, fontFamily: 'Outfit, sans-serif' }}
                >
                  Investment Memo
                </p>
                <p 
                  className="text-xs"
                  style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Space Mono, monospace' }}
                >
                  Request Information
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}