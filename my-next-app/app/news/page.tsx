'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

interface NewsItem {
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

interface NewsPageProps {
  initialNews?: NewsItem[]
}

const ITEMS_PER_PAGE = 9

export default function NewsPage({ initialNews }: NewsPageProps) {
  const { t, locale, direction } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  const gold = '#a79370'
  const black = '#000000'
  const white = '#ffffff'

  const fontFamily = locale === 'ar' ? 'Tajawal, sans-serif' : 'Outfit, sans-serif'
  const monoFont = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Space Mono, monospace'
  const titleFont = locale === 'ar' ? 'Tajawal, sans-serif' : 'Playfair Display, serif'

  const newsData: NewsItem[] = initialNews || t('news.items') || []
  const categories = t('news.categories') || []

  // Filter news
  const filteredNews = newsData.filter((item: NewsItem) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const displayedNews = filteredNews.slice(0, displayCount)
  const hasMore = displayCount < filteredNews.length

  // Simulate lazy load with delay
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
      setIsLoading(false)
    }, 800)
  }, [isLoading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  // Reset count on filter change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [activeCategory, searchQuery])

  const getImageUrl = (item: NewsItem) => {
    if (item.imageUrl) return item.imageUrl
    const map: Record<string, string> = {
      'real estate': '1545324418-cc1a3fa10c00',
      construction: '1504307651254-35680f356dfd',
      investment: '1454165804606-c3d57bc86b40',
    }
    return `https://images.unsplash.com/photo-${map[item.category] || '1558618666-fcd25c85cd64'}?w=1200&q=80`
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: white }}
      dir={direction}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Outfit:wght@200;300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;700;800&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');

        .news-card-img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .news-card:hover .news-card-img {
          transform: scale(1.06);
        }

        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      {/* Hero Header */}
      <div
        className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden"
        style={{ background: black }}
      >
        {/* Gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] pointer-events-none opacity-10"
          style={{ background: gold }}
        />

        {/* Gold top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }}
        />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px" style={{ background: gold }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: gold, fontFamily: monoFont }}
            >
              {locale === 'ar' ? 'المستجدات والأخبار' : 'Latest Updates'}
            </span>
            <div className="w-10 h-px" style={{ background: gold }} />
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
            style={{ color: white, fontFamily: titleFont }}
          >
            {locale === 'ar' ? (
              <>أخبار <span className="font-bold" style={{ color: gold }}>ومستجدات</span></>
            ) : (
              <>News & <span className="font-bold" style={{ color: gold }}>Insights</span></>
            )}
          </h1>

          <p
            className="text-base font-light max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily }}
          >
            {locale === 'ar'
              ? 'تابع آخر مستجدات محفظتنا الاستثمارية والتطورات في القطاعات التي نعمل بها'
              : 'Stay up to date with our investment portfolio, market insights, and sector developments.'}
          </p>
        </div>
      </div>

      {/* Sticky Filters Bar */}
      <div
        className="sticky top-0 z-40 py-4 px-6 md:px-12"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid rgba(167,147,112,0.2)`,
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-3">

          {/* Search */}
          <div
            className="relative flex-1 w-full"
          >
            <Search
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{
                color: gold,
                [direction === 'rtl' ? 'right' : 'left']: '14px',
              }}
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'ابحث في الأخبار...' : 'Search news...'}
              className="w-full py-2.5 text-sm rounded-xl outline-none"
              style={{
                background: 'rgba(167,147,112,0.06)',
                border: `1px solid rgba(167,147,112,0.25)`,
                color: black,
                fontFamily,
                paddingInlineStart: '40px',
                paddingInlineEnd: searchQuery ? '36px' : '16px',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ [direction === 'rtl' ? 'left' : 'right']: '10px' }}
              >
                <X className="w-3.5 h-3.5" style={{ color: 'rgba(0,0,0,0.4)' }} />
              </button>
            )}
          </div>

          {/* Category pills — hidden on mobile, shown inline on sm+ */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {categories.map((cat: any) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="px-4 py-2 rounded-full transition-all duration-300 text-xs font-medium whitespace-nowrap"
                style={{
                  background: activeCategory === cat.key ? gold : 'rgba(167,147,112,0.07)',
                  color: activeCategory === cat.key ? white : gold,
                  border: `1px solid ${activeCategory === cat.key ? gold : 'rgba(167,147,112,0.2)'}`,
                  fontFamily,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile filter toggle */}
          <button
            className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs"
            style={{
              background: showFilters ? gold : 'rgba(167,147,112,0.07)',
              color: showFilters ? white : gold,
              border: `1px solid ${gold}`,
              fontFamily,
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
            {locale === 'ar' ? 'تصفية' : 'Filter'}
          </button>
        </div>

        {/* Mobile category pills */}
        {showFilters && (
          <div className="sm:hidden max-w-5xl mx-auto flex flex-wrap gap-2 pt-3">
            {categories.map((cat: any) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setShowFilters(false) }}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat.key ? gold : 'rgba(167,147,112,0.07)',
                  color: activeCategory === cat.key ? white : gold,
                  border: `1px solid rgba(167,147,112,0.25)`,
                  fontFamily,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <p className="text-xs" style={{ color: 'rgba(0,0,0,0.4)', fontFamily: monoFont }}>
          {locale === 'ar'
            ? `عرض ${displayedNews.length} من ${filteredNews.length} مقالة`
            : `Showing ${displayedNews.length} of ${filteredNews.length} articles`}
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-16">

        {filteredNews.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg mb-2" style={{ color: 'rgba(0,0,0,0.3)', fontFamily }}>
              {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </p>
            <p className="text-sm" style={{ color: 'rgba(0,0,0,0.2)', fontFamily }}>
              {locale === 'ar' ? 'جرّب تغيير الفلتر أو كلمة البحث' : 'Try adjusting your search or filter'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNews.map((news: NewsItem, index: number) => (
              <motion.article
                key={news._id || index}
                className="news-card group cursor-pointer rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(167,147,112,0.15)',
                  boxShadow: '0 2px 16px rgba(167,147,112,0.07)',
                  background: white,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % ITEMS_PER_PAGE) * 0.06 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(167,147,112,0.18)' }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={getImageUrl(news)}
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
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" style={{ color: gold }} strokeWidth={1.5} />
                      <span className="text-[10px]" style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}>
                        {news.date}
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(167,147,112,0.4)' }} />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" style={{ color: gold }} strokeWidth={1.5} />
                      <span className="text-[10px]" style={{ color: 'rgba(0,0,0,0.45)', fontFamily }}>
                        {news.readTime}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-base font-bold leading-snug mb-2 line-clamp-2"
                    style={{ color: black, fontFamily: titleFont }}
                  >
                    {news.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed mb-4 line-clamp-2"
                    style={{ color: 'rgba(0,0,0,0.55)', fontFamily }}
                  >
                    {news.excerpt}
                  </p>

                  <div
                    className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-300"
                    style={{ color: gold }}
                  >
                    <span style={{ fontFamily }}>
                      {locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                      style={{ transform: direction === 'rtl' ? 'scaleX(-1)' : 'none' }}
                    />
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Skeleton cards while loading */}
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
              <div key={`skel-${i}`} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.1)' }}>
                <div className="skeleton aspect-[16/10]" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-3 w-24 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div ref={loaderRef} className="py-10 flex items-center justify-center">
          {isLoading && !displayedNews.length ? null : hasMore ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className="spinner w-6 h-6 rounded-full border-2"
                style={{ borderColor: gold, borderTopColor: 'transparent' }}
              />
              <span className="text-xs" style={{ color: gold, fontFamily: monoFont }}>
                {locale === 'ar' ? 'جارٍ التحميل...' : 'Loading more...'}
              </span>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-px" style={{ background: `rgba(167,147,112,0.3)` }} />
              <span className="text-xs" style={{ color: 'rgba(0,0,0,0.3)', fontFamily: monoFont }}>
                {locale === 'ar' ? 'انتهت المقالات' : 'All caught up'}
              </span>
              <div className="w-12 h-px" style={{ background: `rgba(167,147,112,0.3)` }} />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}