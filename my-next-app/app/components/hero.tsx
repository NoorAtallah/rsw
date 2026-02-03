'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function RSWHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
      stat: "500M+",
      statLabel: "Assets"
    },
    {
      image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1600&q=80",
      stat: "25%",
      statLabel: "Returns"
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80",
      stat: "150+",
      statLabel: "Partners"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen overflow-hidden relative" style={{ background: '#163b5f' }}>
      
      <style jsx global>{`
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
          background: #BFC7CD;
          transition: width 0.4s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Ambient glow */}
      <div 
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'rgba(191, 199, 205, 0.1)' }}
      />

      {/* Main Container */}
      <div className="relative h-full">
        
        {/* The Shaped Image */}
        <motion.div
          className="absolute inset-0 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        >
          <section
            className="relative w-full h-full"
            style={{
              maskImage: `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M38 4C38 1.79086 36.209 0 34 0H4C1.791 0 0 1.79086 0 4V14V28V99C0 101.209 1.791 103 4 103H39C41.209 103 43 104.791 43 107V118C43 120.209 44.791 122 47 122H193C195.209 122 197 120.209 197 118V103V94V46C197 43.7909 198.791 42 201 42H217C219.209 42 221 40.2091 221 38V18C221 15.7909 219.209 14 217 14H197H178H42C39.791 14 38 12.2091 38 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M38 4C38 1.79086 36.209 0 34 0H4C1.791 0 0 1.79086 0 4V14V28V99C0 101.209 1.791 103 4 103H39C41.209 103 43 104.791 43 107V118C43 120.209 44.791 122 47 122H193C195.209 122 197 120.209 197 118V103V94V46C197 43.7909 198.791 42 201 42H217C219.209 42 221 40.2091 221 38V18C221 15.7909 219.209 14 217 14H197H178H42C39.791 14 38 12.2091 38 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E")`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}
          >
            {/* Sliding Images */}
            {slides.map((slide, index) => (
              <motion.img
                key={index}
                src={slide.image}
                alt="RSW Investment"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1.5 }}
              />
            ))}
            
            {/* Gradient overlays */}
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(22, 59, 95, 0.95) 0%, rgba(22, 59, 95, 0.4) 40%, transparent 70%)' }}
            />
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(22, 59, 95, 0.6) 0%, transparent 40%, rgba(22, 59, 95, 0.3) 100%)' }}
            />
          </section>
        </motion.div>

        {/* Navigation - Positioned to avoid left notch */}
        <motion.nav
          className="absolute z-30 top-6 left-[20%] right-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <Building2 className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xl font-semibold text-white tracking-wide">RSW</span>
              <span className="text-[10px] tracking-[0.2em] block" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>INVESTMENTS</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, i) => (
              <span 
                key={i}
                className="text-sm font-light transition-colors cursor-pointer link-hover hover:text-white"
                style={{ color: 'rgba(191, 199, 205, 0.8)' }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button 
            className="px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300 hover:bg-white hover:text-[#163b5f]"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(191, 199, 205, 0.3)',
              color: '#ffffff'
            }}
          >
            GET STARTED
          </button>
        </motion.nav>

        {/* Main Title Section */}
        <motion.section
          className="absolute z-20"
          style={{
            top: '22%',
            left: '5%',
            width: '45%',
            maxWidth: '600px',
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px" style={{ background: 'rgba(191, 199, 205, 0.5)' }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(191, 199, 205, 0.7)' }}>
              Investment Excellence
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
            Strategic
            <span className="block font-semibold mt-2">Growth Partners</span>
          </h1>
          
          {/* Description */}
          <p 
            className="text-lg font-light leading-relaxed mb-10 max-w-md"
            style={{ color: 'rgba(191, 199, 205, 0.85)' }}
          >
            Building tomorrow's success through strategic partnerships and visionary investments across global markets.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-8">
            <button 
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 hover:bg-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <span className="text-sm tracking-wider text-white">Discover Portfolio</span>
              <ArrowUpRight 
                className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                strokeWidth={1.5}
              />
            </button>
            
            <a 
              href="#" 
              className="group flex items-center gap-2 transition-colors hover:text-white"
              style={{ color: 'rgba(191, 199, 205, 0.7)' }}
            >
              <span className="text-sm tracking-wider">Learn More</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </a>
          </div>

          {/* Stats Row */}
          <div 
            className="flex items-center gap-10 mt-16 pt-8"
            style={{ borderTop: '1px solid rgba(191, 199, 205, 0.1)' }}
          >
            {[
              { value: '$2.5B', label: 'Assets Managed' },
              { value: '150+', label: 'Global Partners' },
              { value: '25%', label: 'Avg. Returns' }
            ].map((stat, index) => (
              <div key={index}>
                <span className="text-3xl font-light text-white block">{stat.value}</span>
                <span className="text-xs" style={{ color: 'rgba(191, 199, 205, 0.5)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Vertical Text - Right Side */}
        <motion.div
          className="absolute bottom-[15%] right-[2%] z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span 
            className="text-vertical-lr text-xs tracking-[0.5em] uppercase"
            style={{ color: 'rgba(191, 199, 205, 0.3)' }}
          >
            Global Investment Solutions
          </span>
        </motion.div>

        {/* Large RSW Watermark */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
          style={{ left: '18%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.03 : 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <span 
            className="text-vertical text-[200px] font-bold tracking-wider leading-none"
            style={{ color: '#BFC7CD' }}
          >
            RSW
          </span>
        </motion.div>

        {/* Top Left Notch - Dynamic Stat */}
        <motion.div
          className="absolute z-30 flex items-center justify-center"
          style={{
            top: '1.2%',
            left: '1.2%',
            width: '15%',
            height: '10%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="text-center">
            <span className="text-3xl font-light text-white">{slides[currentSlide].stat}</span>
            <span className="text-xs block mt-1" style={{ color: 'rgba(191, 199, 205, 0.5)' }}>{slides[currentSlide].statLabel}</span>
          </div>
        </motion.div>

        {/* Bottom Left - Slide Controls */}
        <motion.div
          className="absolute z-30 flex items-center gap-6"
          style={{
            bottom: '4%',
            left: '5%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Arrow Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              style={{
                background: 'rgba(191, 199, 205, 0.1)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              style={{
                background: 'rgba(191, 199, 205, 0.1)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
            </button>
          </div>

          {/* Slide Counter */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-light text-white">0{currentSlide + 1}</span>
            <span style={{ color: 'rgba(191, 199, 205, 0.3)' }}>/</span>
            <span className="text-sm" style={{ color: 'rgba(191, 199, 205, 0.5)' }}>0{slides.length}</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-500"
                style={{
                  width: index === currentSlide ? '32px' : '8px',
                  height: '3px',
                  borderRadius: '2px',
                  background: index === currentSlide ? '#ffffff' : 'rgba(191, 199, 205, 0.3)'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <motion.div
            className="w-[1px] h-10"
            style={{ background: 'linear-gradient(to bottom, rgba(191, 199, 205, 0.5), transparent)' }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(191, 199, 205, 0.4)' }}>
            Scroll
          </span>
        </motion.div>

        {/* Decorative Corner Lines */}
        <motion.div
          className="absolute w-16 h-px z-20"
          style={{ 
            top: '22%', 
            left: '18%',
            background: 'linear-gradient(to right, rgba(191, 199, 205, 0.3), transparent)'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
        
        <motion.div
          className="absolute w-px h-16 z-20"
          style={{ 
            top: '22%', 
            left: '18%',
            background: 'linear-gradient(to bottom, rgba(191, 199, 205, 0.3), transparent)'
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        {/* Glassmorphism Floating Card - Bottom Right */}
        <motion.div
          className="absolute z-30"
          style={{
            bottom: '12%',
            right: '5%',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div 
            className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(191, 199, 205, 0.15)' }}
              >
                <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Start Investing</p>
                <p className="text-xs" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>Join 10,000+ investors</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}