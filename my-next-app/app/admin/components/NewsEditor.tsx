'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp, Search, X, Eye, EyeOff } from 'lucide-react'
import ImageUpload from './ImageUpload'

const gold = '#a79370'

interface NewsItem {
  id?: string
  slug: string
  image_url: string
  category: string
  date: string
  readTime: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  body_en: string
  body_ar: string
  tag_en: string
  tag_ar: string
  stats_value: string
  stats_label_en: string
  stats_label_ar: string
  order_index: number
  status: 'published' | 'hidden'
}

const emptyItem = (): NewsItem => ({
  slug: '',
  image_url: '',
  category: 'real estate',
  date: '',
  readTime: '',
  title_en: '',
  title_ar: '',
  excerpt_en: '',
  excerpt_ar: '',
  body_en: '',
  body_ar: '',
  tag_en: '',
  tag_ar: '',
  stats_value: '',
  stats_label_en: '',
  stats_label_ar: '',
  order_index: 0,
  status: 'published',
})

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid rgba(167,147,112,0.3)',
  background: '#faf9f6',
  borderRadius: 4,
  fontSize: 13,
  color: '#000',
  outline: 'none',
}

const categories = ['real estate', 'construction', 'investment', 'technology']
const ALL_CATEGORIES = 'all'
const PAGE_SIZE = 5

