'use client'

import { useState, useEffect } from 'react'
import { Building2, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed z-50 top-4 md:top-6 flex items-center justify-between transition-all duration-500"
        style={{
          left: scrolled ? '50%' : '4%',
          right: scrolled ? 'auto' : '4%',
          transform: scrolled ? 'translateX(-50%)' : 'none',
          maxWidth: scrolled ? '1200px' : 'none',
          width: scrolled ? '90%' : 'auto',
          marginLeft: scrolled ? '0' : window.innerWidth >= 768 ? '16%' : '0',
          background: scrolled ? 'rgba(22, 59, 95, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          padding: scrolled ? '1rem 1.5rem' : '0',
          borderRadius: scrolled ? '1rem' : '0',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          boxShadow: scrolled ? '0 8px 32px 0 rgba(0, 0, 0, 0.2)' : 'none'
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <div 
            className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center"
            style={{ 
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <Building2 className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <span className="text-lg md:text-xl font-semibold text-white tracking-wide">RSW</span>
            <span className="text-[8px] md:text-[10px] tracking-[0.2em] block text-white opacity-70">INVESTMENTS</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {['Home', 'About', 'Ventures', 'Investor Relations', 'Contact'].map((item, i) => (
            <a 
              key={i}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-light transition-all duration-300 cursor-pointer link-hover text-white hover:opacity-100"
              style={{ opacity: 0.85 }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-white" strokeWidth={1.5} />
          ) : (
            <Menu className="w-5 h-5 text-white" strokeWidth={1.5} />
          )}
        </button>

        {/* Desktop CTA */}
        <button 
          className="hidden lg:block px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300 hover:bg-white hover:text-[#163b5f]"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff'
          }}
        >
          REQUEST DEMO
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden fixed z-40 top-20 right-4 rounded-2xl overflow-hidden"
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
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="flex flex-col p-6 gap-4">
          {['Home', 'About', 'Ventures', 'Investor Relations', 'Contact'].map((item, i) => (
            <a 
              key={i}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-light transition-colors cursor-pointer hover:opacity-100 py-2 text-white"
              style={{ opacity: 0.85 }}
            >
              {item}
            </a>
          ))}
          <button 
            className="mt-2 px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300 hover:bg-white hover:text-[#163b5f]"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff'
            }}
          >
            REQUEST DEMO
          </button>
        </div>
      </motion.div>

      <style jsx global>{`
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
          background: #ffffff;
          transition: width 0.4s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  )
}