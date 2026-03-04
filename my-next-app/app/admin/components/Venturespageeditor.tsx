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

// ─── shared UI atoms ──────────────────────────────────────────────────────────
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

function SectionCard({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
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
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        style={{ background: expanded ? 'rgba(167,147,112,0.04)' : 'transparent' }} onClick={onToggle}>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
            style={{ background: 'rgba(167,147,112,0.15)', color: gold }}>{index + 1}</span>
          <p className="text-sm truncate max-w-xs" style={{ color: '#000' }}>{label || `Item ${index + 1}`}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
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

function ImgField({ label = 'Image', value, onChange }: { label?: string; value: string; onChange: (u: string) => void }) {
  return (
    <div>
      <Lbl c={label} />
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

// ─── venture + section navigation ─────────────────────────────────────────────
const VENTURE_TABS = [
  { key: 'real-estate',  num: '01', label: 'Real Estate' },
  { key: 'construction', num: '02', label: 'Construction' },
  { key: 'technology',   num: '03', label: 'Technology' },
]
const SECTION_TABS = [
  { key: 'overview',     label: 'Overview' },
  { key: 'capabilities', label: 'Capabilities' },
  { key: 'projects',     label: 'Projects' },
]

// ─── types ─────────────────────────────────────────────────────────────────────
interface Overview    { title_en: string; title_ar: string; subtitle_en: string; subtitle_ar: string; description_en: string; description_ar: string; image: string }
interface Capability  { title_en: string; title_ar: string; desc_en: string; desc_ar: string }
interface Project     { title_en: string; title_ar: string; subtitle_en: string; subtitle_ar: string; sector_en: string; sector_ar: string; size_en: string; size_ar: string; location_en: string; location_ar: string; timeline: string; status_en: string; status_ar: string; outcome_en: string; outcome_ar: string; description_en: string; description_ar: string; tags_en: string; tags_ar: string; image: string }

// ─── seed data matching VenturesPage hardcoded content ─────────────────────────
const SEED_OVERVIEWS: Record<string, Overview> = {
  'real-estate':  { title_en: 'Real Estate',  title_ar: 'العقارات',    subtitle_en: 'Commercial Investment', subtitle_ar: 'الاستثمار التجاري', description_en: "Strategic real estate investments, commercial leasing, and property development across UAE's most promising markets. We focus on prime locations and high-quality properties that deliver long-term value.", description_ar: 'استثمارات عقارية استراتيجية، تأجير تجاري، وتطوير عقاري عبر أكثر الأسواق الإماراتية الواعدة. نركز على المواقع الاستراتيجية والعقارات عالية الجودة التي توفر عوائد طويلة الأجل.', image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
  'construction': { title_en: 'Construction', title_ar: 'البناء',      subtitle_en: 'Integrated Execution',  subtitle_ar: 'التنفيذ المتكامل',   description_en: 'Full-spectrum construction solutions from oil & gas facilities to commercial buildings and interior design. We deliver specialized technical expertise and world-class project management.', description_ar: 'حلول إنشائية شاملة من منشآت النفط والغاز إلى المباني التجارية والتصميم الداخلي. نقدم خبرة تقنية متخصصة وإدارة مشاريع من الطراز العالمي.', image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
  'technology':   { title_en: 'Technology',   title_ar: 'التكنولوجيا', subtitle_en: 'Digital Innovation',    subtitle_ar: 'الابتكار الرقمي',    description_en: 'Cutting-edge technology solutions spanning AI research, cybersecurity, cloud services, and software development. We drive digital transformation through advanced technology.', description_ar: 'حلول تكنولوجية متطورة تشمل أبحاث الذكاء الاصطناعي، الأمن السيبراني، الخدمات السحابية، وتطوير البرمجيات. نقود التحول الرقمي من خلال التكنولوجيا المتقدمة.', image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
}

const SEED_CAPABILITIES: Record<string, Capability[]> = {
  'real-estate': [
    { title_en: 'Commercial Leasing',    title_ar: 'التأجير التجاري',     desc_en: 'Premium office and retail space management across key locations',      desc_ar: 'إدارة مساحات مكتبية وتجزئة متميزة عبر المواقع الرئيسية' },
    { title_en: 'Property Development',  title_ar: 'التطوير العقاري',     desc_en: 'Comprehensive development projects from concept to delivery',           desc_ar: 'مشاريع تطوير عقاري شاملة من التصور إلى التسليم' },
    { title_en: 'Investment Management', title_ar: 'إدارة الاستثمار',    desc_en: 'Portfolio optimization and strategic asset growth',                     desc_ar: 'تحسين المحفظة والنمو الاستراتيجي للأصول' },
  ],
  'construction': [
    { title_en: 'Building Contracting',   title_ar: 'مقاولات البناء',         desc_en: 'Large-scale commercial and residential projects to exacting standards', desc_ar: 'مشاريع تجارية وسكنية واسعة النطاق ذات معايير عالية' },
    { title_en: 'Oil & Gas Facilities',   title_ar: 'منشآت النفط والغاز',    desc_en: 'Specialized infrastructure for industrial and energy sectors',          desc_ar: 'بنية تحتية متخصصة للقطاع الصناعي والطاقة' },
    { title_en: 'Design & Build',         title_ar: 'التصميم والتنفيذ',       desc_en: 'Integrated solutions from concept through completion',                  desc_ar: 'حلول متكاملة من المفهوم إلى الإنجاز' },
  ],
  'technology': [
    { title_en: 'AI Research',    title_ar: 'أبحاث الذكاء الاصطناعي', desc_en: 'Developing intelligent solutions for complex business challenges',   desc_ar: 'تطوير حلول ذكية للتحديات التجارية المعقدة' },
    { title_en: 'Cybersecurity',  title_ar: 'الأمن السيبراني',         desc_en: 'Comprehensive protection for enterprise systems and data',           desc_ar: 'حماية شاملة للأنظمة والبيانات المؤسسية' },
    { title_en: 'Cloud Services', title_ar: 'الخدمات السحابية',        desc_en: 'Scalable infrastructure and advanced cloud management',              desc_ar: 'بنية تحتية قابلة للتوسع وإدارة سحابية متقدمة' },
  ],
}

const SEED_PROJECTS: Record<string, Project[]> = {
  'real-estate': [
    { title_en: 'Abu Dhabi Commercial Tower',  title_ar: 'برج أبوظبي التجاري',      subtitle_en: 'Mixed-use office & retail',          subtitle_ar: 'مكتب وتجزئة متعددة الاستخدامات',  sector_en: 'Commercial Real Estate',  sector_ar: 'العقارات التجارية',   size_en: '12,400 m²', size_ar: '12,400 م²', location_en: 'Reem Island, Abu Dhabi',  location_ar: 'جزيرة الريم، أبوظبي',     timeline: '2021–2023', status_en: 'Completed', status_ar: 'مكتمل', outcome_en: '94% occupancy in year one',                 outcome_ar: 'نسبة إشغال 94٪ في السنة الأولى',   description_en: 'A multi-use commercial building featuring Grade-A offices and retail spaces in a prime Reem Island location. The project delivers steady rental yields alongside long-term asset appreciation.', description_ar: 'مبنى تجاري متعدد الاستخدامات يضم مكاتب درجة A ومساحات تجزئة في موقع استراتيجي على جزيرة الريم. المشروع يوفر عوائد إيجارية ثابتة مع ارتفاع تقدير قيمة الأصل.', tags_en: 'Commercial, Offices, Retail',       tags_ar: 'تجاري, مكاتب, تجزئة',          image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
    { title_en: 'Sharjah Residential Complex', title_ar: 'مجمع الشارقة السكني',     subtitle_en: 'Planned residential units',          subtitle_ar: 'وحدات سكنية مخططة',               sector_en: 'Residential Real Estate', sector_ar: 'العقارات السكنية',    size_en: '8,200 m²',  size_ar: '8,200 م²',  location_en: 'Al Majaz, Sharjah',       location_ar: 'المجاز، الشارقة',          timeline: '2022–2024', status_en: 'Completed', status_ar: 'مكتمل', outcome_en: '100% sold 6 months pre-completion',         outcome_ar: 'بيع 100٪ قبل الإنجاز بـ 6 أشهر',  description_en: 'A premium residential complex comprising 48 diverse units. Designed to meet the growing demand for quality housing in Sharjah with modern amenities and contemporary design.', description_ar: 'مجمع سكني راقٍ يتضمن 48 وحدة سكنية متنوعة. صُمم المشروع لتلبية الطلب المتنامي على المساكن المميزة في الشارقة مع توفير مرافق حديثة وتصاميم معاصرة.',        tags_en: 'Residential, Units, Sales',      tags_ar: 'سكني, وحدات, مبيعات',          image: 'https://i.ytimg.com/vi/puQoxZnrwlA/maxresdefault.jpg' },
    { title_en: 'Dubai Logistics Centre',      title_ar: 'مركز دبي اللوجستي',       subtitle_en: 'Warehousing & industrial facilities', subtitle_ar: 'مستودعات ومرافق صناعية',           sector_en: 'Industrial Real Estate',  sector_ar: 'العقارات الصناعية',   size_en: '22,000 m²', size_ar: '22,000 م²', location_en: 'Jebel Ali, Dubai',        location_ar: 'جبل علي، دبي',             timeline: '2023–2025', status_en: 'Active',    status_ar: 'جاري',   outcome_en: '78% contracts secured',                     outcome_ar: 'عقود مبرمة بنسبة 78٪',              description_en: 'An integrated logistics facility in the Jebel Ali Free Zone serving the storage and distribution needs of international companies. The strategic location ensures sustained demand and strong rental returns.', description_ar: 'منشأة لوجستية متكاملة في منطقة جبل علي الحرة تخدم متطلبات التخزين والتوزيع للشركات الدولية. الموقع الاستراتيجي يضمن طلبًا دائمًا وعوائد إيجارية قوية.', tags_en: 'Logistics, Industrial, Warehousing', tags_ar: 'لوجستي, صناعي, مستودعات', image: 'https://img.freepik.com/free-photo/tokyo-japan-cityscape-filtered-image-processed-vintage-effect_1232-2427.jpg?semt=ais_hybrid&w=740&q=80' },
  ],
  'construction': [
    { title_en: 'Water Treatment Plant — Abu Dhabi',   title_ar: 'محطة معالجة المياه — أبوظبي',        subtitle_en: 'Industrial infrastructure',              subtitle_ar: 'بنية تحتية صناعية',             sector_en: 'Oil & Gas',              sector_ar: 'النفط والغاز',        size_en: 'AED 45M',   size_ar: 'AED 45M',   location_en: 'Mussafah Industrial Area',  location_ar: 'منطقة مصفح الصناعية',      timeline: '2021–2022', status_en: 'Completed', status_ar: 'مكتمل', outcome_en: 'Delivered 3 weeks ahead of schedule',   outcome_ar: 'تسليم قبل الجدول بـ 3 أسابيع',  description_en: 'Design and execution of an integrated industrial water treatment facility serving oil and gas complexes in the region. The project included advanced treatment systems installed to the highest international safety standards.', description_ar: 'تصميم وتنفيذ منشأة متكاملة لمعالجة المياه الصناعية تخدم مجمعات النفط والغاز في المنطقة. تضمن المشروع تركيب أنظمة معالجة متقدمة وفق أعلى معايير السلامة الدولية.', tags_en: 'Oil & Gas, Infrastructure, Industrial',   tags_ar: 'نفط وغاز, بنية تحتية, صناعي', image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
    { title_en: 'Commercial Office Complex — Dubai',   title_ar: 'مجمع المكاتب التجارية — دبي',        subtitle_en: 'Multi-storey commercial build',          subtitle_ar: 'بناء تجاري متعدد الطوابق',       sector_en: 'Commercial Construction', sector_ar: 'البناء التجاري',       size_en: 'AED 28M',   size_ar: 'AED 28M',   location_en: 'Dubai Media City',          location_ar: 'مدينة دبي للإعلام',        timeline: '2022–2023', status_en: 'Completed', status_ar: 'مكتمل', outcome_en: 'Zero safety incidents, LEED Silver rated', outcome_ar: 'صفر حوادث سلامة، تقييم LEED فضي',  description_en: 'Construction of a modern 12-storey commercial office complex with integrated facilities. Executed to the highest sustainability standards, the project received LEED Silver certification in recognition of advanced environmental practices.', description_ar: 'إنشاء مجمع مكاتب تجارية حديث من 12 طابقاً مع مرافق متكاملة. نُفذ المشروع وفق أعلى معايير الاستدامة وحصل على شهادة LEED فضي.', tags_en: 'Commercial, Multi-storey, LEED',           tags_ar: 'تجاري, متعدد الطوابق, LEED',   image: 'https://media.istockphoto.com/id/862758024/photo/construction-site.jpg?s=612x612&w=0&k=20&c=gYl455m4B91lwQpIidx9YBCxwLaeLKFR632FRaPqffc=' },
    { title_en: 'Luxury Hotel Renovation — Sharjah',   title_ar: 'تجديد الفندق الفاخر — الشارقة',     subtitle_en: 'Interior design & full refurbishment',   subtitle_ar: 'تصميم داخلي وتجديد شامل',        sector_en: 'Interior Design',         sector_ar: 'التصميم الداخلي',     size_en: 'AED 9M',    size_ar: 'AED 9M',    location_en: 'Sharjah City Centre',       location_ar: 'وسط مدينة الشارقة',       timeline: '2023–2024', status_en: 'Completed', status_ar: 'مكتمل', outcome_en: 'Hotel upgraded from 4 to 5 stars',       outcome_ar: 'رفع تصنيف الفندق من 4 إلى 5 نجوم', description_en: 'A comprehensive redesign of a 180-room hotel encompassing all rooms, common areas, and restaurants. The high-end interior design contributed to a star-rating upgrade and a 35% increase in revenue.', description_ar: 'إعادة تصميم شاملة لفندق من 180 غرفة تضمنت تجديد جميع الغرف والمناطق المشتركة والمطاعم. أسهم التصميم الداخلي الراقي في رفع التصنيف الفندقي وزيادة الإيرادات بنسبة 35٪.', tags_en: 'Interior Design, Hospitality, Renovation', tags_ar: 'تصميم داخلي, ضيافة, تجديد',   image: 'https://media.istockphoto.com/id/2247515387/photo/industrial-plant-structure-with-pipes-and-metal-beams-shows-complex-manufacturing-system.jpg?s=612x612&w=0&k=20&c=hXGM3pe643J0HwBdgHU8Zb4tAQa4zO5OCS0UAA9y9Eg=' },
  ],
  'technology': [
    { title_en: 'AI Finance Platform',                       title_ar: 'منصة الذكاء الاصطناعي للتمويل',   subtitle_en: 'AI-powered analytics system',               subtitle_ar: 'نظام تحليلي مدعوم بالذكاء الاصطناعي', sector_en: 'Artificial Intelligence', sector_ar: 'الذكاء الاصطناعي',   size_en: '18 months development', size_ar: '18 شهراً من التطوير', location_en: 'Abu Dhabi + Remote', location_ar: 'أبوظبي + عن بُعد', timeline: '2022–2024',       status_en: 'Completed', status_ar: 'مكتمل', outcome_en: '60% reduction in processing time',  outcome_ar: 'خفض وقت المعالجة بنسبة 60٪',   description_en: 'Development of an advanced AI-powered analytics platform to automate lending decisions and risk assessment for a UAE financial institution. The platform processes thousands of applications daily with accuracy surpassing manual processing.', description_ar: 'تطوير منصة تحليلية متقدمة مدعومة بالذكاء الاصطناعي لأتمتة قرارات الإقراض وتقييم المخاطر لمؤسسة مالية إماراتية. المنصة تعالج آلاف الطلبات يومياً.', tags_en: 'AI, Finance, Automation',         tags_ar: 'ذكاء اصطناعي, مالية, أتمتة',   image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
    { title_en: 'Cloud Infrastructure — Government Ministry', title_ar: 'بنية تحتية سحابية — وزارة حكومية', subtitle_en: 'Infrastructure migration & modernisation',   subtitle_ar: 'ترحيل وتحديث البنية التحتية',          sector_en: 'Cloud Services',          sector_ar: 'الخدمات السحابية', size_en: '200+ servers',          size_ar: '200+ خادم',          location_en: 'Abu Dhabi',          location_ar: 'أبوظبي',            timeline: '2023–2024',       status_en: 'Completed', status_ar: 'مكتمل', outcome_en: '40% reduction in operational costs', outcome_ar: 'توفير 40٪ في التكاليف التشغيلية', description_en: 'Comprehensive migration of government infrastructure from legacy systems to hybrid cloud. The project involved restructuring 200+ servers, training technical teams, and ensuring business continuity throughout the transition.', description_ar: 'ترحيل شامل لبنية تحتية حكومية من النظام التقليدي إلى السحابة الهجينة. المشروع شمل إعادة هيكلة 200+ خادم وتدريب الفرق التقنية.', tags_en: 'Cloud, Government, Migration',    tags_ar: 'سحابة, حكومي, ترحيل',          image: 'https://abdullahsakkijha.com/wp-content/uploads/2023/10/ezgif.com-gif-maker.jpg' },
    { title_en: 'Cybersecurity System — Gulf Bank',           title_ar: 'نظام الأمن السيبراني — بنك خليجي', subtitle_en: 'Information security & protection',          subtitle_ar: 'حماية وأمن المعلومات',                  sector_en: 'Cybersecurity',           sector_ar: 'الأمن السيبراني',  size_en: 'AED 3.2M',              size_ar: 'AED 3.2M',            location_en: 'Dubai',              location_ar: 'دبي',               timeline: '2024–Ongoing',    status_en: 'Active',    status_ar: 'جاري',   outcome_en: 'Zero breaches since deployment',     outcome_ar: 'صفر اختراقات منذ التطبيق',       description_en: 'Design and implementation of an integrated cybersecurity framework for a regional bank, encompassing advanced firewalls, real-time threat monitoring, and incident response protocols.', description_ar: 'تصميم وتنفيذ منظومة أمن سيبراني متكاملة لبنك إقليمي تشمل جدران الحماية المتقدمة ومراقبة التهديدات في الوقت الفعلي وبروتوكولات الاستجابة للحوادث.', tags_en: 'Cybersecurity, Banking, Protection', tags_ar: 'أمن سيبراني, بنوك, حماية',   image: 'https://images.stockcake.com/public/2/b/f/2bf29317-f749-4092-8312-023ebf60baa5_large/server-room-technician-stockcake.jpg' },
  ],
}

// ─── helpers to parse DB rows ─────────────────────────────────────────────────
function rowToOverview(row: any): Overview {
  return {
    title_en:       row.data_en?.title       || '',
    title_ar:       row.data_ar?.title       || '',
    subtitle_en:    row.data_en?.subtitle    || '',
    subtitle_ar:    row.data_ar?.subtitle    || '',
    description_en: row.data_en?.description || '',
    description_ar: row.data_ar?.description || '',
    image:          row.data_en?.image       || '',
  }
}
function rowToCap(row: any): Capability {
  return { title_en: row.data_en?.title || '', title_ar: row.data_ar?.title || '', desc_en: row.data_en?.desc || '', desc_ar: row.data_ar?.desc || '' }
}
function rowToProj(row: any): Project {
  return {
    title_en:       row.data_en?.title       || '', title_ar:       row.data_ar?.title       || '',
    subtitle_en:    row.data_en?.subtitle    || '', subtitle_ar:    row.data_ar?.subtitle    || '',
    sector_en:      row.data_en?.sector      || '', sector_ar:      row.data_ar?.sector      || '',
    size_en:        row.data_en?.size        || '', size_ar:        row.data_ar?.size        || '',
    location_en:    row.data_en?.location    || '', location_ar:    row.data_ar?.location    || '',
    timeline:       row.data_en?.timeline    || '',
    status_en:      row.data_en?.status      || '', status_ar:      row.data_ar?.status      || '',
    outcome_en:     row.data_en?.outcome     || '', outcome_ar:     row.data_ar?.outcome     || '',
    description_en: row.data_en?.description || '', description_ar: row.data_ar?.description || '',
    tags_en:        (row.data_en?.tags || []).join(', '),
    tags_ar:        (row.data_ar?.tags || []).join(', '),
    image:          row.data_en?.image       || '',
  }
}

// ─── main component ───────────────────────────────────────────────────────────
export default function VenturesPageEditor() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [vid, setVid]         = useState('real-estate')
  const [sect, setSect]       = useState('overview')

  const [overviews,    setOverviews]    = useState<Record<string, Overview>>({ ...SEED_OVERVIEWS })
  const [capabilities, setCapabilities] = useState<Record<string, Capability[]>>({ ...SEED_CAPABILITIES })
  const [projects,     setProjects]     = useState<Record<string, Project[]>>({ ...SEED_PROJECTS })

  const [saving, setSaving] = useState<string | null>(null)
  const [saved,  setSaved]  = useState<string | null>(null)

  const [expCap,  setExpCap]  = useState<number | null>(0)
  const [expProj, setExpProj] = useState<number | null>(0)

  useEffect(() => { load() }, [])

  // ─── load all ventures from DB ───────────────────────────────────────────────
  async function load() {
    setLoading(true)
    const sections = VENTURE_TABS.flatMap(v => [
      `ventures.${v.key}.overview`,
      `ventures.${v.key}.capabilities`,
      `ventures.${v.key}.projects`,
    ])
    const { data } = await supabase.from('content_arrays').select('*').in('section', sections).order('order_index')

    if (data && data.length) {
      const newOv:   Record<string, Overview>     = {}
      const newCaps: Record<string, Capability[]> = {}
      const newProj: Record<string, Project[]>    = {}

      for (const v of VENTURE_TABS) {
        const ovRow   = data.find(r => r.section === `ventures.${v.key}.overview`)
        const capRows = data.filter(r => r.section === `ventures.${v.key}.capabilities`)
        const prjRows = data.filter(r => r.section === `ventures.${v.key}.projects`)

        if (ovRow)          newOv[v.key]   = rowToOverview(ovRow)
        if (capRows.length) newCaps[v.key] = capRows.map(rowToCap)
        if (prjRows.length) newProj[v.key] = prjRows.map(rowToProj)
      }

      setOverviews(prev    => ({ ...prev,    ...newOv   }))
      setCapabilities(prev => ({ ...prev,    ...newCaps }))
      setProjects(prev     => ({ ...prev,    ...newProj }))
    }

    setLoading(false)
  }

  // ─── save helpers ────────────────────────────────────────────────────────────
  async function saveOverview(v: string) {
    const k = `${v}-ov`; setSaving(k)
    const ov = overviews[v]
    await supabase.from('content_arrays').delete().eq('section', `ventures.${v}.overview`)
    await supabase.from('content_arrays').insert({
      section: `ventures.${v}.overview`, order_index: 0,
      data_en: { title: ov.title_en, subtitle: ov.subtitle_en, description: ov.description_en, image: ov.image },
      data_ar: { title: ov.title_ar, subtitle: ov.subtitle_ar, description: ov.description_ar, image: ov.image },
    })
    await load(); setSaving(null); setSaved(k); setTimeout(() => setSaved(null), 2000)
  }

  async function saveCapabilities(v: string) {
    const k = `${v}-cap`; setSaving(k)
    const caps = capabilities[v] || []
    await supabase.from('content_arrays').delete().eq('section', `ventures.${v}.capabilities`)
    if (caps.length) await supabase.from('content_arrays').insert(caps.map((c, i) => ({
      section: `ventures.${v}.capabilities`, order_index: i,
      data_en: { title: c.title_en, desc: c.desc_en },
      data_ar: { title: c.title_ar, desc: c.desc_ar },
    })))
    await load(); setSaving(null); setSaved(k); setTimeout(() => setSaved(null), 2000)
  }

  async function saveProjects(v: string) {
    const k = `${v}-proj`; setSaving(k)
    const prjs = projects[v] || []
    await supabase.from('content_arrays').delete().eq('section', `ventures.${v}.projects`)
    if (prjs.length) await supabase.from('content_arrays').insert(prjs.map((p, i) => ({
      section: `ventures.${v}.projects`, order_index: i,
      data_en: { title: p.title_en, subtitle: p.subtitle_en, sector: p.sector_en, size: p.size_en, location: p.location_en, timeline: p.timeline, status: p.status_en, outcome: p.outcome_en, description: p.description_en, tags: p.tags_en.split(',').map((t: string) => t.trim()).filter(Boolean), image: p.image },
      data_ar: { title: p.title_ar, subtitle: p.subtitle_ar, sector: p.sector_ar, size: p.size_ar, location: p.location_ar, timeline: p.timeline, status: p.status_ar, outcome: p.outcome_ar, description: p.description_ar, tags: p.tags_ar.split(',').map((t: string) => t.trim()).filter(Boolean), image: p.image },
    })))
    await load(); setSaving(null); setSaved(k); setTimeout(() => setSaved(null), 2000)
  }

  // ─── updaters ────────────────────────────────────────────────────────────────
  const updOv   = (v: string, k: keyof Overview,    val: string) => setOverviews(p    => ({ ...p, [v]: { ...p[v], [k]: val } }))
  const updCap  = (v: string, i: number, k: keyof Capability, val: string) => setCapabilities(p => ({ ...p, [v]: p[v].map((x, idx) => idx === i ? { ...x, [k]: val } : x) }))
  const updProj = (v: string, i: number, k: keyof Project,    val: string) => setProjects(p     => ({ ...p, [v]: p[v].map((x, idx) => idx === i ? { ...x, [k]: val } : x) }))

  const addCap  = (v: string) => setCapabilities(p => ({ ...p, [v]: [...(p[v] || []), { title_en: '', title_ar: '', desc_en: '', desc_ar: '' }] }))
  const delCap  = (v: string, i: number) => setCapabilities(p => ({ ...p, [v]: p[v].filter((_, idx) => idx !== i) }))
  const addProj = (v: string) => setProjects(p => ({ ...p, [v]: [...(p[v] || []), { title_en: '', title_ar: '', subtitle_en: '', subtitle_ar: '', sector_en: '', sector_ar: '', size_en: '', size_ar: '', location_en: '', location_ar: '', timeline: '', status_en: 'Active', status_ar: 'جاري', outcome_en: '', outcome_ar: '', description_en: '', description_ar: '', tags_en: '', tags_ar: '', image: '' }] }))
  const delProj = (v: string, i: number) => setProjects(p => ({ ...p, [v]: p[v].filter((_, idx) => idx !== i) }))

  const ov   = overviews[vid]
  const caps = capabilities[vid] || SEED_CAPABILITIES[vid]
  const prjs = projects[vid]     || SEED_PROJECTS[vid]

  if (loading) return <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin" style={{ color: gold }} /></div>

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Editing</p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>Ventures Page</h2>
        <p className="text-xs mt-1.5" style={{ color: '#aaa' }}>Manage all three venture sectors — overview image/text, capabilities, and project cards.</p>
      </div>

      {/* Venture picker */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {VENTURE_TABS.map(t => (
          <button key={t.key}
            onClick={() => { setVid(t.key); setSect('overview'); setExpCap(0); setExpProj(0) }}
            className="px-4 py-2 rounded-sm text-xs font-medium transition-all"
            style={{ background: vid === t.key ? gold : 'transparent', color: vid === t.key ? '#fff' : gold, border: `1px solid ${vid === t.key ? gold : 'rgba(167,147,112,0.35)'}` }}>
            {t.num} {t.label}
          </button>
        ))}
      </div>

      {/* Section picker */}
      <div className="flex gap-1.5 flex-wrap mb-8">
        {SECTION_TABS.map(t => (
          <button key={t.key} onClick={() => setSect(t.key)}
            className="px-3 py-1.5 rounded-sm text-[11px] font-medium transition-all"
            style={{ background: sect === t.key ? 'rgba(167,147,112,0.12)' : 'transparent', color: sect === t.key ? gold : '#aaa', border: `1px solid ${sect === t.key ? 'rgba(167,147,112,0.4)' : 'rgba(167,147,112,0.15)'}` }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ OVERVIEW ══════════════════════════════════════════════════════════ */}
      {sect === 'overview' && (
        <SectionCard
          title="Venture Overview"
          subtitle="The large image, title, subtitle, and sector description paragraph."
          action={<SaveBtn saving={saving === `${vid}-ov`} saved={saved === `${vid}-ov`} label="Save Overview" onClick={() => saveOverview(vid)} />}
        >
          <ImgField value={ov.image} onChange={v2 => updOv(vid, 'image', v2)} />
          <R2>
            <F label="Title (EN)"><input style={inp} value={ov.title_en} onChange={e => updOv(vid, 'title_en', e.target.value)} /></F>
            <F label="Title (AR)"><input style={ar}  value={ov.title_ar} onChange={e => updOv(vid, 'title_ar', e.target.value)} /></F>
          </R2>
          <R2>
            <F label="Subtitle (EN)"><input style={inp} value={ov.subtitle_en} onChange={e => updOv(vid, 'subtitle_en', e.target.value)} placeholder="Commercial Investment" /></F>
            <F label="Subtitle (AR)"><input style={ar}  value={ov.subtitle_ar} onChange={e => updOv(vid, 'subtitle_ar', e.target.value)} placeholder="الاستثمار التجاري" /></F>
          </R2>
          <R2>
            <F label="Description (EN)"><textarea rows={5} style={ta}   value={ov.description_en} onChange={e => updOv(vid, 'description_en', e.target.value)} /></F>
            <F label="Description (AR)"><textarea rows={5} style={taAr} value={ov.description_ar} onChange={e => updOv(vid, 'description_ar', e.target.value)} /></F>
          </R2>
        </SectionCard>
      )}

      {/* ══ CAPABILITIES ══════════════════════════════════════════════════════ */}
      {sect === 'capabilities' && (
        <SectionCard
          title="Core Capabilities"
          subtitle="The three capability items listed to the right of the sector image."
          action={<SaveBtn saving={saving === `${vid}-cap`} saved={saved === `${vid}-cap`} label="Save" onClick={() => saveCapabilities(vid)} />}
        >
          <div className="space-y-2">
            {caps.map((cap, i) => (
              <AccRow key={i} label={cap.title_en || `Capability ${i + 1}`} index={i}
                expanded={expCap === i} onToggle={() => setExpCap(expCap === i ? null : i)}
                onDelete={caps.length > 1 ? () => { delCap(vid, i); setExpCap(null) } : undefined}>
                <R2>
                  <F label="Title (EN)"><input style={inp} value={cap.title_en} onChange={e => updCap(vid, i, 'title_en', e.target.value)} /></F>
                  <F label="Title (AR)"><input style={ar}  value={cap.title_ar} onChange={e => updCap(vid, i, 'title_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Description (EN)"><textarea rows={2} style={ta}   value={cap.desc_en} onChange={e => updCap(vid, i, 'desc_en', e.target.value)} /></F>
                  <F label="Description (AR)"><textarea rows={2} style={taAr} value={cap.desc_ar} onChange={e => updCap(vid, i, 'desc_ar', e.target.value)} /></F>
                </R2>
              </AccRow>
            ))}
          </div>
          <AddBtn label="Add Capability" onClick={() => addCap(vid)} />
        </SectionCard>
      )}

      {/* ══ PROJECTS ══════════════════════════════════════════════════════════ */}
      {sect === 'projects' && (
        <SectionCard
          title="Selected Projects"
          subtitle="Project cards shown in the portfolio grid. Clicking a card opens the detail drawer."
          action={<SaveBtn saving={saving === `${vid}-proj`} saved={saved === `${vid}-proj`} label="Save" onClick={() => saveProjects(vid)} />}
        >
          <div className="space-y-2">
            {prjs.map((proj, i) => (
              <AccRow key={i} label={proj.title_en || `Project ${i + 1}`} index={i}
                expanded={expProj === i} onToggle={() => setExpProj(expProj === i ? null : i)}
                onDelete={() => { delProj(vid, i); setExpProj(null) }}>

                <ImgField value={proj.image} onChange={v2 => updProj(vid, i, 'image', v2)} />

                <R2>
                  <F label="Title (EN)"><input style={inp} value={proj.title_en} onChange={e => updProj(vid, i, 'title_en', e.target.value)} /></F>
                  <F label="Title (AR)"><input style={ar}  value={proj.title_ar} onChange={e => updProj(vid, i, 'title_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Subtitle (EN)"><input style={inp} value={proj.subtitle_en} onChange={e => updProj(vid, i, 'subtitle_en', e.target.value)} placeholder="Mixed-use office & retail" /></F>
                  <F label="Subtitle (AR)"><input style={ar}  value={proj.subtitle_ar} onChange={e => updProj(vid, i, 'subtitle_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Sector (EN)"><input style={inp} value={proj.sector_en} onChange={e => updProj(vid, i, 'sector_en', e.target.value)} placeholder="Commercial Real Estate" /></F>
                  <F label="Sector (AR)"><input style={ar}  value={proj.sector_ar} onChange={e => updProj(vid, i, 'sector_ar', e.target.value)} /></F>
                </R2>
                <R3>
                  <F label="Timeline"><input style={inp} value={proj.timeline} onChange={e => updProj(vid, i, 'timeline', e.target.value)} placeholder="2022–2024" /></F>
                  <F label="Status (EN)"><input style={inp} value={proj.status_en} onChange={e => updProj(vid, i, 'status_en', e.target.value)} placeholder="Completed / Active" /></F>
                  <F label="Status (AR)"><input style={ar}  value={proj.status_ar} onChange={e => updProj(vid, i, 'status_ar', e.target.value)} placeholder="مكتمل / جاري" /></F>
                </R3>
                <R2>
                  <F label="Size (EN)"><input style={inp} value={proj.size_en} onChange={e => updProj(vid, i, 'size_en', e.target.value)} placeholder="12,400 m²" /></F>
                  <F label="Size (AR)"><input style={ar}  value={proj.size_ar} onChange={e => updProj(vid, i, 'size_ar', e.target.value)} placeholder="12,400 م²" /></F>
                </R2>
                <R2>
                  <F label="Location (EN)"><input style={inp} value={proj.location_en} onChange={e => updProj(vid, i, 'location_en', e.target.value)} /></F>
                  <F label="Location (AR)"><input style={ar}  value={proj.location_ar} onChange={e => updProj(vid, i, 'location_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Outcome (EN)"><input style={inp} value={proj.outcome_en} onChange={e => updProj(vid, i, 'outcome_en', e.target.value)} placeholder="94% occupancy in year one" /></F>
                  <F label="Outcome (AR)"><input style={ar}  value={proj.outcome_ar} onChange={e => updProj(vid, i, 'outcome_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Description (EN)"><textarea rows={4} style={ta}   value={proj.description_en} onChange={e => updProj(vid, i, 'description_en', e.target.value)} /></F>
                  <F label="Description (AR)"><textarea rows={4} style={taAr} value={proj.description_ar} onChange={e => updProj(vid, i, 'description_ar', e.target.value)} /></F>
                </R2>
                <R2>
                  <F label="Tags EN (comma-separated)"><input style={inp} value={proj.tags_en} onChange={e => updProj(vid, i, 'tags_en', e.target.value)} placeholder="Commercial, Offices, Retail" /></F>
                  <F label="Tags AR (comma-separated)"><input style={ar}  value={proj.tags_ar} onChange={e => updProj(vid, i, 'tags_ar', e.target.value)} placeholder="تجاري, مكاتب, تجزئة" /></F>
                </R2>

              </AccRow>
            ))}
          </div>
          <AddBtn label="Add Project" onClick={() => addProj(vid)} />
        </SectionCard>
      )}

    </div>
  )
}