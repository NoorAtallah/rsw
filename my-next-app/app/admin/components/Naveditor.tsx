'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, CheckCircle, GripVertical, ExternalLink } from 'lucide-react'

const gold = '#a79370'

interface NavLink {
  id?: string
  label_en: string
  label_ar: string
  path: string
  order_index: number
}

interface NavCTA {
  label_en: string
  label_ar: string
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

export default function NavEditor() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [links, setLinks] = useState<NavLink[]>([])
  const [cta, setCta] = useState<NavCTA>({ label_en: '', label_ar: '' })
  const [savingLinks, setSavingLinks] = useState(false)
  const [savedLinks, setSavedLinks] = useState(false)
  const [savingCta, setSavingCta] = useState(false)
  const [savedCta, setSavedCta] = useState(false)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    // Fetch nav links
    const { data: linkRows } = await supabase
      .from('content_arrays')
      .select('*')
      .eq('section', 'nav.links')
      .order('order_index')

    if (linkRows && linkRows.length > 0) {
      setLinks(linkRows.map(row => ({
        id: row.id,
        label_en: row.data_en?.label || '',
        label_ar: row.data_ar?.label || '',
        path: row.data_en?.path || '',
        order_index: row.order_index,
      })))
    } else {
      // Default nav links as a starting point
      setLinks([
        { label_en: 'Home', label_ar: 'الرئيسية', path: '/', order_index: 0 },
        { label_en: 'About', label_ar: 'عن الشركة', path: '/about', order_index: 1 },
        { label_en: 'Ventures', label_ar: 'المشاريع', path: '/ventures', order_index: 2 },
        { label_en: 'Investor Relations', label_ar: 'علاقات المستثمرين', path: '/investor-relations', order_index: 3 },
        { label_en: 'Contact', label_ar: 'تواصل معنا', path: '/contact', order_index: 4 },
      ])
    }

    // Fetch CTA
    const { data: ctaRow } = await supabase
      .from('content')
      .select('*')
      .eq('section', 'nav')
      .eq('key', 'cta')
      .single()

    if (ctaRow) {
      setCta({ label_en: ctaRow.value_en || '', label_ar: ctaRow.value_ar || '' })
    } else {
      setCta({ label_en: 'Request a Demo', label_ar: 'طلب عرض' })
    }

