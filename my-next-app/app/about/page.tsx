'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, Cpu, HardHat, Monitor,
  ArrowRight, ArrowUpRight, Globe2, Users, Shield, Zap, TrendingUp, Star, Calendar
} from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

const RSWAboutPage = () => {
  const [activeSector, setActiveSector] = useState(0)
  const { t, locale, direction } = useI18n()
  
  const gold = '#a79370'
  const black = '#000000'
  const white = '#ffffff'
  const isRTL = direction === 'rtl'
  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Playfair Display, serif'
  const bodyFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif'
  const monoFont = locale === 'ar' ? 'Cairo, sans-serif' : 'Space Mono, monospace'

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

  const values = [
    { 
      icon: Shield, 
      title: locale === 'ar' ? 'النزاهة' : 'Integrity', 
      metric: '100%', 
      label: locale === 'ar' ? 'الامتثال' : 'Compliance' 
    },
    { 
      icon: Zap, 
      title: locale === 'ar' ? 'الابتكار' : 'Innovation', 
      metric: '50+', 
      label: locale === 'ar' ? 'حلول' : 'Solutions' 
    },
    { 
      icon: Users, 
      title: locale === 'ar' ? 'التميز' : 'Excellence', 
      metric: '98%', 
      label: locale === 'ar' ? 'الرضا' : 'Satisfaction' 
    },
    { 
      icon: Globe2, 
      title: locale === 'ar' ? 'الانتشار العالمي' : 'Global Reach', 
      metric: '12', 
      label: locale === 'ar' ? 'أسواق' : 'Markets' 
    }
  ]

  const timeline = [
    { 
      year: '2020', 
      title: locale === 'ar' ? 'تأسست في أبوظبي' : 'Founded in Abu Dhabi', 
      desc: locale === 'ar' ? 'التركيز على الاستثمار العقاري' : 'Real estate investment focus' 
    },
    { 
      year: '2021', 
      title: locale === 'ar' ? 'قسم التكنولوجيا' : 'Technology Division', 
      desc: locale === 'ar' ? 'الذكاء الاصطناعي والبنية التحتية السحابية' : 'AI and cloud infrastructure' 
    },
    { 
      year: '2023', 
      title: locale === 'ar' ? 'التوسع في البناء' : 'Construction Expansion', 
      desc: locale === 'ar' ? 'قدرات النفط والغاز' : 'Oil & gas capabilities' 
    },
    { 
      year: '2025', 
      title: locale === 'ar' ? 'قيادة السوق' : 'Market Leadership', 
      desc: locale === 'ar' ? 'التكامل بين أربعة قطاعات' : 'Four-sector integration' 
    }
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
      `}</style>

      {/* Hero Section with Image */}
      <section className="relative h-screen overflow-hidden" style={{ background: black }}>
        <div className="absolute inset-0 image-grain">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" 
            alt="RSW Group" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background: `rgba(0, 0, 0, 0.4)` }}/>
          <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'}`} style={{ background: `linear-gradient(${isRTL ? 'to left' : 'to right'}, rgba(0, 0, 0, 0.7) 0%, transparent 60%)` }}/>
        </div>

        <div className="relative h-full flex items-end pb-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 60 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.3 }} 
              className="max-w-4xl"
            >
              {/* Eyebrow */}
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

        {/* Scroll Indicator */}
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

      {/* Story Section */}
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
                      : 'Founded in Abu Dhabi in 2020, RSW Group emerged with a clear vision: to create lasting value across multiple sectors of the UAE\'s dynamic economy.'
                    }
                  </p>
                  <p>
                    {locale === 'ar'
                      ? 'اليوم، نحن ندير محفظة تمتد عبر أربعة قطاعات استراتيجية، تم اختيار كل منها لتآزرها وإمكانات نموها.'
                      : 'Today, we manage a portfolio spanning four strategic sectors, each chosen for its synergies and growth potential.'
                    }
                  </p>
                </div>

                {/* Timeline */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                  {timeline.map((item, idx) => (
                    <div key={idx} className={`flex gap-6 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="about-title text-2xl font-semibold" style={{ color: gold }}>
                        {item.year}
                      </div>
                      <div>
                        <h4 className="about-body font-semibold text-base mb-1" style={{ color: black }}>
                          {item.title}
                        </h4>
                        <p className="about-body text-sm" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
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

          {/* Sector Tabs */}
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

          {/* Active Sector Display */}
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

      {/* CTA Section - White Background */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div 
            className="rounded-3xl p-12 lg:p-16"
            style={{ 
              background: white,
              border: `2px solid ${gold}`
            }}
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
                    style={{ 
                      background: gold, 
                      color: black
                    }}
                  >
                    <span>{locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}</span>
                    <ArrowUpRight 
                      className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                      style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                    />
                  </button>

                  <button 
                    className="about-body px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                    style={{ 
                      background: white, 
                      color: gold,
                      border: `1px solid ${gold}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = gold
                      e.currentTarget.style.color = black
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = white
                      e.currentTarget.style.color = gold
                    }}
                  >
                    <span>{locale === 'ar' ? 'عرض الفرص' : 'View Opportunities'}</span>
                  </button>
                </div>
              </div>

              <div className={`hidden lg:flex items-center gap-8 ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
                {[
                  { icon: Shield, label: locale === 'ar' ? 'متوافق مع الإمارات' : 'UAE Compliant' }, 
                  { icon: Star, label: locale === 'ar' ? 'معتمد ISO' : 'ISO Certified' }, 
                  { icon: TrendingUp, label: locale === 'ar' ? 'رائد الصناعة' : 'Industry Leader' }
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