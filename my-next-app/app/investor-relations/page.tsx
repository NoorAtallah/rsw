'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield,
  FileText,
  Users,
  TrendingUp,
  Download,
  ArrowUpRight,
  Minus,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const InvestorRelationsPage = () => {
  const { t, locale, direction } = useI18n();
  
  const purple = '#432c96';
  const isRTL = direction === 'rtl';

  // Get translations
  const ir = (t as any)('investorRelations');

  const sections = [
    {
      icon: Shield,
      key: 'governance',
      data: ir.sections.governance
    },
    {
      icon: FileText,
      key: 'disclosure',
      data: ir.sections.disclosure
    },
    {
      icon: Users,
      key: 'shareholder',
      data: ir.sections.shareholder
    },
    {
      icon: TrendingUp,
      key: 'performance',
      data: ir.sections.performance
    }
  ];

  const compliance = [
    {
      title: locale === 'ar' ? 'هيئة الأوراق المالية والسلع' : 'Securities & Commodities Authority',
      abbr: 'SCA'
    },
    {
      title: locale === 'ar' ? 'سوق دبي المالي' : 'Dubai Financial Market',
      abbr: 'DFM'
    },
    {
      title: locale === 'ar' ? 'قانون حماية البيانات الشخصية' : 'Personal Data Protection Law',
      abbr: 'PDPL'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;600;700;800&display=swap');
        
        [dir="ltr"] .ir-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .ir-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .ir-body { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .ir-body { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .ir-mono { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .ir-mono { font-family: 'Cairo', sans-serif; font-weight: 700; }
        
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
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" 
            alt="Investor Relations" 
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
                <div className={`ir-mono text-xs uppercase mb-2 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {locale === 'ar' ? 'مجموعة RSW للاستثمار' : 'RSW Investment Group'}
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12" style={{ background: 'rgba(255, 255, 255, 0.4)' }} />
                  <div className={`ir-mono text-xs ${locale === 'ar' ? '' : 'tracking-widest'}`} 
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {ir.eyebrow}
                  </div>
                </div>
              </div>

              {/* Main Editorial Title */}
              <h1 className="ir-title text-6xl lg:text-8xl font-light text-white mb-8 leading-[1.05]" 
                style={{ letterSpacing: '-0.01em' }}>
                {ir.title}
              </h1>

              {/* Deck/Subtitle */}
              <div className="max-w-2xl">
                <p className="ir-body text-lg leading-relaxed text-white/90 mb-8">
                  {ir.description}
                </p>

                {/* Byline Style */}
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Minus className="w-6 h-6 text-white/60" strokeWidth={1} />
                  <span className="ir-body text-sm text-white/70">
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

      {/* Governance Framework Sections */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          {/* Section Header */}
          <div className={`mb-20 ${isRTL ? 'text-right' : ''}`}>
            <div className={`ir-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
              style={{ color: purple }}>
              {locale === 'ar' ? 'الإطار التنظيمي' : 'Governance Framework'}
            </div>
            <h2 className="ir-title text-4xl lg:text-5xl font-light mb-6 leading-tight" 
              style={{ color: purple, letterSpacing: '-0.01em' }}>
              {locale === 'ar' ? 'التزامنا بالشفافية' : 'Our Commitment to Transparency'}
            </h2>
          </div>

          {/* Sections Grid */}
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`pb-12 ${isRTL ? 'text-right' : ''}`}
                  style={{ borderBottom: '1px solid rgba(67, 44, 150, 0.1)' }}
                >
                  <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(67, 44, 150, 0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: purple }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="ir-title text-2xl font-light mb-3" style={{ color: purple }}>
                        {section.data.title}
                      </h3>
                      <p className="ir-body text-base leading-relaxed" 
                        style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                        {section.data.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Documents Section */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className={`mb-16 ${isRTL ? 'text-right' : ''}`}>
            <div className={`ir-mono text-[10px] uppercase mb-4 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
              style={{ color: purple }}>
              {ir.documentsTitle}
            </div>
            <h2 className="ir-title text-3xl lg:text-4xl font-light mb-3" 
              style={{ color: purple, letterSpacing: '-0.01em' }}>
              {ir.documentsSubtitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {ir.documents.map((doc: any, idx: number) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group flex items-center justify-between p-6 bg-white transition-all duration-300 hover:shadow-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                style={{ border: '1px solid rgba(67, 44, 150, 0.1)' }}
                whileHover={{ y: -4 }}
              >
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(67, 44, 150, 0.08)' }}>
                    <FileText className="w-5 h-5" style={{ color: purple }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="ir-body text-base font-semibold mb-1" style={{ color: purple }}>
                      {doc.name}
                    </h3>
                    <div className={`ir-mono text-xs ${locale === 'ar' ? '' : 'tracking-wide'}`} 
                      style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                      {doc.type} • {doc.size}
                    </div>
                  </div>
                </div>
                <Download 
                  className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" 
                  style={{ color: purple }} 
                  strokeWidth={1.5}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
            <div className={`ir-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
              style={{ color: purple }}>
              {locale === 'ar' ? 'الامتثال التنظيمي' : 'Regulatory Compliance'}
            </div>
            <h2 className="ir-title text-3xl lg:text-4xl font-light max-w-3xl mx-auto" 
              style={{ color: purple, letterSpacing: '-0.01em' }}>
              {locale === 'ar' 
                ? 'الالتزام الكامل بالمعايير التنظيمية في الإمارات'
                : 'Full Adherence to UAE Regulatory Standards'
              }
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {compliance.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-8 ${isRTL ? 'text-right' : ''}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ background: 'rgba(67, 44, 150, 0.08)' }}>
                  <CheckCircle2 className="w-7 h-7" style={{ color: purple }} strokeWidth={1.5} />
                </div>
                <div className={`ir-mono text-2xl font-bold mb-2 ${locale === 'ar' ? '' : 'tracking-wide'}`} 
                  style={{ color: purple }}>
                  {item.abbr}
                </div>
                <p className="ir-body text-sm" style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact IR Team Section */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Info */}
            <div className={isRTL ? 'text-right' : ''}>
              <div className={`ir-mono text-[10px] uppercase mb-6 ${locale === 'ar' ? '' : 'tracking-[0.3em]'}`} 
                style={{ color: 'rgba(67, 44, 150, 0.6)' }}>
                {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </div>

              <h2 className="ir-title text-4xl lg:text-5xl font-light mb-6 leading-tight" 
                style={{ color: purple, letterSpacing: '-0.01em' }}>
                {ir.contact.title}
              </h2>

              <p className="ir-body text-base leading-relaxed mb-8" 
                style={{ color: 'rgba(67, 44, 150, 0.7)' }}>
                {ir.contact.description}
              </p>

              <button 
                className={`ir-body group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium transition-all hover:shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{ 
                  background: purple,
                  color: 'white'
                }}>
                <span>{ir.contact.button}</span>
                <ArrowUpRight 
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Right - Contact Details */}
            <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>
              
              <div className="pb-8" style={{ borderBottom: '1px solid rgba(67, 44, 150, 0.1)' }}>
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-5 h-5" style={{ color: purple }} strokeWidth={1.5} />
                  <div className={`ir-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                    style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </div>
                </div>
                <div className="ir-body text-base" style={{ color: purple }}>
                  ir@rswinvestment.ae
                </div>
              </div>

              <div className="pb-8" style={{ borderBottom: '1px solid rgba(67, 44, 150, 0.1)' }}>
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-5 h-5" style={{ color: purple }} strokeWidth={1.5} />
                  <div className={`ir-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                    style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                    {locale === 'ar' ? 'الهاتف' : 'Phone'}
                  </div>
                </div>
                <div className="ir-body text-base" style={{ color: purple }}>
                  +971 2 612 3456
                </div>
              </div>

              <div>
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Building2 className="w-5 h-5" style={{ color: purple }} strokeWidth={1.5} />
                  <div className={`ir-mono text-[9px] uppercase ${locale === 'ar' ? '' : 'tracking-wider'}`} 
                    style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                    {locale === 'ar' ? 'المكتب' : 'Office'}
                  </div>
                </div>
                <div className="ir-body text-base leading-relaxed" style={{ color: purple }}>
                  {locale === 'ar' 
                    ? 'جزيرة المارية، سوق أبوظبي العالمي\nأبوظبي، الإمارات العربية المتحدة'
                    : 'Al Maryah Island, Abu Dhabi Global Market\nAbu Dhabi, United Arab Emirates'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 border-t" style={{ borderColor: 'rgba(67, 44, 150, 0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className={`ir-body text-xs leading-relaxed ${isRTL ? 'text-right' : ''}`} 
            style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
            {locale === 'ar' 
              ? 'إخلاء المسؤولية: المعلومات المقدمة هنا لأغراض إعلامية فقط ولا تشكل عرضاً أو دعوة لشراء أو بيع أي أوراق مالية. يجب على المستثمرين المحتملين إجراء العناية الواجبة الخاصة بهم واستشارة مستشاريهم الماليين والقانونيين قبل اتخاذ أي قرارات استثمارية. الأداء السابق لا يضمن النتائج المستقبلية.'
              : 'Disclaimer: The information provided herein is for informational purposes only and does not constitute an offer or solicitation to buy or sell any securities. Prospective investors should conduct their own due diligence and consult with their financial and legal advisors before making any investment decisions. Past performance does not guarantee future results.'
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorRelationsPage;