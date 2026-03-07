'use client'

// ============================================================
// InvestorRelationsEditor.tsx
// Admin editor for the Investor Relations page content.
// Mirrors the NewsEditor pattern — Supabase-backed, bilingual.
//
// Supabase tables used:
//   content          → static text fields (hero, section titles, contact)
//   content_arrays   → documents list  (section = 'ir.documents')
// ============================================================

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Loader2, Plus, Trash2, ChevronDown, ChevronUp,
  Search, X, Save, FileText, Globe, Users,
  Shield, TrendingUp, Phone, Mail, Building2
} from 'lucide-react'
import ImageUpload from './ImageUpload'

const gold = '#a79370'
const supabase = createClient()

// ─── Types ────────────────────────────────────────────────────

interface IRContent {
  // Hero
  hero_eyebrow_en: string
  hero_eyebrow_ar: string
  hero_title_en: string
  hero_title_ar: string
  hero_description_en: string
  hero_description_ar: string

  // Governance sections (4 items)
  governance_title_en: string
  governance_title_ar: string
  governance_description_en: string
  governance_description_ar: string

  disclosure_title_en: string
  disclosure_title_ar: string
  disclosure_description_en: string
  disclosure_description_ar: string

  shareholder_title_en: string
  shareholder_title_ar: string
  shareholder_description_en: string
  shareholder_description_ar: string

  performance_title_en: string
  performance_title_ar: string
  performance_description_en: string
  performance_description_ar: string

  // Documents section
  documents_title_en: string
  documents_title_ar: string
  documents_subtitle_en: string
  documents_subtitle_ar: string

  // Contact
  contact_title_en: string
  contact_title_ar: string
  contact_description_en: string
  contact_description_ar: string
  contact_button_en: string
  contact_button_ar: string
  contact_email: string
  contact_phone: string
  contact_office_en: string
  contact_office_ar: string
}

interface IRDocument {
  id?: string
  name_en: string
  name_ar: string
  type: string
  size: string
  url: string
  order_index: number
}

// ─── Defaults ─────────────────────────────────────────────────

const defaultContent: IRContent = {
  hero_eyebrow_en: 'Investor Relations',
  hero_eyebrow_ar: 'علاقات المستثمرين',
  hero_title_en: 'Investor Relations',
  hero_title_ar: 'علاقات المستثمرين',
  hero_description_en: 'We are committed to maintaining open and transparent communication with our investors and stakeholders.',
  hero_description_ar: 'نلتزم بالحفاظ على تواصل مفتوح وشفاف مع مستثمرينا وأصحاب المصلحة.',

  governance_title_en: 'Corporate Governance',
  governance_title_ar: 'حوكمة الشركات',
  governance_description_en: 'RSW Investment Group maintains the highest standards of corporate governance.',
  governance_description_ar: 'تحافظ مجموعة RSW للاستثمار على أعلى معايير حوكمة الشركات.',

  disclosure_title_en: 'Financial Disclosure',
  disclosure_title_ar: 'الإفصاح المالي',
  disclosure_description_en: 'We provide timely and accurate financial information to our investors.',
  disclosure_description_ar: 'نقدم معلومات مالية دقيقة وفي الوقت المناسب لمستثمرينا.',

  shareholder_title_en: 'Shareholder Rights',
  shareholder_title_ar: 'حقوق المساهمين',
  shareholder_description_en: 'We uphold and protect the rights of all shareholders.',
  shareholder_description_ar: 'نحافظ على حقوق جميع المساهمين ونحميها.',

  performance_title_en: 'Performance Reporting',
  performance_title_ar: 'تقارير الأداء',
  performance_description_en: 'Regular performance updates and comprehensive reporting for our investors.',
  performance_description_ar: 'تحديثات أداء منتظمة وتقارير شاملة لمستثمرينا.',

  documents_title_en: 'Key Documents',
  documents_title_ar: 'الوثائق الرئيسية',
  documents_subtitle_en: 'Download our latest reports and disclosures',
  documents_subtitle_ar: 'تنزيل أحدث تقاريرنا وإفصاحاتنا',

  contact_title_en: 'Contact Our IR Team',
  contact_title_ar: 'تواصل مع فريق علاقات المستثمرين',
  contact_description_en: 'Our Investor Relations team is available to answer your questions and provide additional information.',
  contact_description_ar: 'فريق علاقات المستثمرين لدينا متاح للإجابة على أسئلتكم وتقديم معلومات إضافية.',
  contact_button_en: 'Send a Message',
  contact_button_ar: 'أرسل رسالة',
  contact_email: 'ir@rswinvestment.ae',
  contact_phone: '+971 2 612 3456',
  contact_office_en: 'Al Maryah Island, Abu Dhabi Global Market\nAbu Dhabi, United Arab Emirates',
  contact_office_ar: 'جزيرة المارية، سوق أبوظبي العالمي\nأبوظبي، الإمارات العربية المتحدة',
}

