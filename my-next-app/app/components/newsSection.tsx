'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'
import Link from 'next/link'

interface SanityNewsItem {
  _id: string
  title: string
  excerpt: string
  category: string
  tag: string
  date: string
  readTime: string
  imageUrl: string
  slug: string
}

interface RSWNewsSectionProps {
  newsItems?: SanityNewsItem[]
}

const RSWNewsSection = ({ newsItems: sanityNews }: RSWNewsSectionProps) => {
  const { t, locale, direction } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');

  const gold = '#a79370';
  const black = '#000000';
  const white = '#ffffff';

  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'
  const titleFont = locale === 'ar' ? 'Tajawal, sans-serif' : 'Playfair Display, serif'

  const categories = t('news.categories');
  const newsData = sanityNews || t('news.items');

  const filteredNews = activeCategory === 'all'
    ? newsData
    : newsData.filter((item: any) => item.category === activeCategory);

  // Only show 3 on homepage
  const displayedNews = filteredNews.slice(0, 3);
  const hasMore = filteredNews.length > 3;

  return (
    <section
      className="relative min-h-screen overflow-hidden py-16 lg:py-24"
      style={{ background: white }}
      dir={direction}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

        .news-card-img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .news-card:hover .news-card-img {
          transform: scale(1.06);
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-12 lg:mb-16 text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px" style={{ background: gold }} />
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: gold, fontFamily: monoFont }}
            >
              {t('news.eyebrow')}
            </span>
            <div className="w-8 h-px" style={{ background: gold }} />
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: black, fontFamily: titleFont, fontWeight: 700 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('news.title')}
          </motion.h2>

          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Calendar className="w-4 h-4" style={{ color: gold }} />
            <span className="text-xs font-medium" style={{ color: gold, fontFamily }}>
              {t('news.updated')}
            </span>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((cat: any) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="px-4 py-2 rounded-full transition-all duration-300 text-xs font-medium capitalize"
                style={{
                  background: activeCategory === cat.key ? gold : 'rgba(167, 147, 112, 0.05)',
                  color: activeCategory === cat.key ? white : gold,
                  border: activeCategory === cat.key ? 'none' : '1px solid rgba(167, 147, 112, 0.25)',
                  fontFamily,
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* News Grid — always 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedNews.map((news: any, index: number) => (
            <Link href={`/news/${news.slug || news._id || index}`} key={news._id || index}>
              <motion.article
                className="news-card group cursor-pointer rounded-2xl overflow-hidden h-full"
                style={{
                  border: '1px solid rgba(167,147,112,0.15)',
                  boxShadow: '0 2px 16px rgba(167,147,112,0.07)',
                  background: white,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(167,147,112,0.18)' }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={
                      news.imageUrl ||
                      `https://images.unsplash.com/photo-${
                        news.category === 'real estate' ? '1545324418-cc1a3fa10c00' :
                        news.category === 'construction' ? '1504307651254-35680f356dfd' :
                        news.category === 'investment' ? '1454165804606-c3d57bc86b40' :
                        '1558618666-fcd25c85cd64'
                      }?w=1200&q=80`
                    }
                    alt={news.title}
                    className="news-card-img w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }}
                  />
                  {news.tag && (
                    <div
                      className="absolute top-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: gold,
                        color: black,
                        fontFamily: monoFont,
                        [direction === 'rtl' ? 'right' : 'left']: '12px',
                      }}
                    >
                      {news.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px]" style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}>
                      {news.date}
                    </span>
                    <div className="w-1 h-1 rounded-full" style={{ background: gold }} />
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: 'rgba(0,0,0,0.45)' }}>
                      <Clock className="w-3 h-3" />
                      <span style={{ fontFamily }}>{news.readTime}</span>
                    </div>
                  </div>

                  <h3
                    className="text-lg leading-tight mb-2 line-clamp-2"
                    style={{ color: black, fontFamily: titleFont, fontWeight: 700 }}
                  >
                    {news.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed mb-4 line-clamp-2"
                    style={{ color: 'rgba(0,0,0,0.6)', fontFamily }}
                  >
                    {news.excerpt}
                  </p>

                  <div
                    className="flex items-center gap-2 text-xs font-semibold group-hover:gap-3 transition-all"
                    style={{ color: gold }}
                  >
                    <span style={{ fontFamily }}>{t('news.readMore')}</span>
                    <ArrowUpRight
                      className="w-3 h-3"
                      strokeWidth={2.5}
                      style={{ transform: locale === 'ar' ? 'scaleX(-1)' : 'none' }}
                    />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* View All → /news */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/news">
            <button
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: gold,
                color: black,
                fontFamily,
                fontWeight: 500,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = black; e.currentTarget.style.color = gold }}
              onMouseLeave={(e) => { e.currentTarget.style.background = gold; e.currentTarget.style.color = black }}
            >
              <span className="text-sm">
                {locale === 'ar' ? 'عرض جميع الأخبار' : 'View All News'}
              </span>
              <ArrowRight
                className="w-4 h-4"
                strokeWidth={2}
                style={{ transform: locale === 'ar' ? 'scaleX(-1)' : 'none' }}
              />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RSWNewsSection;