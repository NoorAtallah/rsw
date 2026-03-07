'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Loader2, Plus, Trash2, Edit2, CheckCircle, X,
  Eye, EyeOff, MapPin, FileText, Image as ImageIcon,
  AlertTriangle, Search, ExternalLink
} from 'lucide-react'
import ImageUpload from './ImageUpload'
import PdfUpload from './pdfUpload'

const gold = '#a79370'
const black = '#000000'
const white = '#ffffff'

// ─── styles ───────────────────────────────────────────────────────────────────
const inp: React.CSSProperties = { width: '100%', padding: '9px 14px', border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6', borderRadius: 4, fontSize: 13, color: black, outline: 'none', fontFamily: 'inherit' }
const ta:  React.CSSProperties = { ...inp, resize: 'vertical' as const }
const ar:  React.CSSProperties = { ...inp, fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }
const taAr:React.CSSProperties = { ...ta,  fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }

const Lbl = ({ c, req }: { c: string; req?: boolean }) => (
  <p className="text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-1" style={{ color: '#bbb' }}>
    {c}{req && <span style={{ color: '#e57373', fontSize: 10 }}>*</span>}
  </p>
)
const F = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => <div><Lbl c={label} req={req} />{children}</div>
const R2 = ({ children }: { children: React.ReactNode }) => <div className="grid grid-cols-2 gap-4">{children}</div>

// ─── types ────────────────────────────────────────────────────────────────────
interface Project {
  id?: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  image: string
  lat: string
  lng: string
  location_label_en: string
  location_label_ar: string
  pdf_url: string
  status: 'published' | 'hidden'
  order_index?: number
}

const EMPTY: Project = {
  title_en: '', title_ar: '', description_en: '', description_ar: '',
  image: '', lat: '', lng: '', location_label_en: '', location_label_ar: '',
  pdf_url: '', status: 'published',
}

// ─── Map picker ───────────────────────────────────────────────────────────────
function MapPicker({ lat, lng, onPick }: { lat: string; lng: string; onPick: (lat: string, lng: string, label: string) => void }) {
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [error, setError] = useState('')
  const debounceRef = useRef<any>(null)

  const hasCoords = lat && lng

  async function geocode(query: string) {
    if (!query.trim()) { setSuggestions([]); return }
    setSearching(true); setError('')
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`, { headers: { 'Accept-Language': 'en,ar' } })
      const data = await res.json()
      setSuggestions(data)
      if (!data.length) setError('No results found')
    } catch { setError('Search failed') }
    setSearching(false)
  }

  function handleInput(val: string) {
    setSearch(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => geocode(val), 600)
  }

  function pick(item: any) {
    const label = item.display_name.split(',').slice(0, 3).join(', ')
    onPick(parseFloat(item.lat).toFixed(6), parseFloat(item.lon).toFixed(6), label)
    setSuggestions([])
    setSearch('')
  }

  const mapUrl = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${(parseFloat(lng)-0.02)},${(parseFloat(lat)-0.02)},${(parseFloat(lng)+0.02)},${(parseFloat(lat)+0.02)}&layer=mapnik&marker=${lat},${lng}`
    : null

  return (
    <div className="space-y-3">
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
          {searching ? <Loader2 size={14} color={gold} className="animate-spin" /> : <Search size={14} color={gold} />}
        </div>
        <input
          value={search}
          onChange={e => handleInput(e.target.value)}
          placeholder="Search location (e.g. Reem Island, Abu Dhabi)…"
          style={{ ...inp, paddingLeft: 36 }}
        />
        {suggestions.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: white, border: '1px solid rgba(167,147,112,0.3)', borderRadius: 4, zIndex: 50, maxHeight: 220, overflowY: 'auto', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.12)' }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => pick(s)} className="w-full text-left px-4 py-2.5 text-xs hover:bg-amber-50 transition-colors" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)', color: '#333', display: 'block' }}>
                {s.display_name}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-[10px] mt-1" style={{ color: '#e57373' }}>{error}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <F label="Latitude">
          <input style={inp} value={lat} onChange={e => onPick(e.target.value, lng, '')} placeholder="25.276987" />
        </F>
        <F label="Longitude">
          <input style={inp} value={lng} onChange={e => onPick(lat, e.target.value, '')} placeholder="55.296249" />
        </F>
      </div>

      {mapUrl && (
        <div className="relative rounded overflow-hidden" style={{ height: 200, border: '1px solid rgba(167,147,112,0.2)' }}>
          <iframe src={mapUrl} width="100%" height="200" style={{ border: 0 }} title="Location preview" />
          <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`} target="_blank" rel="noopener noreferrer"
            style={{ position: 'absolute', bottom: 8, right: 8, background: gold, color: black, padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
            <ExternalLink size={10} /> Open in Maps
          </a>
        </div>
      )}
    </div>
  )
}

// ─── modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onSave, onClose, saving }: {
  project: Project; onSave: (p: Project) => void; onClose: () => void; saving: boolean
}) {
  const [form, setForm] = useState<Project>(project)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const isEdit = !!project.id

  function upd(k: keyof Project, v: string) { setForm(f => ({ ...f, [k]: v })) }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.title_en.trim()) e.title_en = 'Required'
    if (!form.image.trim())    e.image    = 'Required'
    if (!form.description_en.trim()) e.description_en = 'Required'
    setErrors(e)
    return !Object.keys(e).length
  }

  function submit() { if (validate()) onSave(form) }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 680, height: '100vh', background: white, overflowY: 'auto', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)' }}>

        {/* Header */}
        <div style={{ position: 'sticky', top: 0, background: white, borderBottom: '1px solid rgba(167,147,112,0.2)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <div>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>{isEdit ? 'Edit Project' : 'New Project'}</p>
            <p className="text-lg font-light mt-0.5" style={{ color: black, fontFamily: 'Playfair Display, serif' }}>{form.title_en || 'Untitled'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={submit} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-medium"
              style={{ background: gold, color: white }}>
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
              {saving ? 'Saving…' : isEdit ? 'Update' : 'Publish'}
            </button>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(167,147,112,0.3)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: gold }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-7 flex-1">

          {/* Status toggle */}
          <div className="flex items-center justify-between p-4 rounded-sm" style={{ background: '#faf9f6', border: '1px solid rgba(167,147,112,0.2)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: black }}>Project Status</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>{form.status === 'published' ? 'Visible on the public projects page' : 'Hidden — not visible to visitors'}</p>
            </div>
            <button onClick={() => upd('status', form.status === 'published' ? 'hidden' : 'published')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all"
              style={{ background: form.status === 'published' ? 'rgba(167,147,112,0.15)' : 'rgba(0,0,0,0.06)', color: form.status === 'published' ? gold : '#aaa', border: `1px solid ${form.status === 'published' ? 'rgba(167,147,112,0.3)' : 'rgba(0,0,0,0.1)'}` }}>
              {form.status === 'published' ? <Eye size={13} /> : <EyeOff size={13} />}
              {form.status === 'published' ? 'Published' : 'Hidden'}
            </button>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <Lbl c="Title" req />
            <R2>
              <div>
                <Lbl c="English" />
                <input style={{ ...inp, borderColor: errors.title_en ? '#e57373' : 'rgba(167,147,112,0.3)' }} value={form.title_en} onChange={e => upd('title_en', e.target.value)} placeholder="Project name…" />
                {errors.title_en && <p className="text-[10px] mt-1" style={{ color: '#e57373' }}>{errors.title_en}</p>}
              </div>
              <div>
                <Lbl c="Arabic" />
                <input style={ar} value={form.title_ar} onChange={e => upd('title_ar', e.target.value)} placeholder="اسم المشروع…" />
              </div>
            </R2>
          </div>

          {/* Image */}
          <div>
            <Lbl c="Project Image" req />
            <div className="grid grid-cols-2 gap-4 items-start">
              <ImageUpload value={form.image} onChange={v => upd('image', v)} label="Upload Image" />
              {form.image && (
                <div className="relative rounded overflow-hidden bg-gray-100" style={{ height: 120, border: errors.image ? '1px solid #e57373' : '1px solid rgba(167,147,112,0.2)' }}>
                  <img src={form.image} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => upd('image', '')} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center"><X className="w-3 h-3 text-white" /></button>
                </div>
              )}
            </div>
            {errors.image && <p className="text-[10px] mt-1" style={{ color: '#e57373' }}>{errors.image}</p>}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Lbl c="Short Description" req />
            <R2>
              <div>
                <Lbl c="English" />
                <textarea rows={4} style={{ ...ta, borderColor: errors.description_en ? '#e57373' : 'rgba(167,147,112,0.3)' }} value={form.description_en} onChange={e => upd('description_en', e.target.value)} placeholder="Brief project description…" />
                {errors.description_en && <p className="text-[10px] mt-1" style={{ color: '#e57373' }}>{errors.description_en}</p>}
              </div>
              <div>
                <Lbl c="Arabic" />
                <textarea rows={4} style={taAr} value={form.description_ar} onChange={e => upd('description_ar', e.target.value)} placeholder="وصف مختصر للمشروع…" />
              </div>
            </R2>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} color={gold} />
              <Lbl c="Geographic Location (optional)" />
            </div>
            <R2>
              <div>
                <Lbl c="Location Label EN" />
                <input style={inp} value={form.location_label_en} onChange={e => upd('location_label_en', e.target.value)} placeholder="Reem Island, Abu Dhabi" />
              </div>
              <div>
                <Lbl c="Location Label AR" />
                <input style={ar} value={form.location_label_ar} onChange={e => upd('location_label_ar', e.target.value)} placeholder="جزيرة الريم، أبوظبي" />
              </div>
            </R2>
            <div className="mt-3">
              <MapPicker
                lat={form.lat} lng={form.lng}
                onPick={(lat, lng, label) => {
                  setForm(f => ({ ...f, lat, lng, location_label_en: label || f.location_label_en }))
                }}
              />
            </div>
          </div>

          {/* PDF — Supabase upload */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={14} color={gold} />
              <Lbl c="Project Brief PDF (optional)" />
            </div>
            <PdfUpload
              value={form.pdf_url}
              onChange={v => upd('pdf_url', v)}
              label=""
            />
          </div>

        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(167,147,112,0.15)', padding: '20px 32px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} className="px-5 py-2.5 rounded-sm text-xs" style={{ border: '1px solid rgba(167,147,112,0.3)', color: gold, background: 'transparent' }}>Cancel</button>
          <button onClick={submit} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs font-medium" style={{ background: gold, color: white }}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Project'}
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── delete confirm ───────────────────────────────────────────────────────────
function DeleteConfirm({ title, onConfirm, onCancel, deleting }: { title: string; onConfirm: () => void; onCancel: () => void; deleting: boolean }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', background: white, borderRadius: 8, padding: '32px', width: '100%', maxWidth: 420, boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
        <div className="flex items-start gap-4 mb-6">
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(229,115,115,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={18} color="#e57373" />
          </div>
          <div>
            <p className="font-medium mb-1" style={{ color: black }}>Delete Project</p>
            <p className="text-sm" style={{ color: '#aaa' }}>Are you sure you want to delete <span style={{ color: black, fontWeight: 500 }}>"{title}"</span>? This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-5 py-2 rounded-sm text-sm" style={{ border: '1px solid rgba(167,147,112,0.3)', color: gold }}>Cancel</button>
          <button onClick={onConfirm} disabled={deleting} className="flex items-center gap-2 px-5 py-2 rounded-sm text-sm font-medium" style={{ background: '#e57373', color: white }}>
            {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 size={13} />}
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status, onClick }: { status: 'published' | 'hidden'; onClick?: () => void }) {
  const published = status === 'published'
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all"
      style={{ background: published ? 'rgba(167,147,112,0.12)' : 'rgba(0,0,0,0.06)', color: published ? gold : '#aaa', border: `1px solid ${published ? 'rgba(167,147,112,0.25)' : 'rgba(0,0,0,0.1)'}`, cursor: onClick ? 'pointer' : 'default' }}>
      {published ? <Eye size={10} /> : <EyeOff size={10} />}
      {published ? 'Published' : 'Hidden'}
    </button>
  )
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function ProjectsPageEditor() {
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState<Project | null>(null)
  const [saving,   setSaving]   = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [filter,   setFilter]   = useState<'all' | 'published' | 'hidden'>('all')
  const [search,   setSearch]   = useState('')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('projects').select('*').order('order_index', { ascending: true }).order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

  async function save(p: Project) {
    setSaving(true)
    if (p.id) {
      await supabase.from('projects').update({
        title_en: p.title_en, title_ar: p.title_ar,
        description_en: p.description_en, description_ar: p.description_ar,
        image: p.image, lat: p.lat ? parseFloat(p.lat) : null, lng: p.lng ? parseFloat(p.lng) : null,
        location_label_en: p.location_label_en, location_label_ar: p.location_label_ar,
        pdf_url: p.pdf_url, status: p.status, updated_at: new Date().toISOString(),
      }).eq('id', p.id)
    } else {
      const maxOrder = projects.length ? Math.max(...projects.map(pr => pr.order_index || 0)) + 1 : 0
      await supabase.from('projects').insert({
        title_en: p.title_en, title_ar: p.title_ar,
        description_en: p.description_en, description_ar: p.description_ar,
        image: p.image, lat: p.lat ? parseFloat(p.lat) : null, lng: p.lng ? parseFloat(p.lng) : null,
        location_label_en: p.location_label_en, location_label_ar: p.location_label_ar,
        pdf_url: p.pdf_url, status: p.status, order_index: maxOrder,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      })
    }
    await load()
    setSaving(false)
    setModal(null)
  }

  async function toggleStatus(p: Project) {
    await supabase.from('projects').update({ status: p.status === 'published' ? 'hidden' : 'published', updated_at: new Date().toISOString() }).eq('id', p.id)
    await load()
  }

  async function deleteProject(p: Project) {
    setDeleting(true)
    await supabase.from('projects').delete().eq('id', p.id)
    await load()
    setDeleting(false)
    setDeleteTarget(null)
  }

  const filtered = projects.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter
    const s = search.toLowerCase()
    const matchSearch = !s || p.title_en.toLowerCase().includes(s) || p.title_ar.includes(s)
    return matchFilter && matchSearch
  })

  const published = projects.filter(p => p.status === 'published').length
  const hidden    = projects.filter(p => p.status === 'hidden').length

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Content</p>
          <h2 className="text-3xl font-light" style={{ color: black, fontFamily: 'Playfair Display, serif' }}>Projects</h2>
          <p className="text-xs mt-1.5" style={{ color: '#aaa' }}>Manage company projects — add, edit, show/hide, and delete.</p>
        </div>
        <button onClick={() => setModal({ ...EMPTY })}
          className="flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-medium"
          style={{ background: gold, color: white }}>
          <Plus size={15} /> Add Project
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total',     value: projects.length, key: 'all' },
          { label: 'Published', value: published,        key: 'published' },
          { label: 'Hidden',    value: hidden,           key: 'hidden' },
        ].map(s => (
          <button key={s.key} onClick={() => setFilter(s.key as any)}
            className="p-4 rounded-sm text-left transition-all"
            style={{ background: filter === s.key ? 'rgba(167,147,112,0.1)' : '#faf9f6', border: `1px solid ${filter === s.key ? 'rgba(167,147,112,0.35)' : 'rgba(167,147,112,0.15)'}` }}>
            <p className="text-2xl font-light mb-1" style={{ color: filter === s.key ? gold : black, fontFamily: 'Playfair Display, serif' }}>{s.value}</p>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#aaa' }}>{s.label}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Search size={14} color={gold} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects…" style={{ ...inp, paddingLeft: 40 }} />
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin" style={{ color: gold }} /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20" style={{ border: '1px dashed rgba(167,147,112,0.3)', borderRadius: 4 }}>
          <ImageIcon size={32} color="rgba(167,147,112,0.3)" className="mb-3" />
          <p className="text-sm" style={{ color: '#ccc' }}>{search ? 'No projects match your search' : 'No projects yet — click Add Project to get started'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(proj => (
            <div key={proj.id} className="flex items-center gap-4 p-4 rounded-sm group transition-all"
              style={{ background: white, border: '1px solid rgba(167,147,112,0.15)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,147,112,0.3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,147,112,0.15)'}>

              <div className="relative rounded overflow-hidden flex-shrink-0" style={{ width: 72, height: 54, background: '#f0ece4' }}>
                {proj.image ? <img src={proj.image} alt={proj.title_en} className="w-full h-full object-cover" /> : <ImageIcon size={20} color="rgba(167,147,112,0.3)" style={{ position: 'absolute', inset: 0, margin: 'auto' }} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-medium truncate" style={{ color: black, fontFamily: 'Playfair Display, serif' }}>{proj.title_en || '—'}</p>
                  {proj.title_ar && <p className="text-xs truncate" style={{ color: '#aaa', fontFamily: 'Tajawal, sans-serif' }}>{proj.title_ar}</p>}
                </div>
                <p className="text-xs truncate mb-2" style={{ color: '#aaa', maxWidth: 420 }}>{proj.description_en}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <StatusBadge status={proj.status as any} onClick={() => toggleStatus(proj)} />
                  {(proj.lat && proj.lng) && (
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: '#bbb' }}>
                      <MapPin size={10} color={gold} />
                      {proj.location_label_en || `${proj.lat}, ${proj.lng}`}
                    </span>
                  )}
                  {proj.pdf_url && (
                    <a href={proj.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] transition-colors hover:opacity-70" style={{ color: gold }}>
                      <FileText size={10} /> PDF attached
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModal(proj)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-amber-50 transition-colors" style={{ color: gold }}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => setDeleteTarget(proj)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 transition-colors" style={{ color: '#ddd' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && <ProjectModal project={modal} onSave={save} onClose={() => setModal(null)} saving={saving} />}
      {deleteTarget && <DeleteConfirm title={deleteTarget.title_en} onConfirm={() => deleteProject(deleteTarget)} onCancel={() => setDeleteTarget(null)} deleting={deleting} />}

    </div>
  )
}