'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp, CheckCircle, X } from 'lucide-react'
import ImageUpload from './ImageUpload'

const gold = '#a79370'

// ─── base styles ──────────────────────────────────────────────────────────────
const inp: React.CSSProperties = { width: '100%', padding: '9px 14px', border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6', borderRadius: 4, fontSize: 13, color: '#000', outline: 'none' }
const ta: React.CSSProperties = { ...inp, resize: 'vertical' as const }
const ar: React.CSSProperties = { ...inp, fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }
const taAr: React.CSSProperties = { ...ta, fontFamily: 'Tajawal, sans-serif', direction: 'rtl' }

// ─── tiny shared components ───────────────────────────────────────────────────
const Lbl = ({ c }: { c: string }) => <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: '#bbb' }}>{c}</p>
const F = ({ label, children }: { label: string; children: React.ReactNode }) => <div><Lbl c={label} />{children}</div>
const R2 = ({ children }: { children: React.ReactNode }) => <div className="grid grid-cols-2 gap-4">{children}</div>
const R3 = ({ children }: { children: React.ReactNode }) => <div className="grid grid-cols-3 gap-4">{children}</div>

function SaveBtn({ saving, saved, label, onClick }: { saving: boolean; saved: boolean; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium transition-all flex-shrink-0"
      style={{ background: saved ? '#22c55e' : gold, color: '#fff' }}>
      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle className="w-3.5 h-3.5" /> : null}
      {saving ? 'Saving…' : saved ? 'Saved!' : label}
    </button>
  )
}