const emptyDoc = (): IRDocument => ({
  name_en: '',
  name_ar: '',
  type: 'PDF',
  size: '',
  url: '',
  order_index: 0,
})

// ─── Shared styles ─────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid rgba(167,147,112,0.3)',
  background: '#faf9f6',
  borderRadius: 4,
  fontSize: 13,
  color: '#000',
  outline: 'none',
}

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical' as const,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  color: '#999',
  marginBottom: 6,
  fontFamily: 'Space Mono, monospace',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

// ─── Sub-components ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: gold,
      letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4 }}>
      {children}
    </p>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0 20px' }}>
      <div style={{ height: 1, flex: 1, background: 'rgba(167,147,112,0.2)' }} />
      <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: gold,
        letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
        {title}
      </span>
      <div style={{ height: 1, flex: 1, background: 'rgba(167,147,112,0.2)' }} />
    </div>
  )
}

function BilingualTextInput({
  labelEn, labelAr, valueEn, valueAr,
  onChangeEn, onChangeAr, multiline = false, rows = 3
}: {
  labelEn: string; labelAr: string
  valueEn: string; valueAr: string
  onChangeEn: (v: string) => void
  onChangeAr: (v: string) => void
  multiline?: boolean; rows?: number
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label style={labelStyle}>{labelEn}</label>
        {multiline
          ? <textarea value={valueEn} onChange={e => onChangeEn(e.target.value)}
              rows={rows} style={textareaStyle} />
          : <input type="text" value={valueEn} onChange={e => onChangeEn(e.target.value)}
              style={inputStyle} />
        }
      </div>
      <div>
        <label style={labelStyle}>{labelAr}</label>
        {multiline
          ? <textarea value={valueAr} onChange={e => onChangeAr(e.target.value)}
              rows={rows} dir="rtl" style={{ ...textareaStyle, fontFamily: 'Tajawal, sans-serif' }} />
          : <input type="text" value={valueAr} onChange={e => onChangeAr(e.target.value)}
              dir="rtl" style={{ ...inputStyle, fontFamily: 'Tajawal, sans-serif' }} />
        }
      </div>
    </div>
  )
}

function AccordionCard({
  icon: Icon, title, isOpen, onToggle, children
}: {
  icon: React.ElementType; title: string
  isOpen: boolean; onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{ border: '1px solid rgba(167,147,112,0.2)', borderRadius: 4,
      background: '#fff', overflow: 'hidden', marginBottom: 8 }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '16px 20px',
          background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(167,147,112,0.1)' }}>
            <Icon size={15} style={{ color: gold }} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: '#000' }}>
            {title}
          </span>
        </div>
        {isOpen
          ? <ChevronUp size={15} style={{ color: '#ccc' }} />
          : <ChevronDown size={15} style={{ color: '#ccc' }} />
        }
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 20px',
          borderTop: '1px solid rgba(167,147,112,0.1)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────

