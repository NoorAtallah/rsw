'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import Link from 'next/link'

export default function RSWHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { locale, direction, t } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const gold = '#a79370'
  const white = '#ffffff'
  const black = '#000000'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Cairo, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'Cairo, sans-serif' : 'Space Mono, monospace'

  return (
    <div className="min-h-screen h-screen relative w-full" style={{ background: black, overflow: 'hidden' }}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Cairo:wght@200;300;400;500;600;700&display=swap');
        
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .text-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .text-vertical-lr {
          writing-mode: vertical-lr;
          text-orientation: mixed;
        }
        .text-vertical-ar {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .hero-video-overlay {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
        }
        .hero-video-overlay-vignette {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }
        .stat-glow {
          text-shadow: 0 0 40px rgba(167, 147, 112, 0.5), 0 0 80px rgba(167, 147, 112, 0.3);
        }
        .glass-border-gold {
          border: 1px solid rgba(167, 147, 112, 0.4);
        }
        .glass-bg-gold {
          background: rgba(167, 147, 112, 0.1);
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
        
        <div className="hero-video-overlay absolute inset-0" />
        <div className="hero-video-overlay-vignette absolute inset-0" />
        
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Ambient gold glows */}
      <div 
        className="absolute top-1/4 w-[250px] h-[250px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[200px] pointer-events-none opacity-10 md:opacity-15 z-[1]"
        style={{ 
          background: `rgba(167, 147, 112, 0.2)`,
          [isRTL ? 'left' : 'right']: '0'
        }}
      />
      
      <div 
        className="absolute bottom-0 w-[200px] h-[200px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] pointer-events-none opacity-10 z-[1]"
        style={{ 
          background: `rgba(167, 147, 112, 0.15)`,
          [isRTL ? 'right' : 'left']: '0'
        }}
      />

      {/* Main Container */}
      <div className="relative h-full z-10 w-full overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Main Title Section */}
        <motion.section
          className="absolute z-20 w-full px-4 md:px-8"
          style={{
            top: '22%',
            insetInlineStart: '0',
            insetInlineEnd: '0',
            maxWidth: '100%',
          }}
          initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : (isRTL ? 30 : -30) }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="w-6 md:w-10 h-px" style={{ background: gold }} />
              <span 
                className={`text-[9px] md:text-xs uppercase ${locale === 'ar' ? '' : 'tracking-[0.3em] md:tracking-[0.4em]'}`}
                style={{ color: gold, fontFamily: monoFont }}
              >
                {t('hero.eyebrow')}
              </span>
            </div>

            {/* Main Title */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-4 md:mb-6"
              style={{ color: white, fontFamily }}
            >
              {t('hero.title.line1')}
              <span className="block font-bold mt-1 md:mt-2 stat-glow" style={{ color: gold }}>
                {t('hero.title.line2')}
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-xl"
              style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily }}
            >
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
              {/* Explore Ventures → /ventures */}
              <Link href="/ventures">
                <button 
                  className="group flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-2xl hover:scale-105"
                  style={{
                    background: gold,
                    color: black,
                    fontFamily,
                    fontWeight: 500,
                  }}
                >
                  <span className="text-sm tracking-wide">{t('hero.cta.explore')}</span>
                  <ArrowUpRight 
                    className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                    strokeWidth={2}
                    style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                  />
                </button>
              </Link>
              
              {/* Investor Relations → /investor-relations */}
              <Link href="/investor-relations">
                <button 
                  className="group flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-lg transition-all duration-300 glass-bg-gold glass-border-gold"
                  style={{ fontFamily, fontWeight: 500, color: white }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = white
                    e.currentTarget.style.color = black
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(167, 147, 112, 0.1)'
                    e.currentTarget.style.color = white
                  }}
                >
                  <span className="text-sm tracking-wide">{t('hero.cta.investor')}</span>
                  <ArrowUpRight 
                    className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                    strokeWidth={2}
                    style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                  />
                </button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Vertical Text */}
        <motion.div
          className="hidden md:block absolute bottom-[15%] z-20"
          style={{ [isRTL ? 'left' : 'right']: '2%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span 
            className={locale === 'ar' ? 'text-vertical-ar' : 'text-vertical-lr'}
            style={{ 
              color: gold, 
              fontFamily: monoFont,
              fontSize: '0.75rem',
              letterSpacing: locale === 'ar' ? 'normal' : '0.5em',
              textTransform: locale === 'ar' ? 'none' : 'uppercase',
              opacity: 0.6
            }}
          >
            {t('hero.verticalText')}
          </span>
        </motion.div>

        {/* Large RSW Watermark - Desktop only */}
        <motion.div
          className="hidden xl:block absolute top-1/2 -translate-y-1/2 z-[5] pointer-events-none"
          style={{ [isRTL ? 'left' : 'right']: '8%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.03 : 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        >
          <span 
            className="text-[280px] font-bold tracking-wider leading-none"
            style={{ color: gold, fontFamily }}
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
            style={{ background: `linear-gradient(to bottom, ${gold}, transparent)` }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span 
            className={`text-[10px] uppercase ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`}
            style={{ color: gold, fontFamily: monoFont, opacity: 0.8 }}
          >
            {t('hero.scroll')}
          </span>
        </motion.div>

        {/* Decorative Corner Lines - Desktop only */}
        <motion.div
          className="hidden lg:block absolute w-20 h-px z-20"
          style={{ 
            top: '24%', 
            [isRTL ? 'right' : 'left']: '20%',
            background: isRTL 
              ? `linear-gradient(to left, ${gold}, transparent)`
              : `linear-gradient(to right, ${gold}, transparent)`
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        
        <motion.div
          className="hidden lg:block absolute w-px h-20 z-20"
          style={{ 
            top: '24%', 
            [isRTL ? 'right' : 'left']: '20%',
            background: `linear-gradient(to bottom, ${gold}, transparent)`
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        />

        {/* CTA Card - Bottom right → /contact */}
        <motion.div
          className="hidden lg:block absolute z-30"
          style={{
            bottom: '20%',
            [isRTL ? 'left' : 'right']: '4%',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link href="/contact">
            <div
              className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl glass-bg-gold glass-border-gold"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(167, 147, 112, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(167, 147, 112, 0.1)'
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: gold }}
                >
                  <ArrowUpRight 
                    className="w-5 h-5" 
                    strokeWidth={2}
                    style={{ 
                      color: black,
                      transform: isRTL ? 'scaleX(-1)' : 'none' 
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: white, fontFamily }}>
                    {t('hero.ctaCard.title')}
                  </p>
                  <p className="text-xs" style={{ color: gold, fontFamily: monoFont }}>
                    {t('hero.ctaCard.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}