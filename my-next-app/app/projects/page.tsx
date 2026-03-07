'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, FileText, ExternalLink, ArrowUpRight, X, Search, Eye } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { createClient } from '@/lib/supabase/client'

// ─── types ─────────────────────────────────────────────────────────────────────
interface Project {
  id: string
  title_en: string; title_ar: string
  description_en: string; description_ar: string
  image: string
  lat: number | null; lng: number | null
  location_label_en: string; location_label_ar: string
  pdf_url: string
  status: 'published' | 'hidden'
  created_at: string
}

// ─── Project detail drawer ─────────────────────────────────────────────────────
function ProjectDrawer({ project, onClose, locale, direction }: { project: Project; onClose: () => void; locale: string; direction: string }) {
  const gold  = '#a79370'
  const black = '#000000'
  const white = '#ffffff'
  const isRTL = direction === 'rtl'

  const title       = locale === 'ar' ? (project.title_ar       || project.title_en)       : project.title_en
  const description = locale === 'ar' ? (project.description_ar || project.description_en) : project.description_en
  const location    = locale === 'ar' ? (project.location_label_ar || project.location_label_en) : project.location_label_en

  const hasMap = project.lat && project.lng
  const mapUrl = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${(project.lng!-0.025)},${(project.lat!-0.025)},${(project.lng!+0.025)},${(project.lat!+0.025)}&layer=mapnik&marker=${project.lat},${project.lng}`
    : null

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40, backdropFilter: 'blur(6px)', cursor: 'pointer' }} />

      <motion.div
        initial={{ x: isRTL ? '-100%' : '100%' }} animate={{ x: 0 }} exit={{ x: isRTL ? '-100%' : '100%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        dir={direction}
        style={{ position: 'fixed', top: 0, bottom: 0, [isRTL ? 'left' : 'right']: 0, width: '100%', maxWidth: 680, background: white, zIndex: 50, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ position: 'sticky', top: 0, background: white, borderBottom: '1px solid rgba(167,147,112,0.2)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <span className="projects-mono text-[10px] uppercase tracking-widest" style={{ color: gold }}>
            {locale === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}
          </span>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(167,147,112,0.3)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: gold }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = gold; (e.currentTarget as HTMLElement).style.color = black }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = gold }}>
            <X size={15} />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 280 }}>
          <img src={project.image} alt={title} className="w-full h-full object-cover" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
          {location && (
            <div style={{ position: 'absolute', bottom: 20, left: isRTL ? 'auto' : 24, right: isRTL ? 24 : 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 20 }}>
              <MapPin size={11} color={gold} />
              <span className="projects-body text-xs" style={{ color: white }}>{location}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '36px 32px', flex: 1 }} className={isRTL ? 'text-right' : ''}>
          <h2 className="projects-title" style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: black, lineHeight: 1.2, marginBottom: 16 }}>{title}</h2>
          <p className="projects-body" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', marginBottom: 32 }}>{description}</p>

          {/* Map */}
          {mapUrl && (
            <div className="mb-8">
              <div className="projects-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: gold }}>
                {locale === 'ar' ? 'الموقع الجغرافي' : 'Location'}
              </div>
              <div className="relative rounded overflow-hidden" style={{ height: 220, border: '1px solid rgba(167,147,112,0.2)' }}>
                <iframe src={mapUrl} width="100%" height="220" style={{ border: 0 }} title={`${title} location`} />
                <a href={`https://www.openstreetmap.org/?mlat=${project.lat}&mlon=${project.lng}#map=15/${project.lat}/${project.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ position: 'absolute', bottom: 8, right: 8, background: gold, color: black, padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                  <ExternalLink size={10} /> {locale === 'ar' ? 'فتح الخريطة' : 'Open Map'}
                </a>
              </div>
              {location && (
                <p className="projects-body text-xs mt-2" style={{ color: '#aaa' }}>
                  <MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />{location}
                </p>
              )}
            </div>
          )}

          {/* PDF */}
          {project.pdf_url && (
            <div style={{ background: 'rgba(167,147,112,0.06)', border: '1px solid rgba(167,147,112,0.2)', borderRadius: 8, padding: '20px 22px', marginBottom: 32 }}>
              <div className="projects-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: gold }}>
                {locale === 'ar' ? 'ملف الشرح التفصيلي' : 'Detailed Brief'}
              </div>
              <a href={project.pdf_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                style={{ textDecoration: 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(167,147,112,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={20} color={gold} />
                </div>
                <div className="flex-1">
                  <p className="projects-body font-medium text-sm" style={{ color: black }}>{locale === 'ar' ? 'تحميل ملف PDF' : 'Download PDF'}</p>
                  <p className="projects-body text-xs" style={{ color: '#aaa' }}>{locale === 'ar' ? 'اضغط لعرض الوثيقة التفصيلية' : 'Click to view the detailed document'}</p>
                </div>
                <ExternalLink size={14} color={gold} />
              </a>
            </div>
          )}

          {/* CTA */}
          <button style={{ width: '100%', background: gold, color: black, fontFamily: 'inherit', fontWeight: 600, fontSize: 13, padding: '15px 28px', borderRadius: 4, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
            <span>{locale === 'ar' ? 'تواصل بشأن هذا المشروع' : 'Enquire About This Project'}</span>
            <ArrowUpRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </button>
        </div>
      </motion.div>
    </>
  )
}

// ─── main component ────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const { locale, direction } = useI18n()
  const gold  = '#a79370'
  const black = '#000000'
  const white = '#ffffff'
  const cream = '#faf9f6'
  const isRTL = direction === 'rtl'

  const titleFont = locale === 'ar' ? 'Tajawal, sans-serif'              : 'Playfair Display, serif'
  const monoFont  = locale === 'ar' ? 'Cairo, sans-serif'                : 'Space Mono, monospace'
  const bodyFont  = locale === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif'

  const [projects, setProjects] = useState<Project[]>([])
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState<Project | null>(null)
  const [search,   setSearch]   = useState('')
  const [hovering, setHovering] = useState<string | null>(null)

  useEffect(() => { fetchProjects() }, [])

  async function fetchProjects() {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('*').eq('status', 'published').order('order_index', { ascending: true }).order('created_at', { ascending: false })
    setProjects(data || [])
    setLoading(false)
  }

  const filtered = projects.filter(p => {
    const s = search.toLowerCase()
    return !s || p.title_en.toLowerCase().includes(s) || p.title_ar?.includes(s) || p.description_en.toLowerCase().includes(s)
  })

  const proj_title = (p: Project) => locale === 'ar' ? (p.title_ar || p.title_en) : p.title_en
  const proj_desc  = (p: Project) => locale === 'ar' ? (p.description_ar || p.description_en) : p.description_en
  const proj_loc   = (p: Project) => locale === 'ar' ? (p.location_label_ar || p.location_label_en) : p.location_label_en

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cairo:wght@300;400;600;700&display=swap');

        [dir="ltr"] .projects-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .projects-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .projects-body  { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .projects-body  { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .projects-mono  { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .projects-mono  { font-family: 'Cairo', sans-serif; font-weight: 700; }

        /* ═══════════════════════════════════════════════════════
           HERO TEXTURE SYSTEM — identical to news page
        ═══════════════════════════════════════════════════════ */
        .ph-root {
          position: relative;
          overflow: hidden;
          background: #0d0b09;
        }

        /* LAYER 1 — tight crosshatch engraving */
        .ph-hatch {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image:
            repeating-linear-gradient(45deg, rgba(167,147,112,0.055) 0px, rgba(167,147,112,0.055) 1px, transparent 1px, transparent 10px),
            repeating-linear-gradient(-45deg, rgba(167,147,112,0.028) 0px, rgba(167,147,112,0.028) 1px, transparent 1px, transparent 10px);
        }

        /* LAYER 2 — animated film grain */
        .ph-grain {
          position: absolute; pointer-events: none; z-index: 2;
          inset: -80px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 280px 280px;
          opacity: 0.075;
          animation: ph-drift 8s steps(3, end) infinite;
        }
        @keyframes ph-drift {
          0%   { transform: translate(  0px,  0px) }
          12%  { transform: translate( -3px, -2px) }
          25%  { transform: translate(  2px,  3px) }
          37%  { transform: translate( -2px,  1px) }
          50%  { transform: translate(  3px, -3px) }
          62%  { transform: translate( -1px,  2px) }
          75%  { transform: translate(  2px, -2px) }
          87%  { transform: translate( -2px,  0px) }
          100% { transform: translate(  0px,  0px) }
        }

        /* LAYER 3 — halftone dot grid */
        .ph-dots {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background-image: radial-gradient(circle, rgba(167,147,112,0.2) 1.5px, transparent 1.5px);
          background-size: 20px 20px;
          mask-image: radial-gradient(ellipse 70% 85% at 50% 50%, black 5%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 85% at 50% 50%, black 5%, transparent 100%);
        }

        /* LAYER 4 — diagonal ruled lines */
        .ph-lines {
          position: absolute; inset: 0; pointer-events: none; z-index: 4;
          background-image: repeating-linear-gradient(
            -63deg,
            transparent 0px, transparent 52px,
            rgba(167,147,112,0.045) 52px, rgba(167,147,112,0.045) 53px
          );
        }

        /* LAYER 5 — fine horizontal scan lines */
        .ph-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 5;
          background: repeating-linear-gradient(
            0deg,
            transparent 0px, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
        }

        /* LAYER 6 — warm radial glow */
        .ph-glow {
          position: absolute; pointer-events: none; z-index: 6;
          top: -25%; left: 50%; transform: translateX(-50%);
          width: 1100px; height: 760px;
          background: radial-gradient(ellipse at 50% 58%,
            rgba(167,147,112,0.14) 0%,
            rgba(167,147,112,0.04) 45%,
            transparent 68%
          );
        }

        /* LAYER 7 — dark edge vignette */
        .ph-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 7;
          background: radial-gradient(ellipse 130% 100% at 50% 50%,
            transparent 35%,
            rgba(0,0,0,0.6) 100%
          );
        }

        /* CORNER REGISTRATION MARKS */
        .ph-corner {
          position: absolute; width: 34px; height: 34px;
          pointer-events: none; z-index: 9;
        }
        .ph-corner::before, .ph-corner::after {
          content: ''; position: absolute; background: rgba(167,147,112,0.55);
        }
        .ph-corner::before { width: 100%; height: 1px; top: 0; left: 0; }
        .ph-corner::after  { width: 1px; height: 100%; top: 0; left: 0; }
        .ph-corner.tl { top: 26px;    left: 26px; }
        .ph-corner.tr { top: 26px;    right: 26px; transform: rotate(90deg); }
        .ph-corner.bl { bottom: 26px; left: 26px;  transform: rotate(270deg); }
        .ph-corner.br { bottom: 26px; right: 26px; transform: rotate(180deg); }

        /* RULED BORDER LINES */
        .ph-rule-t, .ph-rule-b { position: absolute; left: 0; right: 0; height: 1px; pointer-events: none; z-index: 9; }
        .ph-rule-t { top: 0;    background: linear-gradient(90deg, transparent, #a79370 30%, #a79370 70%, transparent); }
        .ph-rule-b { bottom: 0; background: linear-gradient(90deg, transparent, rgba(167,147,112,0.35) 35%, rgba(167,147,112,0.35) 65%, transparent); }

        .ph-rule-l, .ph-rule-r { position: absolute; top: 0; bottom: 0; width: 1px; pointer-events: none; z-index: 9; }
        .ph-rule-l { left: 38px;  background: linear-gradient(180deg, transparent, rgba(167,147,112,0.2) 18%, rgba(167,147,112,0.2) 82%, transparent); }
        .ph-rule-r { right: 38px; background: linear-gradient(180deg, transparent, rgba(167,147,112,0.2) 18%, rgba(167,147,112,0.2) 82%, transparent); }

        /* CARDS */
        .image-grain::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px); opacity: 0.15; pointer-events: none; }
        .proj-card .proj-overlay { transition: opacity 0.5s ease; }
        .proj-card:hover .proj-overlay { opacity: 1 !important; }
        .proj-card:hover .proj-img { transform: scale(1.05); }
        .proj-img { transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .proj-arrow { transition: all 0.3s ease; opacity: 0; transform: translate(4px, -4px); }
        .proj-card:hover .proj-arrow { opacity: 1; transform: translate(0, 0); }
      `}</style>

      {/* ══ HERO — news-style textured ══════════════════════════════════════════ */}
      <div className="ph-root pt-36 pb-24 px-6 md:px-12">

        {/* 7 texture layers */}
        <div className="ph-hatch"    aria-hidden="true" />
        <div className="ph-grain"    aria-hidden="true" />
        <div className="ph-dots"     aria-hidden="true" />
        <div className="ph-lines"    aria-hidden="true" />
        <div className="ph-scan"     aria-hidden="true" />
        <div className="ph-glow"     aria-hidden="true" />
        <div className="ph-vignette" aria-hidden="true" />

        {/* corner registration marks */}
        <div className="ph-corner tl" aria-hidden="true" />
        <div className="ph-corner tr" aria-hidden="true" />
        <div className="ph-corner bl" aria-hidden="true" />
        <div className="ph-corner br" aria-hidden="true" />

        {/* ruled border lines */}
        <div className="ph-rule-t" aria-hidden="true" />
        <div className="ph-rule-b" aria-hidden="true" />
        <div className="ph-rule-l hidden lg:block" aria-hidden="true" />
        <div className="ph-rule-r hidden lg:block" aria-hidden="true" />

        {/* ── CONTENT ── */}
        <div className="max-w-5xl mx-auto relative" style={{ zIndex: 10 }}>

          {/* eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`flex items-center gap-3 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div style={{ width: 40, height: 1, background: gold, flexShrink: 0 }} />
            <span style={{ color: gold, fontFamily: monoFont, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {locale === 'ar' ? 'مجموعة RSW للاستثمار' : 'RSW Investment Group'}
            </span>
            <div style={{ width: 40, height: 1, background: gold, flexShrink: 0 }} />
          </motion.div>

          {/* main headline — gold only */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={isRTL ? 'text-right' : ''}
          >
            {locale === 'ar' ? (
              <h1 style={{ fontFamily: titleFont, fontSize: 'clamp(52px, 9vw, 100px)', fontWeight: 800, lineHeight: 1.0, color: gold, letterSpacing: '-0.01em' }}>
                <span style={{ color: gold }}>مشاريعنا</span>
                <br />
                <span style={{ color: 'rgba(167,147,112,0.55)', fontWeight: 300 }}>المتميزة</span>
              </h1>
            ) : (
              <h1 style={{ fontFamily: titleFont, fontSize: 'clamp(52px, 9vw, 100px)', fontWeight: 400, lineHeight: 1.0, color: gold, letterSpacing: '-0.025em' }}>
                <span style={{ fontStyle: 'italic', color: gold }}>Our</span>
                {' '}
                
                <br />
                <span style={{ fontWeight: 800, color: gold }}>Projects</span>
              </h1>
            )}

            {/* ruled separator with diamond accent */}
            <div className={`flex items-center gap-4 my-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div style={{ flex: 1, height: 1, background: 'rgba(167,147,112,0.25)' }} />
              <div style={{ width: 6, height: 6, transform: 'rotate(45deg)', background: gold, flexShrink: 0 }} />
              <div style={{ width: 36, height: 1, background: 'rgba(167,147,112,0.25)', flexShrink: 0 }} />
            </div>

            <p style={{ fontFamily: bodyFont, fontSize: 15, color: 'rgba(167,147,112,0.5)', maxWidth: 480, lineHeight: 1.85 }}
              className={isRTL ? 'mr-auto' : ''}>
              {locale === 'ar'
                ? 'محفظة منتقاة من المشاريع المنجزة والنشطة عبر العقارات والبناء والتكنولوجيا.'
                : 'A curated portfolio of completed and active projects across real estate, construction, and technology.'}
            </p>
          </motion.div>

          {/* stat pills — gold only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38 }}
            className={`flex flex-wrap gap-2 mt-10 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {[
              { n: projects.length || '—', l: locale === 'ar' ? 'مشروع'   : 'Projects' },
              { n: '3',                     l: locale === 'ar' ? 'قطاعات'  : 'Sectors'  },
              { n: 'UAE',                   l: locale === 'ar' ? 'مقرها'   : 'Based'    },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 18px',
                border: '1px solid rgba(167,147,112,0.22)',
                borderRadius: 2,
                background: 'rgba(167,147,112,0.06)',
                backdropFilter: 'blur(10px)',
              }}>
                <span style={{ fontFamily: titleFont, fontSize: 20, fontWeight: 700, color: gold, lineHeight: 1 }}>{s.n}</span>
                <span style={{ fontFamily: monoFont, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(167,147,112,0.45)' }}>{s.l}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
      {/* END HERO */}

      {/* ══ SEARCH ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: cream, borderBottom: '1px solid rgba(167,147,112,0.15)', padding: '24px 0' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <Search size={15} color={gold} style={{ position: 'absolute', left: isRTL ? 'auto' : 14, right: isRTL ? 14 : 'auto', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={locale === 'ar' ? 'ابحث عن مشروع…' : 'Search projects…'}
              style={{ width: '100%', padding: `10px 14px`, paddingLeft: isRTL ? 14 : 44, paddingRight: isRTL ? 44 : 14, border: '1px solid rgba(167,147,112,0.25)', background: white, borderRadius: 4, fontSize: 13, color: black, outline: 'none', fontFamily: 'inherit', direction: direction }}
            />
          </div>
        </div>
      </section>

      {/* ══ GRID ════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {loading ? (
            <div className="flex items-center justify-center h-60">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: `${gold} transparent transparent transparent` }} />
                <p className="projects-mono text-[10px] uppercase tracking-widest" style={{ color: gold }}>{locale === 'ar' ? 'جاري التحميل…' : 'Loading…'}</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <p className="projects-title text-2xl font-light mb-3" style={{ color: black }}>{locale === 'ar' ? 'لا توجد مشاريع' : 'No projects found'}</p>
              <p className="projects-body text-sm" style={{ color: '#aaa' }}>{search ? (locale === 'ar' ? 'جرب مصطلح بحث مختلف' : 'Try a different search term') : (locale === 'ar' ? 'تابعنا قريباً.' : 'Check back soon.')}</p>
            </div>
          ) : (
            <>
              {/* count */}
              <div className={`flex items-center justify-between mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <p className="projects-mono text-[10px] uppercase tracking-widest" style={{ color: gold }}>
                  {locale === 'ar' ? `${filtered.length} مشروع` : `${filtered.length} Projects`}
                </p>
                {search && (
                  <button onClick={() => setSearch('')} className="flex items-center gap-1.5 text-xs" style={{ color: gold }}>
                    <X size={12} />{locale === 'ar' ? 'مسح البحث' : 'Clear search'}
                  </button>
                )}
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((proj, idx) => (
                  <motion.div
                    key={proj.id}
                    className="proj-card cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setSelected(proj)}
                    style={{ background: white, border: '1px solid rgba(167,147,112,0.15)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}
                    onMouseEnter={() => setHovering(proj.id)}
                    onMouseLeave={() => setHovering(null)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: idx % 5 === 0 ? 280 : 200 }}>
                      <img src={proj.image} alt={proj_title(proj)} className="proj-img w-full h-full object-cover" />
                      <div className="proj-overlay absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)', opacity: 0 }} />
                      <div className="proj-overlay proj-arrow absolute" style={{ bottom: 16, right: isRTL ? 'auto' : 16, left: isRTL ? 16 : 'auto', background: gold, borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowUpRight size={16} color={black} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                      </div>
                      {proj.pdf_url && (
                        <div style={{ position: 'absolute', top: 14, left: isRTL ? 'auto' : 14, right: isRTL ? 14 : 'auto', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 5 }}>
                          <FileText size={10} color={gold} />
                          <span className="projects-mono" style={{ fontSize: 9, color: gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PDF</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px 22px 22px' }} className={isRTL ? 'text-right' : ''}>
                      <h3 className="projects-title" style={{ fontSize: 18, fontWeight: 600, color: black, lineHeight: 1.25, marginBottom: 8 }}>
                        {proj_title(proj)}
                      </h3>
                      <p className="projects-body" style={{ fontSize: 13, color: 'rgba(0,0,0,0.58)', lineHeight: 1.65, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {proj_desc(proj)}
                      </p>

                      {/* Footer meta */}
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`} style={{ borderTop: '1px solid rgba(167,147,112,0.12)', paddingTop: 14 }}>
                        {proj_loc(proj) ? (
                          <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin size={11} color={gold} strokeWidth={1.5} />
                            <span className="projects-body text-xs" style={{ color: '#aaa' }}>{proj_loc(proj)}</span>
                          </div>
                        ) : <span />}
                        <button className="projects-body text-xs font-medium flex items-center gap-1" style={{ color: gold }}>
                          {locale === 'ar' ? 'عرض' : 'View'} <ArrowUpRight size={11} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Drawer */}
      <AnimatePresence>
        {selected && (
          <ProjectDrawer project={selected} onClose={() => setSelected(null)} locale={locale} direction={direction} />
        )}
      </AnimatePresence>

    </div>
  )
}