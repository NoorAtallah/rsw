'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider'

const RSWNewsSection = () => {
  const { t, locale, direction } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const categories = t('news.categories');
  const newsItems = t('news.items');

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter((item: any) => item.category === activeCategory);

  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 3);

  return (
    <section 
      className="relative min-h-screen overflow-hidden py-16 lg:py-24"
      style={{ background: '#ffffff' }}
      dir={direction}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        
        [dir="ltr"] .news-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        [dir="rtl"] .news-title {
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
        }
        
        [dir="ltr"] .news-body {
          font-family: 'Inter', sans-serif;
        }
        
        [dir="rtl"] .news-body {
          font-family: 'IBM Plex Sans Arabic', sans-serif;
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
            <div className="w-8 h-px" style={{ background: '#432c96' }} />
            <span 
              className="news-body text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: 'rgba(67, 44, 150, 0.6)' }}
            >
              {t('news.eyebrow')}
            </span>
            <div className="w-8 h-px" style={{ background: '#432c96' }} />
          </motion.div>
          
          <motion.h2 
            className="news-title text-4xl lg:text-5xl leading-tight mb-4"
            style={{ color: '#432c96' }}
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
            <Calendar className="w-4 h-4" style={{ color: '#432c96' }} />
            <span className="news-body text-xs font-medium" style={{ color: '#432c96' }}>
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
                onClick={() => {
                  setActiveCategory(cat.key);
                  setShowAll(false);
                }}
                className="px-4 py-2 rounded-full transition-all duration-300 news-body text-xs font-medium capitalize"
                style={{
                  background: activeCategory === cat.key ? '#432c96' : 'rgba(67, 44, 150, 0.05)',
                  color: activeCategory === cat.key ? '#ffffff' : '#432c96',
                  border: activeCategory === cat.key ? 'none' : '1px solid rgba(67, 44, 150, 0.15)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedNews.map((news: any, index: number) => (
            <motion.article
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img 
                  src={`https://images.unsplash.com/photo-${
                    news.category === 'real estate' ? '1545324418-cc1a3fa10c00' :
                    news.category === 'construction' ? '1504307651254-35680f356dfd' :
                    news.category === 'investment' ? '1454165804606-c3d57bc86b40' :
                    '1558618666-fcd25c85cd64'
                  }?w=1200&q=80`}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(67, 44, 150, 0.7) 0%, transparent 50%)'
                  }}
                />
                
                {/* Tag */}
                <div 
                  className={`absolute top-3 ${locale === 'ar' ? 'right-3' : 'left-3'} px-2.5 py-1 rounded-full backdrop-blur-sm news-body text-[9px] font-bold uppercase tracking-wider`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {news.tag}
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center gap-2 mb-3">
                <span className="news-body text-[10px]" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  {news.date}
                </span>
                <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(67, 44, 150, 0.3)' }} />
                <div className="flex items-center gap-1 text-[10px]" style={{ color: 'rgba(67, 44, 150, 0.5)' }}>
                  <Clock className="w-3 h-3" />
                  <span className="news-body">{news.readTime}</span>
                </div>
              </div>

              <h3 
                className="news-title text-lg lg:text-xl leading-tight mb-2 group-hover:text-opacity-80 transition-all"
                style={{ color: '#432c96' }}
              >
                {news.title}
              </h3>

              <p 
                className="news-body text-xs leading-relaxed mb-4 line-clamp-2"
                style={{ color: 'rgba(67, 44, 150, 0.6)' }}
              >
                {news.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#432c96' }}>
                <span className="news-body">{t('news.readMore')}</span>
                <ArrowUpRight 
                  className="w-3 h-3" 
                  strokeWidth={2.5}
                  style={{
                    transform: locale === 'ar' ? 'scaleX(-1)' : 'none'
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View More Button */}
        {filteredNews.length > 3 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
              style={{
                background: showAll ? 'rgba(67, 44, 150, 0.1)' : '#432c96',
                color: showAll ? '#432c96' : '#ffffff',
                border: showAll ? '1px solid rgba(67, 44, 150, 0.2)' : 'none'
              }}
            >
              <span className="news-body text-sm font-semibold">
                {showAll ? t('news.showLess') : t('news.viewMore')}
              </span>
              <ArrowRight 
                className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                strokeWidth={2}
                style={{
                  transform: locale === 'ar' ? (showAll ? 'rotate(180deg) scaleX(-1)' : 'scaleX(-1)') : (showAll ? 'rotate(180deg)' : 'none')
                }}
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RSWNewsSection;