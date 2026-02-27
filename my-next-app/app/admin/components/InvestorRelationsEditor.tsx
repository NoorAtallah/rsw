'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, ChevronDown, ChevronUp, CheckCircle, Upload, X, FileText } from 'lucide-react'
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

export default function InvestorRelationsEditor() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [uploadingDoc, setUploadingDoc] = useState<number | null>(null)

  const [sections, setSections] = useState([
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Shield' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'FileText' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Users' },
    { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'TrendingUp' },
  ])

  const [documents, setDocuments] = useState([
    { name_en: '', name_ar: '', size: '', type: 'PDF', url: '' },
    { name_en: '', name_ar: '', size: '', type: 'PDF', url: '' },
    { name_en: '', name_ar: '', size: '', type: 'PDF', url: '' },
    { name_en: '', name_ar: '', size: '', type: 'PDF', url: '' },
  ])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data } = await supabase
      .from('content_arrays')
      .select('*')
      .in('section', ['investorRelations.sections', 'investorRelations.documents'])
      .order('order_index')

    if (data) {
      const sectionRows = data.filter(r => r.section === 'investorRelations.sections')
      const docRows = data.filter(r => r.section === 'investorRelations.documents')

      if (sectionRows.length) {
        setSections(sectionRows.map(r => ({
          title_en: r.data_en?.title || '',
          title_ar: r.data_ar?.title || '',
          description_en: r.data_en?.description || '',
          description_ar: r.data_ar?.description || '',
          icon: r.data_en?.icon || 'Shield',
        })))
      }

      if (docRows.length) {
        setDocuments(docRows.map(r => ({
          name_en: r.data_en?.name || '',
          name_ar: r.data_ar?.name || '',
          size: r.data_en?.size || '',
          type: r.data_en?.type || 'PDF',
          url: r.data_en?.url || '',
        })))
      }
    }
    setLoading(false)
  }

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      alert('PDF must be less than 20MB')
      return
    }

    setUploadingDoc(index)

    const fileName = `documents/${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('media').upload(fileName, file, {
      contentType: 'application/pdf',
    })

    if (error) {
      alert('Upload failed: ' + error.message)
      setUploadingDoc(null)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)

    // Auto-fill size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1)
    const sizeLabel = `${sizeInMB} MB`

    // Auto-fill name if empty
    const cleanName = file.name.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' ')

    setDocuments(prev => prev.map((d, i) => i === index ? {
      ...d,
      url: publicUrl,
      size: sizeLabel,
      name_en: d.name_en || cleanName,
    } : d))

    setUploadingDoc(null)
  }

  async function saveSections() {
    setSaving('sections')
    await supabase.from('content_arrays').delete().eq('section', 'investorRelations.sections')
    await supabase.from('content_arrays').insert(
      sections.map((s, i) => ({
        section: 'investorRelations.sections',
        order_index: i,
        data_en: { title: s.title_en, description: s.description_en, icon: s.icon },
        data_ar: { title: s.title_ar, description: s.description_ar, icon: s.icon },
      }))
    )
    setSaving(null)
    setSaved('sections')
    setTimeout(() => setSaved(null), 2000)
  }

  async function saveDocuments() {
    setSaving('documents')
    await supabase.from('content_arrays').delete().eq('section', 'investorRelations.documents')
    await supabase.from('content_arrays').insert(
      documents.map((d, i) => ({
        section: 'investorRelations.documents',
        order_index: i,
        data_en: { name: d.name_en, size: d.size, type: d.type, url: d.url },
        data_ar: { name: d.name_ar, size: d.size, type: d.type, url: d.url },
      }))
    )
    setSaving(null)
    setSaved('documents')
    setTimeout(() => setSaved(null), 2000)
  }

  function SaveBtn({ id }: { id: string }) {
    return (
      <button
        onClick={() => id === 'sections' ? saveSections() : saveDocuments()}
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
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>Investor Relations</h2>
      </div>

      {/* ── ACCORDION SECTIONS ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>Accordion Sections</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>Governance · Disclosure · Shareholder · Performance</p>
          </div>
          <SaveBtn id="sections" />
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(167,147,112,0.1)' }}>
          {sections.map((sec, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="flex items-center justify-between px-6 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === `sec-${i}` ? null : `sec-${i}`)}
              >
                <p className="text-sm" style={{ color: '#000' }}>Section {i + 1}: {sec.title_en || '(empty)'}</p>
                {expanded === `sec-${i}`
                  ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                  : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />}
              </div>

              {expanded === `sec-${i}` && (
                <div className="px-6 pb-6 pt-4 space-y-4" style={{ background: '#fafafa' }}>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Icon</label>
                    <IconPicker
                      value={sec.icon}
                      onChange={val => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, icon: val } : s))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (EN)</label>
                      <input value={sec.title_en} onChange={e => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, title_en: e.target.value } : s))} style={inputStyle} placeholder="Governance Framework" />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Title (AR)</label>
                      <input value={sec.title_ar} onChange={e => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, title_ar: e.target.value } : s))} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (EN)</label>
                      <textarea value={sec.description_en} onChange={e => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, description_en: e.target.value } : s))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Description (AR)</label>
                      <textarea value={sec.description_ar} onChange={e => setSections(prev => prev.map((s, idx) => idx === i ? { ...s, description_ar: e.target.value } : s))} rows={4} dir="rtl" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: '#000' }}>Key Documents</p>
            <p className="text-xs mt-0.5" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>Upload PDFs — size is auto-calculated</p>
          </div>
          <SaveBtn id="documents" />
        </div>

        <div className="px-6 py-4 space-y-4">
          {documents.map((doc, i) => (
            <div key={i} className="p-4 rounded-sm" style={{ background: '#fafafa', border: '1px solid rgba(167,147,112,0.1)' }}>
              <p className="text-xs font-medium mb-3" style={{ color: '#888' }}>Document {i + 1}</p>

              {/* PDF Upload */}
              <div className="mb-3">
                <label className="block text-xs mb-1.5" style={{ color: '#999' }}>PDF File</label>
                {doc.url ? (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-sm"
                    style={{ background: 'rgba(167,147,112,0.06)', border: '1px solid rgba(167,147,112,0.25)' }}
                  >
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: gold }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: '#000' }}>
                        {doc.url.split('/').pop()}
                      </p>
                      <p className="text-[10px]" style={{ color: '#999' }}>{doc.size} · PDF uploaded ✓</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] px-2 py-1 rounded"
                        style={{ background: 'rgba(167,147,112,0.15)', color: gold }}
                      >
                        Preview
                      </a>
                      <button
                        onClick={() => setDocuments(prev => prev.map((d, idx) => idx === i ? { ...d, url: '', size: '' } : d))}
                        className="p-1 rounded hover:bg-red-50"
                        style={{ color: '#ccc' }}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    className="flex items-center gap-3 px-4 py-3 rounded-sm cursor-pointer transition-all"
                    style={{ border: '2px dashed rgba(167,147,112,0.35)', background: 'rgba(167,147,112,0.02)' }}
                  >
                    <input type="file" accept="application/pdf" onChange={e => handlePdfUpload(e, i)} className="hidden" />
                    {uploadingDoc === i ? (
                      <div className="flex items-center gap-2 w-full justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: gold }} />
                        <span className="text-xs" style={{ color: gold }}>Uploading PDF...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 w-full">
                        <Upload className="w-4 h-4 flex-shrink-0" style={{ color: gold }} />
                        <div>
                          <p className="text-xs" style={{ color: gold }}>Click to upload PDF</p>
                          <p className="text-[10px]" style={{ color: '#bbb' }}>Max 20MB · Size auto-calculated</p>
                        </div>
                      </div>
                    )}
                  </label>
                )}
              </div>

              {/* Names */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Display Name (EN)</label>
                  <input value={doc.name_en} onChange={e => setDocuments(prev => prev.map((d, idx) => idx === i ? { ...d, name_en: e.target.value } : d))} style={inputStyle} placeholder="Annual Report 2025" />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Display Name (AR)</label>
                  <input value={doc.name_ar} onChange={e => setDocuments(prev => prev.map((d, idx) => idx === i ? { ...d, name_ar: e.target.value } : d))} dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} placeholder="التقرير السنوي 2025" />
                </div>
              </div>

              {/* Size + Type (read-only if auto-filled) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#999' }}>File Size (auto-filled)</label>
                  <input value={doc.size} onChange={e => setDocuments(prev => prev.map((d, idx) => idx === i ? { ...d, size: e.target.value } : d))} style={{ ...inputStyle, color: doc.url ? '#888' : '#000' }} placeholder="2.4 MB" />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: '#999' }}>File Type</label>
                  <input value={doc.type} onChange={e => setDocuments(prev => prev.map((d, idx) => idx === i ? { ...d, type: e.target.value } : d))} style={inputStyle} placeholder="PDF" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}