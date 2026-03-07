'use client'

// ============================================================
// InvestorDashboard.tsx
// Financial dashboard — data pulled from Supabase
//
// Supabase tables:
//   ir_metrics        → KPI cards  (key, value, delta, delta_label)
//   ir_chart_annual   → Annual revenue/net/assets data
//   ir_chart_quarterly→ Quarterly revenue/net data
//   ir_allocation     → Portfolio allocation pie data
//   ir_settings       → Single-row config (cagr_value, cagr_label)
//
// All tables have a `section` column = 'financial_dashboard'
// so you can filter if needed.
// ============================================================

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const gold     = '#a79370'
const black    = '#000000'
const supabase = createClient()

// ─── Types ────────────────────────────────────────────────────

interface Metric {
  key: string
  en: string
  ar: string
  value: string
  delta: number
  delta_label: string
  sort_order: number
}

interface AnnualRow {
  period: string
  revenue: number
  net: number
  assets: number
}

interface QuarterlyRow {
  q: string
  revenue: number
  net: number
}

interface AllocationRow {
  name_en: string
  name_ar: string
  value: number
  color: string
  sort_order: number
}

interface Settings {
  cagr_value: string
  cagr_label_en: string
  cagr_label_ar: string
  footnote_en: string
  footnote_ar: string
  section_title_en: string
  section_title_ar: string
  section_subtitle_en: string
  section_subtitle_ar: string
}

const defaultSettings: Settings = {
  cagr_value: '+23.5%',
  cagr_label_en: 'CAGR',
  cagr_label_ar: 'معدل النمو السنوي المركب',
  footnote_en: '* Financial data represents indicative targets and is subject to audit review. Figures are rounded.',
  footnote_ar: '* البيانات المالية تمثل أهدافاً إرشادية وتخضع للمراجعة. الأرقام مقربة.',
  section_title_en: 'Financial Performance & Key Metrics',
  section_title_ar: 'الأداء المالي والمقاييس الرئيسية',
  section_subtitle_en: 'Financial Dashboard',
  section_subtitle_ar: 'لوحة المعلومات المالية',
}

// ─── Fallback data (shown if DB is empty) ────────────────────

const fallbackAnnual: AnnualRow[] = [
  { period: '2020', revenue: 420, net: 68,  assets: 1200 },
  { period: '2021', revenue: 530, net: 95,  assets: 1480 },
  { period: '2022', revenue: 680, net: 134, assets: 1820 },
  { period: '2023', revenue: 810, net: 172, assets: 2250 },
  { period: '2024', revenue: 965, net: 218, assets: 2790 },
]

const fallbackQuarterly: QuarterlyRow[] = [
  { q: "Q1 '24", revenue: 221, net: 46 },
  { q: "Q2 '24", revenue: 238, net: 54 },
  { q: "Q3 '24", revenue: 249, net: 59 },
  { q: "Q4 '24", revenue: 257, net: 59 },
]

const fallbackAllocation: AllocationRow[] = [
  { name_en: 'Real Estate',    name_ar: 'العقارات',       value: 38, color: gold,      sort_order: 0 },
  { name_en: 'Private Equity', name_ar: 'الأسهم الخاصة', value: 28, color: '#c4aa85', sort_order: 1 },
  { name_en: 'Fixed Income',   name_ar: 'الدخل الثابت',  value: 19, color: '#d4bfa0', sort_order: 2 },
  { name_en: 'Liquid Assets',  name_ar: 'الأصول السائلة',value: 15, color: '#e8d9c4', sort_order: 3 },
]

const fallbackMetrics: Metric[] = [
  { key: 'aum',    en: 'AUM',        ar: 'الأصول المُدارة',   value: 'AED 2.79B', delta: 12.3, delta_label: 'YoY', sort_order: 0 },
  { key: 'rev',    en: 'Revenue',    ar: 'الإيرادات',         value: 'AED 965M',  delta: 19.1, delta_label: 'YoY', sort_order: 1 },
  { key: 'net',    en: 'Net Income', ar: 'صافي الدخل',        value: 'AED 218M',  delta: 26.7, delta_label: 'YoY', sort_order: 2 },
  { key: 'margin', en: 'Net Margin', ar: 'هامش الربح الصافي', value: '22.6%',     delta: 1.4,  delta_label: 'pts', sort_order: 3 },
]

// ─── Tooltip ──────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: black, border: `1px solid ${gold}`, padding: '10px 14px', borderRadius: 4 }}>
      <p style={{ color: gold, fontSize: 11, fontFamily: 'Space Mono, monospace', marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: '#fff', fontSize: 12, margin: '2px 0' }}>
          <span style={{ color: p.color || gold }}>■ </span>{p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

// ─── Pill ─────────────────────────────────────────────────────

const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 16px', fontSize: 11,
      fontFamily: 'Space Mono, monospace',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      background: active ? gold : 'transparent',
      color: active ? black : 'rgba(0,0,0,0.5)',
      border: `1px solid ${active ? gold : 'rgba(167,147,112,0.3)'}`,
      borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s',
    }}
  >{label}</button>
)

