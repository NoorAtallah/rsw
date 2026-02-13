'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Menu, X, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { locale, direction, switchLanguage, t } = useI18n()

  const purple = '#432c96'
  const white = '#ffffff'
  const isRTL = direction === 'rtl'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.ventures'), path: '/ventures' },
    { name: t('nav.investorRelations'), path: '/investor-relations' },
    { name: t('nav.contact'), path: '/contact' },
  ]

  const fontFamily = locale === 'ar' ? 'Cairo, sans-serif' : 'Outfit, sans-serif'
  const monoFont = 'Space Mono, monospace'

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Cairo:wght@200;300;400;500;600;700&display=swap');
        
        .link-hover {
          position: relative;
        }
        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          ${isRTL ? 'right: 0;' : 'left: 0;'}
          width: 0;
          height: 1px;
          background: ${white};
          transition: width 0.4s ease;
        }
        .link-hover:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Outer wrapper - handles positioning only */}
      <div
        className="fixed z-50 top-4 md:top-6 transition-all duration-500"
        style={{
          left: scrolled ? '50%' : '5%',
          right: scrolled ? 'auto' : '5%',
          transform: scrolled ? 'translateX(-50%)' : 'none',
          maxWidth: scrolled ? '1200px' : 'none',
          width: scrolled ? '90%' : 'auto',
        }}
      >
        <nav
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex items-center justify-between gap-6 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(67, 44, 150, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            padding: scrolled ? '0.75rem 1.5rem' : '0',
            borderRadius: scrolled ? '1rem' : '0',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            boxShadow: scrolled ? '0 8px 32px 0 rgba(67, 44, 150, 0.3)' : 'none',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0">
            <div
              className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <span
                className="text-lg md:text-xl font-semibold text-white tracking-wide"
                style={{ fontFamily }}
              >
                RSW
              </span>
              <span
                className="text-[8px] md:text-[10px] tracking-[0.2em] block text-white opacity-70"
                style={{ fontFamily: locale === 'ar' ? 'Cairo, sans-serif' : monoFont }}
              >
                {t('nav.investments')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 lg:gap-10">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="text-sm font-light transition-all duration-300 cursor-pointer link-hover text-white hover:opacity-100 whitespace-nowrap"
                style={{
                  opacity: pathname === item.path ? 1 : 0.85,
                  fontFamily,
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop - Language Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0" style={{ direction: 'ltr' }}>
            {/* Language Switcher */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: monoFont,
              }}
            >
              <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
              <button
                onClick={() => switchLanguage('en')}
                className={`text-xs font-medium transition-opacity duration-300 ${
                  locale === 'en' ? 'text-white' : 'text-white opacity-50 hover:opacity-70'
                }`}
              >
                EN
              </button>
              <span className="text-xs text-white opacity-50">|</span>
              <button
                onClick={() => switchLanguage('ar')}
                className={`text-xs font-medium transition-opacity duration-300 ${
                  locale === 'ar' ? 'text-white' : 'text-white opacity-50 hover:opacity-70'
                }`}
              >
                AR
              </button>
            </div>

            {/* CTA Button */}
            <button
              className="px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300 hover:bg-white"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: white,
                fontFamily,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = purple)}
              onMouseLeave={(e) => (e.currentTarget.style.color = white)}
            >
              {t('nav.requestDemo')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
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
      </div>

      {/* Mobile Menu */}
      <motion.div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="lg:hidden fixed z-40 top-20 rounded-2xl overflow-hidden"
        style={{
          ...(isRTL ? { right: '1rem' } : { right: '1rem' }),
          background: 'rgba(67, 44, 150, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(67, 44, 150, 0.3)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col p-6 gap-4">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className="text-sm font-light transition-colors cursor-pointer hover:opacity-100 py-2 text-white"
              style={{
                opacity: pathname === item.path ? 1 : 0.85,
                fontFamily,
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
              fontFamily: monoFont,
              direction: 'ltr',
            }}
          >
            <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
            <button
              onClick={() => switchLanguage('en')}
              className={`text-sm font-medium transition-opacity duration-300 ${
                locale === 'en' ? 'text-white' : 'text-white opacity-50'
              }`}
            >
              EN
            </button>
            <span className="text-sm text-white opacity-50">|</span>
            <button
              onClick={() => switchLanguage('ar')}
              className={`text-sm font-medium transition-opacity duration-300 ${
                locale === 'ar' ? 'text-white' : 'text-white opacity-50'
              }`}
            >
              AR
            </button>
          </div>

          <button
            className="px-6 py-3 rounded-full text-xs tracking-wider font-medium transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: white,
              fontFamily,
            }}
          >
            {t('nav.requestDemo')}
          </button>
        </div>
      </motion.div>
    </>
  )
}