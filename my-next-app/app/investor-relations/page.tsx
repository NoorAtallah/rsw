'use client'

// ============================================================
// InvestorRelationsPage.tsx
// All static text pulled from Supabase content table.
// Documents pulled from content_arrays (section = 'ir.documents').
//
// Supabase content table keys (page = 'investor-relations'):
//   hero_eyebrow_en/ar, hero_title_en/ar, hero_description_en/ar
//   governance_title_en/ar, governance_description_en/ar
//   disclosure_title_en/ar, disclosure_description_en/ar
//   shareholder_title_en/ar, shareholder_description_en/ar
//   performance_title_en/ar, performance_description_en/ar
//   documents_title_en/ar, documents_subtitle_en/ar
//   contact_title_en/ar, contact_description_en/ar
//   contact_button_en/ar, contact_email, contact_phone
//   contact_office_en/ar
// ============================================================

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, FileText, Users, TrendingUp,
  Download, ArrowUpRight, Minus,
  Mail, Phone, Building2, CheckCircle2, Loader2
} from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { createClient } from '@/lib/supabase/client'
import InvestorDashboard from '../components/Investordashboard'

const supabase = createClient()

// ─── Types ────────────────────────────────────────────────────

interface IRContent {
  hero_eyebrow_en: string;  hero_eyebrow_ar: string
  hero_title_en: string;    hero_title_ar: string
  hero_description_en: string; hero_description_ar: string

  governance_title_en: string;   governance_title_ar: string
  governance_description_en: string; governance_description_ar: string

  disclosure_title_en: string;   disclosure_title_ar: string
  disclosure_description_en: string; disclosure_description_ar: string

  shareholder_title_en: string;  shareholder_title_ar: string
  shareholder_description_en: string; shareholder_description_ar: string

  performance_title_en: string;  performance_title_ar: string
  performance_description_en: string; performance_description_ar: string

  documents_title_en: string;    documents_title_ar: string
  documents_subtitle_en: string; documents_subtitle_ar: string

  contact_title_en: string;      contact_title_ar: string
  contact_description_en: string; contact_description_ar: string
  contact_button_en: string;     contact_button_ar: string
  contact_email: string
  contact_phone: string
  contact_office_en: string;     contact_office_ar: string
}

interface IRDocument {
  id: string
  name_en: string
  name_ar: string
  type: string
  size: string
  url: string
}

// ─── Defaults (shown while loading or if DB empty) ────────────

const defaults: IRContent = {
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
  contact_description_en: 'Our Investor Relations team is available to answer your questions.',
  contact_description_ar: 'فريق علاقات المستثمرين لدينا متاح للإجابة على أسئلتكم.',
  contact_button_en: 'Send a Message',
  contact_button_ar: 'أرسل رسالة',
  contact_email: 'ir@rswinvestment.ae',
  contact_phone: '+971 2 612 3456',
  contact_office_en: 'Al Maryah Island, Abu Dhabi Global Market\nAbu Dhabi, United Arab Emirates',
  contact_office_ar: 'جزيرة المارية، سوق أبوظبي العالمي\nأبوظبي، الإمارات العربية المتحدة',
}

const compliance = [
  { abbr: 'SCA',  title_en: 'Securities & Commodities Authority', title_ar: 'هيئة الأوراق المالية والسلع' },
  { abbr: 'DFM',  title_en: 'Dubai Financial Market',             title_ar: 'سوق دبي المالي' },
  { abbr: 'PDPL', title_en: 'Personal Data Protection Law',       title_ar: 'قانون حماية البيانات الشخصية' },
]

// ─── Page ─────────────────────────────────────────────────────

