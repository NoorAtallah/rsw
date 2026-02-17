'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Send, Facebook, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'

const SocialPopup = () => {
  const { t, locale, direction } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const gold = '#a79370';
  const black = '#000000';
  const white = '#ffffff';

  useEffect(() => {
    // Check if user has opted to not see the popup again
    const dontShowAgain = localStorage.getItem('socialPopupDontShowAgain');
    
    if (dontShowAgain === 'true') {
      return;
    }
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    {
      icon: Send,
      platform: t('socialPopup.slides.telegram.platform'),
      link: "https://t.me/yourgroup",
      description: t('socialPopup.slides.telegram.description') || 'Join our community'
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('socialPopupSeen', 'true');
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('socialPopupDontShowAgain', 'true');
    setIsOpen(false);
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" dir={direction}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Tajawal:wght@400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
                
                [dir="ltr"] .popup-title {
                  font-family: 'Playfair Display', serif;
                }
                
                [dir="rtl"] .popup-title {
                  font-family: 'Tajawal', sans-serif;
                }
                
                [dir="ltr"] .popup-text {
                  font-family: 'Inter', sans-serif;
                }
                
                [dir="rtl"] .popup-text {
                  font-family: 'IBM Plex Sans Arabic', sans-serif;
                }
              `}</style>

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Gold accent border */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${gold}, transparent)` }} />
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className={`absolute top-6 ${locale === 'ar' ? 'left-6' : 'right-6'} w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 active:scale-95`}
                  style={{ 
                    background: 'rgba(167, 147, 112, 0.1)',
                    border: `1px solid rgba(167, 147, 112, 0.2)`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = gold
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(167, 147, 112, 0.1)'
                  }}
                >
                  <X className="w-5 h-5" style={{ color: gold }} strokeWidth={2} />
                </button>

                {/* Content */}
                <div className="p-10 pt-14">
                  {/* Decorative element */}
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-px" style={{ background: gold }} />
                      <div className="w-2 h-2 rounded-full" style={{ background: gold }} />
                      <div className="w-8 h-px" style={{ background: gold }} />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.h2 
                      className="popup-title text-3xl font-light mb-3"
                      style={{ color: black, letterSpacing: '-0.01em' }}
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                    >
                      {t('socialPopup.title') || (locale === 'ar' ? 'ابق على تواصل' : 'Stay Connected')}
                    </motion.h2>
                    <motion.p 
                      className="popup-text text-base font-light leading-relaxed"
                      style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                    >
                      {t('socialPopup.description') || (locale === 'ar' ? 'تابعنا للحصول على آخر التحديثات والعروض الحصرية' : 'Follow us for latest updates and exclusive offers')}
                    </motion.p>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4 mb-8">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 ${locale === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                        style={{ 
                          background: 'rgba(167, 147, 112, 0.05)',
                          border: `1px solid rgba(167, 147, 112, 0.2)`
                        }}
                        initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 8px 24px rgba(167, 147, 112, 0.15)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = gold
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.2)'
                        }}
                      >
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{ background: gold }}
                        >
                          {React.createElement(social.icon, {
                            className: "w-7 h-7",
                            style: { color: black },
                            strokeWidth: 1.5
                          })}
                        </div>
                        
                        <div className="flex-1">
                          <p className="popup-text text-lg font-semibold mb-0.5" style={{ color: black }}>
                            {social.platform}
                          </p>
                          <p className="popup-text text-sm font-light" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                            {social.description}
                          </p>
                        </div>

                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                          style={{ background: 'rgba(167, 147, 112, 0.1)' }}
                        >
                          <ArrowUpRight 
                            className="w-5 h-5" 
                            style={{ 
                              color: gold,
                              transform: locale === 'ar' ? 'scaleX(-1)' : 'none'
                            }}
                            strokeWidth={2}
                          />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Footer Buttons */}
                  <motion.div 
                    className="flex flex-col gap-3 pt-6"
                    style={{ borderTop: `1px solid rgba(167, 147, 112, 0.15)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <button
                      onClick={handleClose}
                      className="popup-text w-full text-center text-sm font-medium transition-all duration-300 py-3 rounded-xl"
                      style={{ 
                        color: black,
                        background: 'rgba(167, 147, 112, 0.08)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(167, 147, 112, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(167, 147, 112, 0.08)'
                      }}
                    >
                      {t('socialPopup.maybeLater') || (locale === 'ar' ? 'ربما لاحقاً' : 'Maybe Later')}
                    </button>
                    
                    <button
                      onClick={handleDontShowAgain}
                      className="popup-text w-full text-center text-xs font-medium transition-colors duration-300 py-2"
                      style={{ color: 'rgba(0, 0, 0, 0.4)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {t('socialPopup.dontShowAgain') || (locale === 'ar' ? 'لا تظهر مرة أخرى' : "Don't show again")}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SocialPopup;