'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, ChevronDown, ChevronUp, CheckCircle, Upload, X } from 'lucide-react'
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

const defaultSectorImages = [
  'https://img.freepik.com/free-photo/skyscrapers-view_1112-268.jpg?semt=ais_user_personalization&w=740&q=80',
  'https://media.istockphoto.com/id/608601538/photo/moden-glass-building.jpg',
  'https://cdn.alromaizan.com/image/upload/v1732525687/media/images/i31wglsx3wqnf0cp55ya.webp',
]

export default function InvestmentsEditor() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)

  const [approaches, setApproaches] = useState([
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Shield' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Wrench' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Users' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Leaf' },
  ])

  const [sectors, setSectors] = useState([
    { title_en: '', title_ar: '', description_en: '', description_ar: '', image: '', href: '/ventures/real-estate' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', image: '', href: '/ventures/infrastructure' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', image: '', href: '/ventures/technology' },
  ])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('content_arrays')
      .select('*')
      .in('section', ['investments.approaches', 'investments.sectors'])
      .order('order_index')

    if (data) {
      const approachRows = data.filter(r => r.section === 'investments.approaches')
      const sectorRows = data.filter(r => r.section === 'investments.sectors')

      if (approachRows.length) {
        setApproaches(approachRows.map(r => ({
          title_en: r.data_en?.title || '',
          title_ar: r.data_ar?.title || '',
          description_en: r.data_en?.description || '',
          description_ar: r.data_ar?.description || '',
          icon: r.data_en?.icon || 'Shield',
        })))
      }

      if (sectorRows.length) {
        setSectors(sectorRows.map((r, i) => ({
          title_en: r.data_en?.title || '',
          title_ar: r.data_ar?.title || '',
          description_en: r.data_en?.description || '',
          description_ar: r.data_ar?.description || '',
          image: r.data_en?.image || defaultSectorImages[i] || '',
          href: r.data_en?.href || '',
        })))
      }
    }
    setLoading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) { alert('Image must be less than 5MB'); return }

    setUploading(`sector-${index}`)
    const fileName = `investments/${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('media').upload(fileName, file)
    if (error) { alert('Upload failed: ' + error.message); setUploading(null); return }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
    setSectors(prev => prev.map((s, i) => i === index ? { ...s, image: publicUrl } : s))
    setUploading(null)
  }

  async function saveApproaches() {
    setSaving('approaches')
    await supabase.from('content_arrays').delete().eq('section', 'investments.approaches')
    await supabase.from('content_arrays').insert(
      approaches.map((a, i) => ({
        section: 'investments.approaches',
        order_index: i,
        data_en: { title: a.title_en, description: a.description_en, icon: a.icon },
        data_ar: { title: a.title_ar, description: a.description_ar, icon: a.icon },
      }))
    )
    setSaving(null)
    setSaved('approaches')
    setTimeout(() => setSaved(null), 2000)
  }

  async function saveSectors() {
    setSaving('sectors')
    await supabase.from('content_arrays').delete().eq('section', 'investments.sectors')
    await supabase.from('content_arrays').insert(
      sectors.map((s, i) => ({
        section: 'investments.sectors',
        order_index: i,
        data_en: { title: s.title_en, description: s.description_en, image: s.image, href: s.href },
        data_ar: { title: s.title_ar, description: s.description_ar, image: s.image, href: s.href },
      }))
    )
    setSaving(null)
    setSaved('sectors')
    setTimeout(() => setSaved(null), 2000)
  }

  function SaveBtn({ id }: { id: string }) {
    return (
      <button
        onClick={() => id === 'approaches' ? saveApproaches() : saveSectors()}
        disabled={saving === id}
        className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium"
        style={{ background: saved === id ? '#e8f5e9' : gold, color: saved === id ? '#2e7d32' : '#fff' }}
      >
        {saving === id
          ? <Loader2 className="w-3 h-3 animate-spin" />
          : saved === id
            ? <><CheckCircle className="w-3 h-3" /> Saved</>
            : 'Save'}
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
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>Investments Section</h2>
      </div>

      {/* ── APPROACHES ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>Our Approach Cards</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>Risk · Operational · Partnerships · Sustainable</p>
          </div>
          <SaveBtn id="approaches" />
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(167,147,112,0.1)' }}>
          {approaches.map((ap, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === `ap-${i}` ? null : `ap-${i}`)}
              >
                <p className="text-sm" style={{ color: '#000' }}>Approach {i + 1}: {ap.title_en || '(empty)'}</p>
                {expanded === `ap-${i}`
                  ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                  : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />}
              </div>

              {expanded === `ap-${i}` && (
                <div className="px-6 pb-6 pt-4 space-y-4" style={{ background: '#fafafa' }}>

                  {/* Icon */}
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Icon</label>
                    <IconPicker
                      value={ap.icon}
                      onChange={val => setApproaches(prev => prev.map((a, idx) => idx === i ? { ...a, icon: val } : a))}
                    />
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (EN)</label>
                      <input
                        value={ap.title_en}
                        onChange={e => setApproaches(prev => prev.map((a, idx) => idx === i ? { ...a, title_en: e.target.value } : a))}
                        style={inputStyle}
                        placeholder="Risk & Capital Protection"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (AR)</label>
                      <input
                        value={ap.title_ar}
                        onChange={e => setApproaches(prev => prev.map((a, idx) => idx === i ? { ...a, title_ar: e.target.value } : a))}
                        dir="rtl"
                        style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (EN)</label>
                      <textarea
                        value={ap.description_en}
                        onChange={e => setApproaches(prev => prev.map((a, idx) => idx === i ? { ...a, description_en: e.target.value } : a))}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (AR)</label>
                      <textarea
                        value={ap.description_ar}
                        onChange={e => setApproaches(prev => prev.map((a, idx) => idx === i ? { ...a, description_ar: e.target.value } : a))}
                        rows={3}
                        dir="rtl"
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTORS ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>Investment Sectors</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>Real Estate · Infrastructure · Technology</p>
          </div>
          <SaveBtn id="sectors" />
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(167,147,112,0.1)' }}>
          {sectors.map((sector, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === `sec-${i}` ? null : `sec-${i}`)}
              >
                <p className="text-sm" style={{ color: '#000' }}>Sector {i + 1}: {sector.title_en || '(empty)'}</p>
                {expanded === `sec-${i}`
                  ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                  : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />}
              </div>

              {expanded === `sec-${i}` && (
                <div className="px-6 pb-6 pt-4 space-y-4" style={{ background: '#fafafa' }}>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Sector Image</label>
                    {sector.image ? (
                      <div className="relative rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.3)' }}>
                        <img src={sector.image} alt="" className="w-full h-32 object-cover" />
                        <button
                          onClick={() => setSectors(prev => prev.map((s, idx) => idx === i ? { ...s, image: '' } : s))}
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
                        {uploading === `sector-${i}` ? (
                          <Loader2 className="w-5 h-5 animate-spin" style={{ color: gold }} />
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Upload className="w-5 h-5" style={{ color: gold }} />
                            <span className="text-xs" style={{ color: gold }}>Upload image</span>
                            <span className="text-[10px]" style={{ color: '#bbb' }}>Max 5MB</span>
                          </div>
                        )}
                      </label>
                    )}
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (EN)</label>
                      <input
                        value={sector.title_en}
                        onChange={e => setSectors(prev => prev.map((s, idx) => idx === i ? { ...s, title_en: e.target.value } : s))}
                        style={inputStyle}
                        placeholder="Real Estate"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (AR)</label>
                      <input
                        value={sector.title_ar}
                        onChange={e => setSectors(prev => prev.map((s, idx) => idx === i ? { ...s, title_ar: e.target.value } : s))}
                        dir="rtl"
                        style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (EN)</label>
                      <textarea
                        value={sector.description_en}
                        onChange={e => setSectors(prev => prev.map((s, idx) => idx === i ? { ...s, description_en: e.target.value } : s))}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (AR)</label>
                      <textarea
                        value={sector.description_ar}
                        onChange={e => setSectors(prev => prev.map((s, idx) => idx === i ? { ...s, description_ar: e.target.value } : s))}
                        rows={3}
                        dir="rtl"
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }}
                      />
                    </div>
                  </div>

                  {/* Link */}
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Link (href)</label>
                    <input
                      value={sector.href}
                      onChange={e => setSectors(prev => prev.map((s, idx) => idx === i ? { ...s, href: e.target.value } : s))}
                      style={inputStyle}
                      placeholder="/ventures/real-estate"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}