export default function NewsEditor() {
  const supabase = createClient()
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  // Search / filter / pagination state
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES)
  const [page, setPage] = useState(1)

  useEffect(() => { fetchItems() }, [])
  useEffect(() => { setPage(1) }, [search, activeCategory])

  async function fetchItems() {
    const { data } = await supabase
      .from('content_arrays')
      .select('*')
      .eq('section', 'news.items')
      .order('order_index')

    if (data) {
      setItems(data.map(row => ({
        id: row.id,
        order_index: row.order_index,
        status: row.status || 'published',
        slug: row.data_en?.slug || '',
        image_url: row.data_en?.image_url || '',
        category: row.data_en?.category || '',
        date: row.data_en?.date || '',
        readTime: row.data_en?.readTime || '',
        title_en: row.data_en?.title || '',
        title_ar: row.data_ar?.title || '',
        excerpt_en: row.data_en?.excerpt || '',
        excerpt_ar: row.data_ar?.excerpt || '',
        body_en: row.data_en?.body || '',
        body_ar: row.data_ar?.body || '',
        tag_en: row.data_en?.tag || '',
        tag_ar: row.data_ar?.tag || '',
        stats_value: row.data_en?.stats?.value || '',
        stats_label_en: row.data_en?.stats?.label || '',
        stats_label_ar: row.data_ar?.stats?.label || '',
      })))
    }
    setLoading(false)
  }

  async function handleSave(item: NewsItem) {
    setSaving(item.id || 'new')

    const data_en = {
      slug: item.slug,
      image_url: item.image_url,
      category: item.category,
      date: item.date,
      readTime: item.readTime,
      title: item.title_en,
      excerpt: item.excerpt_en,
      body: item.body_en,
      tag: item.tag_en,
      stats: { value: item.stats_value, label: item.stats_label_en }
    }

    const data_ar = {
      slug: item.slug,
      image_url: item.image_url,
      category: item.category,
      date: item.date,
      readTime: item.readTime,
      title: item.title_ar,
      excerpt: item.excerpt_ar,
      body: item.body_ar,
      tag: item.tag_ar,
      stats: { value: item.stats_value, label: item.stats_label_ar }
    }

    if (item.id) {
      await supabase.from('content_arrays').update({
        data_en, data_ar, order_index: item.order_index, status: item.status
      }).eq('id', item.id)
    } else {
      await supabase.from('content_arrays').insert({
        section: 'news.items',
        data_en, data_ar,
        order_index: items.length,
        status: item.status,
      })
    }

    setSaving(null)
    fetchItems()
  }

  // Quick-toggle status without opening the form
  async function handleToggleStatus(e: React.MouseEvent, item: NewsItem) {
    e.stopPropagation()
    if (!item.id) return
    const newStatus = item.status === 'published' ? 'hidden' : 'published'
    setSaving(item.id)
    await supabase.from('content_arrays').update({ status: newStatus }).eq('id', item.id)
    setSaving(null)
    fetchItems()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this news item?')) return
    await supabase.from('content_arrays').delete().eq('id', id)
    fetchItems()
  }

  function handleChange(index: number, field: keyof NewsItem, value: string) {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  function handleAddNew() {
    const newItem = { ...emptyItem(), order_index: items.length }
    setItems(prev => [...prev, newItem])
    const newTotal = items.length + 1
    const newPage = Math.ceil(newTotal / PAGE_SIZE)
    setPage(newPage)
    setExpanded('new-' + items.length)
    setSearch('')
    setActiveCategory(ALL_CATEGORIES)
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return items.filter(item => {
      const matchesCategory = activeCategory === ALL_CATEGORIES || item.category === activeCategory
      const matchesSearch =
        !q ||
        item.title_en.toLowerCase().includes(q) ||
        item.title_ar.includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.excerpt_en.toLowerCase().includes(q) ||
        item.tag_en.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [items, search, activeCategory])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const paginated = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Editing</p>
          <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>News Items</h2>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium"
          style={{ background: gold, color: '#fff' }}
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: '#bbb' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, slug, tag…"
            style={{ ...inputStyle, paddingLeft: 34, paddingRight: search ? 34 : 14 }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#bbb' }}>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {[ALL_CATEGORIES, ...categories].map(cat => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-2 rounded-sm text-xs font-medium transition-all"
                style={{
                  background: isActive ? gold : 'transparent',
                  color: isActive ? '#fff' : gold,
                  border: `1px solid ${isActive ? gold : 'rgba(167,147,112,0.35)'}`,
                  textTransform: 'capitalize',
                }}
              >
                {cat === ALL_CATEGORIES ? 'All' : cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs mb-4" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
        {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        {search || activeCategory !== ALL_CATEGORIES ? ' found' : ' total'}
        {totalPages > 1 && ` — page ${clampedPage} of ${totalPages}`}
      </p>

      {/* Items list */}
      <div className="space-y-3">
        {paginated.length === 0 ? (
          <div className="text-center py-16 rounded-sm" style={{ border: '1px dashed rgba(167,147,112,0.25)', color: '#bbb' }}>
            <p className="text-sm">No items match your search.</p>
          </div>
        ) : (
          paginated.map((item) => {
            const realIndex = items.indexOf(item)
            const key = item.id || `new-${realIndex}`
            const isExpanded = expanded === key
            const isHidden = item.status === 'hidden'
            const isTogglingThis = saving === item.id

            return (
              <div
                key={key}
                className="rounded-sm bg-white overflow-hidden"
                style={{
                  border: '1px solid rgba(167,147,112,0.2)',
                  opacity: isHidden ? 0.65 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {/* Header row */}
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : key)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Visibility badge */}
                    <span
                      className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide"
                      style={{
                        background: isHidden ? 'rgba(0,0,0,0.06)' : 'rgba(167,147,112,0.12)',
                        color: isHidden ? '#aaa' : gold,
                        border: `1px solid ${isHidden ? 'rgba(0,0,0,0.1)' : 'rgba(167,147,112,0.3)'}`,
                      }}
                    >
                      {isHidden
                        ? <EyeOff className="w-2.5 h-2.5" />
                        : <Eye className="w-2.5 h-2.5" />
                      }
                      {isHidden ? 'Hidden' : 'Visible'}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: '#000' }}>
                        {item.title_en || 'New Item'}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: gold }}>{item.category} — {item.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-4">
                    {/* Quick toggle button */}
                    {item.id && (
                      <button
                        onClick={e => handleToggleStatus(e, item)}
                        title={isHidden ? 'Make visible' : 'Hide'}
                        disabled={isTogglingThis}
                        className="p-1.5 rounded transition-all hover:bg-gray-50"
                        style={{ color: isHidden ? '#bbb' : gold }}
                      >
                        {isTogglingThis
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : isHidden
                            ? <Eye className="w-4 h-4" />
                            : <EyeOff className="w-4 h-4" />
                        }
                      </button>
                    )}

                    {item.id && (
                      <button
                        onClick={e => { e.stopPropagation(); handleDelete(item.id!) }}
                        className="p-1.5 rounded hover:bg-red-50 transition-all"
                        style={{ color: '#ccc' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {isExpanded
                      ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                      : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />
                    }
                  </div>
                </div>

                {/* Expanded fields */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>

                    {/* Visibility toggle inside form */}
                    <div className="pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#999' }}>Visibility</p>
                        <p className="text-[11px] mt-0.5" style={{ color: '#bbb' }}>
                          {isHidden ? 'This article is hidden from the public site.' : 'This article is visible on the public site.'}
                        </p>
                      </div>
                      {/* Toggle switch */}
                      <button
                        onClick={() => {
                          const newStatus = item.status === 'published' ? 'hidden' : 'published'
                          handleChange(realIndex, 'status', newStatus)
                        }}
                        className="relative inline-flex items-center rounded-full transition-colors duration-200"
                        style={{
                          width: 44,
                          height: 24,
                          background: isHidden ? '#e5e7eb' : gold,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          className="inline-block rounded-full bg-white shadow-sm transition-transform duration-200"
                          style={{
                            width: 18,
                            height: 18,
                            transform: isHidden ? 'translateX(3px)' : 'translateX(23px)',
                          }}
                        />
                      </button>
                    </div>

                    {/* Category / Date / Read Time */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Category</label>
                        <select value={item.category} onChange={e => handleChange(realIndex, 'category', e.target.value)} style={{ ...inputStyle }}>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Date</label>
                        <input type="text" value={item.date} onChange={e => handleChange(realIndex, 'date', e.target.value)} style={inputStyle} placeholder="Feb 9, 2026" />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Read Time</label>
                        <input type="text" value={item.readTime} onChange={e => handleChange(realIndex, 'readTime', e.target.value)} style={inputStyle} placeholder="3 min" />
                      </div>
                    </div>

                    {/* Image + Slug */}
                    <div className="grid grid-cols-2 gap-4">
                      <ImageUpload
                        value={item.image_url}
                        onChange={url => handleChange(realIndex, 'image_url', url)}
                        label="Article Image"
                      />
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Slug (URL)</label>
                        <input
                          type="text"
                          value={item.slug}
                          onChange={e => handleChange(realIndex, 'slug', e.target.value)}
                          style={inputStyle}
                          placeholder="dubai-property-sales-2026"
                        />
                        <p className="text-[10px] mt-1" style={{ color: '#bbb' }}>
                          URL: /news/{item.slug || 'your-slug-here'}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (English)</label>
                        <input type="text" value={item.title_en} onChange={e => handleChange(realIndex, 'title_en', e.target.value)} style={inputStyle} />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (Arabic)</label>
                        <input type="text" value={item.title_ar} onChange={e => handleChange(realIndex, 'title_ar', e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Excerpt (English)</label>
                        <textarea value={item.excerpt_en} onChange={e => handleChange(realIndex, 'excerpt_en', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Excerpt (Arabic)</label>
                        <textarea value={item.excerpt_ar} onChange={e => handleChange(realIndex, 'excerpt_ar', e.target.value)} rows={3} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Full Article Body (English)</label>
                        <textarea value={item.body_en} onChange={e => handleChange(realIndex, 'body_en', e.target.value)} rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Write the full article content here..." />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Full Article Body (Arabic)</label>
                        <textarea value={item.body_ar} onChange={e => handleChange(realIndex, 'body_ar', e.target.value)} rows={6} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} placeholder="اكتب محتوى المقال الكامل هنا..." />
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Tag (English)</label>
                        <input type="text" value={item.tag_en} onChange={e => handleChange(realIndex, 'tag_en', e.target.value)} style={inputStyle} placeholder="Breaking" />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Tag (Arabic)</label>
                        <input type="text" value={item.tag_ar} onChange={e => handleChange(realIndex, 'tag_ar', e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="عاجل" />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Stat Value</label>
                        <input type="text" value={item.stats_value} onChange={e => handleChange(realIndex, 'stats_value', e.target.value)} style={inputStyle} placeholder="63%" />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Stat Label (EN)</label>
                        <input type="text" value={item.stats_label_en} onChange={e => handleChange(realIndex, 'stats_label_en', e.target.value)} style={inputStyle} placeholder="YoY Growth" />
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Stat Label (AR)</label>
                        <input type="text" value={item.stats_label_ar} onChange={e => handleChange(realIndex, 'stats_label_ar', e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="نمو سنوي" />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave(item)}
                      disabled={saving === key}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium mt-2"
                      style={{ background: gold, color: '#fff' }}
                    >
                      {saving === key ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {saving === key ? 'Saving...' : 'Save Item'}
                    </button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className="px-4 py-2 rounded-sm text-xs font-medium transition-all"
            style={{
              border: '1px solid rgba(167,147,112,0.35)',
              color: clampedPage === 1 ? '#ccc' : gold,
              cursor: clampedPage === 1 ? 'default' : 'pointer',
            }}
          >
            ← Previous
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="w-8 h-8 rounded-sm text-xs font-medium transition-all"
                style={{
                  background: n === clampedPage ? gold : 'transparent',
                  color: n === clampedPage ? '#fff' : gold,
                  border: `1px solid ${n === clampedPage ? gold : 'rgba(167,147,112,0.35)'}`,
                }}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className="px-4 py-2 rounded-sm text-xs font-medium transition-all"
            style={{
              border: '1px solid rgba(167,147,112,0.35)',
              color: clampedPage === totalPages ? '#ccc' : gold,
              cursor: clampedPage === totalPages ? 'default' : 'pointer',
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}