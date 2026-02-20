'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Cpu, HardHat, Monitor,
  ArrowRight, ArrowUpRight, Globe2, Users, Shield, Zap, TrendingUp, Star, Calendar
} from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    let s: number | null = null
    const step = (ts: number) => {
      if (!s) s = ts
      const p = Math.min((ts - s) / duration, 1)
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return value
}

const RSWAboutPage = () => {
  const [activeSector, setActiveSector] = useState(0)
  const [milestonesStarted, setMilestonesStarted] = useState(false)
  const milestonesRef = useRef<HTMLDivElement>(null)

  const { t, locale, direction } = useI18n()
  
  const gold = '#a79370'
  const black = '#000000'
  const white = '#ffffff'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Playfair Display, serif'
  const bodyFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif'
  const monoFont = locale === 'ar' ? 'Cairo, sans-serif' : 'Space Mono, monospace'

  useEffect(() => {
    const el = milestonesRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setMilestonesStarted(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const sectors = [
    { 
      icon: Building2, 
      name: locale === 'ar' ? 'العقارات' : 'Real Estate', 
      number: '01', 
      description: locale === 'ar' ? 'استثمار تجاري استراتيجي وتطوير عقاري في جميع أنحاء الإمارات.' : 'Strategic commercial investment and property development across the UAE.',
      image: 'https://i.ytimg.com/vi/puQoxZnrwlA/maxresdefault.jpg' 
    },
    { 
      icon: Cpu, 
      name: locale === 'ar' ? 'التكنولوجيا' : 'Technology', 
      number: '02', 
      description: locale === 'ar' ? 'أبحاث الذكاء الاصطناعي وحلول الأمن السيبراني وخدمات البنية التحتية السحابية.' : 'AI research, cybersecurity solutions, and cloud infrastructure services.',
      image: 'https://abdullahsakkijha.com/wp-content/uploads/2023/10/ezgif.com-gif-maker.jpg' 
    },
    { 
      icon: HardHat, 
      name: locale === 'ar' ? 'البناء' : 'Construction', 
      number: '03', 
      description: locale === 'ar' ? 'منشآت النفط والغاز والتصميم الداخلي التجاري وإدارة المرافق.' : 'Oil & gas facilities, commercial interiors, and facility management.',
      image: 'https://media.istockphoto.com/id/862758024/photo/construction-site.jpg?s=612x612&w=0&k=20&c=gYl455m4B91lwQpIidx9YBCxwLaeLKFR632FRaPqffc=' 
    },
    { 
      icon: Monitor, 
      name: locale === 'ar' ? 'البرمجيات' : 'Software', 
      number: '04', 
      description: locale === 'ar' ? 'تطوير برمجيات مخصصة وحلول التحول الرقمي.' : 'Custom software development and digital transformation solutions.',
      image: 'https://img.freepik.com/free-photo/smart-microchip-technology-background-gradient-gold_53876-124642.jpg?semt=ais_hybrid&w=740&q=80' 
    }
  ]

  // ── Timeline data ──────────────────────────────────────────────────────────
  const timeline = [
    {
      year: '2020', quarter: locale === 'ar' ? 'الربع الأول' : 'Q1',
      tag: locale === 'ar' ? 'التأسيس' : 'FOUNDING',
      title: locale === 'ar' ? 'تأسيس مجموعة RSW في أبوظبي' : 'RSW Group Founded in Abu Dhabi',
      description: locale === 'ar'
        ? 'بدأت المجموعة برؤية واضحة لبناء محفظة استثمارية متنوعة عبر قطاعات الاقتصاد الإماراتي الديناميكي.'
        : "The group was established with a clear vision to build a diversified investment portfolio across UAE's dynamic economic sectors.",
      metric: locale === 'ar' ? 'أول مشروع عقاري' : '1st real estate project',
    },
    {
      year: '2021', quarter: locale === 'ar' ? 'الربع الثالث' : 'Q3',
      tag: locale === 'ar' ? 'التوسع' : 'EXPANSION',
      title: locale === 'ar' ? 'إطلاق قسم التكنولوجيا — Hector Advance' : 'Technology Division Launched — Hector Advance',
      description: locale === 'ar'
        ? 'دخول مجال الذكاء الاصطناعي والأمن السيبراني والبنية التحتية السحابية.'
        : 'Entry into AI, cybersecurity, and cloud infrastructure with the launch of Hector Advance Technology.',
      metric: locale === 'ar' ? '٨ عملاء تكنولوجيا' : '8 tech clients onboarded',
    },
    {
      year: '2022', quarter: locale === 'ar' ? 'الربع الثاني' : 'Q2',
      tag: locale === 'ar' ? 'الشراكات' : 'PARTNERSHIPS',
      title: locale === 'ar' ? 'تأسيس RSW للإنشاءات والديكور' : 'RSW Construction & Decoration Established',
      description: locale === 'ar'
        ? 'توسع رأسي استراتيجي في قطاع البناء مع التركيز على مشاريع النفط والغاز والمقاولات التجارية.'
        : 'Strategic vertical expansion into construction, focusing on oil & gas projects and commercial contracting.',
      metric: locale === 'ar' ? '١٢ مشروع إنشائي' : '12 construction projects',
    },
    {
      year: '2023', quarter: locale === 'ar' ? 'الربع الرابع' : 'Q4',
      tag: locale === 'ar' ? 'الابتكار' : 'INNOVATION',
      title: locale === 'ar' ? 'إطلاق Cortex 82 للتكنولوجيا' : 'Cortex 82 Technology Launched',
      description: locale === 'ar'
        ? 'تأسيس ذراع متخصصة لتطوير البرمجيات المخصصة وحلول الشبكات والتحول الرقمي المؤسسي.'
        : 'Launch of a dedicated arm for custom software development, network solutions, and enterprise digital transformation.',
      metric: locale === 'ar' ? '٣ منتجات برمجية' : '3 software products',
    },
    {
      year: '2024', quarter: locale === 'ar' ? 'الربع الأول' : 'Q1',
      tag: locale === 'ar' ? 'الامتثال' : 'COMPLIANCE',
      title: locale === 'ar' ? 'اعتماد الامتثال التنظيمي الكامل' : 'Full Regulatory Compliance Achieved',
      description: locale === 'ar'
        ? 'استيفاء جميع متطلبات هيئة SCA ومعايير DFM وأحكام قانون حماية البيانات الشخصية في الإمارات.'
        : 'Full alignment with SCA guidelines, DFM standards, and UAE PDPL data privacy regulations.',
      metric: locale === 'ar' ? '١٠٠٪ امتثال تنظيمي' : '100% regulatory compliance',
    },
    {
      year: '2025', quarter: locale === 'ar' ? 'الربع الثالث' : 'Q3',
      tag: locale === 'ar' ? 'القيادة' : 'LEADERSHIP',
      title: locale === 'ar' ? 'قيادة السوق عبر أربعة قطاعات' : 'Market Leadership Across Four Sectors',
      description: locale === 'ar'
        ? 'المجموعة اليوم تدير ٢٠٠+ مشروع مع حضور راسخ في أبوظبي ودبي والشارقة.'
        : 'The group now manages 200+ projects with established presence in Abu Dhabi, Dubai, and Sharjah.',
      metric: locale === 'ar' ? '٢٠٠+ مشروع نشط' : '200+ active projects',
    },
  ]

  // ── Leadership data ────────────────────────────────────────────────────────
  const leadership = [
    {
      name: locale === 'ar' ? 'المؤسس والرئيس التنفيذي' : 'Founder & CEO',
      role: locale === 'ar' ? 'رؤية استراتيجية ونمو' : 'Strategic Vision & Growth',
      initials: 'RSW',
      bio: locale === 'ar'
        ? 'خبرة تزيد عن ١٥ عاماً في الاستثمار والتطوير العقاري عبر أسواق الخليج.'
        : 'Over 15 years of experience in investment and real estate development across Gulf markets.',
      tags: [locale === 'ar' ? 'العقارات' : 'Real Estate', locale === 'ar' ? 'استراتيجية' : 'Strategy', locale === 'ar' ? 'أبوظبي' : 'Abu Dhabi'],
    },
    {
      name: locale === 'ar' ? 'المدير التقني' : 'Chief Technology Officer',
      role: locale === 'ar' ? 'رئيس Hector Advance' : 'Head of Hector Advance',
      initials: 'CTO',
      bio: locale === 'ar'
        ? 'متخصص في الذكاء الاصطناعي والأمن السيبراني مع خلفية في أبحاث MIT.'
        : 'Specialist in AI and cybersecurity with a background in MIT research.',
      tags: [locale === 'ar' ? 'ذكاء اصطناعي' : 'AI', locale === 'ar' ? 'أمن سيبراني' : 'Cybersecurity', locale === 'ar' ? 'سحابة' : 'Cloud'],
    },
    {
      name: locale === 'ar' ? 'مدير العمليات' : 'Chief Operations Officer',
      role: locale === 'ar' ? 'رئيس الإنشاءات والمشاريع' : 'Head of Construction & Projects',
      initials: 'COO',
      bio: locale === 'ar'
        ? 'خبرة واسعة في إدارة مشاريع النفط والغاز والبناء الكبرى في الإمارات والخليج.'
        : 'Extensive experience managing large-scale oil & gas and construction projects across UAE and the Gulf.',
      tags: [locale === 'ar' ? 'إنشاءات' : 'Construction', locale === 'ar' ? 'نفط وغاز' : 'Oil & Gas', locale === 'ar' ? 'إدارة مشاريع' : 'PM'],
    },
    {
      name: locale === 'ar' ? 'المدير المالي' : 'Chief Financial Officer',
      role: locale === 'ar' ? 'المالية والامتثال التنظيمي' : 'Finance & Regulatory Compliance',
      initials: 'CFO',
      bio: locale === 'ar'
        ? 'خبير في تمويل الشركات والامتثال لمعايير هيئة الأوراق المالية والسلع الإماراتية.'
        : 'Expert in corporate finance and compliance with UAE SCA and DFM standards.',
      tags: [locale === 'ar' ? 'مالية' : 'Finance', 'SCA/DFM', locale === 'ar' ? 'امتثال' : 'Compliance'],
    },
  ]

  // ── Milestones data ────────────────────────────────────────────────────────
  const milestones = locale === 'ar'
    ? [
        { value: 200, suffix: '+', label: 'مشروع منجز',     sub: 'عبر أربعة قطاعات' },
        { value: 15,  suffix: '+', label: 'سنة خبرة',        sub: 'في أسواق الخليج' },
        { value: 4,   suffix: '',  label: 'أقسام متكاملة',   sub: 'عقارات · تقنية · إنشاء · برمجيات' },
        { value: 98,  suffix: '%', label: 'رضا العملاء',      sub: 'معدل مرضي موثق' },
        { value: 12,  suffix: '+', label: 'شريك استراتيجي',   sub: 'محلي ودولي' },
        { value: 3,   suffix: '',  label: 'إمارات نشطة',      sub: 'أبوظبي · دبي · الشارقة' },
      ]
    : [
        { value: 200, suffix: '+', label: 'Projects Delivered',  sub: 'Across four sectors' },
        { value: 15,  suffix: '+', label: 'Years Experience',     sub: 'In Gulf markets' },
        { value: 4,   suffix: '',  label: 'Integrated Divisions', sub: 'Real Estate · Tech · Construction · Software' },
        { value: 98,  suffix: '%', label: 'Client Satisfaction',  sub: 'Documented satisfaction rate' },
        { value: 12,  suffix: '+', label: 'Strategic Partners',   sub: 'Local and international' },
        { value: 3,   suffix: '',  label: 'Active Emirates',      sub: 'Abu Dhabi · Dubai · Sharjah' },
      ]

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cairo:wght@300;400;600;700&display=swap');
        
        [dir="ltr"] .about-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .about-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .about-body { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .about-body { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .about-mono { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .about-mono { font-family: 'Cairo', sans-serif; }
        
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px);
          opacity: 0.15;
          pointer-events: none;
        }

        .timeline-spine {
          position: absolute;
          top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, transparent, #a79370 8%, #a79370 92%, transparent);
        }

        .leader-card:hover .leader-avatar {
          background: #a79370 !important;
          color: #000 !important;
        }
      `}</style>

      {/* ═══════════════════════════════════ HERO — ORIGINAL UNCHANGED ════ */}
      <section className="relative h-screen overflow-hidden" style={{ background: black }}>
        <div className="absolute inset-0 image-grain">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
            alt="RSW Group" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background: `rgba(0, 0, 0, 0.4)` }}/>
          <div className={`absolute inset-0`} style={{ background: `linear-gradient(${isRTL ? 'to left' : 'to right'}, rgba(0, 0, 0, 0.7) 0%, transparent 60%)` }}/>
        </div>

        <div className="relative h-full flex items-end pb-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 60 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.3 }} 
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-px" style={{ background: gold }} />
                <span className={`about-mono text-xs uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
                  {locale === 'ar' ? 'تأسست 2020 — أبوظبي' : 'EST. 2020 — ABU DHABI'}
                </span>
              </div>

              <h1 className="about-title text-5xl lg:text-8xl font-light mb-8 leading-[0.95]" style={{ color: white }}>
                {locale === 'ar' ? (
                  <>
                    تشكيل<br/>
                    <span className="font-bold" style={{ color: gold }}>مستقبل</span><br/>
                    الاستثمار
                  </>
                ) : (
                  <>
                    Shaping the<br/>
                    <span className="font-bold" style={{ color: gold }}>Future</span> of<br/>
                    Investment
                  </>
                )}
              </h1>

              <p className="about-body text-xl lg:text-2xl max-w-2xl mb-12 font-light leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {locale === 'ar' 
                  ? 'شركة استثمارية متنوعة مقرها الإمارات تعمل في مجالات العقارات والتكنولوجيا والبناء وتطوير البرمجيات.'
                  : 'A diversified UAE-based investment firm operating across real estate, technology, construction, and software development.'
                }
              </p>

              <div className="flex flex-wrap gap-12">
                {[
                  { num: '4', label: locale === 'ar' ? 'قطاعات' : 'Sectors' },
                  { num: '200+', label: locale === 'ar' ? 'مشاريع' : 'Projects' },
                  { num: '15+', label: locale === 'ar' ? 'سنوات' : 'Years' }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="about-title text-5xl mb-1 font-semibold" style={{ color: gold }}>{stat.num}</div>
                    <div className={`about-mono text-xs uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className="flex flex-col items-center gap-3"
          >
            <div className={`about-mono text-[10px] uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
              {locale === 'ar' ? 'تمرير' : 'SCROLL'}
            </div>
            <div className="w-px h-16" style={{ background: `linear-gradient(to bottom, ${gold}, transparent)` }}/>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ STORY — ORIGINAL ════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }} 
                className="sticky top-32"
              >
                <div className="about-title text-[100px] lg:text-[140px] font-light leading-none" style={{ color: 'rgba(167, 147, 112, 0.1)' }}>
                  01
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-9">
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }} 
                viewport={{ once: true }}
              >
                <div className={`about-mono text-xs mb-6 uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
                  {locale === 'ar' ? 'قصتنا' : 'OUR STORY'}
                </div>
                
                <h2 className="about-title text-2xl lg:text-3xl font-light mb-8 leading-tight" style={{ color: black }}>
                  {locale === 'ar' ? (
                    <>بناء <span className="font-bold" style={{ color: gold }}>الإرث</span> من خلال<br/>التنويع الاستراتيجي</>
                  ) : (
                    <>Building <span className="font-bold" style={{ color: gold }}>legacy</span> through<br/>strategic diversification</>
                  )}
                </h2>

                <div className="space-y-6 text-base leading-relaxed about-body" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  <p>
                    {locale === 'ar' 
                      ? 'تأسست مجموعة RSW في أبوظبي عام 2020 برؤية واضحة: خلق قيمة دائمة عبر قطاعات متعددة من اقتصاد الإمارات الديناميكي.'
                      : "Founded in Abu Dhabi in 2020, RSW Group emerged with a clear vision: to create lasting value across multiple sectors of the UAE's dynamic economy."
                    }
                  </p>
                  <p>
                    {locale === 'ar'
                      ? 'اليوم، نحن ندير محفظة تمتد عبر أربعة قطاعات استراتيجية، تم اختيار كل منها لتآزرها وإمكانات نموها.'
                      : 'Today, we manage a portfolio spanning four strategic sectors, each chosen for its synergies and growth potential.'
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ MILESTONES — NEW, LIGHT ════ */}
      <section ref={milestonesRef} style={{ background: '#faf9f6', padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className={`mb-16 ${isRTL ? 'text-right' : ''}`}
          >
            <div className={`about-mono text-xs mb-4 uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
              {locale === 'ar' ? 'إنجازاتنا' : 'OUR MILESTONES'}
            </div>
            <h2 className="about-title text-2xl lg:text-3xl font-light" style={{ color: black }}>
              {locale === 'ar'
                ? <>أرقام تُحكي <span className="font-bold" style={{ color: gold }}>القصة</span></>
                : <>Numbers that tell the <span className="font-bold" style={{ color: gold }}>story</span></>}
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ border: '1px solid rgba(167,147,112,0.18)', background: 'rgba(167,147,112,0.12)' }}
          >
            {milestones.map((m, i) => {
              const count = useCountUp(m.value, 1500, milestonesStarted)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: '#faf9f6', padding: '36px 32px', position: 'relative', overflow: 'hidden', borderBottom: `3px solid ${gold}` }}
                >
                  {/* Watermark */}
                  <div className="about-title" style={{ position: 'absolute', bottom: -16, right: -4, fontSize: 100, fontWeight: 800, lineHeight: 1, color: 'rgba(167,147,112,0.07)', userSelect: 'none', pointerEvents: 'none' }}>
                    {count}{m.suffix}
                  </div>
                  <div className="about-title" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, color: black, letterSpacing: '-0.04em' }}>
                    {count.toLocaleString()}
                    <span style={{ fontSize: 28, color: gold }}>{m.suffix}</span>
                  </div>
                  <div className="about-title" style={{ fontSize: 14, fontWeight: 600, color: black, marginTop: 14 }}>{m.label}</div>
                  <div className="about-body" style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 4, lineHeight: 1.5 }}>{m.sub}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ TIMELINE — NEW, LIGHT ════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className={`mb-20 ${isRTL ? 'text-right' : ''}`}
          >
            <div className={`about-mono text-xs mb-4 uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
              {locale === 'ar' ? 'مسيرتنا' : 'OUR JOURNEY'}
            </div>
            <h2 className="about-title text-2xl lg:text-3xl font-light" style={{ color: black }}>
              {locale === 'ar'
                ? <>خمس سنوات من <span className="font-bold" style={{ color: gold }}>النمو</span></>
                : <>Five years of <span className="font-bold" style={{ color: gold }}>growth</span></>}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical spine */}
            <div
              className="timeline-spine hidden lg:block"
              style={{ [isRTL ? 'right' : 'left']: 'calc(50% - 0.5px)' }}
            />

            <div className="space-y-0">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0
                const onLeft = isRTL ? !isLeft : isLeft
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: onLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid lg:grid-cols-2 gap-0"
                  >
                    {/* Card */}
                    <div className={`${onLeft ? 'lg:pr-16' : 'lg:order-2 lg:pl-16'} pb-12`}>
                      <div style={{ background: white, border: '1px solid rgba(167,147,112,0.18)', borderRadius: 16, padding: '28px 26px', boxShadow: '0 2px 20px -6px rgba(0,0,0,0.07)' }}>
                        {/* Tag */}
                        <div style={{ display: 'inline-block', background: 'rgba(167,147,112,0.1)', color: gold, padding: '4px 10px', borderRadius: 20, marginBottom: 14 }}>
                          <span className={`about-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`}>{item.tag}</span>
                        </div>
                        <h3 className="about-title" style={{ fontSize: 17, fontWeight: 600, color: black, lineHeight: 1.3, marginBottom: 10 }}>{item.title}</h3>
                        <p className="about-body" style={{ fontSize: 13, color: 'rgba(0,0,0,0.58)', lineHeight: 1.7, marginBottom: 16 }}>{item.description}</p>
                        {/* Metric */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f5f0e8', border: '1px solid rgba(167,147,112,0.25)', color: gold, padding: '5px 12px', borderRadius: 20 }}>
                          <TrendingUp size={10} color={gold} />
                          <span className="about-mono" style={{ fontSize: 10 }}>{item.metric}</span>
                        </div>
                      </div>
                    </div>

                    {/* Year */}
                    <div className={`hidden lg:flex items-start ${onLeft ? 'lg:pl-16 justify-start' : 'lg:pr-16 justify-end lg:order-1'} pt-7`}>
                      {/* Dot on spine */}
                      <div style={{ position: 'absolute', [isRTL ? 'right' : 'left']: 'calc(50% - 7px)', top: 30, width: 14, height: 14, borderRadius: '50%', background: gold, border: '3px solid white', boxShadow: '0 0 0 4px rgba(167,147,112,0.2)', zIndex: 2 }} />
                      <div className={`flex flex-col ${onLeft ? 'items-start' : 'items-end'} gap-1`}>
                        <div className="about-title" style={{ fontSize: 46, fontWeight: 800, color: black, letterSpacing: '-0.04em', lineHeight: 1 }}>{item.year}</div>
                        <div className={`about-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: 'rgba(0,0,0,0.3)' }}>{item.quarter}</div>
                      </div>
                    </div>

                    {/* Mobile year */}
                    <div className="lg:hidden mb-3">
                      <span className="about-title" style={{ fontSize: 26, fontWeight: 800, color: gold }}>{item.year}</span>
                      <span className="about-mono" style={{ fontSize: 9, color: 'rgba(0,0,0,0.4)', marginLeft: 8, textTransform: 'uppercase' }}>{item.quarter}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ SECTORS — ORIGINAL ════ */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <div className={`about-mono text-xs mb-6 uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
              {locale === 'ar' ? 'أربعة أقسام' : 'FOUR DIVISIONS'}
            </div>
            <h2 className="about-title text-2xl lg:text-3xl font-light" style={{ color: black }}>
              {locale === 'ar' ? (
                <>حيث <span className="font-bold" style={{ color: gold }}>نعمل</span></>
              ) : (
                <>Where we <span className="font-bold" style={{ color: gold }}>operate</span></>
              )}
            </h2>
          </div>

          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {sectors.map((sector, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveSector(idx)}
                className="about-body flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap transition-all"
                style={{
                  background: activeSector === idx ? gold : white,
                  color: activeSector === idx ? black : gold,
                  border: activeSector === idx ? 'none' : `1px solid rgba(167, 147, 112, 0.3)`
                }}
              >
                <span className="about-mono text-xs">{sector.number}</span>
                <span className="text-sm font-medium">{sector.name}</span>
              </button>
            ))}
          </div>

          <motion.div 
            key={activeSector} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden image-grain">
              <img 
                src={sectors[activeSector].image} 
                alt={sectors[activeSector].name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
            </div>

            <div className={isRTL ? 'text-right' : ''}>
              <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {React.createElement(sectors[activeSector].icon, { 
                  className: "w-10 h-10", 
                  style: { color: gold }, 
                  strokeWidth: 1.5 
                })}
                <div className={`about-mono text-sm ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
                  {sectors[activeSector].number}
                </div>
              </div>

              <h3 className="about-title text-xl lg:text-2xl font-light mb-6" style={{ color: black }}>
                {sectors[activeSector].name}
              </h3>
              <p className="about-body text-base mb-8 leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                {sectors[activeSector].description}
              </p>

              <button className={`about-body flex items-center gap-2 text-sm font-semibold group ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: gold }}>
                <span>{locale === 'ar' ? 'استكشاف القسم' : 'Explore Division'}</span>
                <ArrowRight 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════ LEADERSHIP — NEW, LIGHT ════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className={`mb-20 ${isRTL ? 'text-right' : ''}`}
          >
            <div className={`about-mono text-xs mb-4 uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
              {locale === 'ar' ? 'فريق القيادة' : 'LEADERSHIP TEAM'}
            </div>
            <h2 className="about-title text-2xl lg:text-3xl font-light" style={{ color: black }}>
              {locale === 'ar'
                ? <>العقول التي <span className="font-bold" style={{ color: gold }}>تقود</span> الرؤية</>
                : <>The minds <span className="font-bold" style={{ color: gold }}>behind</span> the vision</>}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, idx) => (
              <motion.div
                key={idx}
                className="leader-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                style={{
                  background: white,
                  border: '1px solid rgba(167,147,112,0.2)',
                  borderRadius: 20,
                  padding: '32px 24px',
                  display: 'flex', flexDirection: 'column', gap: 16,
                  position: 'relative', overflow: 'hidden',
                  boxShadow: '0 2px 20px -4px rgba(0,0,0,0.07)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px -8px rgba(167,147,112,0.22)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px -4px rgba(0,0,0,0.07)' }}
              >
                {/* Corner glow */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'radial-gradient(circle at top right, rgba(167,147,112,0.1), transparent 70%)', pointerEvents: 'none' }} />

                {/* Avatar */}
                <div
                  className="leader-avatar"
                  style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(167,147,112,0.1)', border: '1px solid rgba(167,147,112,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: monoFont, fontSize: 12, fontWeight: 700, color: gold, transition: 'background 0.3s, color 0.3s' }}
                >
                  {person.initials}
                </div>

                {/* Name & role */}
                <div className={isRTL ? 'text-right' : ''}>
                  <div className="about-title" style={{ fontSize: 16, fontWeight: 600, color: black, lineHeight: 1.3, marginBottom: 4 }}>{person.name}</div>
                  <div className={`about-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>{person.role}</div>
                </div>

                {/* Bio */}
                <p className="about-body" style={{ fontSize: 12, color: 'rgba(0,0,0,0.52)', lineHeight: 1.65 }}>{person.bio}</p>

                {/* Tags */}
                <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : ''}`}>
                  {person.tags.map((tag, ti) => (
                    <span key={ti} style={{ fontFamily: monoFont, fontSize: 9, color: gold, background: 'rgba(167,147,112,0.08)', border: '1px solid rgba(167,147,112,0.18)', padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: locale === 'ar' ? 0 : '0.08em' }}>{tag}</span>
                  ))}
                </div>

                {/* Bottom accent */}
                <div style={{ position: 'absolute', bottom: 0, left: 20, right: 20, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${gold}, rgba(167,147,112,0.2))`, opacity: 0.5 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CTA — ORIGINAL ════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div 
            className="rounded-3xl p-12 lg:p-16"
            style={{ background: white, border: `2px solid ${gold}` }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={isRTL ? 'text-right' : ''}>
                <h2 className="about-title text-3xl lg:text-4xl font-light mb-6 leading-tight" style={{ color: black }}>
                  {locale === 'ar' ? (
                    <>هل أنت مستعد<br/>لاستكشاف <span className="font-bold" style={{ color: gold }}>الفرص؟</span></>
                  ) : (
                    <>Ready to explore<br/><span className="font-bold" style={{ color: gold }}>opportunities?</span></>
                  )}
                </h2>
                <p className="about-body text-base mb-10 leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  {locale === 'ar'
                    ? 'تواصل مع مجموعة RSW لمناقشة شراكات الاستثمار أو التعاون في المشاريع أو الفرص الوظيفية.'
                    : 'Connect with RSW Group to discuss investment partnerships, project collaborations, or career opportunities.'
                  }
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <button 
                    className="about-body px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 group transition-all hover:shadow-lg hover:scale-105"
                    style={{ background: gold, color: black }}
                  >
                    <span>{locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}</span>
                    <ArrowUpRight 
                      className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                      style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                    />
                  </button>

                  <button 
                    className="about-body px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{ background: white, color: gold, border: `1px solid ${gold}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = gold; e.currentTarget.style.color = black }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = white; e.currentTarget.style.color = gold }}
                  >
                    <span>{locale === 'ar' ? 'عرض الفرص' : 'View Opportunities'}</span>
                  </button>
                </div>
              </div>

              <div className={`hidden lg:flex items-center gap-8 ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
                {[
                  { icon: Shield,     label: locale === 'ar' ? 'متوافق مع الإمارات' : 'UAE Compliant' }, 
                  { icon: Star,       label: locale === 'ar' ? 'معتمد ISO'          : 'ISO Certified' }, 
                  { icon: TrendingUp, label: locale === 'ar' ? 'رائد الصناعة'       : 'Industry Leader' }
                ].map((badge, idx) => {
                  const Icon = badge.icon
                  return (
                    <div key={idx} className={`text-center ${isRTL ? 'text-right' : ''}`}>
                      <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: gold, opacity: 0.8 }} strokeWidth={1.5}/>
                      <div className={`about-mono text-[10px] uppercase ${locale === 'ar' ? '' : 'tracking-widest'}`} style={{ color: gold }}>
                        {badge.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default RSWAboutPage