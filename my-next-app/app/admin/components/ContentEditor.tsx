'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { sectionConfigs } from '../config/sections'
import { CheckCircle, Loader2, Upload, X, Video } from 'lucide-react'

const gold = '#a79370'

interface Props {
  section: string
}

interface ContentRow {
  key: string
  value_en: string
  value_ar: string
}

export default function ContentEditor({ section }: Props) {
  const supabase = createClient()
  const config = sectionConfigs[section]
  const [rows, setRows] = useState<Record<string, ContentRow>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('content')
        .select('*')
        .eq('section', section)

      if (data) {
        const map: Record<string, ContentRow> = {}
        data.forEach(row => { map[row.key] = row })
        setRows(map)
      }
    }
    load()
  }, [section])

  async function handleSave(key: string, value_en: string, value_ar: string) {
    setSaving(key)
    await supabase.from('content').upsert({
      section,
      key,
      value_en,
      value_ar,
      updated_at: new Date().toISOString()
    }, { onConflict: 'section,key' })

    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  if (!config) return (
    <div className="text-center py-20" style={{ color: '#999' }}>
      Section not found
    </div>
  )

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>
          Editing
        </p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>
          {config.label}
        </h2>
      </div>

      <div className="space-y-6">
        {config.fields.map(field => {
          const row = rows[field.key]
          const en = row?.value_en || ''
          const ar = row?.value_ar || ''

          return (
            <FieldRow
              key={field.key}
              field={field}
              initialEn={en}
              initialAr={ar}
              saving={saving === field.key}
              saved={saved === field.key}
              onSave={(en, ar) => handleSave(field.key, en, ar)}
            />
          )
        })}
      </div>
    </div>
  )
}

function FieldRow({ field, initialEn, initialAr, saving, saved, onSave }: {
  field: { key: string; label: string; type: string }
  initialEn: string
  initialAr: string
  saving: boolean
  saved: boolean
  onSave: (en: string, ar: string) => void
}) {
  const [en, setEn] = useState(initialEn)
  const [ar, setAr] = useState(initialAr)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const supabase = createClient()

  useEffect(() => { setEn(initialEn) }, [initialEn])
  useEffect(() => { setAr(initialAr) }, [initialAr])

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

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      setUploadError('Please upload a video file (mp4, webm)')
      return
    }
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('Video must be less than 100MB')
      return
    }

    setUploading(true)
    setUploadError('')

    const fileName = `hero/${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('media').upload(fileName, file)

    if (error) {
      setUploadError('Upload failed: ' + error.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
    setEn(publicUrl)
    setAr(publicUrl)
    setUploading(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, lang: 'en' | 'ar') {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB')
      return
    }

    setUploading(true)
    setUploadError('')

    const fileName = `sections/${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('media').upload(fileName, file)

    if (error) {
      setUploadError('Upload failed: ' + error.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
    if (lang === 'en') setEn(publicUrl)
    else setAr(publicUrl)
    setUploading(false)
  }

  // VIDEO FIELD
  if (field.type === 'video') {
    return (
      <div className="p-6 rounded-sm bg-white" style={{ border: '1px solid rgba(167,147,112,0.15)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>{field.label}</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>{field.key}</p>
          </div>
          <button
            onClick={() => onSave(en, ar)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium"
            style={{ background: saved ? '#e8f5e9' : gold, color: saved ? '#2e7d32' : '#fff', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <><CheckCircle className="w-3 h-3" /> Saved</> : 'Save'}
          </button>
        </div>

        {en ? (
          <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.3)' }}>
            <video src={en} className="w-full h-48 object-cover" muted autoPlay loop playsInline />
            <div className="flex items-center justify-between px-3 py-2" style={{ background: '#faf9f6' }}>
              <span className="text-xs truncate max-w-sm" style={{ color: '#999' }}>{en.split('/').pop()}</span>
              <button onClick={() => { setEn(''); setAr('') }} className="p-1 rounded hover:bg-red-50" style={{ color: '#ccc' }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <label
            className="flex flex-col items-center justify-center h-36 rounded-sm cursor-pointer"
            style={{ border: '2px dashed rgba(167,147,112,0.4)', background: 'rgba(167,147,112,0.03)' }}
          >
            <input type="file" accept="video/mp4,video/webm" onChange={handleVideoUpload} className="hidden" />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: gold }} />
                <span className="text-xs" style={{ color: gold }}>Uploading video...</span>
                <span className="text-[10px]" style={{ color: '#bbb' }}>This may take a moment</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Video className="w-6 h-6" style={{ color: gold }} />
                <span className="text-xs" style={{ color: gold }}>Click to upload video</span>
                <span className="text-[10px]" style={{ color: '#bbb' }}>MP4 or WebM · max 100MB</span>
              </div>
            )}
          </label>
        )}
        {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
      </div>
    )
  }

  // IMAGE FIELD
  if (field.type === 'image') {
    return (
      <div className="p-6 rounded-sm bg-white" style={{ border: '1px solid rgba(167,147,112,0.15)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>{field.label}</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>{field.key}</p>
          </div>
          <button
            onClick={() => onSave(en, ar)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium"
            style={{ background: saved ? '#e8f5e9' : gold, color: saved ? '#2e7d32' : '#fff', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <><CheckCircle className="w-3 h-3" /> Saved</> : 'Save'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(['en', 'ar'] as const).map(lang => {
            const val = lang === 'en' ? en : ar
            return (
              <div key={lang}>
                <label className="block text-xs mb-1.5" style={{ color: '#999' }}>{lang === 'en' ? 'English' : 'Arabic'}</label>
                {val ? (
                  <div className="relative rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.3)' }}>
                    <img src={val} alt="" className="w-full h-32 object-cover" />
                    <button
                      onClick={() => lang === 'en' ? setEn('') : setAr('')}
                      className="absolute top-2 right-2 p-1.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.6)' }}
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <label
                    className="flex flex-col items-center justify-center h-32 rounded-sm cursor-pointer"
                    style={{ border: '2px dashed rgba(167,147,112,0.4)', background: 'rgba(167,147,112,0.03)' }}
                  >
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e, lang)} className="hidden" />
                    {uploading ? (
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
            )
          })}
        </div>
        {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
      </div>
    )
  }

  // TEXT / TEXTAREA FIELD
  return (
    <div className="p-6 rounded-sm bg-white" style={{ border: '1px solid rgba(167,147,112,0.15)' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium" style={{ color: '#000' }}>{field.label}</p>
          <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>{field.key}</p>
        </div>
        <button
          onClick={() => onSave(en, ar)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium transition-opacity"
          style={{ background: saved ? '#e8f5e9' : gold, color: saved ? '#2e7d32' : '#fff', opacity: saving ? 0.7 : 1 }}
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <><CheckCircle className="w-3 h-3" /> Saved</> : 'Save'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs mb-1.5" style={{ color: '#999' }}>English</label>
          {field.type === 'textarea' ? (
            <textarea value={en} onChange={e => setEn(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          ) : (
            <input type="text" value={en} onChange={e => setEn(e.target.value)} style={inputStyle} />
          )}
        </div>
        <div>
          <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Arabic</label>
          {field.type === 'textarea' ? (
            <textarea value={ar} onChange={e => setAr(e.target.value)} rows={3} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} />
          ) : (
            <input type="text" value={ar} onChange={e => setAr(e.target.value)} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
          )}
        </div>
      </div>
    </div>
  )
}