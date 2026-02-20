'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, TrendingUp, MapPin, CheckCircle, ArrowLeft } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import Link from 'next/link'

export default function RealEstatePage() {
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
    { value: locale === 'ar' ? 'أبوظبي + دبي' : 'Abu Dhabi + Dubai', label: locale === 'ar' ? 'الأسواق النشطة' : 'Active Markets' },
    { value: locale === 'ar' ? 'تجاري + سكني' : 'Commercial + Residential', label: locale === 'ar' ? 'نوع المحفظة' : 'Portfolio Type' },
    { value: 'UAE', label: locale === 'ar' ? 'مرخّص' : 'Licensed & Regulated' },
    { value: '2026', label: locale === 'ar' ? 'توسع نشط' : 'Active Expansion' },
  ]

  const services = [
    {
      id: 1,
      title: locale === 'ar' ? 'الاستثمار العقاري' : 'Property Investment',
      description: locale === 'ar'
        ? 'نحدد الفرص العقارية عالية العائد ونديرها باحترافية لتحقيق أقصى قيمة لمستثمرينا.'
        : 'We identify and manage high-yield property opportunities to maximize value for our investors.',
    },
    {
      id: 2,
      title: locale === 'ar' ? 'تطوير العقارات' : 'Property Development',
      description: locale === 'ar'
        ? 'من التخطيط إلى التسليم، نشرف على مشاريع تطوير عقارية تجارية وسكنية بمعايير عالمية.'
        : 'From planning to delivery, we oversee commercial and residential development projects to world-class standards.',
    },
    {
      id: 3,
      title: locale === 'ar' ? 'إدارة الأصول العقارية' : 'Asset Management',
      description: locale === 'ar'
        ? 'إدارة شاملة للأصول العقارية لضمان أقصى عائد وأقل مخاطر على المدى الطويل.'
        : 'Comprehensive real estate asset management ensuring maximum return and minimal risk over the long term.',
    },
    {
      id: 4,
      title: locale === 'ar' ? 'خدمات الوساطة العقارية' : 'Brokerage Services',
      description: locale === 'ar'
        ? 'خدمات وساطة احترافية لبيع وشراء وتأجير العقارات التجارية والسكنية في الإمارات.'
        : 'Professional brokerage for buying, selling, and leasing commercial and residential properties across the UAE.',
    },
    {
      id: 5,
      title: locale === 'ar' ? 'تمثيل الشركات' : 'Corporate Representation',
      description: locale === 'ar'
        ? 'نمثل الشركات الدولية والمحلية في صفقاتها العقارية الاستراتيجية بالإمارات.'
        : 'Representing international and local companies in strategic real estate transactions across the UAE.',
    },
    {
      id: 6,
      title: locale === 'ar' ? 'الاستشارات العقارية' : 'Real Estate Advisory',
      description: locale === 'ar'
        ? 'تقديم تقييمات سوقية دقيقة واستراتيجيات استثمارية مخصصة تناسب أهداف عملائنا.'
        : 'Delivering precise market valuations and tailored investment strategies aligned with our clients\' goals.',
    },
  ]

  const highlights = [
    locale === 'ar' ? 'سمعة موثوقة في السوق الإماراتي' : 'Trusted reputation in the UAE market',
    locale === 'ar' ? 'فريق من الخبراء القانونيين والماليين' : 'Team of legal and financial experts',
    locale === 'ar' ? 'إدارة مخاطر صارمة' : 'Rigorous risk management processes',
    locale === 'ar' ? 'نهج شفاف مع المستثمرين' : 'Transparent investor-first approach',
  ]

  return (
    <main style={{ background: white }} dir={direction}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden" style={{ background: black }}>
        <img
          src="https://img.freepik.com/free-photo/skyscrapers-view_1112-268.jpg?w=1200&q=80"
          alt="Real Estate"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />

        {/* Back button */}
        <Link href="/ventures" className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} z-20`}>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300"
            style={{ background: 'rgba(167,147,112,0.15)', border: `1px solid ${gold}`, color: gold, fontFamily }}
            whileHover={{ background: gold, color: black }}
          >
            <ArrowLeft className="w-4 h-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} strokeWidth={1.5} />
            {locale === 'ar' ? 'عودة' : 'Back'}
          </motion.div>
        </Link>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px" style={{ background: gold }} />
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: gold, fontFamily: monoFont }}>
                {locale === 'ar' ? 'قطاع الاستثمار' : 'Investment Sector'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4" style={{ color: white, fontFamily }}>
              {locale === 'ar' ? (
                <><span className="font-bold" style={{ color: gold }}>العقارات</span> والاستثمار</>
              ) : (
                <>Real <span className="font-bold" style={{ color: gold }}>Estate</span></>
              )}
            </h1>
            <p className="text-base md:text-lg font-light max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', fontFamily }}>
              {locale === 'ar'
                ? 'محفظة متنوعة من الأصول العقارية التجارية والسكنية في أبوظبي ودبي.'
                : 'A diversified portfolio of commercial and residential real estate assets across Abu Dhabi and Dubai.'}
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
                style={{ borderRight: i < stats.length - 1 ? `1px solid rgba(0,0,0,0.15)` : 'none' }}
              >
                <p className="text-sm md:text-base font-bold mb-1" style={{ color: black, fontFamily: monoFont }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Text */}
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
                <>ما نقدمه في <span className="font-bold" style={{ color: gold }}>القطاع العقاري</span></>
              ) : (
                <>What We Offer in <span className="font-bold" style={{ color: gold }}>Real Estate</ span></>
              )}
            </h2>
            <p className="text-sm md:text-base font-light leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
              {locale === 'ar'
                ? 'نقدم حلولاً عقارية متكاملة تشمل الاستثمار والتطوير والوساطة وإدارة الأصول، مع التركيز الدائم على العوائد المستدامة وحماية مصالح عملائنا.'
                : 'We offer end-to-end real estate solutions spanning investment, development, brokerage, and asset management — always focused on sustainable returns and protecting our clients\' interests.'}
            </p>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: gold }} strokeWidth={1.5} />
                  <span className="text-sm" style={{ color: 'rgba(0,0,0,0.7)', fontFamily }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Service Cards */}
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
                  <h4 className="text-sm font-semibold" style={{ color: black, fontFamily }}>
                    {service.title}
                  </h4>
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: activeService === service.id ? black : gold }}
                    strokeWidth={2}
                  />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 md:py-20" style={{ background: black }}>
        <div className="absolute left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: gold, fontFamily: monoFont }}>
            {locale === 'ar' ? 'استثمر معنا' : 'Invest With Us'}
          </p>
          <h3 className="text-3xl md:text-4xl font-light mb-6" style={{ color: white, fontFamily }}>
            {locale === 'ar' ? 'هل أنت مستعد لاستكشاف الفرص؟' : 'Ready to Explore Opportunities?'}
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