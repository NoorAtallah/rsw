'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

export default function RSWHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { locale, direction, t } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const purple = '#432c96'
  const white = '#ffffff'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Cairo, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'Cairo, sans-serif' : 'Space Mono, monospace'

  return (
    <div className="min-h-screen h-screen relative w-full" style={{ background: purple, overflow: 'hidden' }}>
      
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

      {/* Ambient white glows */}
      <div 
        className="absolute top-1/4 w-[250px] h-[250px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] md:blur-[200px] pointer-events-none opacity-20 md:opacity-25 z-[1]"
        style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          [isRTL ? 'left' : 'right']: '0'
        }}
      />
      
      <div 
        className="absolute bottom-0 w-[200px] h-[200px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] pointer-events-none opacity-15 z-[1]"
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
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
              <div className="w-6 md:w-10 h-px" style={{ background: 'rgba(255, 255, 255, 0.5)' }} />
              <span 
                className={`text-[9px] md:text-xs uppercase ${locale === 'ar' ? '' : 'tracking-[0.3em] md:tracking-[0.4em]'}`}
                style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: monoFont }}
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
              <span className="block font-bold mt-1 md:mt-2 stat-glow" style={{ color: white }}>
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
              <button 
                className="group flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-2xl hover:scale-105"
                style={{
                  background: white,
                  color: purple,
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
              
              <button 
                className="group flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-lg transition-all duration-300 hover:bg-white hover:text-[#432c96] hover:shadow-xl glass-bg-purple glass-border-purple"
                style={{ fontFamily, fontWeight: 500, color: white }}
              >
                <span className="text-sm tracking-wide">{t('hero.cta.investor')}</span>
                <ArrowUpRight 
                  className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                  strokeWidth={2}
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                />
              </button>
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
              color: 'rgba(255, 255, 255, 0.3)', 
              fontFamily: monoFont,
              fontSize: '0.75rem',
              letterSpacing: locale === 'ar' ? 'normal' : '0.5em',
              textTransform: locale === 'ar' ? 'none' : 'uppercase'
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
            style={{ color: white, fontFamily }}
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
            className={`text-[10px] uppercase ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`}
            style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: monoFont }}
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
              ? 'linear-gradient(to left, rgba(255, 255, 255, 0.3), transparent)'
              : 'linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent)'
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
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)'
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        />

        {/* CTA Card - Bottom */}
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
          <div className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl glass-bg-purple glass-border-purple">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                <ArrowUpRight 
                  className="w-5 h-5 text-white" 
                  strokeWidth={2}
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: white, fontFamily }}>
                  {t('hero.ctaCard.title')}
                </p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: monoFont }}>
                  {t('hero.ctaCard.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}