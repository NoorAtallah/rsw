'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, CheckCircle, Brain, Shield, Cloud, Code2, Network, Lightbulb } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import Link from 'next/link'

export default function TechnologyPage() {
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
    { value: 'AI + Cloud', label: locale === 'ar' ? 'التخصصات الأساسية' : 'Core Specialties' },
    { value: locale === 'ar' ? 'استشارات + تطوير' : 'Advisory + Dev', label: locale === 'ar' ? 'نموذج الخدمة' : 'Service Model' },
    { value: 'UAE', label: locale === 'ar' ? 'مرخّص' : 'Licensed & Regulated' },
    { value: locale === 'ar' ? 'ابتكار مستمر' : 'Continuous Innovation', label: locale === 'ar' ? 'منهجيتنا' : 'Our Approach' },
  ]

  const services = [
    {
      id: 1,
      icon: Brain,
      title: locale === 'ar' ? 'الذكاء الاصطناعي والابتكار' : 'AI & Innovation Research',
      description: locale === 'ar'
        ? 'أبحاث وتطوير في مجال الذكاء الاصطناعي وتطبيقاته العملية للقطاعات المختلفة.'
        : 'Research and development in AI and its practical applications across diverse industry sectors.',
    },
    {
      id: 2,
      icon: Shield,
      title: locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
      description: locale === 'ar'
        ? 'مراجعة وتدقيق وحماية الأنظمة من مخاطر الفضاء الإلكتروني بأحدث الأساليب.'
        : 'Auditing, reviewing, and protecting systems from cyber risks using the latest methodologies.',
    },
    {
      id: 3,
      icon: Cloud,
      title: locale === 'ar' ? 'الحوسبة السحابية' : 'Cloud Computing',
      description: locale === 'ar'
        ? 'نشر وإدارة البنية التحتية السحابية لتحقيق أداء وموثوقية وأمان عاليين.'
        : 'Deploying and managing cloud infrastructure for high performance, reliability, and security.',
    },
    {
      id: 4,
      icon: Code2,
      title: locale === 'ar' ? 'تصميم البرمجيات' : 'Software Design & Development',
      description: locale === 'ar'
        ? 'تصميم وتطوير أنظمة برمجية مخصصة تناسب احتياجات المؤسسات وتواكب تحديات المستقبل.'
        : 'Designing and developing custom software systems tailored to enterprise needs and future challenges.',
    },
    {
      id: 5,
      icon: Network,
      title: locale === 'ar' ? 'خدمات الشبكات' : 'IT Network Services',
      description: locale === 'ar'
        ? 'تصميم وتشغيل وصيانة شبكات المعلومات للمؤسسات بمعايير أمان وأداء عالية.'
        : 'Designing, operating, and maintaining enterprise IT networks with high security and performance standards.',
    },
    {
      id: 6,
      icon: Lightbulb,
      title: locale === 'ar' ? 'الاستشارات التقنية' : 'IT Consultancy',
      description: locale === 'ar'
        ? 'استشارات تقنية متخصصة لمساعدة المؤسسات على اتخاذ قراراتها التكنولوجية بثقة وكفاءة.'
        : 'Specialized IT consulting to help organizations make confident and efficient technology decisions.',
    },
  ]

  const highlights = [
    locale === 'ar' ? 'فريق من المهندسين والباحثين المتخصصين' : 'Team of specialized engineers and researchers',
    locale === 'ar' ? 'خبرة في قطاعي النفط والغاز والتجارة' : 'Cross-sector expertise in oil & gas and commercial domains',
    locale === 'ar' ? 'شراكات استراتيجية مع كبار الشركات التقنية' : 'Strategic partnerships with leading tech companies',
    locale === 'ar' ? 'حلول قابلة للتوسع ومصممة للمستقبل' : 'Scalable, future-proof technology solutions',
  ]

  return (
    <main style={{ background: white }} dir={direction}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden" style={{ background: black }}>
        <img
          src="https://cdn.alromaizan.com/image/upload/v1732525687/media/images/i31wglsx3wqnf0cp55ya.webp"
          alt="Technology"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />

        {/* Animated grid overlay for tech feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${gold} 1px, transparent 1px), linear-gradient(90deg, ${gold} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

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
                <><span className="font-bold" style={{ color: gold }}>التكنولوجيا</span> والابتكار</>
              ) : (
                <>Technology & <span className="font-bold" style={{ color: gold }}>Innovation</span></>
              )}
            </h1>
            <p className="text-base md:text-lg font-light max-w-xl" style={{ color: 'rgba(255,255,255,0.7)', fontFamily }}>
              {locale === 'ar'
                ? 'استثمارات في مستقبل التكنولوجيا: ذكاء اصطناعي، أمن سيبراني، حوسبة سحابية، وخدمات تقنية متكاملة.'
                : 'Investments in the future of technology: AI, cybersecurity, cloud computing, and integrated IT services.'}
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
                <>ما نقدمه في <span className="font-bold" style={{ color: gold }}>قطاع التكنولوجيا</span></>
              ) : (
                <>What We Offer in <span className="font-bold" style={{ color: gold }}>Technology</span></>
              )}
            </h2>
            <p className="text-sm md:text-base font-light leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}>
              {locale === 'ar'
                ? 'نستثمر في شركات وحلول تقنية تعيد تشكيل مستقبل الأعمال، من الذكاء الاصطناعي إلى الأمن السيبراني والبنية التحتية الرقمية.'
                : 'We invest in technology companies and solutions that are reshaping the future of business — from AI to cybersecurity and digital infrastructure.'}
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
                <div className="flex items-center gap-2 mb-2">
                  <service.icon className="w-4 h-4 shrink-0" style={{ color: activeService === service.id ? black : gold }} strokeWidth={1.5} />
                  <h4 className="text-sm font-semibold" style={{ color: black, fontFamily }}>{service.title}</h4>
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
            {locale === 'ar' ? 'شراكات تقنية' : 'Technology Partnerships'}
          </p>
          <h3 className="text-3xl md:text-4xl font-light mb-6" style={{ color: white, fontFamily }}>
            {locale === 'ar' ? 'هل تبحث عن شريك تقني استراتيجي؟' : 'Looking for a Strategic Tech Partner?'}
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