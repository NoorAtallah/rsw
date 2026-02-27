'use client'

import { useI18n } from '@/i18n/I18nProvider'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

const gold = '#a79370'

export default function NewsArticle({ article }: { article: any }) {
  const { locale, direction } = useI18n()
  const isRTL = direction === 'rtl'

  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const titleFont = locale === 'ar' ? 'Tajawal, sans-serif' : 'Playfair Display, serif'
  const monoFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'

  // Pick correct language data
  const data = locale === 'ar' ? article.data_ar : article.data_en
  const enData = article.data_en // always use en for shared fields like image, stats

  const bodyText = data?.body || enData?.body || ''
  const excerptText = data?.excerpt || enData?.excerpt || ''
  const displayText = bodyText || excerptText

  return (
    <main className="min-h-screen bg-white" dir={direction}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden" style={{ background: '#111' }}>
        {enData?.image_url && (
          <img
            src={enData.image_url}
            alt={data?.title}
            className="w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />

        {/* Back button */}
        <Link
          href="/news"
          className="absolute top-8 flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all"
          style={{
            [isRTL ? 'right' : 'left']: '24px',
            background: 'rgba(167,147,112,0.2)',
            border: '1px solid rgba(167,147,112,0.4)',
            color: gold,
            fontFamily,
          }}
        >
          <ArrowLeft className="w-4 h-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          {locale === 'ar' ? 'عودة للأخبار' : 'Back to News'}
        </Link>

        {/* Category tag at bottom */}
        <div className="absolute bottom-8 px-6 w-full">
          <div className="max-w-3xl mx-auto">
            <span
              className="text-xs px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: gold, color: '#000', fontFamily: monoFont }}
            >
              {data?.category}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Meta */}
        <div className={`flex items-center gap-4 mb-6 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
            <span className="text-sm" style={{ color: '#999', fontFamily: monoFont }}>{enData?.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
            <span className="text-sm" style={{ color: '#999', fontFamily: monoFont }}>{enData?.readTime}</span>
          </div>
          {data?.tag && (
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
              <span className="text-sm" style={{ color: gold, fontFamily: monoFont }}>{data.tag}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold leading-tight mb-6"
          style={{ color: '#000', fontFamily: titleFont }}
        >
          {data?.title}
        </h1>

        {/* Stats badge */}
        {enData?.stats?.value && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(167,147,112,0.08)', border: '1px solid rgba(167,147,112,0.25)' }}
          >
            <span className="text-lg font-bold" style={{ color: gold }}>
              {enData.stats.value}
            </span>
            <span className="text-sm" style={{ color: '#999', fontFamily }}>
              {data?.stats?.label || enData?.stats?.label}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="w-16 h-px mb-8" style={{ background: gold }} />

        {/* Body text */}
        <div className="space-y-5">
          {displayText.split('\n').filter((p: string) => p.trim()).map((paragraph: string, i: number) => (
            <p
              key={i}
              className="text-base leading-relaxed"
              style={{ color: 'rgba(0,0,0,0.75)', fontFamily, lineHeight: '1.9' }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(167,147,112,0.2)' }}>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: gold, fontFamily }}
          >
            <ArrowLeft className="w-4 h-4" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            {locale === 'ar' ? 'العودة إلى جميع الأخبار' : 'Back to all news'}
          </Link>
        </div>
      </div>
    </main>
  )
}