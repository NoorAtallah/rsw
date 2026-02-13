'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Cpu, HardHat, Shield, Award, Users, Globe, ArrowUpRight, Sparkles } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

const divisionIcons = [Building2, Cpu, HardHat, Shield]
const tabIcons = [Building2, Award, Users]
const divisionColors = ['#432c96', '#5a3fb8', '#7856d9', '#8b6fd9']

const RSWAboutSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { locale, direction, t } = useI18n()

  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Cairo, sans-serif' : "'Playfair Display', serif"
  const bodyFont = locale === 'ar' ? 'Cairo, sans-serif' : "'Inter', sans-serif"

  // Access translated data
  const tabs = (t as any)('about.tabs') 
  const divisions = (t as any)('about.divisions')
  const badges = (t as any)('about.badges')

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: '#ffffff' }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Cairo:wght@200;300;400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#432c96' }} />
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: 'rgba(67, 44, 150, 0.6)', fontFamily: bodyFont }}
            >
              {t('about.eyebrow')}
            </span>
            <Sparkles className="w-4 h-4" style={{ color: '#432c96' }} />
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl leading-tight mb-4 font-bold"
            style={{ color: '#432c96', fontFamily, letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('about.title')}
          </motion.h2>

          <motion.p
            className="text-sm max-w-2xl mx-auto"
            style={{ color: 'rgba(67, 44, 150, 0.6)', fontFamily: bodyFont }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab: any, index: number) => {
            const Icon = tabIcons[index]
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 text-xs font-medium"
                style={{
                  background: activeTab === index ? '#432c96' : 'rgba(67, 44, 150, 0.05)',
                  color: activeTab === index ? '#ffffff' : '#432c96',
                  border: activeTab === index ? 'none' : '1px solid rgba(67, 44, 150, 0.15)',
                  fontFamily: bodyFont,
                }}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div
            className="p-8 rounded-2xl"
            style={{
              background: 'rgba(67, 44, 150, 0.03)',
              border: '1px solid rgba(67, 44, 150, 0.1)',
            }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3
                  className="text-2xl lg:text-3xl mb-4 font-bold"
                  style={{ color: '#432c96', fontFamily, letterSpacing: '-0.02em' }}
                >
                  {tabs[activeTab].title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(67, 44, 150, 0.7)', fontFamily: bodyFont }}
                >
                  {tabs[activeTab].content}
                </p>
              </div>

              <div className="flex lg:flex-col gap-6 justify-center">
                {tabs[activeTab].stats.map((stat: any, i: number) => (
                  <div key={i} className="text-center lg:text-start">
                    <div className="text-3xl mb-1 font-bold" style={{ color: '#432c96', fontFamily, letterSpacing: '-0.02em' }}>
                      {stat.value}
                    </div>
                    <div className="text-[10px]" style={{ color: 'rgba(67, 44, 150, 0.5)', fontFamily: bodyFont }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Four Divisions Grid */}
        <div className="mb-16">
          <h3
            className="text-2xl text-center mb-8 font-bold"
            style={{ color: '#432c96', fontFamily, letterSpacing: '-0.02em' }}
          >
            {t('about.divisionsTitle')}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {divisions.map((division: any, index: number) => {
              const Icon = divisionIcons[index]
              return (
                <motion.div
                  key={index}
                  className="group p-6 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(67, 44, 150, 0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: 'rgba(67, 44, 150, 0.08)' }}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-300 group-hover:scale-110"
                        style={{ color: divisionColors[index] }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-base font-semibold mb-1"
                        style={{ color: '#432c96', fontFamily: bodyFont }}
                      >
                        {division.title}
                      </h4>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: 'rgba(67, 44, 150, 0.6)', fontFamily: bodyFont }}
                      >
                        {division.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: '#432c96', transform: isRTL ? 'scaleX(-1)' : 'none' }}
                      strokeWidth={2}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center p-8 rounded-2xl"
          style={{ background: '#432c96' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Globe className="w-10 h-10 text-white mx-auto mb-4" />

          <h3 className="text-2xl lg:text-3xl text-white mb-3 font-bold" style={{ fontFamily, letterSpacing: '-0.02em' }}>
            {t('about.cta.title')}
          </h3>

          <p className="text-sm text-white/80 mb-6 max-w-xl mx-auto" style={{ fontFamily: bodyFont }}>
            {t('about.cta.description')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl"
              style={{ background: '#ffffff', color: '#432c96' }}
            >
              <span className="text-xs font-semibold" style={{ fontFamily: bodyFont }}>
                {t('about.cta.primary')}
              </span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            </button>

            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <span className="text-xs font-semibold" style={{ fontFamily: bodyFont }}>
                {t('about.cta.secondary')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Compliance Badges */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {badges.map((badge: string, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#432c96' }} strokeWidth={1.5} />
                <span className="text-xs font-medium" style={{ color: 'rgba(67, 44, 150, 0.7)', fontFamily: bodyFont }}>
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