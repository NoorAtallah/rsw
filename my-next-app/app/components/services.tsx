'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Wrench, Handshake, Leaf, ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { createClient } from '@/lib/supabase/client'
import { iconMap } from '@/app/admin/components/IconPicker'
import Link from 'next/link'

const defaultApproachIcons = [Shield, Wrench, Handshake, Leaf]

const defaultSectorImages = [
  'https://img.freepik.com/free-photo/skyscrapers-view_1112-268.jpg?semt=ais_user_personalization&w=740&q=80',
  'https://media.istockphoto.com/id/608601538/photo/moden-glass-building.jpg',
  'https://cdn.alromaizan.com/image/upload/v1732525687/media/images/i31wglsx3wqnf0cp55ya.webp',
]

export default function RSWInvestmentsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [activeInvestment, setActiveInvestment] = useState<number | null>(null)
  const { t, locale, direction } = useI18n()

  const [dbApproaches, setDbApproaches] = useState<any[]>([])
  const [dbSectors, setDbSectors] = useState<any[]>([])

  const gold = '#a79370'
  const white = '#ffffff'
  const black = '#000000'
  const lightGold = '#f8f6f3'

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const { data } = await supabase
        .from('content_arrays')
        .select('*')
        .in('section', ['investments.approaches', 'investments.sectors'])
        .order('order_index')

      if (data) {
        const approachRows = data.filter(r => r.section === 'investments.approaches')
        const sectorRows = data.filter(r => r.section === 'investments.sectors')

        if (approachRows.length) setDbApproaches(approachRows.map((r, i) => ({
          id: i + 1,
          icon: r.data_en?.icon || 'Shield',
          title: locale === 'ar' ? r.data_ar?.title : r.data_en?.title,
          description: locale === 'ar' ? r.data_ar?.description : r.data_en?.description,
        })))

        if (sectorRows.length) setDbSectors(sectorRows.map((r, i) => ({
          id: i + 1,
          title: locale === 'ar' ? r.data_ar?.title : r.data_en?.title,
          description: locale === 'ar' ? r.data_ar?.description : r.data_en?.description,
          image: r.data_en?.image || defaultSectorImages[i],
          href: r.data_en?.href || '/ventures',
        })))
      }
    }
    fetchData()
  }, [locale])

  // Fallback to translation file
  const approaches = dbApproaches.length ? dbApproaches : [
    { id: 1, icon: 'Shield', title: t('investments.approach.risk.title'), description: t('investments.approach.risk.description') },
    { id: 2, icon: 'Wrench', title: t('investments.approach.operational.title'), description: t('investments.approach.operational.description') },
    { id: 3, icon: 'Users', title: t('investments.approach.partnerships.title'), description: t('investments.approach.partnerships.description') },
    { id: 4, icon: 'Leaf', title: t('investments.approach.sustainable.title'), description: t('investments.approach.sustainable.description') },
  ]

  const investments = dbSectors.length ? dbSectors : [
    { id: 1, title: t('investments.sectors.realEstate.title'), description: t('investments.sectors.realEstate.description'), image: defaultSectorImages[0], href: '/ventures/real-estate' },
    { id: 2, title: t('investments.sectors.infrastructure.title'), description: t('investments.sectors.infrastructure.description'), image: defaultSectorImages[1], href: '/ventures/infrastructure' },
    { id: 3, title: t('investments.sectors.technology.title'), description: t('investments.sectors.technology.description'), image: defaultSectorImages[2], href: '/ventures/technology' },
  ]

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden" style={{ background: white }} dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@200;300;400;500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap');
        .investment-card-hover { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .investment-card-hover:hover { transform: translateY(-4px); }
        .investment-image-overlay { background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-5" style={{ background: gold }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px" style={{ background: gold }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: gold, fontFamily: locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace', fontWeight: locale === 'ar' ? 500 : 400 }}
            >
              {t('investments.eyebrow')}
            </span>
            <div className="w-12 h-px" style={{ background: gold }} />
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6"
            style={{ color: black, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
          >
            {locale === 'ar' ? (
              <span className="font-bold">{t('investments.title')}</span>
            ) : (
              <>Our <span className="font-bold" style={{ color: gold }}>Investments</span></>
            )}
          </h2>

          <p
            className="text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-8"
            style={{ color: 'rgba(0,0,0,0.7)', fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
          >
            {t('investments.description')}
          </p>

          <div
            className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl"
            style={{ background: lightGold, border: `1px solid rgba(167,147,112,0.2)` }}
          >
            <h3
              className="text-lg md:text-xl font-semibold mb-3"
              style={{ color: gold, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
            >
              {t('investments.vision.title')}
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'rgba(0,0,0,0.7)', fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
            >
              {t('investments.vision.description')}
            </p>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-12 md:mb-16">
          <h3
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
            style={{ color: black, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
          >
            {t('investments.approachTitle')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {approaches.map((approach: any, index: number) => {
              const Icon = iconMap[approach.icon] || defaultApproachIcons[index] || Shield
              return (
                <motion.div
                  key={approach.id}
                  className="relative p-6 md:p-7 rounded-xl cursor-pointer group transition-all duration-300"
                  style={{
                    background: activeCard === approach.id ? gold : lightGold,
                    border: `1px solid ${activeCard === approach.id ? gold : 'rgba(167,147,112,0.2)'}`,
                  }}
                  onMouseEnter={() => setActiveCard(approach.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ background: activeCard === approach.id ? 'rgba(0,0,0,0.15)' : white }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: activeCard === approach.id ? black : gold, strokeWidth: 1.5 }}
                    />
                  </div>
                  <h4
                    className="text-base font-semibold mb-3"
                    style={{ color: black, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
                  >
                    {approach.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: activeCard === approach.id ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.65)', fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
                  >
                    {approach.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Investment Sectors */}
        <div>
          <h3
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
            style={{ color: black, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
          >
            {t('investments.sectorsTitle')}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {investments.map((investment: any, index: number) => (
              <Link href={investment.href} key={investment.id}>
                <motion.div
                  className="investment-card-hover group cursor-pointer rounded-2xl overflow-hidden"
                  style={{
                    background: white,
                    border: `1px solid rgba(167,147,112,0.25)`,
                    boxShadow: activeInvestment === investment.id
                      ? '0 20px 60px rgba(167,147,112,0.3)'
                      : '0 4px 20px rgba(167,147,112,0.1)',
                  }}
                  onMouseEnter={() => setActiveInvestment(investment.id)}
                  onMouseLeave={() => setActiveInvestment(null)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={investment.image}
                      alt={investment.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="investment-image-overlay absolute inset-0" />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, rgba(167,147,112,0.3) 0%, transparent 50%)`,
                        opacity: activeInvestment === investment.id ? 1 : 0,
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h4
                      className="text-xl font-bold mb-3 transition-colors duration-300"
                      style={{ color: activeInvestment === investment.id ? gold : black, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
                    >
                      {investment.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: 'rgba(0,0,0,0.7)', fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
                    >
                      {investment.description}
                    </p>
                    <div
                      className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                      style={{ color: gold, fontFamily: locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif' }}
                    >
                      <span>{t('investments.learnMore')}</span>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                        style={{ transform: locale === 'ar' ? 'scaleX(-1)' : 'none' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}