// ─── Main Component ────────────────────────────────────────────

const InvestorDashboard = ({ locale = 'en', isRTL = false }) => {
  const ar = locale === 'ar'
  const [activeChart, setActiveChart] = useState('annual')
  const [loading, setLoading] = useState(true)

  const [metrics,    setMetrics]    = useState<Metric[]>(fallbackMetrics)
  const [annual,     setAnnual]     = useState<AnnualRow[]>(fallbackAnnual)
  const [quarterly,  setQuarterly]  = useState<QuarterlyRow[]>(fallbackQuarterly)
  const [allocation, setAllocation] = useState<AllocationRow[]>(fallbackAllocation)
  const [settings,   setSettings]   = useState<Settings>(defaultSettings)

  // ── Fetch all dashboard data ──
  useEffect(() => {
    async function load() {
      setLoading(true)
      await Promise.all([
        fetchMetrics(),
        fetchAnnual(),
        fetchQuarterly(),
        fetchAllocation(),
        fetchSettings(),
      ])
      setLoading(false)
    }
    load()
  }, [])

  async function fetchMetrics() {
    const { data } = await supabase
      .from('ir_metrics')
      .select('*')
      .order('sort_order')
    if (data?.length) {
      setMetrics(data.map(r => ({
        key:         r.key,
        en:          r.label_en,
        ar:          r.label_ar,
        value:       r.value,
        delta:       r.delta,
        delta_label: r.delta_label,
        sort_order:  r.sort_order,
      })))
    }
  }

  async function fetchAnnual() {
    const { data } = await supabase
      .from('ir_chart_annual')
      .select('*')
      .order('period')
    if (data?.length) {
      setAnnual(data.map(r => ({
        period:  r.period,
        revenue: r.revenue,
        net:     r.net,
        assets:  r.assets,
      })))
    }
  }

  async function fetchQuarterly() {
    const { data } = await supabase
      .from('ir_chart_quarterly')
      .select('*')
      .order('sort_order')
    if (data?.length) {
      setQuarterly(data.map(r => ({
        q:       r.label,
        revenue: r.revenue,
        net:     r.net,
      })))
    }
  }

  async function fetchAllocation() {
    const { data } = await supabase
      .from('ir_allocation')
      .select('*')
      .order('sort_order')
    if (data?.length) {
      setAllocation(data.map(r => ({
        name_en:    r.name_en,
        name_ar:    r.name_ar,
        value:      r.value,
        color:      r.color,
        sort_order: r.sort_order,
      })))
    }
  }

  async function fetchSettings() {
    const { data } = await supabase
      .from('ir_settings')
      .select('*')
      .single()
    if (data) {
      setSettings({
        cagr_value:         data.cagr_value         ?? defaultSettings.cagr_value,
        cagr_label_en:      data.cagr_label_en      ?? defaultSettings.cagr_label_en,
        cagr_label_ar:      data.cagr_label_ar      ?? defaultSettings.cagr_label_ar,
        footnote_en:        data.footnote_en        ?? defaultSettings.footnote_en,
        footnote_ar:        data.footnote_ar        ?? defaultSettings.footnote_ar,
        section_title_en:   data.section_title_en   ?? defaultSettings.section_title_en,
        section_title_ar:   data.section_title_ar   ?? defaultSettings.section_title_ar,
        section_subtitle_en:data.section_subtitle_en?? defaultSettings.section_subtitle_en,
        section_subtitle_ar:data.section_subtitle_ar?? defaultSettings.section_subtitle_ar,
      })
    }
  }

  // ── Skeleton loader ──
  if (loading) {
    return (
      <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center h-64">
            <Loader2 size={28} className="animate-spin" style={{ color: gold }} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 lg:py-32" style={{ background: '#fafafa' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* ── Section Header ── */}
        <div className={`mb-16 ${isRTL ? 'text-right' : ''}`}>
          <div style={{ color: gold, fontSize: 10, fontFamily: 'Space Mono, monospace',
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            {ar ? settings.section_subtitle_ar : settings.section_subtitle_en}
          </div>
          <h2 style={{ color: black, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 300,
            letterSpacing: '-0.01em',
            fontFamily: ar ? 'Tajawal, sans-serif' : 'Playfair Display, serif',
            lineHeight: 1.2 }}>
            {ar ? settings.section_title_ar : settings.section_title_en}
          </h2>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, i) => {
            const up   = m.delta > 0
            const Icon = up ? TrendingUp : m.delta < 0 ? TrendingDown : Minus
            return (
              <motion.div key={m.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                style={{ background: '#fff', border: '1px solid rgba(167,147,112,0.2)',
                  padding: '20px', position: 'relative', overflow: 'hidden',
                  direction: isRTL ? 'rtl' : 'ltr' }}>

                {/* gold top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(to right, ${gold}, transparent)` }} />

                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
                  color: 'rgba(0,0,0,0.4)', letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginBottom: 10 }}>
                  {ar ? m.ar : m.en}
                </div>
                <div style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 600,
                  color: black,
                  fontFamily: ar ? 'Cairo, sans-serif' : 'Space Mono, monospace',
                  marginBottom: 10 }}>
                  {m.value}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon size={13} style={{ color: up ? '#5aad76' : '#e06060' }} />
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace',
                    color: up ? '#5aad76' : '#e06060' }}>
                    {up ? '+' : ''}{m.delta}% {m.delta_label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Charts Row ── */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Revenue / Income AreaChart */}
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ background: '#fff', border: '1px solid rgba(167,147,112,0.2)', padding: '24px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: 20,
              flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
                  color: gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {ar ? 'الإيرادات وصافي الدخل' : 'Revenue & Net Income'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)',
                  fontFamily: ar ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif' }}>
                  {ar ? 'بالمليون درهم إماراتي' : 'AED Millions'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Pill label={ar ? 'سنوي' : 'Annual'}    active={activeChart === 'annual'}    onClick={() => setActiveChart('annual')} />
                <Pill label={ar ? 'ربعي' : 'Quarterly'} active={activeChart === 'quarterly'} onClick={() => setActiveChart('quarterly')} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeChart}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart
                    data={activeChart === 'annual' ? annual : quarterly}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={gold}      stopOpacity={0.25} />
                        <stop offset="95%" stopColor={gold}      stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#c4aa85" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#c4aa85" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(167,147,112,0.1)" strokeDasharray="3 3" />
                    <XAxis dataKey={activeChart === 'annual' ? 'period' : 'q'}
                      tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                      axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                      axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue"
                      name={ar ? 'الإيرادات' : 'Revenue'}
                      stroke={gold} strokeWidth={2} fill="url(#revGrad)" dot={false} />
                    <Area type="monotone" dataKey="net"
                      name={ar ? 'صافي الدخل' : 'Net Income'}
                      stroke="#c4aa85" strokeWidth={1.5} fill="url(#netGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Portfolio Allocation Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ background: '#fff', border: '1px solid rgba(167,147,112,0.2)', padding: '24px' }}>

            <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
              color: gold, letterSpacing: '0.2em', textTransform: 'uppercase',
              marginBottom: 4, textAlign: isRTL ? 'right' : 'left' }}>
              {ar ? 'توزيع المحفظة' : 'Portfolio Allocation'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)',
              fontFamily: ar ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif',
              marginBottom: 16, textAlign: isRTL ? 'right' : 'left' }}>
              {ar ? 'بالنسبة المئوية' : 'By Asset Class'}
            </div>

            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={allocation} cx="50%" cy="50%"
                  innerRadius={52} outerRadius={80}
                  paddingAngle={3} dataKey="value"
                  startAngle={90} endAngle={-270}>
                  {allocation.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{ background: black, border: `1px solid ${gold}`,
                    borderRadius: 4, fontFamily: 'Space Mono, monospace', fontSize: 11 }}
                  itemStyle={{ color: '#fff' }} labelStyle={{ color: gold }} />
              </PieChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {allocation.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8,
                  justifyContent: isRTL ? 'flex-end' : 'flex-start',
                  flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%',
                    background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.65)',
                    fontFamily: ar ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif',
                    flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                    {ar ? item.name_ar : item.name_en}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'Space Mono, monospace', color: gold }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── AUM Growth Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          style={{ background: '#fff', border: '1px solid rgba(167,147,112,0.2)',
            padding: '24px', marginTop: 8 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 20,
            flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
              <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
                color: gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                {ar ? 'نمو الأصول المُدارة' : 'Assets Under Management Growth'}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)',
                fontFamily: ar ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif' }}>
                {ar ? `${annual[0]?.period ?? ''} – ${annual[annual.length - 1]?.period ?? ''} • بالمليار درهم`
                    : `${annual[0]?.period ?? ''} – ${annual[annual.length - 1]?.period ?? ''} • AED Billions`}
              </div>
            </div>
            <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
              <div style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
                color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em' }}>
                {ar ? settings.cagr_label_ar : settings.cagr_label_en}
              </div>
              <div style={{ fontSize: 22, fontFamily: 'Space Mono, monospace',
                color: gold, fontWeight: 700 }}>
                {settings.cagr_value}
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={annual}
              margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
              barCategoryGap="30%">
              <CartesianGrid stroke="rgba(167,147,112,0.1)"
                strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="period"
                tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="assets" name={ar ? 'الأصول المُدارة' : 'AUM'}
                radius={[2, 2, 0, 0]}>
                {annual.map((_, idx) => (
                  <Cell key={idx}
                    fill={idx === annual.length - 1 ? gold : 'rgba(167,147,112,0.35)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Footnote ── */}
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', marginTop: 16,
          fontFamily: ar ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif',
          textAlign: isRTL ? 'right' : 'left' }}>
          {ar ? settings.footnote_ar : settings.footnote_en}
        </p>
      </div>
    </section>
  )
}

export default InvestorDashboard