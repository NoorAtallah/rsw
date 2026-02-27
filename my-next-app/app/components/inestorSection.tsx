'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, TrendingUp, Download, ExternalLink, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'
import { createClient } from '@/lib/supabase/client'
import { iconMap } from '@/app/admin/components/IconPicker'

const defaultIcons = [Shield, FileText, Users, TrendingUp]

const RSWInvestorRelationsSection = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const { t, locale, direction } = useI18n();
  const [dbSections, setDbSections] = useState<any[]>([])
  const [dbDocuments, setDbDocuments] = useState<any[]>([])

  const gold = '#a79370';
  const black = '#000000';
  const white = '#ffffff';
  const isRTL = direction === 'rtl';

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const { data } = await supabase
        .from('content_arrays')
        .select('*')
        .in('section', ['investorRelations.sections', 'investorRelations.documents'])
        .order('order_index')

      if (data) {
        const sectionRows = data.filter(r => r.section === 'investorRelations.sections')
        const docRows = data.filter(r => r.section === 'investorRelations.documents')

        if (sectionRows.length) setDbSections(sectionRows.map((r, i) => ({
          icon: r.data_en?.icon || 'Shield',
          title: locale === 'ar' ? r.data_ar?.title : r.data_en?.title,
          description: locale === 'ar' ? r.data_ar?.description : r.data_en?.description,
          color: ['#a79370', '#b8a482', '#c9b594', '#dac6a6'][i] || gold,
        })))

        if (docRows.length) setDbDocuments(docRows.map(r => ({
          name: locale === 'ar' ? r.data_ar?.name : r.data_en?.name,
          size: r.data_en?.size,
          type: r.data_en?.type,
        })))
      }
    }
    fetchData()
  }, [locale])

  // Fallback to translations
  const sections = dbSections.length ? dbSections : [
    { icon: 'Shield', title: t('investorRelations.sections.governance.title'), description: t('investorRelations.sections.governance.description'), color: gold },
    { icon: 'FileText', title: t('investorRelations.sections.disclosure.title'), description: t('investorRelations.sections.disclosure.description'), color: '#b8a482' },
    { icon: 'Users', title: t('investorRelations.sections.shareholder.title'), description: t('investorRelations.sections.shareholder.description'), color: '#c9b594' },
    { icon: 'TrendingUp', title: t('investorRelations.sections.performance.title'), description: t('investorRelations.sections.performance.description'), color: '#dac6a6' },
  ]

  const documents = dbDocuments.length ? dbDocuments : t('investorRelations.documents')

  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: white }} dir={direction}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Tajawal:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        [dir="ltr"] .ir-title { font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: -0.02em; }
        [dir="rtl"] .ir-title { font-family: 'Tajawal', sans-serif; font-weight: 700; }
        [dir="ltr"] .ir-body { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .ir-body { font-family: 'IBM Plex Sans Arabic', sans-serif; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px" style={{ background: gold }} />
            <span className="ir-body text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: gold }}>
              {t('investorRelations.eyebrow')}
            </span>
            <div className="w-8 h-px" style={{ background: gold }} />
          </motion.div>

          <motion.h2
            className="ir-title text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: black }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('investorRelations.title')}
          </motion.h2>

          <motion.p
            className="ir-body text-sm max-w-2xl mx-auto"
            style={{ color: 'rgba(0, 0, 0, 0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('investorRelations.description')}
          </motion.p>
        </div>

        {/* Accordion Sections */}
        <div className="mb-12 space-y-3">
          {sections.map((section: any, index: number) => {
            const Icon = iconMap[section.icon] || defaultIcons[index] || Shield
            const isActive = activeAccordion === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveAccordion(isActive ? null : index)}
                  className="w-full p-5 rounded-xl transition-all duration-300 text-start"
                  style={{
                    background: isActive ? 'rgba(167, 147, 112, 0.08)' : 'rgba(167, 147, 112, 0.03)',
                    border: `1px solid ${isActive ? 'rgba(167, 147, 112, 0.25)' : 'rgba(167, 147, 112, 0.15)'}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(167, 147, 112, 0.12)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: section.color }} strokeWidth={1.5} />
                      </div>
                      <h3 className="ir-body text-base font-semibold flex-1" style={{ color: black }}>
                        {section.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 transition-transform duration-300 flex-shrink-0"
                      style={{ color: gold, transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      strokeWidth={2}
                    />
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? '16px' : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="ir-body text-sm leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)', paddingInlineStart: '4rem' }}>
                      {section.description}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 rounded-xl" style={{ background: 'rgba(167, 147, 112, 0.05)', border: '1px solid rgba(167, 147, 112, 0.2)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(167, 147, 112, 0.15)' }}>
                <FileText className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="ir-body text-base font-semibold" style={{ color: black }}>{t('investorRelations.documentsTitle')}</h3>
                <p className="ir-body text-[10px]" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{t('investorRelations.documentsSubtitle')}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
          {documents.map((doc: any, index: number) => (
            <a
           key={index}
           href={doc.url || '#'}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-4 rounded-lg transition-all duration-300 hover:shadow-md"
          style={{ background: white, border: '1px solid rgba(167, 147, 112, 0.2)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(167, 147, 112, 0.2)' }}
          >
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(167, 147, 112, 0.12)' }}>
      <FileText className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
    </div>
    <div className="flex-1 min-w-0 text-start">
      <p className="ir-body text-xs font-semibold truncate" style={{ color: black }}>{doc.name}</p>
      <p className="ir-body text-[9px]" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{doc.type} • {doc.size}</p>
    </div>
    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform flex-shrink-0" style={{ color: doc.url ? gold : '#ccc' }} strokeWidth={2} />
  </a>
))}
            </div>
          </div>
        </motion.div>

        {/* Contact IR */}
        <motion.div
          className="mt-8 text-center p-6 rounded-xl"
          style={{ background: black }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="ir-body text-lg font-semibold text-white mb-2">{t('investorRelations.contact.title')}</h3>
          <p className="ir-body text-sm text-white/80 mb-4">{t('investorRelations.contact.description')}</p>
          <a
            href="mailto:ir@rswinvestment.ae"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{ background: gold, color: black }}
          >
            <span className="ir-body text-xs font-semibold">{t('investorRelations.contact.button')}</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default RSWInvestorRelationsSection;