const InvestorRelationsPage = () => {
  const { locale, direction } = useI18n()
  const ar    = locale === 'ar'
  const isRTL = direction === 'rtl'

  const gold  = '#a79370'
  const black = '#000000'

  const [content,   setContent]   = useState<IRContent>(defaults)
  const [documents, setDocuments] = useState<IRDocument[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    async function load() {
      await Promise.all([fetchContent(), fetchDocuments()])
      setLoading(false)
    }
    load()
  }, [])

  // ── Fetch page text ──
  async function fetchContent() {
    const { data } = await supabase
      .from('content')
      .select('key, value')
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

  // ── Fetch documents ──
  async function fetchDocuments() {
    const { data } = await supabase
      .from('content_arrays')
      .select('id, data_en, data_ar, order_index')
      .eq('section', 'ir.documents')
      .order('order_index')

    if (data?.length) {
      setDocuments(data.map(row => ({
        id:      row.id,
        name_en: row.data_en?.name || '',
        name_ar: row.data_ar?.name || '',
        type:    row.data_en?.type || 'PDF',
        size:    row.data_en?.size || '',
        url:     row.data_en?.url  || '#',
      })))
    }
  }

  // Shorthand: get localized field
  const t = (keyEn: keyof IRContent, keyAr: keyof IRContent) =>
    ar ? (content[keyAr] as string) : (content[keyEn] as string)

  const sections = [
    { icon: Shield,    keyBase: 'governance' },
    { icon: FileText,  keyBase: 'disclosure' },
    { icon: Users,     keyBase: 'shareholder' },
    { icon: TrendingUp,keyBase: 'performance' },
  ]

  return (
    <div className="min-h-screen bg-white" dir={direction}>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Tajawal:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;600;700;800&display=swap');
        [dir="ltr"] .ir-title { font-family: 'Playfair Display', serif; }
        [dir="rtl"] .ir-title { font-family: 'Tajawal', sans-serif; }
        [dir="ltr"] .ir-body  { font-family: 'Inter', sans-serif; }
        [dir="rtl"] .ir-body  { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        [dir="ltr"] .ir-mono  { font-family: 'Space Mono', monospace; }
        [dir="rtl"] .ir-mono  { font-family: 'Cairo', sans-serif; font-weight: 700; }
        .image-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px);
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden" style={{ background: black }}>
        <div className="absolute inset-0 image-grain">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
            alt="Investor Relations"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={isRTL ? 'text-right' : ''}
            >
              <div className="mb-8">
                <div className={`ir-mono text-xs uppercase mb-2 ${ar ? '' : 'tracking-[0.3em]'}`}
                  style={{ color: gold }}>
                  {ar ? 'مجموعة RSW للاستثمار' : 'RSW Investment Group'}
                </div>
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="h-px w-12" style={{ background: gold }} />
                  <div className={`ir-mono text-xs ${ar ? '' : 'tracking-widest'}`} style={{ color: gold }}>
                    {t('hero_eyebrow_en', 'hero_eyebrow_ar')}
                  </div>
                </div>
              </div>

              <h1 className="ir-title text-6xl lg:text-8xl font-light text-white mb-8 leading-[1.05]"
                style={{ letterSpacing: '-0.01em' }}>
                {loading
                  ? <span className="opacity-40">...</span>
                  : t('hero_title_en', 'hero_title_ar')
                }
              </h1>

              <div className="max-w-2xl">
                <p className="ir-body text-lg leading-relaxed text-white/90 mb-8">
                  {t('hero_description_en', 'hero_description_ar')}
                </p>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Minus className="w-6 h-6" style={{ color: gold }} strokeWidth={1} />
                  <span className="ir-body text-sm" style={{ color: gold }}>
                    {ar ? 'أبوظبي، الإمارات العربية المتحدة' : 'Abu Dhabi, United Arab Emirates'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2">
            <div className="w-px h-16"
              style={{ background: `linear-gradient(to bottom, ${gold}, transparent)` }} />
          </motion.div>
        </div>
      </section>

      {/* ── GOVERNANCE SECTIONS ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className={`mb-20 ${isRTL ? 'text-right' : ''}`}>
            <div className={`ir-mono text-[10px] uppercase mb-6 ${ar ? '' : 'tracking-[0.3em]'}`}
              style={{ color: gold }}>
              {ar ? 'الإطار التنظيمي' : 'Governance Framework'}
            </div>
            <h2 className="ir-title text-4xl lg:text-5xl font-light mb-6 leading-tight"
              style={{ color: black, letterSpacing: '-0.01em' }}>
              {ar ? 'التزامنا بالشفافية' : 'Our Commitment to Transparency'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
            {sections.map(({ icon: Icon, keyBase }, idx) => (
              <motion.article key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`pb-12 ${isRTL ? 'text-right' : ''}`}
                style={{ borderBottom: '1px solid rgba(167,147,112,0.2)' }}>

                <div className={`flex items-start gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(167,147,112,0.12)' }}>
                    <Icon className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="ir-title text-2xl font-light mb-3" style={{ color: black }}>
                      {t(`${keyBase}_title_en` as any, `${keyBase}_title_ar` as any)}
                    </h3>
                    <p className="ir-body text-base leading-relaxed"
                      style={{ color: 'rgba(0,0,0,0.7)' }}>
                      {t(`${keyBase}_description_en` as any, `${keyBase}_description_ar` as any)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCIAL DASHBOARD ── */}
      <InvestorDashboard locale={locale} isRTL={isRTL} />

      {/* ── DOCUMENTS ── */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className={`mb-16 ${isRTL ? 'text-right' : ''}`}>
            <div className={`ir-mono text-[10px] uppercase mb-4 ${ar ? '' : 'tracking-[0.3em]'}`}
              style={{ color: gold }}>
              {t('documents_title_en', 'documents_title_ar')}
            </div>
            <h2 className="ir-title text-3xl lg:text-4xl font-light mb-3"
              style={{ color: black, letterSpacing: '-0.01em' }}>
              {t('documents_subtitle_en', 'documents_subtitle_ar')}
            </h2>
          </div>

          {documents.length === 0 && !loading ? (
            <p className="ir-body text-sm" style={{ color: 'rgba(0,0,0,0.4)' }}>
              {ar ? 'لا توجد وثائق متاحة حالياً.' : 'No documents available at this time.'}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, idx) => (
                <motion.a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`group flex items-center justify-between p-6 bg-white transition-all duration-300 hover:shadow-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  style={{ border: '1px solid rgba(167,147,112,0.2)', textDecoration: 'none' }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = gold)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(167,147,112,0.2)')}
                >
                  <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(167,147,112,0.12)' }}>
                      <FileText className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="ir-body text-base font-semibold mb-1" style={{ color: black }}>
                        {ar ? doc.name_ar : doc.name_en}
                      </h3>
                      <div className={`ir-mono text-xs ${ar ? '' : 'tracking-wide'}`}
                        style={{ color: 'rgba(0,0,0,0.5)' }}>
                        {doc.type}{doc.size ? ` • ${doc.size}` : ''}
                      </div>
                    </div>
                  </div>
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform"
                    style={{ color: gold }} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
            <div className={`ir-mono text-[10px] uppercase mb-6 ${ar ? '' : 'tracking-[0.3em]'}`}
              style={{ color: gold }}>
              {ar ? 'الامتثال التنظيمي' : 'Regulatory Compliance'}
            </div>
            <h2 className="ir-title text-3xl lg:text-4xl font-light max-w-3xl mx-auto"
              style={{ color: black, letterSpacing: '-0.01em' }}>
              {ar
                ? 'الالتزام الكامل بالمعايير التنظيمية في الإمارات'
                : 'Full Adherence to UAE Regulatory Standards'
              }
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {compliance.map((item, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-8 ${isRTL ? 'text-right' : ''}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ background: 'rgba(167,147,112,0.12)' }}>
                  <CheckCircle2 className="w-7 h-7" style={{ color: gold }} strokeWidth={1.5} />
                </div>
                <div className={`ir-mono text-2xl font-bold mb-2 ${ar ? '' : 'tracking-wide'}`}
                  style={{ color: gold }}>
                  {item.abbr}
                </div>
                <p className="ir-body text-sm" style={{ color: 'rgba(0,0,0,0.7)' }}>
                  {ar ? item.title_ar : item.title_en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className={isRTL ? 'text-right' : ''}>
              <div className={`ir-mono text-[10px] uppercase mb-6 ${ar ? '' : 'tracking-[0.3em]'}`}
                style={{ color: gold }}>
                {ar ? 'اتصل بنا' : 'Contact Us'}
              </div>
              <h2 className="ir-title text-4xl lg:text-5xl font-light mb-6 leading-tight"
                style={{ color: black, letterSpacing: '-0.01em' }}>
                {t('contact_title_en', 'contact_title_ar')}
              </h2>
              <p className="ir-body text-base leading-relaxed mb-8"
                style={{ color: 'rgba(0,0,0,0.7)' }}>
                {t('contact_description_en', 'contact_description_ar')}
              </p>
              <button
                className={`ir-body group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium transition-all hover:shadow-lg hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{ background: gold, color: black }}>
                <span>{t('contact_button_en', 'contact_button_ar')}</span>
                <ArrowUpRight
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>

              {[
                { icon: Mail,      label_en: 'Email',  label_ar: 'البريد الإلكتروني', value: content.contact_email },
                { icon: Phone,     label_en: 'Phone',  label_ar: 'الهاتف',            value: content.contact_phone },
              ].map(({ icon: Icon, label_en, label_ar, value }) => (
                <div key={label_en} className="pb-8"
                  style={{ borderBottom: '1px solid rgba(167,147,112,0.2)' }}>
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                    <div className={`ir-mono text-[9px] uppercase ${ar ? '' : 'tracking-wider'}`}
                      style={{ color: 'rgba(0,0,0,0.5)' }}>
                      {ar ? label_ar : label_en}
                    </div>
                  </div>
                  <div className="ir-body text-base" style={{ color: gold }}>{value}</div>
                </div>
              ))}

              <div>
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Building2 className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                  <div className={`ir-mono text-[9px] uppercase ${ar ? '' : 'tracking-wider'}`}
                    style={{ color: 'rgba(0,0,0,0.5)' }}>
                    {ar ? 'المكتب' : 'Office'}
                  </div>
                </div>
                <div className="ir-body text-base leading-relaxed whitespace-pre-line"
                  style={{ color: gold }}>
                  {t('contact_office_en', 'contact_office_ar')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="py-16 border-t" style={{ borderColor: 'rgba(167,147,112,0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className={`ir-body text-xs leading-relaxed ${isRTL ? 'text-right' : ''}`}
            style={{ color: 'rgba(0,0,0,0.5)' }}>
            {ar
              ? 'إخلاء المسؤولية: المعلومات المقدمة هنا لأغراض إعلامية فقط ولا تشكل عرضاً أو دعوة لشراء أو بيع أي أوراق مالية. يجب على المستثمرين المحتملين إجراء العناية الواجبة الخاصة بهم واستشارة مستشاريهم الماليين والقانونيين قبل اتخاذ أي قرارات استثمارية. الأداء السابق لا يضمن النتائج المستقبلية.'
              : 'Disclaimer: The information provided herein is for informational purposes only and does not constitute an offer or solicitation to buy or sell any securities. Prospective investors should conduct their own due diligence and consult with their financial and legal advisors before making any investment decisions. Past performance does not guarantee future results.'
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default InvestorRelationsPage