function Card({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
      <div className="flex items-start justify-between px-6 py-4 gap-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.1)' }}>
        <div>
          <p className="text-sm font-medium" style={{ color: '#000' }}>{title}</p>
          {subtitle && <p className="text-[11px] mt-0.5" style={{ color: '#aaa' }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  )
}

function AccRow({ label, index, expanded, onToggle, onDelete, children }: {
  label: string; index: number; expanded: boolean; onToggle: () => void; onDelete?: () => void; children: React.ReactNode
}) {
  return (
    <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.15)' }}>
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer"
        style={{ background: expanded ? 'rgba(167,147,112,0.04)' : 'transparent' }} onClick={onToggle}>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
            style={{ background: 'rgba(167,147,112,0.15)', color: gold }}>{index + 1}</span>
          <p className="text-sm" style={{ color: '#000' }}>{label || `Item ${index + 1}`}</p>
        </div>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button onClick={e => { e.stopPropagation(); onDelete() }}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50" style={{ color: '#ddd' }}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          {expanded ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-3 space-y-4" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="mt-3 flex items-center gap-2 text-xs px-4 py-2 rounded-sm"
      style={{ border: '1px dashed rgba(167,147,112,0.4)', color: gold }}>
      <Plus className="w-3.5 h-3.5" />{label}
    </button>
  )
}

function ImgField({ value, onChange }: { value: string; onChange: (u: string) => void }) {
  return (
    <div>
      <Lbl c="Image" />
      <div className="grid grid-cols-2 gap-4 items-start">
        <ImageUpload value={value} onChange={onChange} label="Upload" />
        {value && (
          <div className="relative rounded overflow-hidden h-24 bg-gray-100">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button onClick={() => onChange('')}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
      </div>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        style={{ ...inp, marginTop: 8 }} placeholder="Or paste image URL…" />
    </div>
  )
}

// ─── section nav ──────────────────────────────────────────────────────────────
const TABS = [
  { key: 'hero', label: 'Hero' },
  { key: 'story', label: 'Story' },
  { key: 'milestones', label: 'Milestones' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'sectors', label: 'Sectors' },
  { key: 'leadership', label: 'Leadership' },
]

// ─── types ────────────────────────────────────────────────────────────────────
interface Milestone { id?: string; value: string; suffix: string; label_en: string; label_ar: string; sub_en: string; sub_ar: string }
interface TLItem { id?: string; year: string; quarter_en: string; quarter_ar: string; tag_en: string; tag_ar: string; title_en: string; title_ar: string; description_en: string; description_ar: string; metric_en: string; metric_ar: string }
interface Sector { id?: string; number: string; name_en: string; name_ar: string; description_en: string; description_ar: string; image: string }
interface Leader { id?: string; name_en: string; name_ar: string; role_en: string; role_ar: string; initials: string; bio_en: string; bio_ar: string; tags_en: string; tags_ar: string }

// ─── main component ───────────────────────────────────────────────────────────
export default function AboutPageEditor() {
  const supabase = createClient()
  const [tab, setTab] = useState('hero')
  const [loading, setLoading] = useState(true)

  // hero
  const [hero, setHero] = useState({ bg_image: '', title_en: '', gold_en: '', subtitle_en: '', title_ar: '', gold_ar: '', subtitle_ar: '', s1n: '4', s1_en: 'Sectors', s1_ar: 'قطاعات', s2n: '200+', s2_en: 'Projects', s2_ar: 'مشاريع', s3n: '15+', s3_en: 'Years', s3_ar: 'سنوات' })
  const [svHero, setSvHero] = useState(false); const [sdHero, setSdHero] = useState(false)

  // story
  const [story, setStory] = useState({ p1_en: '', p1_ar: '', p2_en: '', p2_ar: '' })
  const [svStory, setSvStory] = useState(false); const [sdStory, setSdStory] = useState(false)

  // milestones
  const [miles, setMiles] = useState<Milestone[]>([])
  const [svMiles, setSvMiles] = useState(false); const [sdMiles, setSdMiles] = useState(false)
  const [exM, setExM] = useState<number | null>(0)

  // timeline
  const [tl, setTl] = useState<TLItem[]>([])
  const [svTl, setSvTl] = useState(false); const [sdTl, setSdTl] = useState(false)
  const [exT, setExT] = useState<number | null>(0)

  // sectors
  const [sectors, setSectors] = useState<Sector[]>([])
  const [svSec, setSvSec] = useState(false); const [sdSec, setSdSec] = useState(false)
  const [exS, setExS] = useState<number | null>(0)

  // leadership
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [svLead, setSvLead] = useState(false); const [sdLead, setSdLead] = useState(false)
  const [exL, setExL] = useState<number | null>(0)

  useEffect(() => { load() }, [])

  // ─── load ──────────────────────────────────────────────────────────────────
  async function load() {
    setLoading(true)
    const [{ data: sc }, { data: ar2 }] = await Promise.all([
      supabase.from('content').select('*').in('section', ['about_hero', 'about_story']),
      supabase.from('content_arrays').select('*')
        .in('section', ['about_page.milestones', 'about_page.timeline', 'about_page.sectors', 'about_page.leadership'])
        .order('order_index'),
    ])

    if (sc) {
      const g = (s: string, k: string) => sc.find(r => r.section === s && r.key === k)
      setHero({
        bg_image:   g('about_hero', 'bg_image')?.value_en || '',
        title_en:   g('about_hero', 'title')?.value_en || '',
        gold_en:    g('about_hero', 'gold_word')?.value_en || '',
        subtitle_en:g('about_hero', 'subtitle')?.value_en || '',
        title_ar:   g('about_hero', 'title')?.value_ar || '',
        gold_ar:    g('about_hero', 'gold_word')?.value_ar || '',
        subtitle_ar:g('about_hero', 'subtitle')?.value_ar || '',
        s1n:  g('about_hero', 'stat1_num')?.value_en   || '4',
        s1_en:g('about_hero', 'stat1_label')?.value_en || 'Sectors',
        s1_ar:g('about_hero', 'stat1_label')?.value_ar || 'قطاعات',
        s2n:  g('about_hero', 'stat2_num')?.value_en   || '200+',
        s2_en:g('about_hero', 'stat2_label')?.value_en || 'Projects',
        s2_ar:g('about_hero', 'stat2_label')?.value_ar || 'مشاريع',
        s3n:  g('about_hero', 'stat3_num')?.value_en   || '15+',
        s3_en:g('about_hero', 'stat3_label')?.value_en || 'Years',
        s3_ar:g('about_hero', 'stat3_label')?.value_ar || 'سنوات',
      })
      setStory({
        p1_en: g('about_story', 'p1')?.value_en || '',
        p1_ar: g('about_story', 'p1')?.value_ar || '',
        p2_en: g('about_story', 'p2')?.value_en || '',
        p2_ar: g('about_story', 'p2')?.value_ar || '',
      })
    }

    if (ar2) {
      const ms = ar2.filter(r => r.section === 'about_page.milestones')
      const tls = ar2.filter(r => r.section === 'about_page.timeline')
      const scs = ar2.filter(r => r.section === 'about_page.sectors')
      const lds = ar2.filter(r => r.section === 'about_page.leadership')

      setMiles(ms.length ? ms.map(r => ({ id: r.id, value: r.data_en?.value || '', suffix: r.data_en?.suffix || '', label_en: r.data_en?.label || '', label_ar: r.data_ar?.label || '', sub_en: r.data_en?.sub || '', sub_ar: r.data_ar?.sub || '' })) : defaultMilestones())
      setTl(tls.length ? tls.map(r => ({ id: r.id, year: r.data_en?.year || '', quarter_en: r.data_en?.quarter || '', quarter_ar: r.data_ar?.quarter || '', tag_en: r.data_en?.tag || '', tag_ar: r.data_ar?.tag || '', title_en: r.data_en?.title || '', title_ar: r.data_ar?.title || '', description_en: r.data_en?.description || '', description_ar: r.data_ar?.description || '', metric_en: r.data_en?.metric || '', metric_ar: r.data_ar?.metric || '' })) : defaultTimeline())
      setSectors(scs.length ? scs.map(r => ({ id: r.id, number: r.data_en?.number || '', name_en: r.data_en?.name || '', name_ar: r.data_ar?.name || '', description_en: r.data_en?.description || '', description_ar: r.data_ar?.description || '', image: r.data_en?.image || '' })) : defaultSectors())
      setLeaders(lds.length ? lds.map(r => ({ id: r.id, name_en: r.data_en?.name || '', name_ar: r.data_ar?.name || '', role_en: r.data_en?.role || '', role_ar: r.data_ar?.role || '', initials: r.data_en?.initials || '', bio_en: r.data_en?.bio || '', bio_ar: r.data_ar?.bio || '', tags_en: (r.data_en?.tags || []).join(', '), tags_ar: (r.data_ar?.tags || []).join(', ') })) : defaultLeaders())
    }
    setLoading(false)
  }

  // ─── upsert helper ──────────────────────────────────────────────────────────
  async function up(section: string, key: string, en: string, ar3: string) {
    await supabase.from('content').upsert({ section, key, value_en: en, value_ar: ar3, updated_at: new Date().toISOString() }, { onConflict: 'section,key' })
  }

  // ─── save hero ──────────────────────────────────────────────────────────────
  async function saveHero() {
    setSvHero(true)
    await Promise.all([
      up('about_hero', 'bg_image',   hero.bg_image,    hero.bg_image),
      up('about_hero', 'title',      hero.title_en,    hero.title_ar),
      up('about_hero', 'gold_word',  hero.gold_en,     hero.gold_ar),
      up('about_hero', 'subtitle',   hero.subtitle_en, hero.subtitle_ar),
      up('about_hero', 'stat1_num',  hero.s1n,         hero.s1n),
      up('about_hero', 'stat1_label',hero.s1_en,       hero.s1_ar),
      up('about_hero', 'stat2_num',  hero.s2n,         hero.s2n),
      up('about_hero', 'stat2_label',hero.s2_en,       hero.s2_ar),
      up('about_hero', 'stat3_num',  hero.s3n,         hero.s3n),
      up('about_hero', 'stat3_label',hero.s3_en,       hero.s3_ar),
    ])
    setSvHero(false); setSdHero(true); setTimeout(() => setSdHero(false), 2000)
  }

  // ─── save story ─────────────────────────────────────────────────────────────
  async function saveStory() {
    setSvStory(true)
    await Promise.all([up('about_story', 'p1', story.p1_en, story.p1_ar), up('about_story', 'p2', story.p2_en, story.p2_ar)])
    setSvStory(false); setSdStory(true); setTimeout(() => setSdStory(false), 2000)
  }

  // ─── save milestones ────────────────────────────────────────────────────────
  async function saveMilestones() {
    setSvMiles(true)
    await supabase.from('content_arrays').delete().eq('section', 'about_page.milestones')
    await supabase.from('content_arrays').insert(miles.map((m, i) => ({ section: 'about_page.milestones', order_index: i, data_en: { value: m.value, suffix: m.suffix, label: m.label_en, sub: m.sub_en }, data_ar: { value: m.value, suffix: m.suffix, label: m.label_ar, sub: m.sub_ar } })))
    await load(); setSvMiles(false); setSdMiles(true); setTimeout(() => setSdMiles(false), 2000)
  }

  // ─── save timeline ──────────────────────────────────────────────────────────
  async function saveTimeline() {
    setSvTl(true)
    await supabase.from('content_arrays').delete().eq('section', 'about_page.timeline')
    await supabase.from('content_arrays').insert(tl.map((t, i) => ({ section: 'about_page.timeline', order_index: i, data_en: { year: t.year, quarter: t.quarter_en, tag: t.tag_en, title: t.title_en, description: t.description_en, metric: t.metric_en }, data_ar: { year: t.year, quarter: t.quarter_ar, tag: t.tag_ar, title: t.title_ar, description: t.description_ar, metric: t.metric_ar } })))
    await load(); setSvTl(false); setSdTl(true); setTimeout(() => setSdTl(false), 2000)
  }

  // ─── save sectors ───────────────────────────────────────────────────────────
  async function saveSectors() {
    setSvSec(true)
    await supabase.from('content_arrays').delete().eq('section', 'about_page.sectors')
    await supabase.from('content_arrays').insert(sectors.map((s, i) => ({ section: 'about_page.sectors', order_index: i, data_en: { number: s.number, name: s.name_en, description: s.description_en, image: s.image }, data_ar: { number: s.number, name: s.name_ar, description: s.description_ar, image: s.image } })))
    await load(); setSvSec(false); setSdSec(true); setTimeout(() => setSdSec(false), 2000)
  }

  // ─── save leadership ────────────────────────────────────────────────────────
  async function saveLeaders() {
    setSvLead(true)
    await supabase.from('content_arrays').delete().eq('section', 'about_page.leadership')
    await supabase.from('content_arrays').insert(leaders.map((l, i) => ({ section: 'about_page.leadership', order_index: i, data_en: { name: l.name_en, role: l.role_en, initials: l.initials, bio: l.bio_en, tags: l.tags_en.split(',').map((t: string) => t.trim()).filter(Boolean) }, data_ar: { name: l.name_ar, role: l.role_ar, initials: l.initials, bio: l.bio_ar, tags: l.tags_ar.split(',').map((t: string) => t.trim()).filter(Boolean) } })))
    await load(); setSvLead(false); setSdLead(true); setTimeout(() => setSdLead(false), 2000)
  }

  // ─── inline updaters ────────────────────────────────────────────────────────
  const updM   = (i: number, k: keyof Milestone, v: string) => setMiles(p => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x))
  const updT   = (i: number, k: keyof TLItem,    v: string) => setTl(p => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x))
  const updS   = (i: number, k: keyof Sector,    v: string) => setSectors(p => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x))
  const updL   = (i: number, k: keyof Leader,    v: string) => setLeaders(p => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x))

  if (loading) return <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin" style={{ color: gold }} /></div>

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Editing</p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>About Page</h2>
        <p className="text-xs mt-1.5" style={{ color: '#aaa' }}>Manage every section of the /about page — hero, story, milestones, timeline, sectors, and leadership.</p>
      </div>

      {/* Sub-nav */}
      <div className="flex gap-1.5 flex-wrap mb-8">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-sm text-xs font-medium transition-all"
            style={{ background: tab === t.key ? gold : 'transparent', color: tab === t.key ? '#fff' : gold, border: `1px solid ${tab === t.key ? gold : 'rgba(167,147,112,0.35)'}` }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      {tab === 'hero' && (
        <Card title="Hero Section" subtitle="Background image, headline, gold keyword, subtitle, 3 stats." action={<SaveBtn saving={svHero} saved={sdHero} label="Save Hero" onClick={saveHero} />}>
          <ImgField value={hero.bg_image} onChange={v => setHero(h => ({ ...h, bg_image: v }))} />

          <R2>
            <F label='Title — "Shaping the" (EN)'>
              <input style={inp} value={hero.title_en} onChange={e => setHero(h => ({ ...h, title_en: e.target.value }))} placeholder="Shaping the" />
            </F>
            <F label='Title (AR)'>
              <input style={ar} value={hero.title_ar} onChange={e => setHero(h => ({ ...h, title_ar: e.target.value }))} placeholder="تشكيل" />
            </F>
          </R2>

          <R2>
            <F label='Gold Keyword — "Future" (EN)'>
              <input style={inp} value={hero.gold_en} onChange={e => setHero(h => ({ ...h, gold_en: e.target.value }))} placeholder="Future" />
            </F>
            <F label='Gold Keyword (AR)'>
              <input style={ar} value={hero.gold_ar} onChange={e => setHero(h => ({ ...h, gold_ar: e.target.value }))} placeholder="مستقبل" />
            </F>
          </R2>

          <R2>
            <F label="Subtitle (EN)">
              <textarea rows={2} style={ta} value={hero.subtitle_en} onChange={e => setHero(h => ({ ...h, subtitle_en: e.target.value }))} placeholder="A diversified UAE-based…" />
            </F>
            <F label="Subtitle (AR)">
              <textarea rows={2} style={taAr} value={hero.subtitle_ar} onChange={e => setHero(h => ({ ...h, subtitle_ar: e.target.value }))} placeholder="شركة استثمارية…" />
            </F>
          </R2>

          <div>
            <Lbl c="3 Hero Stats (number + label)" />
            <div className="space-y-2.5">
              {([['s1n','s1_en','s1_ar'],['s2n','s2_en','s2_ar'],['s3n','s3_en','s3_ar']] as const).map(([nk, ek, ak], i) => (
                <div key={i} className="grid grid-cols-[80px_1fr_1fr] gap-3">
                  <div>{i === 0 && <Lbl c="Num" />}<input style={inp} value={(hero as any)[nk]} onChange={e => setHero(h => ({ ...h, [nk]: e.target.value }))} placeholder="4" /></div>
                  <div>{i === 0 && <Lbl c="Label EN" />}<input style={inp} value={(hero as any)[ek]} onChange={e => setHero(h => ({ ...h, [ek]: e.target.value }))} /></div>
                  <div>{i === 0 && <Lbl c="Label AR" />}<input style={ar} value={(hero as any)[ak]} onChange={e => setHero(h => ({ ...h, [ak]: e.target.value }))} /></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* ══ STORY ═════════════════════════════════════════════════════════════ */}
      {tab === 'story' && (
        <Card title="Our Story" subtitle="Two body paragraphs beneath the section heading." action={<SaveBtn saving={svStory} saved={sdStory} label="Save Story" onClick={saveStory} />}>
          <R2>
            <F label="Paragraph 1 (EN)"><textarea rows={4} style={ta} value={story.p1_en} onChange={e => setStory(s => ({ ...s, p1_en: e.target.value }))} /></F>
            <F label="Paragraph 1 (AR)"><textarea rows={4} style={taAr} value={story.p1_ar} onChange={e => setStory(s => ({ ...s, p1_ar: e.target.value }))} /></F>
          </R2>
          <R2>
            <F label="Paragraph 2 (EN)"><textarea rows={4} style={ta} value={story.p2_en} onChange={e => setStory(s => ({ ...s, p2_en: e.target.value }))} /></F>
            <F label="Paragraph 2 (AR)"><textarea rows={4} style={taAr} value={story.p2_ar} onChange={e => setStory(s => ({ ...s, p2_ar: e.target.value }))} /></F>
          </R2>
        </Card>
      )}

      {/* ══ MILESTONES ════════════════════════════════════════════════════════ */}
      {tab === 'milestones' && (
        <Card title="Milestones Grid" subtitle="Animated counter cards — value, suffix, label, sub-label." action={<SaveBtn saving={svMiles} saved={sdMiles} label="Save" onClick={saveMilestones} />}>
          <div className="space-y-2">
            {miles.map((m, i) => (
              <AccRow key={i} label={m.label_en || `Milestone ${i + 1}`} index={i} expanded={exM === i} onToggle={() => setExM(exM === i ? null : i)} onDelete={() => setMiles(p => p.filter((_, idx) => idx !== i))}>
                <div className="grid grid-cols-[90px_90px_1fr] gap-3">
                  <F label="Value"><input style={inp} value={m.value} onChange={e => updM(i, 'value', e.target.value)} placeholder="200" /></F>
                  <F label="Suffix"><input style={inp} value={m.suffix} onChange={e => updM(i, 'suffix', e.target.value)} placeholder="+" /></F>
                </div>
                <R2>
                  <F label="Label (EN)"><input style={inp} value={m.label_en} onChange={e => updM(i, 'label_en', e.target.value)} /></F>
                  <F label="Label (AR)"><input style={ar} value={m.label_ar} onChange={e => updM(i, 'label_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Sub-label (EN)"><input style={inp} value={m.sub_en} onChange={e => updM(i, 'sub_en', e.target.value)} /></F>
                  <F label="Sub-label (AR)"><input style={ar} value={m.sub_ar} onChange={e => updM(i, 'sub_ar', e.target.value)} /></F>
                </R2>
              </AccRow>
            ))}
          </div>
          <AddBtn label="Add Milestone" onClick={() => setMiles(p => [...p, { value: '', suffix: '+', label_en: '', label_ar: '', sub_en: '', sub_ar: '' }])} />
        </Card>
      )}

      {/* ══ TIMELINE ══════════════════════════════════════════════════════════ */}
      {tab === 'timeline' && (
        <Card title="Timeline / Journey" subtitle="Each event: year, quarter, tag, title, description, metric." action={<SaveBtn saving={svTl} saved={sdTl} label="Save" onClick={saveTimeline} />}>
          <div className="space-y-2">
            {tl.map((item, i) => (
              <AccRow key={i} label={`${item.year}${item.title_en ? ' — ' + item.title_en : ''}`} index={i} expanded={exT === i} onToggle={() => setExT(exT === i ? null : i)} onDelete={() => setTl(p => p.filter((_, idx) => idx !== i))}>
                <R3>
                  <F label="Year"><input style={inp} value={item.year} onChange={e => updT(i, 'year', e.target.value)} placeholder="2023" /></F>
                  <F label="Quarter (EN)"><input style={inp} value={item.quarter_en} onChange={e => updT(i, 'quarter_en', e.target.value)} placeholder="Q3" /></F>
                  <F label="Quarter (AR)"><input style={ar} value={item.quarter_ar} onChange={e => updT(i, 'quarter_ar', e.target.value)} placeholder="الربع الثالث" /></F>
                </R3>
                <R2>
                  <F label="Tag (EN)"><input style={inp} value={item.tag_en} onChange={e => updT(i, 'tag_en', e.target.value)} placeholder="EXPANSION" /></F>
                  <F label="Tag (AR)"><input style={ar} value={item.tag_ar} onChange={e => updT(i, 'tag_ar', e.target.value)} placeholder="التوسع" /></F>
                </R2>
                <R2>
                  <F label="Title (EN)"><input style={inp} value={item.title_en} onChange={e => updT(i, 'title_en', e.target.value)} /></F>
                  <F label="Title (AR)"><input style={ar} value={item.title_ar} onChange={e => updT(i, 'title_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Description (EN)"><textarea rows={3} style={ta} value={item.description_en} onChange={e => updT(i, 'description_en', e.target.value)} /></F>
                  <F label="Description (AR)"><textarea rows={3} style={taAr} value={item.description_ar} onChange={e => updT(i, 'description_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Metric (EN)"><input style={inp} value={item.metric_en} onChange={e => updT(i, 'metric_en', e.target.value)} placeholder="8 tech clients onboarded" /></F>
                  <F label="Metric (AR)"><input style={ar} value={item.metric_ar} onChange={e => updT(i, 'metric_ar', e.target.value)} placeholder="٨ عملاء تكنولوجيا" /></F>
                </R2>
              </AccRow>
            ))}
          </div>
          <AddBtn label="Add Event" onClick={() => setTl(p => [...p, { year: '', quarter_en: '', quarter_ar: '', tag_en: '', tag_ar: '', title_en: '', title_ar: '', description_en: '', description_ar: '', metric_en: '', metric_ar: '' }])} />
        </Card>
      )}

      {/* ══ SECTORS ═══════════════════════════════════════════════════════════ */}
      {tab === 'sectors' && (
        <Card title="Sectors / Divisions" subtitle="The four sector tabs with number, name, description, and image." action={<SaveBtn saving={svSec} saved={sdSec} label="Save" onClick={saveSectors} />}>
          <div className="space-y-2">
            {sectors.map((s, i) => (
              <AccRow key={i} label={`${s.number} ${s.name_en || `Sector ${i + 1}`}`} index={i} expanded={exS === i} onToggle={() => setExS(exS === i ? null : i)} onDelete={() => setSectors(p => p.filter((_, idx) => idx !== i))}>
                <R2>
                  <F label="Number"><input style={inp} value={s.number} onChange={e => updS(i, 'number', e.target.value)} placeholder="01" /></F>
                  <div />
                </R2>
                <R2>
                  <F label="Name (EN)"><input style={inp} value={s.name_en} onChange={e => updS(i, 'name_en', e.target.value)} placeholder="Real Estate" /></F>
                  <F label="Name (AR)"><input style={ar} value={s.name_ar} onChange={e => updS(i, 'name_ar', e.target.value)} placeholder="العقارات" /></F>
                </R2>
                <R2>
                  <F label="Description (EN)"><textarea rows={3} style={ta} value={s.description_en} onChange={e => updS(i, 'description_en', e.target.value)} /></F>
                  <F label="Description (AR)"><textarea rows={3} style={taAr} value={s.description_ar} onChange={e => updS(i, 'description_ar', e.target.value)} /></F>
                </R2>
                <ImgField value={s.image} onChange={v => updS(i, 'image', v)} />
              </AccRow>
            ))}
          </div>
          <AddBtn label="Add Sector" onClick={() => setSectors(p => [...p, { number: `0${p.length + 1}`, name_en: '', name_ar: '', description_en: '', description_ar: '', image: '' }])} />
        </Card>
      )}

      {/* ══ LEADERSHIP ════════════════════════════════════════════════════════ */}
      {tab === 'leadership' && (
        <Card title="Leadership Team" subtitle="Each person: name, role, initials, bio, tags (comma-separated)." action={<SaveBtn saving={svLead} saved={sdLead} label="Save" onClick={saveLeaders} />}>
          <div className="space-y-2">
            {leaders.map((l, i) => (
              <AccRow key={i} label={l.name_en || `Person ${i + 1}`} index={i} expanded={exL === i} onToggle={() => setExL(exL === i ? null : i)} onDelete={() => setLeaders(p => p.filter((_, idx) => idx !== i))}>
                <R2>
                  <F label="Name (EN)"><input style={inp} value={l.name_en} onChange={e => updL(i, 'name_en', e.target.value)} placeholder="Founder & CEO" /></F>
                  <F label="Name (AR)"><input style={ar} value={l.name_ar} onChange={e => updL(i, 'name_ar', e.target.value)} placeholder="المؤسس والرئيس التنفيذي" /></F>
                </R2>
                <R2>
                  <F label="Role (EN)"><input style={inp} value={l.role_en} onChange={e => updL(i, 'role_en', e.target.value)} placeholder="Strategic Vision & Growth" /></F>
                  <F label="Role (AR)"><input style={ar} value={l.role_ar} onChange={e => updL(i, 'role_ar', e.target.value)} placeholder="رؤية استراتيجية ونمو" /></F>
                </R2>
                <R2>
                  <F label="Initials (avatar)"><input style={inp} value={l.initials} onChange={e => updL(i, 'initials', e.target.value)} placeholder="CEO" /></F>
                  <div />
                </R2>
                <R2>
                  <F label="Bio (EN)"><textarea rows={3} style={ta} value={l.bio_en} onChange={e => updL(i, 'bio_en', e.target.value)} /></F>
                  <F label="Bio (AR)"><textarea rows={3} style={taAr} value={l.bio_ar} onChange={e => updL(i, 'bio_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Tags EN (comma-separated)"><input style={inp} value={l.tags_en} onChange={e => updL(i, 'tags_en', e.target.value)} placeholder="Real Estate, Strategy, Abu Dhabi" /></F>
                  <F label="Tags AR (comma-separated)"><input style={ar} value={l.tags_ar} onChange={e => updL(i, 'tags_ar', e.target.value)} placeholder="العقارات, استراتيجية, أبوظبي" /></F>
                </R2>
              </AccRow>
            ))}
          </div>
          <AddBtn label="Add Person" onClick={() => setLeaders(p => [...p, { name_en: '', name_ar: '', role_en: '', role_ar: '', initials: '', bio_en: '', bio_ar: '', tags_en: '', tags_ar: '' }])} />
        </Card>
      )}

    </div>
  )
}

// ─── default seed data — mirrors the hardcoded page values ────────────────────
function defaultMilestones(): Milestone[] {
  return [
    { value: '200', suffix: '+', label_en: 'Projects Delivered',  label_ar: 'مشروع منجز',   sub_en: 'Across four sectors',                          sub_ar: 'عبر أربعة قطاعات' },
    { value: '15',  suffix: '+', label_en: 'Years Experience',     label_ar: 'سنة خبرة',      sub_en: 'In Gulf markets',                              sub_ar: 'في أسواق الخليج' },
    { value: '4',   suffix: '',  label_en: 'Integrated Divisions', label_ar: 'أقسام متكاملة', sub_en: 'Real Estate · Tech · Construction · Software',  sub_ar: 'عقارات · تقنية · إنشاء · برمجيات' },
    { value: '98',  suffix: '%', label_en: 'Client Satisfaction',  label_ar: 'رضا العملاء',   sub_en: 'Documented satisfaction rate',                  sub_ar: 'معدل مرضي موثق' },
    { value: '12',  suffix: '+', label_en: 'Strategic Partners',   label_ar: 'شريك استراتيجي',sub_en: 'Local and international',                       sub_ar: 'محلي ودولي' },
    { value: '3',   suffix: '',  label_en: 'Active Emirates',      label_ar: 'إمارات نشطة',   sub_en: 'Abu Dhabi · Dubai · Sharjah',                   sub_ar: 'أبوظبي · دبي · الشارقة' },
  ]
}
function defaultTimeline(): TLItem[] {
  return [
    { year: '2020', quarter_en: 'Q1', quarter_ar: 'الربع الأول',   tag_en: 'FOUNDING',    tag_ar: 'التأسيس',  title_en: 'RSW Group Founded in Abu Dhabi',               title_ar: 'تأسيس مجموعة RSW في أبوظبي',              description_en: "Founded with a clear vision to build a diversified investment portfolio across UAE's dynamic economy.", description_ar: 'بدأت المجموعة برؤية واضحة لبناء محفظة استثمارية متنوعة.', metric_en: '1st real estate project',      metric_ar: 'أول مشروع عقاري' },
    { year: '2021', quarter_en: 'Q3', quarter_ar: 'الربع الثالث',  tag_en: 'EXPANSION',   tag_ar: 'التوسع',   title_en: 'Technology Division Launched — Hector Advance', title_ar: 'إطلاق قسم التكنولوجيا — Hector Advance',  description_en: 'Entry into AI, cybersecurity, and cloud infrastructure.',                                             description_ar: 'دخول مجال الذكاء الاصطناعي والأمن السيبراني.', metric_en: '8 tech clients onboarded',     metric_ar: '٨ عملاء تكنولوجيا' },
    { year: '2022', quarter_en: 'Q2', quarter_ar: 'الربع الثاني',  tag_en: 'PARTNERSHIPS',tag_ar: 'الشراكات', title_en: 'RSW Construction & Decoration Established',      title_ar: 'تأسيس RSW للإنشاءات والديكور',             description_en: 'Strategic expansion into construction, oil & gas projects.',                                          description_ar: 'توسع استراتيجي في قطاع البناء ومشاريع النفط والغاز.', metric_en: '12 construction projects', metric_ar: '١٢ مشروع إنشائي' },
    { year: '2023', quarter_en: 'Q4', quarter_ar: 'الربع الرابع',  tag_en: 'INNOVATION',  tag_ar: 'الابتكار', title_en: 'Cortex 82 Technology Launched',                  title_ar: 'إطلاق Cortex 82 للتكنولوجيا',             description_en: 'Dedicated arm for custom software and enterprise digital transformation.',                            description_ar: 'ذراع متخصصة لتطوير البرمجيات والتحول الرقمي.',  metric_en: '3 software products',          metric_ar: '٣ منتجات برمجية' },
    { year: '2024', quarter_en: 'Q1', quarter_ar: 'الربع الأول',   tag_en: 'COMPLIANCE',  tag_ar: 'الامتثال', title_en: 'Full Regulatory Compliance Achieved',            title_ar: 'اعتماد الامتثال التنظيمي الكامل',          description_en: 'Full alignment with SCA guidelines, DFM standards, and UAE PDPL.',                                   description_ar: 'استيفاء جميع متطلبات هيئة SCA ومعايير DFM وقانون حماية البيانات.', metric_en: '100% regulatory compliance', metric_ar: '١٠٠٪ امتثال تنظيمي' },
    { year: '2025', quarter_en: 'Q3', quarter_ar: 'الربع الثالث',  tag_en: 'LEADERSHIP',  tag_ar: 'القيادة',  title_en: 'Market Leadership Across Four Sectors',          title_ar: 'قيادة السوق عبر أربعة قطاعات',            description_en: 'The group now manages 200+ projects across Abu Dhabi, Dubai, and Sharjah.',                          description_ar: 'المجموعة تدير ٢٠٠+ مشروع عبر أبوظبي ودبي والشارقة.',  metric_en: '200+ active projects',         metric_ar: '٢٠٠+ مشروع نشط' },
  ]
}
function defaultSectors(): Sector[] {
  return [
    { number: '01', name_en: 'Real Estate',  name_ar: 'العقارات',   description_en: 'Strategic commercial investment and property development across the UAE.',  description_ar: 'استثمار تجاري استراتيجي وتطوير عقاري في الإمارات.', image: 'https://i.ytimg.com/vi/puQoxZnrwlA/maxresdefault.jpg' },
    { number: '02', name_en: 'Technology',   name_ar: 'التكنولوجيا', description_en: 'AI research, cybersecurity solutions, and cloud infrastructure services.',  description_ar: 'أبحاث الذكاء الاصطناعي وحلول الأمن السيبراني.', image: 'https://abdullahsakkijha.com/wp-content/uploads/2023/10/ezgif.com-gif-maker.jpg' },
    { number: '03', name_en: 'Construction', name_ar: 'البناء',      description_en: 'Oil & gas facilities, commercial interiors, and facility management.',       description_ar: 'منشآت النفط والغاز والتصميم الداخلي التجاري.', image: 'https://media.istockphoto.com/id/862758024/photo/construction-site.jpg?s=612x612&w=0&k=20&c=gYl455m4B91lwQpIidx9YBCxwLaeLKFR632FRaPqffc=' },
    { number: '04', name_en: 'Software',     name_ar: 'البرمجيات',   description_en: 'Custom software development and digital transformation solutions.',          description_ar: 'تطوير برمجيات مخصصة وحلول التحول الرقمي.', image: 'https://img.freepik.com/free-photo/smart-microchip-technology-background-gradient-gold_53876-124642.jpg?semt=ais_hybrid&w=740&q=80' },
  ]
}
function defaultLeaders(): Leader[] {
  return [
    { name_en: 'Founder & CEO',           name_ar: 'المؤسس والرئيس التنفيذي', role_en: 'Strategic Vision & Growth',      role_ar: 'رؤية استراتيجية ونمو',     initials: 'RSW', bio_en: 'Over 15 years of experience in investment and real estate across Gulf markets.', bio_ar: 'خبرة تزيد عن ١٥ عاماً في الاستثمار والتطوير العقاري.',   tags_en: 'Real Estate, Strategy, Abu Dhabi', tags_ar: 'العقارات, استراتيجية, أبوظبي' },
    { name_en: 'Chief Technology Officer', name_ar: 'المدير التقني',            role_en: 'Head of Hector Advance',         role_ar: 'رئيس Hector Advance',      initials: 'CTO', bio_en: 'Specialist in AI and cybersecurity with a background in MIT research.',       bio_ar: 'متخصص في الذكاء الاصطناعي مع خلفية في أبحاث MIT.',      tags_en: 'AI, Cybersecurity, Cloud',         tags_ar: 'ذكاء اصطناعي, أمن سيبراني, سحابة' },
    { name_en: 'Chief Operations Officer', name_ar: 'مدير العمليات',            role_en: 'Head of Construction & Projects', role_ar: 'رئيس الإنشاءات والمشاريع',initials: 'COO', bio_en: 'Extensive experience in oil & gas and large-scale construction across the Gulf.', bio_ar: 'خبرة واسعة في مشاريع النفط والغاز والبناء الكبرى.',    tags_en: 'Construction, Oil & Gas, PM',      tags_ar: 'إنشاءات, نفط وغاز, إدارة مشاريع' },
    { name_en: 'Chief Financial Officer',  name_ar: 'المدير المالي',            role_en: 'Finance & Regulatory Compliance', role_ar: 'المالية والامتثال التنظيمي',initials: 'CFO', bio_en: 'Expert in corporate finance and compliance with UAE SCA and DFM standards.',  bio_ar: 'خبير في تمويل الشركات والامتثال لمعايير SCA و DFM.',    tags_en: 'Finance, SCA/DFM, Compliance',     tags_ar: 'مالية, SCA/DFM, امتثال' },
  ]
}