'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp, CheckCircle, GripVertical } from 'lucide-react'

const gold = '#a79370'

interface FooterLink {
  id?: string
  label_en: string
  label_ar: string
  href: string
  order_index: number
}

interface LinkSection {
  key: string
  label: string
  links: FooterLink[]
  saving: boolean
  saved: boolean
  expanded: boolean
}

const inputStyle = {
  width: '100%',
  padding: '9px 14px',
  border: '1px solid rgba(167,147,112,0.3)',
  background: '#faf9f6',
  borderRadius: 4,
  fontSize: 13,
  color: '#000',
  outline: 'none',
}

const LINK_SECTIONS = [
  { key: 'footer.links.company', label: 'Company' },
  { key: 'footer.links.services', label: 'Services' },
  { key: 'footer.links.investors', label: 'Investors' },
  { key: 'footer.links.legal', label: 'Legal' },
]

export default function FooterLinksEditor() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState<LinkSection[]>(
    LINK_SECTIONS.map(s => ({
      ...s,
      links: [],
      saving: false,
      saved: false,
      expanded: false,
    }))
  )

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('content_arrays')
      .select('*')
      .in('section', LINK_SECTIONS.map(s => s.key))
      .order('order_index')

    if (data) {
      setSections(prev => prev.map(sec => ({
        ...sec,
        links: data
          .filter(row => row.section === sec.key)
          .map(row => ({
            id: row.id,
            label_en: row.data_en?.label || '',
            label_ar: row.data_ar?.label || '',
            href: row.data_en?.href || '',
            order_index: row.order_index,
          })),
      })))
    }
    setLoading(false)
  }

  function toggleSection(key: string) {
    setSections(prev => prev.map(s =>
      s.key === key ? { ...s, expanded: !s.expanded } : s
    ))
  }

  function updateLink(sectionKey: string, linkIndex: number, field: keyof FooterLink, value: string) {
    setSections(prev => prev.map(sec => {
      if (sec.key !== sectionKey) return sec
      const links = sec.links.map((link, i) =>
        i === linkIndex ? { ...link, [field]: value } : link
      )
      return { ...sec, links }
    }))
  }

  function addLink(sectionKey: string) {
    setSections(prev => prev.map(sec => {
      if (sec.key !== sectionKey) return sec
      return {
        ...sec,
        links: [
          ...sec.links,
          { label_en: '', label_ar: '', href: '', order_index: sec.links.length }
        ]
      }
    }))
  }

  async function removeLink(sectionKey: string, linkIndex: number) {
    const section = sections.find(s => s.key === sectionKey)
    if (!section) return
    const link = section.links[linkIndex]

    if (link.id) {
      await supabase.from('content_arrays').delete().eq('id', link.id)
    }

    setSections(prev => prev.map(sec => {
      if (sec.key !== sectionKey) return sec
      return {
        ...sec,
        links: sec.links.filter((_, i) => i !== linkIndex)
      }
    }))
  }

  async function saveSection(sectionKey: string) {
    setSections(prev => prev.map(s => s.key === sectionKey ? { ...s, saving: true } : s))

    const section = sections.find(s => s.key === sectionKey)
    if (!section) return

    // Delete existing rows for this section and re-insert (simplest approach for reordering)
    await supabase.from('content_arrays').delete().eq('section', sectionKey)

    const inserts = section.links
      .filter(link => link.label_en.trim() || link.href.trim())
      .map((link, i) => ({
        section: sectionKey,
        order_index: i,
        data_en: { label: link.label_en, href: link.href },
        data_ar: { label: link.label_ar, href: link.href },
      }))

    if (inserts.length) {
      await supabase.from('content_arrays').insert(inserts)
    }

    await fetchData()

    setSections(prev => prev.map(s =>
      s.key === sectionKey ? { ...s, saving: false, saved: true } : s
    ))
    setTimeout(() => {
      setSections(prev => prev.map(s =>
        s.key === sectionKey ? { ...s, saved: false } : s
      ))
    }, 2000)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>
          Editing
        </p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>
          Footer Links
        </h2>
        <p className="text-xs mt-2" style={{ color: '#aaa' }}>
          Manage the four link columns shown in the site footer.
        </p>
      </div>

      <div className="space-y-3">
        {sections.map(section => (
          <div
            key={section.key}
            className="rounded-sm bg-white overflow-hidden"
            style={{ border: '1px solid rgba(167,147,112,0.2)' }}
          >
            {/* Section header */}
            <div
              className="flex items-center justify-between px-6 py-4 cursor-pointer"
              onClick={() => toggleSection(section.key)}
            >
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium" style={{ color: '#000' }}>{section.label}</p>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-sm"
                  style={{ background: 'rgba(167,147,112,0.1)', color: gold, fontFamily: 'Space Mono, monospace' }}
                >
                  {section.links.length} links
                </span>
              </div>
              {section.expanded
                ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />
              }
            </div>

            {/* Links editor */}
            {section.expanded && (
              <div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>
                
                {/* Column labels */}
                {section.links.length > 0 && (
                  <div className="grid grid-cols-[1fr_1fr_1fr_32px] gap-3 px-1 pt-4 pb-2">
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>Label (English)</p>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>Label (Arabic)</p>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>URL / href</p>
                    <span />
                  </div>
                )}

                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <div
                      key={linkIndex}
                      className="grid grid-cols-[1fr_1fr_1fr_32px] gap-3 items-center"
                    >
                      <input
                        type="text"
                        value={link.label_en}
                        onChange={e => updateLink(section.key, linkIndex, 'label_en', e.target.value)}
                        style={inputStyle}
                        placeholder="About Us"
                      />
                      <input
                        type="text"
                        value={link.label_ar}
                        onChange={e => updateLink(section.key, linkIndex, 'label_ar', e.target.value)}
                        dir="rtl"
                        style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }}
                        placeholder="من نحن"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={e => updateLink(section.key, linkIndex, 'href', e.target.value)}
                        style={inputStyle}
                        placeholder="/about"
                      />
                      <button
                        onClick={() => removeLink(section.key, linkIndex)}
                        className="w-8 h-8 flex items-center justify-center rounded transition-all hover:bg-red-50"
                        style={{ color: '#ccc' }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Empty state */}
                {section.links.length === 0 && (
                  <div
                    className="text-center py-8 mt-4 rounded-sm"
                    style={{ border: '1px dashed rgba(167,147,112,0.2)', color: '#ccc' }}
                  >
                    <p className="text-xs">No links yet. Add one below.</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>
                  <button
                    onClick={() => addLink(section.key)}
                    className="flex items-center gap-2 text-xs px-4 py-2 rounded-sm transition-all"
                    style={{
                      border: '1px dashed rgba(167,147,112,0.4)',
                      color: gold,
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Link
                  </button>

                  <button
                    onClick={() => saveSection(section.key)}
                    disabled={section.saving}
                    className="flex items-center gap-2 px-5 py-2 rounded-sm text-xs font-medium transition-all"
                    style={{
                      background: section.saved ? '#22c55e' : gold,
                      color: '#fff',
                    }}
                  >
                    {section.saving
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : section.saved
                      ? <CheckCircle className="w-3.5 h-3.5" />
                      : null
                    }
                    {section.saving ? 'Saving…' : section.saved ? 'Saved!' : 'Save Section'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}