'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp, CheckCircle, Upload, X } from 'lucide-react'
import IconPicker from './IconPicker'

const gold = '#a79370'

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

const defaultTabImages = [
  'https://img.freepik.com/free-photo/skyscrapers-view_1112-268.jpg',
  'https://media.istockphoto.com/id/612818592/photo/abstract-modern-building.jpg',
  'https://images.stockcake.com/public/5/0/b/50bd2b3d-68f5-4234-927e-4936b8554f78/sunset-boardroom-view-stockcake.jpg',
]

export default function AboutEditor() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)

  const [tabs, setTabs] = useState([
    { label_en: '', label_ar: '', title_en: '', title_ar: '', content_en: '', content_ar: '', image: '' },
    { label_en: '', label_ar: '', title_en: '', title_ar: '', content_en: '', content_ar: '', image: '' },
    { label_en: '', label_ar: '', title_en: '', title_ar: '', content_en: '', content_ar: '', image: '' },
  ])

  const [divisions, setDivisions] = useState([
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Building2' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Cpu' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'HardHat' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Shield' },
  ])

  const [badges, setBadges] = useState([
    { en: '', ar: '' },
    { en: '', ar: '' },
    { en: '', ar: '' },
    { en: '', ar: '' },
  ])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('content_arrays')
      .select('*')
      .in('section', ['about.tabs', 'about.divisions', 'about.badges'])
      .order('order_index')

    if (data) {
      const tabRows = data.filter(r => r.section === 'about.tabs')
      const divRows = data.filter(r => r.section === 'about.divisions')
      const badgeRows = data.filter(r => r.section === 'about.badges')

      if (tabRows.length) {
        setTabs(tabRows.map((r, i) => ({
          label_en: r.data_en?.label || '',
          label_ar: r.data_ar?.label || '',
          title_en: r.data_en?.title || '',
          title_ar: r.data_ar?.title || '',
          content_en: r.data_en?.content || '',
          content_ar: r.data_ar?.content || '',
          image: r.data_en?.image || defaultTabImages[i] || '',
        })))
      }

      if (divRows.length) {
        setDivisions(divRows.map(r => ({
          title_en: r.data_en?.title || '',
          title_ar: r.data_ar?.title || '',
          description_en: r.data_en?.description || '',
          description_ar: r.data_ar?.description || '',
          icon: r.data_en?.icon || 'Building2',
        })))
      }

      if (badgeRows.length) {
        setBadges(badgeRows.map(r => ({
          en: r.data_en?.badge || '',
          ar: r.data_ar?.badge || '',
        })))
      }
    }
    setLoading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, tabIndex: number) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) { alert('Image must be less than 5MB'); return }

    setUploading(`tab-${tabIndex}`)
    const fileName = `about/${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('media').upload(fileName, file)
    if (error) { alert('Upload failed'); setUploading(null); return }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
    setTabs(prev => prev.map((t, i) => i === tabIndex ? { ...t, image: publicUrl } : t))
    setUploading(null)
  }

  async function saveTabs() {
    setSaving('tabs')
    await supabase.from('content_arrays').delete().eq('section', 'about.tabs')
    await supabase.from('content_arrays').insert(
      tabs.map((tab, i) => ({
        section: 'about.tabs',
        order_index: i,
        data_en: { label: tab.label_en, title: tab.title_en, content: tab.content_en, image: tab.image },
        data_ar: { label: tab.label_ar, title: tab.title_ar, content: tab.content_ar, image: tab.image },
      }))
    )
    setSaving(null)
    setSaved('tabs')
    setTimeout(() => setSaved(null), 2000)
  }

  async function saveDivisions() {
    setSaving('divisions')
    await supabase.from('content_arrays').delete().eq('section', 'about.divisions')
    await supabase.from('content_arrays').insert(
      divisions.map((div, i) => ({
        section: 'about.divisions',
        order_index: i,
        data_en: { title: div.title_en, description: div.description_en, icon: div.icon },
        data_ar: { title: div.title_ar, description: div.description_ar, icon: div.icon },
      }))
    )
    setSaving(null)
    setSaved('divisions')
    setTimeout(() => setSaved(null), 2000)
  }

  async function saveBadges() {
    setSaving('badges')
    await supabase.from('content_arrays').delete().eq('section', 'about.badges')
    await supabase.from('content_arrays').insert(
      badges.map((b, i) => ({
        section: 'about.badges',
        order_index: i,
        data_en: { badge: b.en },
        data_ar: { badge: b.ar },
      }))
    )
    setSaving(null)
    setSaved('badges')
    setTimeout(() => setSaved(null), 2000)
  }

  function SaveButton({ id }: { id: string }) {
    return (
      <button
        onClick={() => id === 'tabs' ? saveTabs() : id === 'divisions' ? saveDivisions() : saveBadges()}
        disabled={saving === id}
        className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium"
        style={{ background: saved === id ? '#e8f5e9' : gold, color: saved === id ? '#2e7d32' : '#fff' }}
      >
        {saving === id ? <Loader2 className="w-3 h-3 animate-spin" /> : saved === id ? <><CheckCircle className="w-3 h-3" /> Saved</> : `Save`}
      </button>
    )
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-4xl space-y-10">

      <div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Editing</p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>About Section</h2>
      </div>

      {/* ── TABS ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>About Tabs</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>Our Story · Our Vision · Our Team</p>
          </div>
          <SaveButton id="tabs" />
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(167,147,112,0.1)' }}>
          {tabs.map((tab, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === `tab-${i}` ? null : `tab-${i}`)}
              >
                <p className="text-sm" style={{ color: '#000' }}>Tab {i + 1}: {tab.label_en || '(empty)'}</p>
                {expanded === `tab-${i}`
                  ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                  : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />}
              </div>

              {expanded === `tab-${i}` && (
                <div className="px-6 pb-6 space-y-4 pt-4" style={{ background: '#fafafa' }}>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Tab Image</label>
                    {tab.image ? (
                      <div className="relative rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.3)' }}>
                        <img src={tab.image} alt="" className="w-full h-32 object-cover" />
                        <button
                          onClick={() => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, image: '' } : t))}
                          className="absolute top-2 right-2 p-1.5 rounded-full"
                          style={{ background: 'rgba(0,0,0,0.6)' }}
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <label
                        className="flex flex-col items-center justify-center h-24 rounded-sm cursor-pointer"
                        style={{ border: '2px dashed rgba(167,147,112,0.4)', background: 'rgba(167,147,112,0.03)' }}
                      >
                        <input type="file" accept="image/*" onChange={e => handleImageUpload(e, i)} className="hidden" />
                        {uploading === `tab-${i}` ? (
                          <Loader2 className="w-5 h-5 animate-spin" style={{ color: gold }} />
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Upload className="w-5 h-5" style={{ color: gold }} />
                            <span className="text-xs" style={{ color: gold }}>Upload image</span>
                          </div>
                        )}
                      </label>
                    )}
                  </div>

                  {/* Label */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Label (EN)</label>
                      <input value={tab.label_en} onChange={e => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, label_en: e.target.value } : t))} style={inputStyle} placeholder="Our Story" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Label (AR)</label>
                      <input value={tab.label_ar} onChange={e => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, label_ar: e.target.value } : t))} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="قصتنا" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (EN)</label>
                      <input value={tab.title_en} onChange={e => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, title_en: e.target.value } : t))} style={inputStyle} placeholder="Founded on Excellence" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (AR)</label>
                      <input value={tab.title_ar} onChange={e => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, title_ar: e.target.value } : t))} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Content (EN)</label>
                      <textarea value={tab.content_en} onChange={e => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, content_en: e.target.value } : t))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Content (AR)</label>
                      <textarea value={tab.content_ar} onChange={e => setTabs(prev => prev.map((t, idx) => idx === i ? { ...t, content_ar: e.target.value } : t))} rows={4} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVISIONS ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>Business Divisions</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>Real Estate · Technology · Construction · Software</p>
          </div>
          <SaveButton id="divisions" />
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(167,147,112,0.1)' }}>
          {divisions.map((div, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === `div-${i}` ? null : `div-${i}`)}
              >
                <p className="text-sm" style={{ color: '#000' }}>Division {i + 1}: {div.title_en || '(empty)'}</p>
                {expanded === `div-${i}`
                  ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                  : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />}
              </div>

              {expanded === `div-${i}` && (
                <div className="px-6 pb-6 space-y-4 pt-4" style={{ background: '#fafafa' }}>

                  {/* Icon Picker */}
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Icon</label>
                    <IconPicker
                      value={div.icon}
                      onChange={val => setDivisions(prev => prev.map((d, idx) => idx === i ? { ...d, icon: val } : d))}
                    />
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (EN)</label>
                      <input value={div.title_en} onChange={e => setDivisions(prev => prev.map((d, idx) => idx === i ? { ...d, title_en: e.target.value } : d))} style={inputStyle} placeholder="Real Estate" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (AR)</label>
                      <input value={div.title_ar} onChange={e => setDivisions(prev => prev.map((d, idx) => idx === i ? { ...d, title_ar: e.target.value } : d))} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="العقارات" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (EN)</label>
                      <input value={div.description_en} onChange={e => setDivisions(prev => prev.map((d, idx) => idx === i ? { ...d, description_en: e.target.value } : d))} style={inputStyle} placeholder="Investment, development & management solutions" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (AR)</label>
                      <input value={div.description_ar} onChange={e => setDivisions(prev => prev.map((d, idx) => idx === i ? { ...d, description_ar: e.target.value } : d))} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── BADGES ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>Compliance Badges</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>UAE Licensed · ISO Certified · etc.</p>
          </div>
          <SaveButton id="badges" />
        </div>
        <div className="px-6 py-4 space-y-3">
          {badges.map((badge, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <input
                value={badge.en}
                onChange={e => setBadges(prev => prev.map((b, idx) => idx === i ? { ...b, en: e.target.value } : b))}
                style={inputStyle}
                placeholder={`Badge ${i + 1} (EN)`}
              />
              <input
                value={badge.ar}
                onChange={e => setBadges(prev => prev.map((b, idx) => idx === i ? { ...b, ar: e.target.value } : b))}
                dir="rtl"
                style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }}
                placeholder={`Badge ${i + 1} (AR)`}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}