    setLoading(false)
  }

  function updateLink(index: number, field: keyof NavLink, value: string) {
    setLinks(prev => prev.map((link, i) => i === index ? { ...link, [field]: value } : link))
  }

  function addLink() {
    setLinks(prev => [
      ...prev,
      { label_en: '', label_ar: '', path: '', order_index: prev.length }
    ])
  }

  async function removeLink(index: number) {
    const link = links[index]
    if (link.id) {
      await supabase.from('content_arrays').delete().eq('id', link.id)
    }
    setLinks(prev => prev.filter((_, i) => i !== index))
  }

  function moveLink(index: number, direction: 'up' | 'down') {
    const newLinks = [...links]
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= newLinks.length) return;
    [newLinks[index], newLinks[target]] = [newLinks[target], newLinks[index]]
    setLinks(newLinks.map((l, i) => ({ ...l, order_index: i })))
  }

  async function saveLinks() {
    setSavingLinks(true)

    // Delete all existing and re-insert (handles reorder + add/remove cleanly)
    await supabase.from('content_arrays').delete().eq('section', 'nav.links')

    const inserts = links
      .filter(l => l.label_en.trim() || l.path.trim())
      .map((link, i) => ({
        section: 'nav.links',
        order_index: i,
        data_en: { label: link.label_en, path: link.path },
        data_ar: { label: link.label_ar, path: link.path },
      }))

    if (inserts.length) {
      await supabase.from('content_arrays').insert(inserts)
    }

    await fetchData()
    setSavingLinks(false)
    setSavedLinks(true)
    setTimeout(() => setSavedLinks(false), 2000)
  }

  async function saveCta() {
    setSavingCta(true)
    await supabase.from('content').upsert({
      section: 'nav',
      key: 'cta',
      value_en: cta.label_en,
      value_ar: cta.label_ar,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'section,key' })
    setSavingCta(false)
    setSavedCta(true)
    setTimeout(() => setSavedCta(false), 2000)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-3xl space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Editing</p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>Navigation</h2>
        <p className="text-xs mt-2" style={{ color: '#aaa' }}>
          Manage the links shown in the site navbar and the CTA button text.
        </p>
      </div>

      {/* Nav Links */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <p className="text-sm font-medium" style={{ color: '#000' }}>Navigation Links</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>
            Use the arrows to reorder. Changes apply to both desktop and mobile menus.
          </p>
        </div>

        <div className="px-6 py-4">
          {/* Column headers */}
          {links.length > 0 && (
            <div className="grid grid-cols-[24px_1fr_1fr_1fr_32px] gap-3 pb-2 mb-1">
              <span />
              <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>Label (English)</p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>Label (Arabic)</p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>Path</p>
              <span />
            </div>
          )}

          <div className="space-y-2">
            {links.map((link, index) => (
              <div key={index} className="grid grid-cols-[24px_1fr_1fr_1fr_32px] gap-3 items-center group">
                {/* Order controls */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveLink(index, 'up')}
                    disabled={index === 0}
                    className="text-[9px] leading-none text-center w-6 py-0.5 rounded transition-all hover:bg-amber-50 disabled:opacity-20"
                    style={{ color: gold }}
                  >▲</button>
                  <button
                    onClick={() => moveLink(index, 'down')}
                    disabled={index === links.length - 1}
                    className="text-[9px] leading-none text-center w-6 py-0.5 rounded transition-all hover:bg-amber-50 disabled:opacity-20"
                    style={{ color: gold }}
                  >▼</button>
                </div>

                <input
                  type="text"
                  value={link.label_en}
                  onChange={e => updateLink(index, 'label_en', e.target.value)}
                  style={inputStyle}
                  placeholder="About"
                />
                <input
                  type="text"
                  value={link.label_ar}
                  onChange={e => updateLink(index, 'label_ar', e.target.value)}
                  dir="rtl"
                  style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }}
                  placeholder="عن الشركة"
                />
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: '#ccc' }} />
                  <input
                    type="text"
                    value={link.path}
                    onChange={e => updateLink(index, 'path', e.target.value)}
                    style={{ ...inputStyle, paddingLeft: 28 }}
                    placeholder="/about"
                  />
                </div>
                <button
                  onClick={() => removeLink(index)}
                  className="w-8 h-8 flex items-center justify-center rounded transition-all hover:bg-red-50"
                  style={{ color: '#ddd' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {links.length === 0 && (
            <div className="text-center py-8 rounded-sm" style={{ border: '1px dashed rgba(167,147,112,0.2)', color: '#ccc' }}>
              <p className="text-xs">No links yet. Add one below.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>
            <button
              onClick={addLink}
              className="flex items-center gap-2 text-xs px-4 py-2 rounded-sm transition-all"
              style={{ border: '1px dashed rgba(167,147,112,0.4)', color: gold }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add Link
            </button>
            <button
              onClick={saveLinks}
              disabled={savingLinks}
              className="flex items-center gap-2 px-5 py-2 rounded-sm text-xs font-medium transition-all"
              style={{ background: savedLinks ? '#22c55e' : gold, color: '#fff' }}
            >
              {savingLinks
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : savedLinks
                ? <CheckCircle className="w-3.5 h-3.5" />
                : null
              }
              {savingLinks ? 'Saving…' : savedLinks ? 'Saved!' : 'Save Links'}
            </button>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <p className="text-sm font-medium" style={{ color: '#000' }}>CTA Button</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>
            The gold button shown in the top-right of the navbar.
          </p>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-1.5" style={{ color: '#bbb' }}>Label (English)</label>
              <input
                type="text"
                value={cta.label_en}
                onChange={e => setCta(prev => ({ ...prev, label_en: e.target.value }))}
                style={inputStyle}
                placeholder="Request a Demo"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-1.5" style={{ color: '#bbb' }}>Label (Arabic)</label>
              <input
                type="text"
                value={cta.label_ar}
                onChange={e => setCta(prev => ({ ...prev, label_ar: e.target.value }))}
                dir="rtl"
                style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }}
                placeholder="طلب عرض"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 pt-1">
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>Preview</p>
            <div
              className="px-5 py-2 rounded-full text-xs font-medium"
              style={{ background: gold, color: '#000' }}
            >
              {cta.label_en || 'CTA Button'}
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={saveCta}
              disabled={savingCta}
              className="flex items-center gap-2 px-5 py-2 rounded-sm text-xs font-medium transition-all"
              style={{ background: savedCta ? '#22c55e' : gold, color: '#fff' }}
            >
              {savingCta
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : savedCta
                ? <CheckCircle className="w-3.5 h-3.5" />
                : null
              }
              {savingCta ? 'Saving…' : savedCta ? 'Saved!' : 'Save CTA'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}