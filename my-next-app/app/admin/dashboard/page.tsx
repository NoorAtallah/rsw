'use client'

// ============================================================
// DashboardPage.tsx  —  Main admin dashboard
// Shows CMS stats + ALL financial graphs from Supabase tables:
//   ir_metrics, ir_chart_annual, ir_chart_quarterly, ir_allocation
// ============================================================

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import {
  TrendingUp, TrendingDown, Newspaper, FileText, Users,
  ArrowUpRight, Activity, ChevronRight, RefreshCw
} from 'lucide-react'
import Link from 'next/link'

const supabase = createClient()
const gold     = '#a79370'
const black    = '#000'

// ─── Chart Tooltip ───────────────────────────────────────────
const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: black, border: `1px solid ${gold}`,
      padding: '10px 14px', borderRadius: 4,
      fontFamily: 'Space Mono, monospace', fontSize: 11
    }}>
      <p style={{ color: gold, marginBottom: 6 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: '#fff', margin: '2px 0' }}>
          <span style={{ color: p.color || gold }}>■ </span>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  )
}

// ─── KPI Stat Card ───────────────────────────────────────────
function KpiCard({ label, value, delta, deltaLabel, icon: Icon, href, skeleton }: any) {
  const up   = delta > 0
  const body = (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(167,147,112,0.18)',
        borderRadius: 6, padding: '18px 20px',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: href ? 'pointer' : 'default',
      }}
      onMouseEnter={e => href && Object.assign((e.currentTarget as HTMLElement).style,
        { transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(167,147,112,0.12)' })}
      onMouseLeave={e => href && Object.assign((e.currentTarget as HTMLElement).style,
        { transform: 'none', boxShadow: 'none' })}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(to right, ${gold}, transparent)` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8,
          background: 'rgba(167,147,112,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={15} style={{ color: gold }} strokeWidth={1.5} />
        </div>
        {delta !== undefined && !skeleton && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {up
              ? <TrendingUp size={11} style={{ color: '#5aad76' }} />
              : <TrendingDown size={11} style={{ color: '#e06060' }} />}
            <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
              color: up ? '#5aad76' : '#e06060' }}>
              {up ? '+' : ''}{delta}% {deltaLabel}
            </span>
          </div>
        )}
      </div>

      {skeleton
        ? <div style={{ height: 28, background: 'rgba(167,147,112,0.08)',
            borderRadius: 4, marginBottom: 8 }} />
        : <p style={{ fontSize: 24, fontWeight: 700, color: black, margin: '0 0 4px',
            fontFamily: 'Space Mono, monospace' }}>{value}</p>
      }
      <p style={{ fontSize: 10, color: '#999', margin: 0,
        fontFamily: 'Space Mono, monospace',
        textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
    </div>
  )
  return href
    ? <Link href={href} style={{ textDecoration: 'none' }}>{body}</Link>
    : body
}

// ─── Section header ──────────────────────────────────────────
function SectionHead({ title, sub, href }: { title: string; sub: string; href?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between',
      alignItems: 'flex-end', marginBottom: 14 }}>
      <div>
        <p style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: gold,
          letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 3px' }}>
          {sub}
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 300, color: black, margin: 0,
          fontFamily: 'Playfair Display, serif' }}>{title}</h3>
      </div>
      {href && (
        <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 10, color: gold, fontFamily: 'Space Mono, monospace',
          textDecoration: 'none', letterSpacing: '0.05em' }}>
          Edit data <ArrowUpRight size={11} />
        </Link>
      )}
    </div>
  )
}

function ChartCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#fff',
      border: '1px solid rgba(167,147,112,0.18)',
      borderRadius: 6, padding: '18px 20px', ...style }}>
      {children}
    </div>
  )
}

function ChartLabel({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: gold,
      letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px' }}>
      {text}
    </p>
  )
}

function SkeletonChart() {
  return <div style={{ height: 200, background: 'rgba(167,147,112,0.06)', borderRadius: 4 }} />
}

// ══════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════

export default function DashboardPage() {
  const [user,       setUser]       = useState<any>(null)
  const [role,       setRole]       = useState('manager')
  const [time,       setTime]       = useState(new Date())
  const [loading,    setLoading]    = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // CMS
  const [newsCount,    setNewsCount]    = useState(0)
  const [contentCount, setContentCount] = useState(0)
  const [usersCount,   setUsersCount]   = useState(0)
  const [recentNews,   setRecentNews]   = useState<any[]>([])

  // Financial — all from Supabase
  const [metrics,    setMetrics]    = useState<any[]>([])
  const [annual,     setAnnual]     = useState<any[]>([])
  const [quarterly,  setQuarterly]  = useState<any[]>([])
  const [allocation, setAllocation] = useState<any[]>([])
  const [irSettings, setIrSettings] = useState<any>({})

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => { loadAll() }, [])

  async function loadAll(isRefresh = false) {
    isRefresh ? setRefreshing(true) : setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      const { data: au } = await supabase.from('admin_users').select('role').eq('id', user.id).single()
      setRole(au?.role || 'manager')
    }

    await Promise.all([fetchCMS(), fetchFinancial()])
    isRefresh ? setRefreshing(false) : setLoading(false)
  }

  async function fetchCMS() {
    const [nc, cc, uc, news] = await Promise.all([
      supabase.from('content_arrays').select('*', { count: 'exact', head: true }).eq('section', 'news.items'),
      supabase.from('content').select('*', { count: 'exact', head: true }),
      supabase.from('admin_users').select('*', { count: 'exact', head: true }),
      supabase.from('content_arrays').select('*').eq('section', 'news.items')
        .order('updated_at', { ascending: false }).limit(5),
    ])
    setNewsCount(nc.count || 0)
    setContentCount(cc.count || 0)
    setUsersCount(uc.count || 0)
    setRecentNews(news.data || [])
  }

  async function fetchFinancial() {
    const [ann, qtr, alloc, mets, sets] = await Promise.all([
      supabase.from('ir_chart_annual').select('*').order('period'),
      supabase.from('ir_chart_quarterly').select('*').order('sort_order'),
      supabase.from('ir_allocation').select('*').order('sort_order'),
      supabase.from('ir_metrics').select('*').order('sort_order'),
      supabase.from('ir_settings').select('*').single(),
    ])
    setAnnual(ann.data       || [])
    setQuarterly(qtr.data    || [])
    setAllocation(alloc.data || [])
    setMetrics(mets.data     || [])
    setIrSettings(sets.data  || {})
  }

  const hour     = time.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const lastYr = annual[annual.length - 1]
  const prevYr = annual[annual.length - 2]
  const revYoY = prevYr && lastYr
    ? +(((lastYr.revenue - prevYr.revenue) / prevYr.revenue) * 100).toFixed(1)
    : null

  return (
    <div style={{ maxWidth: 1080, display: 'flex', flexDirection: 'column', gap: 36 }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.85)} }
        @keyframes spin  { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 10, fontFamily: 'Space Mono, monospace', color: gold,
            letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            {greeting}
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 300, color: black, margin: '0 0 8px',
            fontFamily: 'Playfair Display, serif' }}>
            {user?.email?.split('@')[0] || 'Dashboard'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, padding: '2px 10px', borderRadius: 20,
              fontFamily: 'Space Mono, monospace',
              background: role === 'admin' ? 'rgba(167,147,112,0.15)' : 'rgba(0,0,0,0.05)',
              color: role === 'admin' ? gold : '#888' }}>
              {role}
            </span>
            <span style={{ fontSize: 11, color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => loadAll(true)} disabled={refreshing}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
              background: 'transparent', border: '1px solid rgba(167,147,112,0.3)',
              borderRadius: 4, fontSize: 12, color: gold, cursor: 'pointer',
              fontFamily: 'Space Mono, monospace' }}>
            <RefreshCw size={12}
              style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            background: 'rgba(167,147,112,0.06)', border: '1px solid rgba(167,147,112,0.2)',
            borderRadius: 20 }}>
            <div className="pulse"
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#4caf50' }} />
            <span style={{ fontSize: 11, color: '#666', fontFamily: 'Space Mono, monospace' }}>
              Site Live
            </span>
            <a href="/" target="_blank" style={{ color: gold, display: 'flex' }}>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* ── CMS STATS ── */}
      <div>
        <p style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: '#bbb',
          letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Content Overview
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <KpiCard label="News Articles"  value={newsCount}    icon={Newspaper} href="/admin/news"    skeleton={loading} />
          <KpiCard label="Content Fields" value={contentCount} icon={FileText}  href="/admin/content" skeleton={loading} />
          <KpiCard label="Team Members"   value={usersCount}   icon={Users}
            href={role === 'admin' ? '/admin/users' : undefined} skeleton={loading} />
        </div>
      </div>

      {/* ── FINANCIAL KPI CARDS ── */}
      <div>
        <SectionHead title="Key Financial Metrics" sub="Investor Relations" href="/admin/finance" />
        <div style={{ display: 'grid',
          gridTemplateColumns: `repeat(${loading || metrics.length === 0 ? 4 : metrics.length}, 1fr)`,
          gap: 12 }}>
          {loading || metrics.length === 0
            ? [0,1,2,3].map(i => (
                <KpiCard key={i} label="Loading…" value="—" icon={TrendingUp} skeleton />
              ))
            : metrics.map((m: any) => (
                <KpiCard
                  key={m.key}
                  label={m.label_en}
                  value={m.value}
                  delta={m.delta}
                  deltaLabel={m.delta_label}
                  icon={m.delta >= 0 ? TrendingUp : TrendingDown}
                />
              ))
          }
        </div>
      </div>

      {/* ── CHARTS ROW 1: Annual Area + Quarterly Bar ── */}
      <div>
        <SectionHead title="Revenue & Net Income" sub="Annual Performance" href="/admin/finance" />
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>

          <ChartCard>
            <ChartLabel text={`Annual — AED Millions${revYoY !== null ? `   ·   YoY Revenue +${revYoY}%` : ''}`} />
            {loading ? <SkeletonChart /> : (
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={annual} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={gold}    stopOpacity={0.25} />
                      <stop offset="95%" stopColor={gold}    stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#c4aa85" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#c4aa85" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(167,147,112,0.1)" strokeDasharray="3 3" />
                  <XAxis dataKey="period"
                    tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                    axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                    axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue"
                    stroke={gold} strokeWidth={2} fill="url(#gRev)" dot={false} />
                  <Area type="monotone" dataKey="net" name="Net Income"
                    stroke="#c4aa85" strokeWidth={1.5} fill="url(#gNet)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard>
            <ChartLabel text="Quarterly Breakdown" />
            {loading ? <SkeletonChart /> : quarterly.length === 0
              ? <div style={{ height: 210, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <p style={{ color: '#ccc', fontSize: 12, fontFamily: 'Space Mono, monospace' }}>
                    No quarterly data
                  </p>
                  <Link href="/admin/finance"
                    style={{ fontSize: 11, color: gold, fontFamily: 'Space Mono, monospace' }}>
                    Add in Financial Editor →
                  </Link>
                </div>
              : <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={quarterly} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                    barCategoryGap="35%">
                    <CartesianGrid stroke="rgba(167,147,112,0.1)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label"
                      tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                      axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                      axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="revenue" name="Revenue"    fill={gold}    radius={[3,3,0,0]} />
                    <Bar dataKey="net"     name="Net Income" fill="#e8d9c4" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
            }
          </ChartCard>
        </div>
      </div>

      {/* ── CHARTS ROW 2: AUM Line + Donut ── */}
      <div>
        <SectionHead title="Assets & Portfolio Allocation" sub="Portfolio Overview" href="/admin/finance" />
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>

          <ChartCard>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: 14 }}>
              <ChartLabel text="Assets Under Management — AED Millions" />
              {irSettings?.cagr_value && (
                <div style={{ textAlign: 'right', marginTop: -2 }}>
                  <p style={{ fontSize: 9, fontFamily: 'Space Mono, monospace',
                    color: 'rgba(0,0,0,0.35)', margin: '0 0 2px', letterSpacing: '0.1em' }}>
                    {irSettings.cagr_label_en || 'CAGR'}
                  </p>
                  <p style={{ fontSize: 22, fontFamily: 'Space Mono, monospace',
                    color: gold, fontWeight: 700, margin: 0 }}>
                    {irSettings.cagr_value}
                  </p>
                </div>
              )}
            </div>
            {loading ? <SkeletonChart /> : (
              <ResponsiveContainer width="100%" height={195}>
                <LineChart data={annual} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(167,147,112,0.1)" strokeDasharray="3 3" />
                  <XAxis dataKey="period"
                    tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                    axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.4)', fontFamily: 'Space Mono, monospace' }}
                    axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Line type="monotone" dataKey="assets" name="AUM"
                    stroke={gold} strokeWidth={2.5}
                    dot={{ fill: gold, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: gold }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard>
            <ChartLabel text="Portfolio Allocation" />
            {loading ? <SkeletonChart /> : allocation.length === 0
              ? <div style={{ height: 195, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <p style={{ color: '#ccc', fontSize: 12, fontFamily: 'Space Mono, monospace' }}>
                    No allocation data
                  </p>
                  <Link href="/admin/finance"
                    style={{ fontSize: 11, color: gold, fontFamily: 'Space Mono, monospace' }}>
                    Add in Financial Editor →
                  </Link>
                </div>
              : <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ResponsiveContainer width={148} height={148}>
                    <PieChart>
                      <Pie data={allocation} cx="50%" cy="50%"
                        innerRadius={38} outerRadius={62}
                        paddingAngle={3} dataKey="value"
                        startAngle={90} endAngle={-270}>
                        {allocation.map((e: any, i: number) => (
                          <Cell key={i} fill={e.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: any) => [`${v}%`]}
                        contentStyle={{ background: black, border: `1px solid ${gold}`,
                          borderRadius: 4, fontSize: 11, fontFamily: 'Space Mono, monospace' }}
                        itemStyle={{ color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {allocation.map((item: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%',
                          background: item.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.65)',
                          fontFamily: 'Space Mono, monospace', flex: 1,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name_en}
                        </span>
                        <span style={{ fontSize: 10, fontFamily: 'Space Mono, monospace',
                          color: gold, flexShrink: 0 }}>
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
            }
          </ChartCard>
        </div>
      </div>

      {/* ── BOTTOM: Recent News + Quick Links ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14 }}>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: '#bbb',
              letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
              Recent News
            </p>
            <Link href="/admin/news" style={{ display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 10, color: gold, fontFamily: 'Space Mono, monospace', textDecoration: 'none' }}>
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(167,147,112,0.18)',
            borderRadius: 6, overflow: 'hidden' }}>
            {recentNews.length === 0
              ? <div style={{ padding: '36px 20px', textAlign: 'center',
                  color: '#bbb', fontSize: 12, fontFamily: 'Space Mono, monospace' }}>
                  No articles yet
                </div>
              : recentNews.map((a: any, i: number) => (
                  <Link key={i} href="/admin/news" style={{ textDecoration: 'none' }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 12,
                        padding: '11px 16px',
                        borderBottom: i < recentNews.length - 1
                          ? '1px solid rgba(167,147,112,0.08)' : 'none',
                        transition: 'background 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e =>
                        (e.currentTarget as HTMLElement).style.background = 'rgba(167,147,112,0.04)'}
                      onMouseLeave={e =>
                        (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      {a.data_en?.image_url
                        ? <img src={a.data_en.image_url} alt=""
                            style={{ width: 38, height: 38, borderRadius: 5,
                              objectFit: 'cover', flexShrink: 0 }} />
                        : <div style={{ width: 38, height: 38, borderRadius: 5, flexShrink: 0,
                            background: 'rgba(167,147,112,0.1)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center' }}>
                            <Newspaper size={13} style={{ color: gold }} />
                          </div>
                      }
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 500, color: black, margin: '0 0 3px',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {a.data_en?.title || 'Untitled'}
                        </p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <span style={{ fontSize: 9, padding: '1px 7px', borderRadius: 20,
                            background: 'rgba(167,147,112,0.1)', color: gold,
                            fontFamily: 'Space Mono, monospace', textTransform: 'capitalize' }}>
                            {a.data_en?.category || 'news'}
                          </span>
                          <span style={{ fontSize: 9, color: '#bbb',
                            fontFamily: 'Space Mono, monospace' }}>
                            {a.data_en?.date || ''}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={12} style={{ color: '#ddd', flexShrink: 0 }} />
                    </div>
                  </Link>
                ))
            }
          </div>
        </div>

        <div>
          <p style={{ fontSize: 9, fontFamily: 'Space Mono, monospace', color: '#bbb',
            letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 12px' }}>
            Quick Access
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { label: 'News Editor',        href: '/admin/news',               desc: 'Add & manage articles' },
              { label: 'Content Editor',     href: '/admin/content',            desc: 'Edit all page content' },
              { label: 'Investor Relations', href: '/admin/investor-relations', desc: 'Docs & page sections' },
              { label: 'Financial Data',     href: '/admin/finance',          desc: 'Edit charts & KPIs' },
              { label: 'View Live Site',     href: '/',                         desc: 'Opens in new tab' },
            ].map(({ label, href, desc }) => (
              <Link key={href} href={href}
                target={href === '/' ? '_blank' : undefined}
                style={{ textDecoration: 'none' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', background: '#fff',
                    border: '1px solid rgba(167,147,112,0.18)', borderRadius: 6,
                    transition: 'all 0.18s', cursor: 'pointer' }}
                  onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style,
                    { transform: 'translateX(3px)', borderColor: gold })}
                  onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style,
                    { transform: 'none', borderColor: 'rgba(167,147,112,0.18)' })}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: black, margin: '0 0 2px',
                      fontFamily: 'Space Mono, monospace' }}>{label}</p>
                    <p style={{ fontSize: 11, color: '#bbb', margin: 0 }}>{desc}</p>
                  </div>
                  <ChevronRight size={12} style={{ color: '#ccc' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '11px 18px', background: black, borderRadius: 6 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="pulse"
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50' }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Space Mono, monospace' }}>Supabase connected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={10} style={{ color: gold }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Space Mono, monospace' }}>RSW Investment Group CMS</span>
          </div>
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)',
          fontFamily: 'Space Mono, monospace' }}>
          {time.toLocaleDateString('en-US',
            { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

    </div>
  )
}