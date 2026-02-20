'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, CheckCircle, HardHat, Zap, Wrench, Paintbrush, Flame, Settings } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import Link from 'next/link'

export default function InfrastructurePage() {
  const { locale, direction } = useI18n()
  const [activeService, setActiveService] = useState<number | null>(null)

  const gold = '#a79370'
  const white = '#ffffff'
  const black = '#000000'
  const light = '#f8f6f3'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'

  const stats = [
    { value: locale === 'ar' ? 'بري وبحري' : 'Onshore & Offshore', label: locale === 'ar' ? 'نطاق العمليات' : 'Operations Scope' },
    { value: locale === 'ar' ? 'نفط + إنشاءات' : 'Oil & Construction', label: locale === 'ar' ? 'القطاعات' : 'Key Sectors' },
    { value: 'UAE', label: locale === 'ar' ? 'مرخّص' : 'Licensed & Regulated' },
    { value: locale === 'ar' ? 'تسليم متكامل' : 'Full Delivery', label: locale === 'ar' ? 'نهج المشاريع' : 'Project Approach' },
  ]

  const services = [
    {
      id: 1,
      icon: Flame,
      title: locale === 'ar' ? 'خدمات النفط والغاز' : 'Oil & Gas Services',
      description: locale === 'ar'
        ? 'خدمات متكاملة للحقول البرية والبحرية، من الصيانة إلى تشغيل المنشآت.'
        : 'End-to-end services for onshore and offshore oil & gas fields, from maintenance to facility operations.',
    },
    {
      id: 2,
      icon: HardHat,
      title: locale === 'ar' ? 'مقاولات البناء' : 'Building Contracting',
      description: locale === 'ar'
        ? 'تنفيذ مشاريع البناء من الصفر وفق أعلى معايير الجودة والسلامة.'
        : 'Executing building projects from the ground up to the highest standards of quality and safety.',
    },
    {
      id: 3,
      icon: Wrench,
      title: locale === 'ar' ? 'المقاولات الميكانيكية' : 'Mechanical Contracting',
      description: locale === 'ar'
        ? 'أنظمة ميكانيكية متقدمة للمشاريع الصناعية والتجارية والسكنية.'
        : 'Advanced mechanical systems for industrial, commercial, and residential projects.',
    },
    {
      id: 4,
      icon: Zap,
      title: locale === 'ar' ? 'المقاولات الكهربائية' : 'Electrical Contracting',
      description: locale === 'ar'
        ? 'تصميم وتنفيذ وصيانة الأنظمة الكهربائية لجميع أنواع المشاريع.'
        : 'Design, installation, and maintenance of electrical systems across all project types.',
    },
    {
      id: 5,
      icon: Paintbrush,
      title: locale === 'ar' ? 'التصميم الداخلي' : 'Interior Design & Fit-Out',
      description: locale === 'ar'
        ? 'تنفيذ أعمال الديكور الداخلي الاحترافية للمساحات التجارية والسكنية.'
        : 'Professional interior fit-out works for commercial and residential spaces.',
    },
    {
      id: 6,
      icon: Settings,
      title: locale === 'ar' ? 'صيانة المباني' : 'Buildings Maintenance',
      description: locale === 'ar'
        ? 'خدمات صيانة شاملة لضمان الأداء الأمثل للمباني والمنشآت على المدى البعيد.'
        : 'Comprehensive maintenance services to ensure optimal performance of buildings and facilities long-term.',
    },
  ]

  const highlights = [
    locale === 'ar' ? 'فريق هندسي مؤهل وذو خبرة واسعة' : 'Qualified engineering team with extensive experience',
    locale === 'ar' ? 'امتثال كامل لمعايير السلامة الإماراتية' : 'Full compliance with UAE safety standards',
    locale === 'ar' ? 'قدرة على تنفيذ مشاريع متعددة في آنٍ واحد' : 'Capacity to execute multiple simultaneous projects',
    locale === 'ar' ? 'شراكات مع كبار الموردين المحليين والدوليين' : 'Partnerships with top local and international suppliers',
  ]

  return (
    <main style={{ background: white }} dir={direction}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden" style={{ background: black }}>
        <img
          src="https://media.istockphoto.com/id/608601538/photo/moden-glass-building.jpg?s=1200&w=0&k=20&c=WdEJCI2pi6IgYX0aZQOZbNCCQHdVlpegjhA0LbG7xoo="
          alt="Infrastructure"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />

        <Link href="/ventures" className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} z-20`}>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{ background: 'rgba(167,147,112,0.15)', border: `1px solid ${gold}`, color: gold, fontFamily }}
            whileHover={{ background: gold, color: black }}
          >
            <ArrowLeft className="w-4 h-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} strokeWidth={1.5} />
            {locale === 'ar' ? 'عودة' : 'Back'}
          </motion.div>
        </Link>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px" style={{ background: gold }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: gold, fontFamily: monoFont }}>
                {locale === 'ar' ? 'قطاع الاستثمار' : 'Investment Sector'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4" style={{ color: white, fontFamily }}>
              {locale === 'ar' ? (
                <><span className="font-bold" style={{ color: gold }}>الإنشاء</span> والبنية التحتية</>
              ) : (
                <>Construction & <span className="font-bold" style={{ color: gold }}>Infrastructure</span></>
              )}
            </h1>
            <p className="text-base md:text-lg font-light max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', fontFamily }}>
              {locale === 'ar'
                ? 'خدمات مقاولات وهندسة متكاملة للمشاريع البرية والبحرية في قطاع النفط والغاز والبناء.'
                : 'Integrated contracting and engineering services for onshore and offshore projects in oil & gas and construction.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: gold }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-6 px-4 text-center"
                style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.15)' : 'none' }}
              >
                <p className="text-sm md:text-base font-bold mb-1" style={{ color: black, fontFamily: monoFont }}>{stat.value}</p>
                <p className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: gold }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: gold, fontFamily: monoFont }}>
                {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: black, fontFamily }}>
              {locale === 'ar' ? (
                <>ما نقدمه في <span className="font-bold" style={{ color: gold }}>قطاع الإنشاء</span></>
              ) : (
                <>What We Offer in <span className="font-bold" style={{ color: gold }}>Construction</span></>
              )}
            </h2>
            <p className="text-sm md:text-base font-light leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
              {locale === 'ar'
                ? 'نقدم خدمات إنشائية وهندسية متكاملة تغطي النفط والغاز والمقاولات المدنية والميكانيكية والكهربائية، مع التزام راسخ بمعايير الجودة والسلامة.'
                : 'We deliver full-spectrum construction and engineering services covering oil & gas, civil, mechanical, and electrical contracting — with an unwavering commitment to quality and safety.'}
            </p>
            <div className="space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: gold }} strokeWidth={1.5} />
                  <span className="text-sm" style={{ color: 'rgba(0,0,0,0.7)', fontFamily }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                className="p-5 rounded-xl cursor-pointer transition-all duration-300"
                style={{
                  background: activeService === service.id ? gold : light,
                  border: `1px solid ${activeService === service.id ? gold : 'rgba(167,147,112,0.2)'}`,
                }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <service.icon className="w-4 h-4 shrink-0" style={{ color: activeService === service.id ? black : gold }} strokeWidth={1.5} />
                    <h4 className="text-sm font-semibold" style={{ color: black, fontFamily }}>{service.title}</h4>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-16 md:py-20" style={{ background: black }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: gold, fontFamily: monoFont }}>
            {locale === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
          </p>
          <h3 className="text-3xl md:text-4xl font-light mb-6" style={{ color: white, fontFamily }}>
            {locale === 'ar' ? 'لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
          </h3>
          <Link href="/contact">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium"
              style={{ background: gold, color: black, fontFamily }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  )
}