export default function InvestorRelationsEditor() {
  const [content, setContent] = useState<IRContent>(defaultContent)
  const [documents, setDocuments] = useState<IRDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [savingContent, setSavingContent] = useState(false)
  const [savingDoc, setSavingDoc] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true, governance: false, disclosure: false,
    shareholder: false, performance: false,
  })
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)
  const [docSearch, setDocSearch] = useState('')
  const [savedBanner, setSavedBanner] = useState(false)

  useEffect(() => { fetchAll() }, [])

  // ── Fetch ──
  async function fetchAll() {
    setLoading(true)
    await Promise.all([fetchContent(), fetchDocuments()])
    setLoading(false)
  }

  async function fetchContent() {
    const { data } = await supabase
      .from('content')
      .select('*')
      .eq('page', 'investor-relations')

    if (!data?.length) return

    const map: Record<string, string> = {}
    data.forEach(row => { map[row.key] = row.value })

    setContent(prev => {
      const next = { ...prev }
      Object.keys(prev).forEach(k => {
        if (map[k] !== undefined) (next as any)[k] = map[k]
      })
      return next
    })
  }

  async function fetchDocuments() {
    const { data } = await supabase
      .from('content_arrays')
      .select('*')
      .eq('section', 'ir.documents')
      .order('order_index')

    if (data) {
      setDocuments(data.map(row => ({
        id: row.id,
        name_en: row.data_en?.name || '',
        name_ar: row.data_ar?.name || '',
        type: row.data_en?.type || 'PDF',
        size: row.data_en?.size || '',
        url: row.data_en?.url || '',
        order_index: row.order_index,
      })))
    }
  }

  // ── Save content ──
  async function handleSaveContent() {
    setSavingContent(true)
    const rows = Object.entries(content).map(([key, value]) => ({
      page: 'investor-relations',
      key,
      value: value as string,
    }))

    // Upsert all fields
    await supabase
      .from('content')
      .upsert(rows, { onConflict: 'page,key' })

    setSavingContent(false)
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 3000)
  }

  // ── Save doc ──
  async function handleSaveDoc(doc: IRDocument) {
    setSavingDoc(doc.id || 'new')

    const data_en = { name: doc.name_en, type: doc.type, size: doc.size, url: doc.url }
    const data_ar = { name: doc.name_ar, type: doc.type, size: doc.size, url: doc.url }

    if (doc.id) {
      await supabase.from('content_arrays').update({
        data_en, data_ar, order_index: doc.order_index
      }).eq('id', doc.id)
    } else {
      await supabase.from('content_arrays').insert({
        section: 'ir.documents', data_en, data_ar,
        order_index: documents.length,
      })
    }

    setSavingDoc(null)
    fetchDocuments()
  }

  async function handleDeleteDoc(id: string) {
    if (!confirm('Delete this document?')) return
    await supabase.from('content_arrays').delete().eq('id', id)
    fetchDocuments()
  }

  // ── Helpers ──
  const set = (key: keyof IRContent) => (value: string) =>
    setContent(prev => ({ ...prev, [key]: value }))

  const toggleSection = (key: string) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))

  const filteredDocs = useMemo(() => {
    const q = docSearch.toLowerCase()
    return documents.filter(d =>
      !q || d.name_en.toLowerCase().includes(q) || d.name_ar.includes(q) || d.type.toLowerCase().includes(q)
    )
  }, [documents, docSearch])

  function handleDocChange(index: number, field: keyof IRDocument, value: string) {
    setDocuments(prev => prev.map((d, i) => i === index ? { ...d, [field]: value } : d))
  }

  function handleAddDoc() {
    const nd = { ...emptyDoc(), order_index: documents.length }
    setDocuments(prev => [...prev, nd])
    setExpandedDoc('new-' + documents.length)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-4xl">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: gold,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>
            Editing
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 300, color: '#000',
            fontFamily: 'Playfair Display, serif' }}>
            Investor Relations
          </h2>
          <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
            Page content, governance sections, documents & contact info
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {savedBanner && (
            <span style={{ fontSize: 12, color: '#5aad76',
              fontFamily: 'Space Mono, monospace' }}>
              ✓ Saved
            </span>
          )}
          <button
            onClick={handleSaveContent}
            disabled={savingContent}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
              background: gold, color: '#fff', border: 'none', borderRadius: 4,
              fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            {savingContent
              ? <Loader2 size={14} className="animate-spin" />
              : <Save size={14} />
            }
            {savingContent ? 'Saving…' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
          TAB 1 — CONTENT
      ════════════════════════════════════ */}

      {/* ── Hero ── */}
      <AccordionCard icon={Globe} title="Hero Section"
        isOpen={openSections.hero} onToggle={() => toggleSection('hero')}>

        <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BilingualTextInput
            labelEn="Eyebrow (EN)" labelAr="Eyebrow (AR)"
            valueEn={content.hero_eyebrow_en} valueAr={content.hero_eyebrow_ar}
            onChangeEn={set('hero_eyebrow_en')} onChangeAr={set('hero_eyebrow_ar')} />

          <BilingualTextInput
            labelEn="Main Title (EN)" labelAr="Main Title (AR)"
            valueEn={content.hero_title_en} valueAr={content.hero_title_ar}
            onChangeEn={set('hero_title_en')} onChangeAr={set('hero_title_ar')} />

          <BilingualTextInput
            labelEn="Description (EN)" labelAr="Description (AR)"
            valueEn={content.hero_description_en} valueAr={content.hero_description_ar}
            onChangeEn={set('hero_description_en')} onChangeAr={set('hero_description_ar')}
            multiline rows={3} />
        </div>
      </AccordionCard>

      {/* ── Governance Sections ── */}
      {[
        { key: 'governance', icon: Shield, label: 'Governance Section' },
        { key: 'disclosure', icon: FileText, label: 'Financial Disclosure Section' },
        { key: 'shareholder', icon: Users, label: 'Shareholder Rights Section' },
        { key: 'performance', icon: TrendingUp, label: 'Performance Reporting Section' },
      ].map(({ key, icon, label }) => (
        <AccordionCard key={key} icon={icon} title={label}
          isOpen={!!openSections[key]} onToggle={() => toggleSection(key)}>

          <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BilingualTextInput
              labelEn="Title (EN)" labelAr="Title (AR)"
              valueEn={(content as any)[`${key}_title_en`]}
              valueAr={(content as any)[`${key}_title_ar`]}
              onChangeEn={set(`${key}_title_en` as keyof IRContent)}
              onChangeAr={set(`${key}_title_ar` as keyof IRContent)} />

            <BilingualTextInput
              labelEn="Description (EN)" labelAr="Description (AR)"
              valueEn={(content as any)[`${key}_description_en`]}
              valueAr={(content as any)[`${key}_description_ar`]}
              onChangeEn={set(`${key}_description_en` as keyof IRContent)}
              onChangeAr={set(`${key}_description_ar` as keyof IRContent)}
              multiline rows={3} />
          </div>
        </AccordionCard>
      ))}

      {/* ── Documents Section Labels ── */}
      <AccordionCard icon={FileText} title="Documents Section — Labels"
        isOpen={!!openSections.documents_labels}
        onToggle={() => toggleSection('documents_labels')}>

        <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BilingualTextInput
            labelEn="Section Title (EN)" labelAr="Section Title (AR)"
            valueEn={content.documents_title_en} valueAr={content.documents_title_ar}
            onChangeEn={set('documents_title_en')} onChangeAr={set('documents_title_ar')} />

          <BilingualTextInput
            labelEn="Section Subtitle (EN)" labelAr="Section Subtitle (AR)"
            valueEn={content.documents_subtitle_en} valueAr={content.documents_subtitle_ar}
            onChangeEn={set('documents_subtitle_en')} onChangeAr={set('documents_subtitle_ar')} />
        </div>
      </AccordionCard>

      {/* ── Contact ── */}
      <AccordionCard icon={Mail} title="Contact IR Team Section"
        isOpen={!!openSections.contact} onToggle={() => toggleSection('contact')}>

        <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BilingualTextInput
            labelEn="Title (EN)" labelAr="Title (AR)"
            valueEn={content.contact_title_en} valueAr={content.contact_title_ar}
            onChangeEn={set('contact_title_en')} onChangeAr={set('contact_title_ar')} />

          <BilingualTextInput
            labelEn="Description (EN)" labelAr="Description (AR)"
            valueEn={content.contact_description_en} valueAr={content.contact_description_ar}
            onChangeEn={set('contact_description_en')} onChangeAr={set('contact_description_ar')}
            multiline rows={3} />

          <BilingualTextInput
            labelEn="Button Label (EN)" labelAr="Button Label (AR)"
            valueEn={content.contact_button_en} valueAr={content.contact_button_ar}
            onChangeEn={set('contact_button_en')} onChangeAr={set('contact_button_ar')} />

          <SectionDivider title="Contact Details" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" value={content.contact_email}
                onChange={e => set('contact_email')(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="text" value={content.contact_phone}
                onChange={e => set('contact_phone')(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <BilingualTextInput
            labelEn="Office Address (EN)" labelAr="Office Address (AR)"
            valueEn={content.contact_office_en} valueAr={content.contact_office_ar}
            onChangeEn={set('contact_office_en')} onChangeAr={set('contact_office_ar')}
            multiline rows={2} />
        </div>
      </AccordionCard>

      {/* Save button bottom */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginBottom: 48 }}>
        <button
          onClick={handleSaveContent}
          disabled={savingContent}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px',
            background: gold, color: '#fff', border: 'none', borderRadius: 4,
            fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          {savingContent ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {savingContent ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {/* ════════════════════════════════════
          DOCUMENTS LIST
      ════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(167,147,112,0.2)', paddingTop: 40 }}>

        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: gold,
              letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>
              Editing
            </p>
            <h3 style={{ fontSize: 24, fontWeight: 300, color: '#000',
              fontFamily: 'Playfair Display, serif' }}>
              Downloadable Documents
            </h3>
          </div>
          <button
            onClick={handleAddDoc}
            style={{ display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', background: gold, color: '#fff',
              border: 'none', borderRadius: 4, fontSize: 13,
              fontWeight: 500, cursor: 'pointer' }}>
            <Plus size={14} />
            Add Document
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <Search size={13} style={{ position: 'absolute', left: 12,
            top: '50%', transform: 'translateY(-50%)', color: '#bbb' }} />
          <input
            type="text"
            value={docSearch}
            onChange={e => setDocSearch(e.target.value)}
            placeholder="Search documents…"
            style={{ ...inputStyle, paddingLeft: 34, paddingRight: docSearch ? 34 : 14 }}
          />
          {docSearch && (
            <button onClick={() => setDocSearch('')}
              style={{ position: 'absolute', right: 12, top: '50%',
                transform: 'translateY(-50%)', background: 'none',
                border: 'none', cursor: 'pointer', color: '#bbb' }}>
              <X size={13} />
            </button>
          )}
        </div>

        <p style={{ fontSize: 11, color: '#bbb', fontFamily: 'Space Mono, monospace',
          marginBottom: 16 }}>
          {filteredDocs.length} {filteredDocs.length === 1 ? 'document' : 'documents'}
        </p>

        {/* Document cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredDocs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0',
              border: '1px dashed rgba(167,147,112,0.25)', borderRadius: 4,
              color: '#bbb', fontSize: 13 }}>
              No documents yet. Click "Add Document" to get started.
            </div>
          ) : filteredDocs.map((doc) => {
            const realIndex = documents.indexOf(doc)
            const key = doc.id || `new-${realIndex}`
            const isExpanded = expandedDoc === key

            return (
              <div key={key} style={{ border: '1px solid rgba(167,147,112,0.2)',
                borderRadius: 4, background: '#fff', overflow: 'hidden' }}>

                {/* Row header */}
                <div
                  onClick={() => setExpandedDoc(isExpanded ? null : key)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 20px', cursor: 'pointer' }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(167,147,112,0.1)' }}>
                      <FileText size={15} style={{ color: gold }} strokeWidth={1.5} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#000',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {doc.name_en || 'New Document'}
                      </p>
                      <p style={{ fontSize: 11, color: gold, marginTop: 2 }}>
                        {doc.type}{doc.size ? ` · ${doc.size}` : ''}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    {doc.id && (
                      <button
                        onClick={e => { e.stopPropagation(); handleDeleteDoc(doc.id!) }}
                        style={{ padding: 6, background: 'none', border: 'none',
                          cursor: 'pointer', color: '#ccc', borderRadius: 4 }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                    {isExpanded
                      ? <ChevronUp size={14} style={{ color: '#ccc' }} />
                      : <ChevronDown size={14} style={{ color: '#ccc' }} />
                    }
                  </div>
                </div>

                {/* Expanded fields */}
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px',
                    borderTop: '1px solid rgba(167,147,112,0.1)' }}>

                    <div style={{ paddingTop: 16, display: 'flex',
                      flexDirection: 'column', gap: 16 }}>

                      <BilingualTextInput
                        labelEn="Document Name (EN)" labelAr="Document Name (AR)"
                        valueEn={doc.name_en} valueAr={doc.name_ar}
                        onChangeEn={v => handleDocChange(realIndex, 'name_en', v)}
                        onChangeAr={v => handleDocChange(realIndex, 'name_ar', v)} />

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label style={labelStyle}>File Type</label>
                          <select
                            value={doc.type}
                            onChange={e => handleDocChange(realIndex, 'type', e.target.value)}
                            style={inputStyle}>
                            {['PDF', 'XLSX', 'DOCX', 'PPTX', 'ZIP'].map(t =>
                              <option key={t} value={t}>{t}</option>
                            )}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>File Size</label>
                          <input type="text" value={doc.size}
                            onChange={e => handleDocChange(realIndex, 'size', e.target.value)}
                            style={inputStyle} placeholder="2.4 MB" />
                        </div>
                        <div>
                          <label style={labelStyle}>Order Index</label>
                          <input type="number" value={doc.order_index}
                            onChange={e => handleDocChange(realIndex, 'order_index', e.target.value)}
                            style={inputStyle} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Download URL</label>
                        <input type="text" value={doc.url}
                          onChange={e => handleDocChange(realIndex, 'url', e.target.value)}
                          style={inputStyle} placeholder="https://… or /documents/annual-report.pdf" />
                        <p style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>
                          Paste a direct link or a Supabase Storage public URL
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleSaveDoc(doc)}
                          disabled={savingDoc === key}
                          style={{ display: 'flex', alignItems: 'center', gap: 8,
                            padding: '9px 18px', background: gold, color: '#fff',
                            border: 'none', borderRadius: 4, fontSize: 13,
                            fontWeight: 500, cursor: 'pointer' }}>
                          {savingDoc === key
                            ? <Loader2 size={13} className="animate-spin" />
                            : <Save size={13} />
                          }
                          {savingDoc === key ? 'Saving…' : 'Save Document'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}