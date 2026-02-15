'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Send, Facebook } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'

const SocialPopup = () => {
  const { t, locale, direction } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

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
      color: "#0088cc"
    },
    {
      icon: Instagram,
      platform: t('socialPopup.slides.instagram.platform'),
      link: "https://instagram.com/yourpage",
      color: "#E1306C"
    },
    {
      icon: Facebook,
      platform: t('socialPopup.slides.facebook.platform'),
      link: "https://facebook.com/yourpage",
      color: "#1877f2"
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" dir={direction}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Tajawal:wght@400;500;600;700&display=swap');
                
                [dir="ltr"] .popup-text {
                  font-family: 'Poppins', sans-serif;
                }
                
                [dir="rtl"] .popup-text {
                  font-family: 'Tajawal', sans-serif;
                }
              `}</style>

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'} w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10 transition-all duration-200 hover:scale-110 active:scale-95`}
                >
                  <X className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                </button>

                {/* Content */}
                <div className="p-8 pt-12">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.h2 
                      className="popup-text text-2xl font-bold text-gray-900 mb-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {t('socialPopup.title') || 'Stay Connected'}
                    </motion.h2>
                    <motion.p 
                      className="popup-text text-sm text-gray-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t('socialPopup.description') || 'Follow us on social media for updates'}
                    </motion.p>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3 mb-6">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.platform}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-200 group"
                        initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: `${social.color}15` }}
                        >
                          {React.createElement(social.icon, {
                            className: "w-6 h-6",
                            style: { color: social.color },
                            strokeWidth: 2
                          })}
                        </div>
                        
                        <div className="flex-1">
                          <p className="popup-text text-base font-semibold text-gray-900">
                            {social.platform}
                          </p>
                          <p className="popup-text text-xs text-gray-500">
                            {t('socialPopup.followUs') || 'Follow us'}
                          </p>
                        </div>

                        <div 
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200`}
                          style={{ backgroundColor: `${social.color}10` }}
                        >
                          <svg 
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
                            style={{ color: social.color }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2.5} 
                              d={locale === 'ar' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} 
                            />
                          </svg>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Footer Buttons */}
                  <motion.div 
                    className="flex flex-col gap-2 pt-4 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      onClick={handleClose}
                      className="popup-text w-full text-center text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors py-2"
                    >
                      {t('socialPopup.maybeLater') || 'Maybe Later'}
                    </button>
                    
                    <button
                      onClick={handleDontShowAgain}
                      className="popup-text w-full text-center text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors py-1"
                    >
                      {t('socialPopup.dontShowAgain') || "Don't show again"}
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