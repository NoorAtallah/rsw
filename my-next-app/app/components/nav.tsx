'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Menu, X, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const pathname = usePathname()

  const purple = '#432c96'
  const white = '#ffffff'

  // Handle scroll & window width
  useEffect(() => {
    // Scroll listener
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    // Check desktop width
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768)
    checkWidth()
    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkWidth)
    }
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ventures', path: '/ventures' },
    { name: 'Investor Relations', path: '/investor-relations' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
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
      `}</style>

      <nav
        className="fixed z-50 top-4 md:top-6 flex items-center justify-between transition-all duration-500"
        style={{
          left: scrolled ? '50%' : '4%',
          right: scrolled ? 'auto' : '4%',
          transform: scrolled ? 'translateX(-50%)' : 'none',
          maxWidth: scrolled ? '1200px' : 'none',
          width: scrolled ? '90%' : 'auto',
          marginLeft: scrolled ? '0' : isDesktop ? '16%' : '0',
          background: scrolled ? `rgba(67, 44, 150, 0.9)` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          padding: scrolled ? '1rem 1.5rem' : '0',
          borderRadius: scrolled ? '1rem' : '0',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          boxShadow: scrolled ? '0 8px 32px 0 rgba(67, 44, 150, 0.3)' : 'none'
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3">
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
            <span 
              className="text-lg md:text-xl font-semibold text-white tracking-wide"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              RSW
            </span>
            <span 
              className="text-[8px] md:text-[10px] tracking-[0.2em] block text-white opacity-70"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              INVESTMENTS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item, i) => (
            <Link 
              key={i}
              href={item.path}
              className="text-sm font-light transition-all duration-300 cursor-pointer link-hover text-white hover:opacity-100"
              style={{ 
                opacity: pathname === item.path ? 1 : 0.85,
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop - Language Switcher & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'Space Mono, monospace'
            }}
          >
            <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
            <span className="text-xs font-medium text-white">EN</span>
            <span className="text-xs text-white opacity-50">|</span>
            <span className="text-xs font-medium text-white opacity-70">AR</span>
          </button>

          {/* CTA Button */}
          <button 
            className="px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300 hover:bg-white"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: white,
              fontFamily: 'Outfit, sans-serif'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = purple}
            onMouseLeave={(e) => e.currentTarget.style.color = white}
          >
            REQUEST DEMO
          </button>
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
          background: `rgba(67, 44, 150, 0.95)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(67, 44, 150, 0.3)'
        }}
      >
        <div className="flex flex-col p-6 gap-4">
          {navItems.map((item, i) => (
            <Link 
              key={i}
              href={item.path}
              className="text-sm font-light transition-colors cursor-pointer hover:opacity-100 py-2 text-white"
              style={{ 
                opacity: pathname === item.path ? 1 : 0.85,
                fontFamily: 'Outfit, sans-serif'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div 
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-full mt-2"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontFamily: 'Space Mono, monospace'
            }}
          >
            <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
            <span className="text-sm font-medium text-white">EN</span>
            <span className="text-sm text-white opacity-50">|</span>
            <span className="text-sm font-medium text-white opacity-70">AR</span>
          </div>

          <button 
            className="px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: white,
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            REQUEST DEMO
          </button>
        </div>
      </motion.div>
    </>
  )
}