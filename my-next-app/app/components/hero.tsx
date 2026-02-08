'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

export default function RSWHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkScreen = () => setIsMobile(window.innerWidth < 768)
  checkScreen()
  window.addEventListener('resize', checkScreen)
  return () => window.removeEventListener('resize', checkScreen)
}, [])

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
      stat: "4",
      statLabel: "Business Verticals"
    },
    {
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
      stat: "UAE",
      statLabel: "Abu Dhabi Based"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
      stat: "360°",
      statLabel: "Integrated Solutions"
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
    <div className="min-h-screen h-screen overflow-hidden relative" style={{ background: '#163b5f' }}>
      
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

      {/* Ambient glow - Hidden on mobile */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] md:blur-[200px] pointer-events-none opacity-50 md:opacity-100"
        style={{ background: 'rgba(191, 199, 205, 0.1)' }}
      />

      {/* Main Container */}
      <div className="relative h-full">
        
        {/* The Shaped Image */}
        <motion.div
          className="absolute inset-0 p-2 md:p-3"
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
            
            {/* Gradient overlays - Adjusted for mobile */}
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(22, 59, 95, 0.95) 0%, rgba(22, 59, 95, 0.6) 50%, transparent 80%)' }}
            />
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(22, 59, 95, 0.8) 0%, transparent 50%, rgba(22, 59, 95, 0.4) 100%)' }}
            />
          </section>
        </motion.div>

        {/* Navigation */}
      

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden absolute z-40 top-20 right-4 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: mobileMenuOpen ? 1 : 0,
            y: mobileMenuOpen ? 0 : -20,
            pointerEvents: mobileMenuOpen ? 'auto' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(22, 59, 95, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(191, 199, 205, 0.2)'
          }}
        >
          <div className="flex flex-col p-6 gap-4">
            {['Home', 'About', 'Ventures', 'Investor Relations', 'Contact'].map((item, i) => (
              <span 
                key={i}
                className="text-sm font-light transition-colors cursor-pointer hover:text-white py-2"
                style={{ color: 'rgba(191, 199, 205, 0.8)' }}
              >
                {item}
              </span>
            ))}
            <button 
              className="mt-2 px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300 hover:bg-white hover:text-[#163b5f]"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(191, 199, 205, 0.3)',
                color: '#ffffff'
              }}
            >
              REQUEST MEMO
            </button>
          </div>
        </motion.div>

        {/* Main Title Section */}
        <motion.section
          className="absolute z-20 px-4 md:px-0"
          style={{
            top: '20%',
            left: '4%',
            right: '4%',
            maxWidth: '650px',
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="w-6 md:w-10 h-px" style={{ background: 'rgba(191, 199, 205, 0.5)' }} />
            <span className="text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase" style={{ color: 'rgba(191, 199, 205, 0.7)' }}>
              Diversified Investment Group
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-4 md:mb-6">
            Building
            <span className="block font-semibold mt-1 md:mt-2">Tomorrow's Success</span>
          </h1>
          
          {/* Description */}
          <p 
            className="text-sm md:text-lg font-light leading-relaxed mb-6 md:mb-10 max-w-md"
            style={{ color: 'rgba(191, 199, 205, 0.85)' }}
          >
            A world-class investment hub spanning Real Estate, Construction, and Advanced Technology across the UAE and beyond.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8">
            <button 
              className="group flex items-center gap-3 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-white/20"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <span className="text-xs md:text-sm tracking-wider text-white">Explore Ventures</span>
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
              <span className="text-xs md:text-sm tracking-wider">Investor Relations</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </a>
          </div>

          {/* Stats Row */}
          {/* <div 
            className="flex flex-wrap items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-8 md:mt-16 pt-6 md:pt-8"
            style={{ borderTop: '1px solid rgba(191, 199, 205, 0.1)' }}
          >
            {[
              { value: 'Real Estate', label: 'Leasing & Development' },
              { value: 'Construction', label: 'Building & Contracting' },
              { value: 'Technology', label: 'AI & IT Solutions' }
            ].map((stat, index) => (
              <div key={index} className="flex-shrink-0">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white block whitespace-nowrap">{stat.value}</span>
                <span className="text-[9px] sm:text-[10px] md:text-xs block whitespace-nowrap" style={{ color: 'rgba(191, 199, 205, 0.5)' }}>{stat.label}</span>
              </div>
            ))}
          </div> */}
        </motion.section>

        {/* Vertical Text - Right Side - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute bottom-[15%] right-[2%] z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span 
            className="text-vertical-lr text-xs tracking-[0.5em] uppercase"
            style={{ color: 'rgba(191, 199, 205, 0.3)' }}
          >
            Diversified Investment Solutions
          </span>
        </motion.div>

        {/* Large RSW Watermark - Hidden on mobile */}
        <motion.div
          className="hidden lg:block absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
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

        {/* Top Left Notch - Dynamic Stat - Repositioned on mobile */}
        <motion.div
          className="absolute z-30 flex items-center justify-center"
          style={{
            top: '1.2%',
            left: '1.2%',
          width: isMobile ? '20%' : '15%',

            height: '10%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="text-center">
            <span className="text-xl md:text-3xl font-light text-white">{slides[currentSlide].stat}</span>
            <span className="text-[9px] md:text-xs block mt-1" style={{ color: 'rgba(191, 199, 205, 0.5)' }}>{slides[currentSlide].statLabel}</span>
          </div>
        </motion.div>

        {/* Bottom Left - Slide Controls */}
        <motion.div
          className="absolute z-30 flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%]"
          style={{
            bottom: '4%',
            left: '4%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Arrow Controls */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              style={{
                background: 'rgba(191, 199, 205, 0.1)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              style={{
                background: 'rgba(191, 199, 205, 0.1)',
                border: '1px solid rgba(191, 199, 205, 0.2)'
              }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#BFC7CD' }} strokeWidth={1.5} />
            </button>
          </div>

          {/* Slide Counter */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <span className="text-lg md:text-2xl font-light text-white">0{currentSlide + 1}</span>
            <span style={{ color: 'rgba(191, 199, 205, 0.3)' }}>/</span>
            <span className="text-xs md:text-sm" style={{ color: 'rgba(191, 199, 205, 0.5)' }}>0{slides.length}</span>
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2">
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

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2"
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

        {/* Decorative Corner Lines - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute w-16 h-px z-20"
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
          className="hidden md:block absolute w-px h-16 z-20"
          style={{ 
            top: '22%', 
            left: '18%',
            background: 'linear-gradient(to bottom, rgba(191, 199, 205, 0.3), transparent)'
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        {/* Glassmorphism Floating Card - Bottom Right - Hidden on small mobile */}
        <motion.div
          className="hidden sm:block absolute z-30"
          style={{
            bottom: '20%',
            right: '4%',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div 
            className="p-4 md:p-5 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div 
                className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(191, 199, 205, 0.15)' }}
              >
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white font-medium">Investment Memo</p>
                <p className="text-[10px] md:text-xs" style={{ color: 'rgba(191, 199, 205, 0.6)' }}>Request Information</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}