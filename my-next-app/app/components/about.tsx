'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Cpu, HardHat, Shield, Award, Users, Globe, ArrowUpRight, Sparkles } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

const divisionIcons = [Building2, Cpu, HardHat, Shield]
const tabIcons = [Building2, Award, Users]
const divisionColors = ['#a79370', '#b8a482', '#c9b594', '#dac6a6']

// Unsplash images for each tab's content area
const tabContentImages = [
  'https://img.freepik.com/free-photo/skyscrapers-view_1112-268.jpg?semt=ais_user_personalization&w=740&q=80',
  'https://media.istockphoto.com/id/612818592/photo/abstract-modern-building.jpg?s=612x612&w=0&k=20&c=2gP7s3ZmC4yFokFwvxgJgC4Gru_cokDUXH0-YOiSYo0=',
  'https://images.stockcake.com/public/5/0/b/50bd2b3d-68f5-4234-927e-4936b8554f78/sunset-boardroom-view-stockcake.jpg',
]

const RSWAboutSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { locale, direction, t } = useI18n()

  const gold = '#a79370'
  const black = '#000000'
  const white = '#ffffff'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Cairo, sans-serif' : "'Playfair Display', serif"
  const bodyFont = locale === 'ar' ? 'Cairo, sans-serif' : "'Inter', sans-serif"

  const tabs = (t as any)('about.tabs')
  const divisions = (t as any)('about.divisions')
  const badges = (t as any)('about.badges')

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: white }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Cairo:wght@200;300;400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Tab Navigation — clean pill style */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab: any, index: number) => {
            const Icon = tabIcons[index]
            const isActive = activeTab === index
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 text-xs font-medium"
                style={{
                  background: isActive ? gold : `rgba(167, 147, 112, 0.05)`,
                  color: isActive ? white : gold,
                  border: isActive ? 'none' : `1px solid rgba(167, 147, 112, 0.25)`,
                  fontFamily: bodyFont,
                }}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content — image + text side by side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-16"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(167, 147, 112, 0.03)',
                border: `1px solid rgba(167, 147, 112, 0.15)`,
              }}
            >
              <div className={`flex flex-col lg:flex-row ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

                {/* Image Side */}
                <div className="relative w-full lg:w-[220px] h-44 lg:h-auto flex-shrink-0 overflow-hidden">
                  <motion.img
                    key={tabContentImages[activeTab]}
                    src={tabContentImages[activeTab]}
                    alt=""
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                  />
                  {/* Subtle brand overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(167, 147, 112, 0.3) 0%, rgba(167, 147, 112, 0.05) 100%)`,
                    }}
                  />
                </div>

                {/* Text Side */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                  <h3
                    className="text-2xl lg:text-3xl mb-3 font-bold"
                    style={{ color: black, fontFamily, letterSpacing: '-0.02em' }}
                  >
                    {tabs[activeTab].title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(0, 0, 0, 0.7)', fontFamily: bodyFont }}
                  >
                    {tabs[activeTab].content}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="text-center p-8 rounded-2xl"
          style={{ background: black }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Globe className="w-10 h-10 mx-auto mb-4" style={{ color: gold }} />

          <h3 
            className="text-2xl lg:text-3xl mb-3 font-bold" 
            style={{ color: white, fontFamily, letterSpacing: '-0.02em' }}
          >
            {t('about.cta.title')}
          </h3>

          <p 
            className="text-sm mb-6 max-w-xl mx-auto" 
            style={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: bodyFont }}
          >
            {t('about.cta.description')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              style={{ background: gold, color: black }}
            >
              <span className="text-xs font-semibold" style={{ fontFamily: bodyFont }}>
                {t('about.cta.primary')}
              </span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            </button>

            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-black"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: white,
                border: `1px solid ${gold}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = white
                e.currentTarget.style.color = black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = white
              }}
            >
              <span className="text-xs font-semibold" style={{ fontFamily: bodyFont }}>
                {t('about.cta.secondary')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Compliance Badges */}
        <div className="mt-12 pt-8" style={{ borderTop: `1px solid rgba(167, 147, 112, 0.15)` }}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {badges.map((badge: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
                <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.7)', fontFamily: bodyFont }}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RSWAboutSection