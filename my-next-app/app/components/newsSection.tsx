'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, ArrowRight } from 'lucide-react';

const RSWNewsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const categories = ['all', 'construction', 'real estate', 'investment', 'technology'];

  const newsItems = [
    {
      category: 'real estate',
      date: 'Feb 9, 2026',
      readTime: '3 min',
      title: 'Dubai Property Sales Shatter Records',
      excerpt: 'Dubais real estate market has started 2026 with historic momentum, recording AED 72.4 billion in transactions.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      source: 'Property Finder',
      tag: 'Breaking',
      stats: { value: '63%', label: 'YoY Growth' }
    },
    {
      category: 'construction',
      date: 'Jan 15, 2026',
      readTime: '4 min',
      title: 'UAE Construction Industry Enters Digital Era',
      excerpt: 'The UAE construction sector is undergoing a transformation with 37% of businesses now using AI and machine learning.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
      source: 'PlanRadar',
      tag: 'Trends',
      stats: { value: '37%', label: 'Using AI/ML' }
    },
    {
      category: 'investment',
      date: 'Jan 27, 2026',
      readTime: '2 min',
      title: 'Property Finder Secures $170M Investment',
      excerpt: 'Property Finder announced a new $170 million investment from Mubadala Investment Company.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
      source: 'Property Finder',
      tag: 'Investment',
      stats: { value: '$170M', label: 'Funding' }
    },
    {
      category: 'real estate',
      date: 'Jan 12, 2026',
      readTime: '3 min',
      title: 'Abu Dhabi Real Estate Hits $44.6B',
      excerpt: 'Abu Dhabi recorded AED 163.7 billion in real estate transactions with prices rising across key districts.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      source: 'ADREC',
      tag: 'Report',
      stats: { value: '47%', label: 'Growth' }
    },
    {
      category: 'construction',
      date: 'Dec 29, 2025',
      readTime: '2 min',
      title: 'UAE Federal Budget Reaches $25 Billion',
      excerpt: 'The UAE Cabinet approved a federal budget of approximately $25 billion for 2026—the largest to date.',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&q=80',
      source: 'UAE Cabinet',
      tag: 'Government',
      stats: { value: '$25B', label: 'Budget' }
    },
    {
      category: 'technology',
      date: 'Jan 6, 2026',
      readTime: '4 min',
      title: 'Property Tokenization Goes Live in Dubai',
      excerpt: 'Dubai Land Department has launched a tokenization pilot integrating blockchain-based property titles.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
      source: 'Dubai Land',
      tag: 'Innovation',
      stats: { value: 'Live', label: 'Pilot' }
    },
    {
      category: 'investment',
      date: 'Jan 5, 2026',
      readTime: '3 min',
      title: 'Infrastructure Investment Reshaping Demand',
      excerpt: 'More than AED 143 billion in construction contracts awarded tied to energy and transport infrastructure.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
      source: 'JLL Middle East',
      tag: 'Infrastructure',
      stats: { value: 'AED 143B', label: 'Contracts' }
    },
    {
      category: 'construction',
      date: 'Jan 20, 2026',
      readTime: '3 min',
      title: 'Construction Output Projected to Grow 5.2%',
      excerpt: 'The UAE construction industry is forecast to grow by 5.2% in real terms during 2026.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
      source: 'Research Markets',
      tag: 'Forecast',
      stats: { value: '5.2%', label: 'Growth' }
    },
    {
      category: 'real estate',
      date: 'Dec 30, 2025',
      readTime: '5 min',
      title: 'Logic-Based Buying Returns to Dubai',
      excerpt: 'Dubais property market is transitioning from momentum-driven decisions to logic-based buying.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
      source: 'fäm Properties',
      tag: 'Analysis',
      stats: { value: '63%', label: 'Value-Focused' }
    },
    {
      category: 'technology',
      date: 'Jan 10, 2026',
      readTime: '4 min',
      title: 'Smart Building Systems Transform UAE',
      excerpt: 'IoT and AI-powered building management systems are becoming standard in new developments.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      source: 'Tech Emirates',
      tag: 'Tech',
      stats: { value: '82%', label: 'Adoption' }
    },
    {
      category: 'investment',
      date: 'Jan 8, 2026',
      readTime: '3 min',
      title: 'Foreign Direct Investment Surges 24%',
      excerpt: 'UAE attracts record FDI inflows as international investors seek stable growth markets.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80',
      source: 'UAE Ministry',
      tag: 'FDI',
      stats: { value: '24%', label: 'Increase' }
    },
    {
      category: 'technology',
      date: 'Dec 28, 2025',
      readTime: '5 min',
      title: 'Virtual Property Tours See 300% Growth',
      excerpt: 'AR and VR technologies revolutionize property viewing experience for international buyers.',
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200&q=80',
      source: 'PropTech ME',
      tag: 'PropTech',
      stats: { value: '300%', label: 'Growth' }
    }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 3);

  return (
    <section 
      className="relative min-h-screen overflow-hidden py-16 lg:py-24"
      style={{ background: '#ffffff' }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .news-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .news-body {
          font-family: 'Inter', sans-serif;
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
              Market Intelligence
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
            Latest News & Insights
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
              Updated February 2026
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className="px-4 py-2 rounded-full transition-all duration-300 news-body text-xs font-medium capitalize"
                style={{
                  background: activeCategory === cat ? '#432c96' : 'rgba(67, 44, 150, 0.05)',
                  color: activeCategory === cat ? '#ffffff' : '#432c96',
                  border: activeCategory === cat ? 'none' : '1px solid rgba(67, 44, 150, 0.15)'
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedNews.map((news, index) => (
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
                  src={news.image}
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
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-sm news-body text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {news.tag}
                </div>

                {/* Stats */}
                <div 
                  className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg backdrop-blur-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)'
                  }}
                >
                  <div className="news-title text-base text-white">
                    {news.stats.value}
                  </div>
                  <div className="news-body text-[9px] text-white opacity-90">
                    {news.stats.label}
                  </div>
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
                <span className="news-body">Read More</span>
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
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
                {showAll ? 'Show Less' : `View More ${activeCategory === 'all' ? 'News' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
              </span>
              <ArrowRight 
                className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                strokeWidth={2} 
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RSWNewsSection;