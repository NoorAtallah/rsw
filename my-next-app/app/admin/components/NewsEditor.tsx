'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
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

export default function NewsEditor() {
  const supabase = createClient()
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => { fetchItems() }, [])

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
        data_en, data_ar, order_index: item.order_index
      }).eq('id', item.id)
    } else {
      await supabase.from('content_arrays').insert({
        section: 'news.items',
        data_en, data_ar,
        order_index: items.length
      })
    }

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
    setExpanded('new-' + items.length)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-10">
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

      <div className="space-y-3">
        {items.map((item, index) => {
          const key = item.id || `new-${index}`
          const isExpanded = expanded === key

          return (
            <div key={key} className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : key)}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: '#000' }}>
                    {item.title_en || 'New Item'}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: gold }}>{item.category} — {item.date}</p>
                </div>
                <div className="flex items-center gap-2">
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

              {/* Fields */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>

                  {/* Category / Date / Read Time */}
                  <div className="pt-4 grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Category</label>
                      <select value={item.category} onChange={e => handleChange(index, 'category', e.target.value)} style={{ ...inputStyle }}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Date</label>
                      <input type="text" value={item.date} onChange={e => handleChange(index, 'date', e.target.value)} style={inputStyle} placeholder="Feb 9, 2026" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Read Time</label>
                      <input type="text" value={item.readTime} onChange={e => handleChange(index, 'readTime', e.target.value)} style={inputStyle} placeholder="3 min" />
                    </div>
                  </div>

                  {/* Image + Slug */}
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUpload
                      value={item.image_url}
                      onChange={url => handleChange(index, 'image_url', url)}
                      label="Article Image"
                    />
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Slug (URL)</label>
                      <input
                        type="text"
                        value={item.slug}
                        onChange={e => handleChange(index, 'slug', e.target.value)}
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
                      <input type="text" value={item.title_en} onChange={e => handleChange(index, 'title_en', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (Arabic)</label>
                      <input type="text" value={item.title_ar} onChange={e => handleChange(index, 'title_ar', e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Excerpt (English)</label>
                      <textarea value={item.excerpt_en} onChange={e => handleChange(index, 'excerpt_en', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Excerpt (Arabic)</label>
                      <textarea value={item.excerpt_ar} onChange={e => handleChange(index, 'excerpt_ar', e.target.value)} rows={3} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Full Article Body (English)</label>
                      <textarea value={item.body_en} onChange={e => handleChange(index, 'body_en', e.target.value)} rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Write the full article content here..." />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Full Article Body (Arabic)</label>
                      <textarea value={item.body_ar} onChange={e => handleChange(index, 'body_ar', e.target.value)} rows={6} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} placeholder="اكتب محتوى المقال الكامل هنا..." />
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Tag (English)</label>
                      <input type="text" value={item.tag_en} onChange={e => handleChange(index, 'tag_en', e.target.value)} style={inputStyle} placeholder="Breaking" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Tag (Arabic)</label>
                      <input type="text" value={item.tag_ar} onChange={e => handleChange(index, 'tag_ar', e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="عاجل" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Stat Value</label>
                      <input type="text" value={item.stats_value} onChange={e => handleChange(index, 'stats_value', e.target.value)} style={inputStyle} placeholder="63%" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Stat Label (EN)</label>
                      <input type="text" value={item.stats_label_en} onChange={e => handleChange(index, 'stats_label_en', e.target.value)} style={inputStyle} placeholder="YoY Growth" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Stat Label (AR)</label>
                      <input type="text" value={item.stats_label_ar} onChange={e => handleChange(index, 'stats_label_ar', e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="نمو سنوي" />
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
        })}
      </div>
    </div>
  )
}