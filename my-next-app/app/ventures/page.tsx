'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Cpu, 
  HardHat,
  ArrowUpRight,
  Minus
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const VenturesPage = () => {
  const [activeVenture, setActiveVenture] = useState(0);
  const { t, locale, direction } = useI18n();

  const purple = '#432c96';
  const isRTL = direction === 'rtl';

  const ventures = [
    {
      id: 'real-estate',
      icon: Building2,
      number: '01',
      title: locale === 'ar' ? 'العقارات' : 'Real Estate',
      subtitle: locale === 'ar' ? 'الاستثمار التجاري' : 'Commercial Investment',
      description: locale === 'ar' ? 'استثمارات عقارية استراتيجية، تأجير تجاري، وتطوير عقاري عبر أكثر الأسواق الإماراتية الواعدة. نركز على المواقع الاستراتيجية والعقارات عالية الجودة التي توفر عوائد طويلة الأجل.' : 'Strategic real estate investments, commercial leasing, and property development across UAE\'s most promising markets. We focus on prime locations and high-quality properties that deliver long-term value.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      capabilities: [
        {
          title: locale === 'ar' ? 'التأجير التجاري' : 'Commercial Leasing',
          desc: locale === 'ar' ? 'إدارة مساحات مكتبية وتجزئة متميزة عبر المواقع الرئيسية' : 'Premium office and retail space management across key locations'
        },
        {
          title: locale === 'ar' ? 'التطوير العقاري' : 'Property Development',
          desc: locale === 'ar' ? 'مشاريع تطوير عقاري شاملة من التصور إلى التسليم' : 'Comprehensive development projects from concept to delivery'
        },
        {
          title: locale === 'ar' ? 'إدارة الاستثمار' : 'Investment Management',
          desc: locale === 'ar' ? 'تحسين المحفظة والنمو الاستراتيجي للأصول' : 'Portfolio optimization and strategic asset growth'
        }
      ]
    },
    {
      id: 'construction',
      icon: HardHat,
      number: '02',
      title: locale === 'ar' ? 'البناء' : 'Construction',
      subtitle: locale === 'ar' ? 'التنفيذ المتكامل' : 'Integrated Execution',
      description: locale === 'ar' ? 'حلول إنشائية شاملة من منشآت النفط والغاز إلى المباني التجارية والتصميم الداخلي. نقدم خبرة تقنية متخصصة وإدارة مشاريع من الطراز العالمي.' : 'Full-spectrum construction solutions from oil & gas facilities to commercial buildings and interior design. We deliver specialized technical expertise and world-class project management.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
      capabilities: [
        {
          title: locale === 'ar' ? 'مقاولات البناء' : 'Building Contracting',
          desc: locale === 'ar' ? 'مشاريع تجارية وسكنية واسعة النطاق ذات معايير عالية' : 'Large-scale commercial and residential projects to exacting standards'
        },
        {
          title: locale === 'ar' ? 'منشآت النفط والغاز' : 'Oil & Gas Facilities',
          desc: locale === 'ar' ? 'بنية تحتية متخصصة للقطاع الصناعي والطاقة' : 'Specialized infrastructure for industrial and energy sectors'
        },
        {
          title: locale === 'ar' ? 'التصميم والتنفيذ' : 'Design & Build',
          desc: locale === 'ar' ? 'حلول متكاملة من المفهوم إلى الإنجاز' : 'Integrated solutions from concept through completion'
        }
      ]
    },
    {
      id: 'technology',
      icon: Cpu,
      number: '03',
      title: locale === 'ar' ? 'التكنولوجيا' : 'Technology',
      subtitle: locale === 'ar' ? 'الابتكار الرقمي' : 'Digital Innovation',
      description: locale === 'ar' ? 'حلول تكنولوجية متطورة تشمل أبحاث الذكاء الاصطناعي، الأمن السيبراني، الخدمات السحابية، وتطوير البرمجيات. نقود التحول الرقمي من خلال التكنولوجيا المتقدمة.' : 'Cutting-edge technology solutions spanning AI research, cybersecurity, cloud services, and software development. We drive digital transformation through advanced technology.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      capabilities: [
        {
          title: locale === 'ar' ? 'أبحاث الذكاء الاصطناعي' : 'AI Research',
          desc: locale === 'ar' ? 'تطوير حلول ذكية للتحديات التجارية المعقدة' : 'Developing intelligent solutions for complex business challenges'
        },
        {
          title: locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
          desc: locale === 'ar' ? 'حماية شاملة للأنظمة والبيانات المؤسسية' : 'Comprehensive protection for enterprise systems and data'
        },
        {
          title: locale === 'ar' ? 'الخدمات السحابية' : 'Cloud Services',
          desc: locale === 'ar' ? 'بنية تحتية قابلة للتوسع وإدارة سحابية متقدمة' : 'Scalable infrastructure and advanced cloud management'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;600;700;800&display=swap');
        
        [dir="ltr"] .ventures-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .ventures-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .ventures-body { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .ventures-body { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .ventures-mono { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .ventures-mono { font-family: 'Cairo', sans-serif; font-weight: 700; }
        
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px);
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>
      
      {/* Hero - Editorial Masthead */}
      <section className="relative h-screen overflow-hidden" style={{ background: purple }}>
        
        <div className="absolute inset-0 image-grain">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="RSW Ventures" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(67, 44, 150, 0.5)' }}/>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.2 }} 
              className={isRTL ? 'text-right' : ''}
            >
              {/* Issue/Edition Style */}
              <div className="mb-8">
                <div className={`ventures-mono text-xs uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {locale === 'ar' ? 'مجموعة RSW للاستثمار' : 'RSW Investment Group'}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12" style={{ background: 'rgba(255, 255, 255, 0.4)' }} />
                  <div className={`ventures-mono text-xs ${locale === 'ar' ? '' : 'tracking-widest'}`} 
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {locale === 'ar' ? '2026' : 'MMXXVI'}
                  </div>
                </div>
              </div>

              {/* Main Editorial Title */}
              <h1 className="ventures-title text-6xl lg:text-8xl font-light text-white mb-8 leading-[1.05]" 
                style={{ letterSpacing: '-0.01em' }}>
                {locale === 'ar' ? (
                  <>
                    استثمارات<br/>
                    <span className="italic font-serif">استراتيجية</span><br/>
                    عبر ثلاثة قطاعات
                  </>
                ) : (
                  <>
                    Strategic<br/>
                    <span className="italic font-serif">Investments</span><br/>
                    Across Three Sectors
                  </>
                )}
              </h1>

              {/* Deck/Subtitle */}
              <div className="max-w-2xl">
                <p className="ventures-body text-lg leading-relaxed text-white/90 mb-8">
                  {locale === 'ar' 
                    ? 'نهج متكامل للاستثمار في العقارات والبناء والتكنولوجيا، يدمج الخبرة العميقة في السوق مع الرؤية طويلة المدى.'
                    : 'An integrated approach to real estate, construction, and technology investment, combining deep market expertise with long-term vision.'
                  }
                </p>

                {/* Byline Style */}
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Minus className="w-6 h-6 text-white/60" strokeWidth={1} />
                  <span className="ventures-body text-sm text-white/70">
                    {locale === 'ar' ? 'أبوظبي، الإمارات العربية المتحدة' : 'Abu Dhabi, United Arab Emirates'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* Table of Contents / Index */}
      <section className="py-16 border-b" style={{ borderColor: 'rgba(67, 44, 150, 0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className={`ventures-mono text-[10px] uppercase mb-8 ${locale === 'ar' ? 'text-right' : ''} ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
            style={{ color: purple }}>
            {locale === 'ar' ? 'المحتويات' : 'Contents'}
          </div>

          <div className="grid md:grid-cols-3 gap-1">
            {ventures.map((venture, idx) => {
              const Icon = venture.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveVenture(idx)}
                  className={`group text-left p-8 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}
                  style={{
                    background: activeVenture === idx ? 'rgba(67, 44, 150, 0.03)' : 'transparent',
                    borderBottom: activeVenture === idx ? `2px solid ${purple}` : '2px solid transparent'
                  }}
                >
                  <div className={`flex items-start gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="ventures-mono text-xs" style={{ color: 'rgba(67, 44, 150, 0.4)' }}>
                      {venture.number}
                    </span>
                    <Icon className="w-5 h-5" style={{ color: purple }} strokeWidth={1.5} />
                  </div>
                  <h3 className="ventures-title text-2xl font-light mb-1" style={{ color: purple }}>
                    {venture.title}
                  </h3>
                  <p className="ventures-body text-xs" style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                    {venture.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Article - Active Venture */}
      <AnimatePresence mode="wait">
        {ventures.map((venture, idx) => {
          const Icon = venture.icon;
          return activeVenture === idx && (
            <motion.article
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="py-24 lg:py-32 bg-white"
            >
              <div className="max-w-6xl mx-auto px-6 lg:px-12">
                
                {/* Article Header */}
                <div className={`mb-16 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="ventures-mono text-sm" style={{ color: 'rgba(67, 44, 150, 0.4)' }}>
                      {venture.number}
                    </span>
                    <Minus className="w-8 h-8" style={{ color: 'rgba(67, 44, 150, 0.2)' }} strokeWidth={1} />
                    <span className={`ventures-mono text-xs uppercase ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                      style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                      {venture.subtitle}
                    </span>
                  </div>

                  <h2 className="ventures-title text-5xl lg:text-7xl font-light mb-8 leading-[1.05]" 
                    style={{ color: purple, letterSpacing: '-0.01em' }}>
                    {venture.title}
                  </h2>
                </div>

                {/* Two Column Layout - Editorial Style */}
                <div className="grid lg:grid-cols-12 gap-16">
                  
                  {/* Left Column - Image & Caption */}
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[4/5] rounded-sm overflow-hidden image-grain mb-4">
                      <img 
                        src={venture.image}
                        alt={venture.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(67, 44, 150, 0.1) 0%, transparent 50%)' }} />
                    </div>
                    {/* Photo Credit Style */}
                    <div className={`ventures-body text-xs italic ${isRTL ? 'text-right' : ''}`} 
                      style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                      {locale === 'ar' ? `${venture.title} — نظرة عامة على القطاع` : `${venture.title} — Sector Overview`}
                    </div>
                  </div>

                  {/* Right Column - Article Content */}
                  <div className={`lg:col-span-5 ${isRTL ? 'text-right' : ''}`}>
                    
                    {/* Drop Cap Style Intro */}
                    <div className="mb-12">
                      <p className="ventures-body text-lg leading-relaxed" style={{ color: 'rgba(67, 44, 150, 0.8)' }}>
                        {venture.description}
                      </p>
                    </div>

                    {/* Capabilities Section */}
                    <div>
                      <h3 className={`ventures-mono text-[10px] uppercase mb-8 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                        style={{ color: purple }}>
                        {locale === 'ar' ? 'القدرات الأساسية' : 'Core Capabilities'}
                      </h3>

                      <div className="space-y-8">
                        {venture.capabilities.map((cap, capIdx) => (
                          <motion.div
                            key={capIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: capIdx * 0.1 }}
                            className="pb-8"
                            style={{ borderBottom: '1px solid rgba(67, 44, 150, 0.1)' }}
                          >
                            <h4 className="ventures-title text-xl font-light mb-3" style={{ color: purple }}>
                              {cap.title}
                            </h4>
                            <p className="ventures-body text-sm leading-relaxed" 
                              style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                              {cap.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(67, 44, 150, 0.1)' }}>
                      <button className={`group inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="ventures-body text-sm font-medium" style={{ color: purple }}>
                          {locale === 'ar' ? 'استكشف المزيد' : 'Explore Further'}
                        </span>
                        <ArrowUpRight 
                          className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
                          style={{ color: purple, transform: isRTL ? 'scaleX(-1)' : 'none' }}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>

      {/* Editorial Footer / Colophon */}
      <section className="py-24 border-t" style={{ borderColor: 'rgba(67, 44, 150, 0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Info Block */}
            <div className={isRTL ? 'text-right' : ''}>
              <div className={`ventures-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                {locale === 'ar' ? 'ابدأ المحادثة' : 'Begin the Conversation'}
              </div>

              <h2 className="ventures-title text-4xl lg:text-5xl font-light mb-6 leading-tight" 
                style={{ color: purple, letterSpacing: '-0.01em' }}>
                {locale === 'ar' ? (
                  <>استثمر في<br/>المستقبل</>
                ) : (
                  <>Invest in<br/>the Future</>
                )}
              </h2>

              <p className="ventures-body text-base leading-relaxed mb-8" 
                style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                {locale === 'ar'
                  ? 'تواصل مع فريقنا لمناقشة فرص الاستثمار عبر محفظتنا المتنوعة من العقارات والبناء والتكنولوجيا.'
                  : 'Connect with our team to discuss investment opportunities across our diversified portfolio of real estate, construction, and technology.'
                }
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button 
                  className="ventures-body inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-all hover:shadow-lg"
                  style={{ 
                    background: purple,
                    color: 'white'
                  }}>
                  <span>{locale === 'ar' ? 'طلب معلومات' : 'Request Information'}</span>
                  <ArrowUpRight 
                    className="w-4 h-4" 
                    style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                    strokeWidth={1.5}
                  />
                </button>

                <button 
                  className="ventures-body inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all"
                  style={{ 
                    background: 'transparent',
                    color: purple,
                    border: `1px solid ${purple}`
                  }}>
                  <span>{locale === 'ar' ? 'حدد استشارة' : 'Schedule Consultation'}</span>
                </button>
              </div>
            </div>

            {/* Right - Metadata */}
            <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>
              <div className="pb-8" style={{ borderBottom: '1px solid rgba(67, 44, 150, 0.1)' }}>
                <div className={`ventures-mono text-[9px] uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                  style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  {locale === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
                </div>
                <div className="ventures-body text-sm" style={{ color: purple }}>
                  {locale === 'ar' ? 'أبوظبي، الإمارات' : 'Abu Dhabi, UAE'}
                </div>
              </div>

              <div className="pb-8" style={{ borderBottom: '1px solid rgba(67, 44, 150, 0.1)' }}>
                <div className={`ventures-mono text-[9px] uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                  style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  {locale === 'ar' ? 'القطاعات' : 'Sectors'}
                </div>
                <div className="ventures-body text-sm" style={{ color: purple }}>
                  {locale === 'ar' ? 'العقارات • البناء • التكنولوجيا' : 'Real Estate • Construction • Technology'}
                </div>
              </div>

              <div>
                <div className={`ventures-mono text-[9px] uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                  style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  {locale === 'ar' ? 'الامتثال' : 'Compliance'}
                </div>
                <div className="ventures-body text-sm" style={{ color: purple }}>
                  {locale === 'ar' ? 'متوافق مع هيئة الأوراق المالية في الإمارات' : 'UAE DFM Compliant'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenturesPage;