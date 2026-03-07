'use client'

// ============================================================
// FinancialDashboardEditor.tsx
// Full admin editor for the Investor Relations financial data.
// Tabs: KPI Metrics | Annual Data | Quarterly Data |
//       Portfolio Allocation | Dashboard Settings
// ============================================================

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Loader2, Plus, Trash2, Save, TrendingUp,
  TrendingDown, BarChart2, PieChart, Settings,
  ChevronUp, ChevronDown, RefreshCw, CheckCircle2
} from 'lucide-react'

const gold      = '#a79370'
const goldLight = 'rgba(167,147,112,0.1)'
const supabase  = createClient()

// ─── Shared styles ─────────────────────────────────────────────

const input: React.CSSProperties = {
  width: '100%', padding: '9px 12px',
  border: '1px solid rgba(167,147,112,0.3)',
  background: '#faf9f6', borderRadius: 4,
  fontSize: 13, color: '#000', outline: 'none',
}

const label: React.CSSProperties = {
  display: 'block', fontSize: 10,
  fontFamily: 'Space Mono, monospace',
  color: '#999', marginBottom: 5,
  textTransform: 'uppercase', letterSpacing: '0.08em',
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(167,147,112,0.2)',
  borderRadius: 4, padding: '20px',
}

const goldBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  padding: '9px 18px', background: gold, color: '#fff',
  border: 'none', borderRadius: 4, fontSize: 13,
  fontWeight: 500, cursor: 'pointer',
}

const ghostBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7,
  padding: '8px 14px', background: 'transparent', color: gold,
  border: `1px solid rgba(167,147,112,0.4)`,
  borderRadius: 4, fontSize: 12, cursor: 'pointer',
}

const dangerBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '6px 10px', background: 'transparent',
  color: '#ccc', border: 'none', cursor: 'pointer', borderRadius: 4,
}

// ─── Types ─────────────────────────────────────────────────────

interface Metric {
  id?: string
  key: string
  label_en: string
  label_ar: string
  value: string
  delta: number
  delta_label: string
  sort_order: number
}

interface AnnualRow {
  id?: string
  period: string
  revenue: number
  net: number
  assets: number
}

interface QuarterlyRow {
  id?: string
  label: string
  revenue: number
  net: number
  sort_order: number
}

interface AllocationRow {
  id?: string
  name_en: string
  name_ar: string
  value: number
  color: string
  sort_order: number
}

interface DashSettings {
  id?: string
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

// ─── Tab types ──────────────────────────────────────────────────
type Tab = 'metrics' | 'annual' | 'quarterly' | 'allocation' | 'settings'

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'metrics',    label: 'KPI Cards',    icon: TrendingUp  },
  { id: 'annual',     label: 'Annual Data',  icon: BarChart2   },
  { id: 'quarterly',  label: 'Quarterly',    icon: BarChart2   },
  { id: 'allocation', label: 'Portfolio',    icon: PieChart    },
  { id: 'settings',   label: 'Settings',     icon: Settings    },
]

// ─── Toast banner ───────────────────────────────────────────────
function Toast({ show }: { show: boolean }) {
  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 999,
      background: '#000', color: '#fff', borderRadius: 6,
      padding: '12px 20px', fontSize: 13,
      fontFamily: 'Space Mono, monospace',
      border: `1px solid ${gold}`,
      display: 'flex', alignItems: 'center', gap: 8,
      transform: show ? 'translateY(0)' : 'translateY(80px)',
      opacity: show ? 1 : 0,
      transition: 'all 0.3s ease',
      pointerEvents: 'none',
    }}>
      <CheckCircle2 size={14} style={{ color: gold }} />
      Changes saved
    </div>
  )
}

// ─── Reorder helpers ────────────────────────────────────────────
function moveUp<T>(arr: T[], idx: number): T[] {
  if (idx === 0) return arr
  const next = [...arr]
  ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
  return next
}
function moveDown<T>(arr: T[], idx: number): T[] {
  if (idx === arr.length - 1) return arr
  const next = [...arr]
  ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
  return next
}

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════

export default function FinancialDashboardEditor() {
  const [tab, setTab]         = useState<Tab>('metrics')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [toast, setToast]     = useState(false)

  const [metrics,    setMetrics]    = useState<Metric[]>([])
  const [annual,     setAnnual]     = useState<AnnualRow[]>([])
  const [quarterly,  setQuarterly]  = useState<QuarterlyRow[]>([])
  const [allocation, setAllocation] = useState<AllocationRow[]>([])
  const [settings,   setSettings]   = useState<DashSettings>({
    cagr_value: '+23.5%',
    cagr_label_en: 'CAGR',
    cagr_label_ar: 'معدل النمو السنوي المركب',
    footnote_en: '* Financial data represents indicative targets and is subject to audit review. Figures are rounded.',
    footnote_ar: '* البيانات المالية تمثل أهدافاً إرشادية وتخضع للمراجعة. الأرقام مقربة.',
    section_title_en: 'Financial Performance & Key Metrics',
    section_title_ar: 'الأداء المالي والمقاييس الرئيسية',
    section_subtitle_en: 'Financial Dashboard',
    section_subtitle_ar: 'لوحة المعلومات المالية',
  })

  useEffect(() => { fetchAll() }, [])

  function showToast() {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  // ── Fetch ────────────────────────────────────────────────────

  async function fetchAll() {
    setLoading(true)
    await Promise.all([
      fetchMetrics(), fetchAnnual(), fetchQuarterly(),
      fetchAllocation(), fetchSettings()
    ])
    setLoading(false)
  }

  async function fetchMetrics() {
    const { data } = await supabase.from('ir_metrics').select('*').order('sort_order')
    if (data?.length) setMetrics(data)
  }

  async function fetchAnnual() {
    const { data } = await supabase.from('ir_chart_annual').select('*').order('period')
    if (data?.length) setAnnual(data)
  }

  async function fetchQuarterly() {
    const { data } = await supabase.from('ir_chart_quarterly').select('*').order('sort_order')
    if (data?.length) setQuarterly(data)
  }

  async function fetchAllocation() {
    const { data } = await supabase.from('ir_allocation').select('*').order('sort_order')
    if (data?.length) setAllocation(data)
  }

  async function fetchSettings() {
    const { data } = await supabase.from('ir_settings').select('*').single()
    if (data) setSettings(data)
  }

  // ── Save ─────────────────────────────────────────────────────

  async function saveMetrics() {
    setSaving(true)
    for (let i = 0; i < metrics.length; i++) {
      const m = { ...metrics[i], sort_order: i }
      if (m.id) {
        await supabase.from('ir_metrics').update(m).eq('id', m.id)
      } else {
        const { data } = await supabase.from('ir_metrics').insert(m).select().single()
        if (data) metrics[i] = data
      }
    }
    setSaving(false)
    showToast()
    fetchMetrics()
  }

  async function saveAnnual() {
    setSaving(true)
    for (const row of annual) {
      if (row.id) {
        await supabase.from('ir_chart_annual').update(row).eq('id', row.id)
      } else {
        const { data } = await supabase.from('ir_chart_annual').insert(row).select().single()
        if (data) annual[annual.indexOf(row)] = data
      }
    }
    setSaving(false)
    showToast()
    fetchAnnual()
  }

  async function saveQuarterly() {
    setSaving(true)
    for (let i = 0; i < quarterly.length; i++) {
      const row = { ...quarterly[i], sort_order: i }
      if (row.id) {
        await supabase.from('ir_chart_quarterly').update(row).eq('id', row.id)
      } else {
        const { data } = await supabase.from('ir_chart_quarterly').insert(row).select().single()
        if (data) quarterly[i] = data
      }
    }
    setSaving(false)
    showToast()
    fetchQuarterly()
  }

  async function saveAllocation() {
    setSaving(true)
    for (let i = 0; i < allocation.length; i++) {
      const row = { ...allocation[i], sort_order: i }
      if (row.id) {
        await supabase.from('ir_allocation').update(row).eq('id', row.id)
      } else {
        const { data } = await supabase.from('ir_allocation').insert(row).select().single()
        if (data) allocation[i] = data
      }
    }
    setSaving(false)
    showToast()
    fetchAllocation()
  }

  async function saveSettings() {
    setSaving(true)
    if (settings.id) {
      await supabase.from('ir_settings').update(settings).eq('id', settings.id)
    } else {
      const { data } = await supabase.from('ir_settings').insert(settings).select().single()
      if (data) setSettings(data)
    }
    setSaving(false)
    showToast()
  }

  // ── Delete helpers ───────────────────────────────────────────

  async function deleteRow(table: string, id: string) {
    await supabase.from(table).delete().eq('id', id)
  }

  // ── Loading ──────────────────────────────────────────────────

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 240 }}>
      <Loader2 size={26} className="animate-spin" style={{ color: gold }} />
    </div>
  )

  // ── Save fn map ──────────────────────────────────────────────
  const saveFns: Record<Tab, () => void> = {
    metrics:    saveMetrics,
    annual:     saveAnnual,
    quarterly:  saveQuarterly,
    allocation: saveAllocation,
    settings:   saveSettings,
  }

  return (
    <div className="max-w-4xl">
      <Toast show={toast} />

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: gold,
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>
            Editing
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: '#000',
            fontFamily: 'Playfair Display, serif', marginBottom: 4 }}>
            Financial Dashboard
          </h2>
          <p style={{ fontSize: 12, color: '#999' }}>
            Manage KPIs, chart data, portfolio allocation & display settings
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={fetchAll} style={ghostBtn}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button onClick={saveFns[tab]} disabled={saving} style={goldBtn}>
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 28,
        borderBottom: '1px solid rgba(167,147,112,0.2)', paddingBottom: 0 }}>
        {TABS.map(({ id, label: lbl, icon: Icon }) => {
          const active = tab === id
          return (
            <button key={id} onClick={() => setTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 16px', background: 'transparent',
                border: 'none', borderBottom: active ? `2px solid ${gold}` : '2px solid transparent',
                color: active ? gold : '#999',
                fontSize: 12, fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', marginBottom: -1,
                transition: 'all 0.15s',
              }}>
              <Icon size={13} />
              {lbl}
            </button>
          )
        })}
      </div>

      {/* ══════════════════════════════════
          TAB: KPI METRICS
      ══════════════════════════════════ */}
      {tab === 'metrics' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#999' }}>
              These appear as the 4 summary cards above the charts.
            </p>
            <button style={ghostBtn} onClick={() =>
              setMetrics(prev => [...prev, {
                key: '', label_en: '', label_ar: '',
                value: '', delta: 0, delta_label: 'YoY',
                sort_order: prev.length
              }])
            }>
              <Plus size={13} /> Add Metric
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {metrics.map((m, i) => (
              <div key={m.id || i} style={card}>
                {/* Top bar */}
                <div style={{ display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: goldLight,
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {m.delta >= 0
                        ? <TrendingUp size={14} style={{ color: gold }} />
                        : <TrendingDown size={14} style={{ color: '#e06060' }} />
                      }
                    </div>
                    <span style={{ fontFamily: 'Space Mono, monospace',
                      fontSize: 12, color: '#000' }}>
                      {m.label_en || 'New Metric'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={dangerBtn}
                      onClick={() => setMetrics(prev => moveUp(prev, i))}>
                      <ChevronUp size={14} />
                    </button>
                    <button style={dangerBtn}
                      onClick={() => setMetrics(prev => moveDown(prev, i))}>
                      <ChevronDown size={14} />
                    </button>
                    {m.id && (
                      <button style={{ ...dangerBtn, color: '#e06060' }}
                        onClick={async () => {
                          if (!confirm('Delete this metric?')) return
                          await deleteRow('ir_metrics', m.id!)
                          setMetrics(prev => prev.filter((_, j) => j !== i))
                        }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={label}>Key (unique)</label>
                    <input value={m.key} style={input}
                      onChange={e => setMetrics(prev => prev.map((x, j) =>
                        j === i ? { ...x, key: e.target.value } : x))} />
                  </div>
                  <div>
                    <label style={label}>Displayed Value</label>
                    <input value={m.value} style={input}
                      placeholder="AED 2.79B"
                      onChange={e => setMetrics(prev => prev.map((x, j) =>
                        j === i ? { ...x, value: e.target.value } : x))} />
                  </div>
                  <div>
                    <label style={label}>Delta %</label>
                    <input type="number" value={m.delta} style={input}
                      onChange={e => setMetrics(prev => prev.map((x, j) =>
                        j === i ? { ...x, delta: parseFloat(e.target.value) || 0 } : x))} />
                  </div>
                  <div>
                    <label style={label}>Delta Label</label>
                    <input value={m.delta_label} style={input}
                      placeholder="YoY"
                      onChange={e => setMetrics(prev => prev.map((x, j) =>
                        j === i ? { ...x, delta_label: e.target.value } : x))} />
                  </div>
                  <div>
                    <label style={label}>Label (EN)</label>
                    <input value={m.label_en} style={input}
                      onChange={e => setMetrics(prev => prev.map((x, j) =>
                        j === i ? { ...x, label_en: e.target.value } : x))} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={label}>Label (AR)</label>
                    <input value={m.label_ar} dir="rtl" style={{ ...input, fontFamily: 'Tajawal, sans-serif' }}
                      onChange={e => setMetrics(prev => prev.map((x, j) =>
                        j === i ? { ...x, label_ar: e.target.value } : x))} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: ANNUAL DATA
      ══════════════════════════════════ */}
      {tab === 'annual' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#999' }}>
              Drives the Revenue/Net Income area chart and the AUM bar chart.
              All figures in AED Millions (or as labelled in Settings).
            </p>
            <button style={ghostBtn} onClick={() =>
              setAnnual(prev => [...prev, { period: '', revenue: 0, net: 0, assets: 0 }])
            }>
              <Plus size={13} /> Add Year
            </button>
          </div>

          {/* Table header */}
          <div style={{ display: 'grid',
            gridTemplateColumns: '100px 1fr 1fr 1fr 40px',
            gap: 10, padding: '8px 12px', marginBottom: 8 }}>
            {['Year', 'Revenue (M)', 'Net Income (M)', 'Assets Under Mgmt (M)', ''].map(h => (
              <span key={h} style={{ ...label, marginBottom: 0 }}>{h}</span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {annual.map((row, i) => (
              <div key={row.id || i} style={{ ...card, padding: '12px 16px',
                display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 40px',
                gap: 10, alignItems: 'center' }}>
                <input value={row.period} style={{ ...input, fontFamily: 'Space Mono, monospace' }}
                  placeholder="2024"
                  onChange={e => setAnnual(prev => prev.map((x, j) =>
                    j === i ? { ...x, period: e.target.value } : x))} />
                <input type="number" value={row.revenue} style={input}
                  onChange={e => setAnnual(prev => prev.map((x, j) =>
                    j === i ? { ...x, revenue: parseFloat(e.target.value) || 0 } : x))} />
                <input type="number" value={row.net} style={input}
                  onChange={e => setAnnual(prev => prev.map((x, j) =>
                    j === i ? { ...x, net: parseFloat(e.target.value) || 0 } : x))} />
                <input type="number" value={row.assets} style={input}
                  onChange={e => setAnnual(prev => prev.map((x, j) =>
                    j === i ? { ...x, assets: parseFloat(e.target.value) || 0 } : x))} />
                {row.id && (
                  <button style={{ ...dangerBtn, color: '#e06060', padding: 4 }}
                    onClick={async () => {
                      if (!confirm('Delete this year?')) return
                      await deleteRow('ir_chart_annual', row.id!)
                      setAnnual(prev => prev.filter((_, j) => j !== i))
                    }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Summary preview */}
          {annual.length > 0 && (
            <div style={{ marginTop: 20, padding: '14px 16px',
              background: goldLight, borderRadius: 4,
              border: '1px solid rgba(167,147,112,0.2)' }}>
              <p style={{ ...label, marginBottom: 8 }}>Preview — Latest Year</p>
              <div style={{ display: 'flex', gap: 32 }}>
                {[
                  { l: 'Revenue', v: annual[annual.length - 1]?.revenue },
                  { l: 'Net Income', v: annual[annual.length - 1]?.net },
                  { l: 'AUM', v: annual[annual.length - 1]?.assets },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <p style={{ fontSize: 10, color: '#999', fontFamily: 'Space Mono, monospace',
                      textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{l}</p>
                    <p style={{ fontSize: 20, fontFamily: 'Space Mono, monospace', color: gold, fontWeight: 700 }}>
                      {v?.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: QUARTERLY DATA
      ══════════════════════════════════ */}
      {tab === 'quarterly' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#999' }}>
              Appears when toggling to "Quarterly" on the Revenue chart.
            </p>
            <button style={ghostBtn} onClick={() =>
              setQuarterly(prev => [...prev, {
                label: '', revenue: 0, net: 0, sort_order: prev.length
              }])
            }>
              <Plus size={13} /> Add Quarter
            </button>
          </div>

          <div style={{ display: 'grid',
            gridTemplateColumns: '130px 1fr 1fr 40px 40px 40px',
            gap: 10, padding: '8px 12px', marginBottom: 8 }}>
            {["Quarter Label", "Revenue (M)", "Net Income (M)", '', '', ''].map((h, i) => (
              <span key={i} style={{ ...label, marginBottom: 0 }}>{h}</span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {quarterly.map((row, i) => (
              <div key={row.id || i} style={{ ...card, padding: '12px 16px',
                display: 'grid', gridTemplateColumns: '130px 1fr 1fr 40px 40px 40px',
                gap: 10, alignItems: 'center' }}>
                <input value={row.label} style={{ ...input, fontFamily: 'Space Mono, monospace' }}
                  placeholder="Q1 '25"
                  onChange={e => setQuarterly(prev => prev.map((x, j) =>
                    j === i ? { ...x, label: e.target.value } : x))} />
                <input type="number" value={row.revenue} style={input}
                  onChange={e => setQuarterly(prev => prev.map((x, j) =>
                    j === i ? { ...x, revenue: parseFloat(e.target.value) || 0 } : x))} />
                <input type="number" value={row.net} style={input}
                  onChange={e => setQuarterly(prev => prev.map((x, j) =>
                    j === i ? { ...x, net: parseFloat(e.target.value) || 0 } : x))} />
                <button style={dangerBtn}
                  onClick={() => setQuarterly(prev => moveUp(prev, i))}>
                  <ChevronUp size={14} />
                </button>
                <button style={dangerBtn}
                  onClick={() => setQuarterly(prev => moveDown(prev, i))}>
                  <ChevronDown size={14} />
                </button>
                {row.id && (
                  <button style={{ ...dangerBtn, color: '#e06060' }}
                    onClick={async () => {
                      if (!confirm('Delete this quarter?')) return
                      await deleteRow('ir_chart_quarterly', row.id!)
                      setQuarterly(prev => prev.filter((_, j) => j !== i))
                    }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: PORTFOLIO ALLOCATION
      ══════════════════════════════════ */}
      {tab === 'allocation' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 12, color: '#999' }}>
              Drives the donut/pie chart. Values should add up to 100%.
            </p>
            <button style={ghostBtn} onClick={() =>
              setAllocation(prev => [...prev, {
                name_en: '', name_ar: '', value: 0,
                color: '#a79370', sort_order: prev.length
              }])
            }>
              <Plus size={13} /> Add Slice
            </button>
          </div>

          {/* Total indicator */}
          {(() => {
            const total = allocation.reduce((s, a) => s + Number(a.value), 0)
            const ok    = total === 100
            return (
              <div style={{ marginBottom: 16, padding: '10px 14px',
                background: ok ? 'rgba(90,173,118,0.08)' : 'rgba(224,96,96,0.08)',
                borderRadius: 4,
                border: `1px solid ${ok ? 'rgba(90,173,118,0.3)' : 'rgba(224,96,96,0.3)'}`,
                display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18, fontFamily: 'Space Mono, monospace',
                  fontWeight: 700, color: ok ? '#5aad76' : '#e06060' }}>
                  {total}%
                </span>
                <span style={{ fontSize: 12, color: ok ? '#5aad76' : '#e06060' }}>
                  {ok ? 'Total is 100% ✓' : 'Total must equal 100%'}
                </span>
              </div>
            )
          })()}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {allocation.map((row, i) => (
              <div key={row.id || i} style={card}>
                <div style={{ display: 'grid',
                  gridTemplateColumns: '1fr 1fr 80px 60px 120px 80px',
                  gap: 10, alignItems: 'end' }}>

                  <div>
                    <label style={label}>Name (EN)</label>
                    <input value={row.name_en} style={input}
                      placeholder="Real Estate"
                      onChange={e => setAllocation(prev => prev.map((x, j) =>
                        j === i ? { ...x, name_en: e.target.value } : x))} />
                  </div>

                  <div>
                    <label style={label}>Name (AR)</label>
                    <input value={row.name_ar} dir="rtl"
                      style={{ ...input, fontFamily: 'Tajawal, sans-serif' }}
                      placeholder="العقارات"
                      onChange={e => setAllocation(prev => prev.map((x, j) =>
                        j === i ? { ...x, name_ar: e.target.value } : x))} />
                  </div>

                  <div>
                    <label style={label}>Value %</label>
                    <input type="number" value={row.value} style={input}
                      min={0} max={100}
                      onChange={e => setAllocation(prev => prev.map((x, j) =>
                        j === i ? { ...x, value: parseFloat(e.target.value) || 0 } : x))} />
                  </div>

                  {/* Color swatch */}
                  <div>
                    <label style={label}>Color</label>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <input type="color" value={row.color}
                        style={{ width: 36, height: 36, border: 'none',
                          background: 'none', cursor: 'pointer', padding: 0 }}
                        onChange={e => setAllocation(prev => prev.map((x, j) =>
                          j === i ? { ...x, color: e.target.value } : x))} />
                    </div>
                  </div>

                  <div>
                    <label style={label}>Hex Code</label>
                    <input value={row.color} style={input}
                      placeholder="#a79370"
                      onChange={e => setAllocation(prev => prev.map((x, j) =>
                        j === i ? { ...x, color: e.target.value } : x))} />
                  </div>

                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', paddingBottom: 1 }}>
                    <button style={dangerBtn}
                      onClick={() => setAllocation(prev => moveUp(prev, i))}>
                      <ChevronUp size={14} />
                    </button>
                    <button style={dangerBtn}
                      onClick={() => setAllocation(prev => moveDown(prev, i))}>
                      <ChevronDown size={14} />
                    </button>
                    {row.id && (
                      <button style={{ ...dangerBtn, color: '#e06060' }}
                        onClick={async () => {
                          if (!confirm('Delete this slice?')) return
                          await deleteRow('ir_allocation', row.id!)
                          setAllocation(prev => prev.filter((_, j) => j !== i))
                        }}>
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Mini visual bar */}
                <div style={{ marginTop: 10, height: 6, borderRadius: 3,
                  background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 3,
                    width: `${row.value}%`, background: row.color,
                    transition: 'width 0.3s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          TAB: SETTINGS
      ══════════════════════════════════ */}
      {tab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div style={card}>
            <p style={{ ...label, fontSize: 11, marginBottom: 16 }}>Section Heading</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={label}>Eyebrow / Subtitle (EN)</label>
                <input value={settings.section_subtitle_en} style={input}
                  onChange={e => setSettings(p => ({ ...p, section_subtitle_en: e.target.value }))} />
              </div>
              <div>
                <label style={label}>Eyebrow / Subtitle (AR)</label>
                <input value={settings.section_subtitle_ar} dir="rtl"
                  style={{ ...input, fontFamily: 'Tajawal, sans-serif' }}
                  onChange={e => setSettings(p => ({ ...p, section_subtitle_ar: e.target.value }))} />
              </div>
              <div>
                <label style={label}>Main Title (EN)</label>
                <input value={settings.section_title_en} style={input}
                  onChange={e => setSettings(p => ({ ...p, section_title_en: e.target.value }))} />
              </div>
              <div>
                <label style={label}>Main Title (AR)</label>
                <input value={settings.section_title_ar} dir="rtl"
                  style={{ ...input, fontFamily: 'Tajawal, sans-serif' }}
                  onChange={e => setSettings(p => ({ ...p, section_title_ar: e.target.value }))} />
              </div>
            </div>
          </div>

          <div style={card}>
            <p style={{ ...label, fontSize: 11, marginBottom: 16 }}>CAGR Badge (AUM bar chart)</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={label}>CAGR Value</label>
                <input value={settings.cagr_value} style={{ ...input, fontFamily: 'Space Mono, monospace' }}
                  placeholder="+23.5%"
                  onChange={e => setSettings(p => ({ ...p, cagr_value: e.target.value }))} />
              </div>
              <div>
                <label style={label}>CAGR Label (EN)</label>
                <input value={settings.cagr_label_en} style={input}
                  onChange={e => setSettings(p => ({ ...p, cagr_label_en: e.target.value }))} />
              </div>
              <div>
                <label style={label}>CAGR Label (AR)</label>
                <input value={settings.cagr_label_ar} dir="rtl"
                  style={{ ...input, fontFamily: 'Tajawal, sans-serif' }}
                  onChange={e => setSettings(p => ({ ...p, cagr_label_ar: e.target.value }))} />
              </div>
            </div>
          </div>

          <div style={card}>
            <p style={{ ...label, fontSize: 11, marginBottom: 16 }}>Disclaimer / Footnote</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={label}>Footnote (EN)</label>
                <textarea value={settings.footnote_en} rows={4}
                  style={{ ...input, resize: 'vertical' }}
                  onChange={e => setSettings(p => ({ ...p, footnote_en: e.target.value }))} />
              </div>
              <div>
                <label style={label}>Footnote (AR)</label>
                <textarea value={settings.footnote_ar} rows={4} dir="rtl"
                  style={{ ...input, resize: 'vertical', fontFamily: 'Tajawal, sans-serif' }}
                  onChange={e => setSettings(p => ({ ...p, footnote_ar: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
        <button onClick={saveFns[tab]} disabled={saving} style={goldBtn}>
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}