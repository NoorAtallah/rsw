'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Send, Facebook, Heart, Star, TrendingUp } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'

const SocialPopup = () => {
  const { t, locale, direction } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    console.log('SocialPopup mounted');
    
    // Check if user has opted to not see the popup again
    const dontShowAgain = localStorage.getItem('socialPopupDontShowAgain');
    
    if (dontShowAgain === 'true') {
      console.log('User opted out of popup');
      return;
    }
    
    const timer = setTimeout(() => {
      console.log('Timer triggered');
      setIsOpen(true);
      console.log('Opening popup');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      icon: Send,
      platform: t('socialPopup.slides.telegram.platform'),
      title: t('socialPopup.slides.telegram.title'),
      subtitle: t('socialPopup.slides.telegram.subtitle'),
      description: t('socialPopup.slides.telegram.description'),
      gradient: "linear-gradient(180deg, #0088cc 0%, #005f8a 100%)",
      accentGradient: "linear-gradient(135deg, #00a0e9 0%, #0088cc 100%)",
      link: "https://t.me/yourgroup",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      stats: { 
        icon: TrendingUp, 
        value: t('socialPopup.slides.telegram.stats.value'), 
        label: t('socialPopup.slides.telegram.stats.label')
      }
    },
    {
      icon: Instagram,
      platform: t('socialPopup.slides.instagram.platform'),
      title: t('socialPopup.slides.instagram.title'),
      subtitle: t('socialPopup.slides.instagram.subtitle'),
      description: t('socialPopup.slides.instagram.description'),
      gradient: "linear-gradient(180deg, #E1306C 0%, #C13584 100%)",
      accentGradient: "linear-gradient(135deg, #fd1d1d 0%, #833ab4 100%)",
      link: "https://instagram.com/yourpage",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
      stats: { 
        icon: Heart, 
        value: t('socialPopup.slides.instagram.stats.value'), 
        label: t('socialPopup.slides.instagram.stats.label')
      }
    },
    {
      icon: Facebook,
      platform: t('socialPopup.slides.facebook.platform'),
      title: t('socialPopup.slides.facebook.title'),
      subtitle: t('socialPopup.slides.facebook.subtitle'),
      description: t('socialPopup.slides.facebook.description'),
      gradient: "linear-gradient(180deg, #1877f2 0%, #0e5dc1 100%)",
      accentGradient: "linear-gradient(135deg, #42a5f5 0%, #1877f2 100%)",
      link: "https://facebook.com/yourpage",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      stats: { 
        icon: Star, 
        value: t('socialPopup.slides.facebook.stats.value'), 
        label: t('socialPopup.slides.facebook.stats.label')
      }
    }
  ];

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('socialPopupSeen', 'true');
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('socialPopupDontShowAgain', 'true');
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
            onClick={handleClose}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" dir={direction}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-sm pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;600;700;800;900&display=swap');
                
                [dir="ltr"] .story-text {
                  font-family: 'Poppins', sans-serif;
                }
                
                [dir="rtl"] .story-text {
                  font-family: 'Tajawal', sans-serif;
                }
              `}</style>

              {/* Story Progress Bars */}
              <div className="flex gap-2 mb-4 px-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 flex-1 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255, 255, 255, 0.25)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: '#ffffff' }}
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: index < currentSlide ? '100%' : index === currentSlide ? '100%' : '0%' 
                      }}
                      transition={{ 
                        duration: index === currentSlide ? 6 : 0.3,
                        ease: 'linear'
                      }}
                      onAnimationComplete={() => {
                        if (index === currentSlide && index < slides.length) {
                          handleNext();
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Main Story Card */}
              <div 
                className="relative rounded-[32px] overflow-hidden shadow-2xl"
                style={{ aspectRatio: '9/16', maxHeight: '680px' }}
              >
                {/* Background Image with Overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].platform}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ background: slides[currentSlide].gradient, mixBlendMode: 'multiply', opacity: 0.85 }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)' }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Tap Navigation Areas */}
                <div className="absolute inset-0 flex z-10">
                  <div 
                    className="w-1/3 h-full cursor-pointer active:bg-white/5"
                    onClick={locale === 'ar' ? handleNext : handlePrevious}
                  />
                  <div className="w-1/3 h-full" />
                  <div 
                    className="w-1/3 h-full cursor-pointer active:bg-white/5"
                    onClick={locale === 'ar' ? handlePrevious : handleNext}
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className={`absolute top-6 ${locale === 'ar' ? 'left-6' : 'right-6'} w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 active:scale-95`}
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                </button>

                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute inset-0 flex flex-col justify-between p-8 z-10"
                  >
                    {/* Top - Platform Badge */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: 'spring', delay: 0.2 }}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        {React.createElement(slides[currentSlide].icon, {
                          className: "w-7 h-7",
                          style: { color: slides[currentSlide].gradient.match(/#[A-Fa-f0-9]{6}/) ?.[0] ?? '#000000' },
                          strokeWidth: 2
                        })}
                      </motion.div>
                      
                      <div>
                        <p className="story-text text-white text-sm font-bold tracking-wide">
                          {slides[currentSlide].platform}
                        </p>
                        <p className="story-text text-white/80 text-xs font-medium">
                          {t('socialPopup.official')}
                        </p>
                      </div>
                    </div>

                    {/* Center - Main Content */}
                    <div className="text-center space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
                      >
                        {React.createElement(slides[currentSlide].stats.icon, {
                          className: "w-16 h-16 mx-auto mb-4 text-white",
                          strokeWidth: 1.5
                        })}
                      </motion.div>

                      <h2 className="story-text text-4xl lg:text-5xl font-black text-white leading-tight">
                        {slides[currentSlide].title}
                      </h2>

                      <p className="story-text text-lg font-semibold text-white/90">
                        {slides[currentSlide].subtitle}
                      </p>

                      <p className="story-text text-sm text-white/75 leading-relaxed max-w-xs mx-auto">
                        {slides[currentSlide].description}
                      </p>

                      {/* Stats Badge */}
                      <motion.div 
                        className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mx-auto"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="text-center">
                          <p className="story-text text-2xl font-black text-white">
                            {slides[currentSlide].stats.value}
                          </p>
                          <p className="story-text text-[10px] font-semibold text-white/70">
                            {slides[currentSlide].stats.label}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom - CTA & Dots */}
                    <div className="space-y-3">
                      <motion.a
                        href={slides[currentSlide].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 rounded-2xl shadow-2xl transition-all duration-300 active:scale-95"
                        style={{
                          background: '#ffffff',
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="story-text text-center text-base font-black tracking-wide" 
                           style={{ color: slides[currentSlide].gradient.match(/#[A-Fa-f0-9]{6}/) ?.[0] ?? '#000000' }}>
                          {t('socialPopup.cta').replace('{platform}', slides[currentSlide].platform)}
                        </p>
                      </motion.a>

                      {/* Dots moved here - below button */}
                      <div className="flex justify-center gap-2 py-2">
                        {slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className="transition-all duration-300"
                            style={{
                              width: index === currentSlide ? '24px' : '8px',
                              height: '8px',
                              borderRadius: '4px',
                              background: index === currentSlide 
                                ? 'rgba(255, 255, 255, 0.9)' 
                                : 'rgba(255, 255, 255, 0.3)',
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={handleClose}
                          className="story-text w-full text-center text-sm font-semibold text-white/70 hover:text-white transition-colors"
                        >
                          {t('socialPopup.maybeLater')}
                        </button>
                        
                        <button
                          onClick={handleDontShowAgain}
                          className="story-text w-full text-center text-xs font-medium text-white/50 hover:text-white/70 transition-colors"
                        >
                          {t('socialPopup.dontShowAgain')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Hint Text */}
              <motion.p 
                className="story-text text-center text-xs text-white/60 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {t('socialPopup.hint')}
              </motion.p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SocialPopup;