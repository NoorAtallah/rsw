'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  FileText, Newspaper, Users, Eye, TrendingUp, Clock,
  ArrowUpRight, Globe, Layout, Image, ChevronRight,
  BarChart2, Activity, Edit3
} from 'lucide-react'
import Link from 'next/link'

const gold = '#a79370'
const cream = '#faf9f6'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string>('manager')
  const [newsCount, setNewsCount] = useState(0)
  const [contentCount, setContentCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [recentNews, setRecentNews] = useState<any[]>([])
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('role')
          .eq('id', user.id)
          .single()
        setRole(adminUser?.role || 'manager')
      }

      // News count
      const { count: nc } = await supabase
        .from('content_arrays')
        .select('*', { count: 'exact', head: true })
        .eq('section', 'news.items')
      setNewsCount(nc || 0)

      // Content fields count
      const { count: cc } = await supabase
        .from('content')
        .select('*', { count: 'exact', head: true })
      setContentCount(cc || 0)

      // Users count
      const { count: uc } = await supabase
        .from('admin_users')
        .select('*', { count: 'exact', head: true })
      setUsersCount(uc || 0)

      // Recent news
      const { data: news } = await supabase
        .from('content_arrays')
        .select('*')
        .eq('section', 'news.items')
        .order('updated_at', { ascending: false })
        .limit(4)
      setRecentNews(news || [])
    }
    load()
  }, [])

  const hour = time.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const stats = [
    { label: 'News Articles', value: newsCount, icon: Newspaper, href: '/admin/news', delta: 'Live' },
    { label: 'Content Fields', value: contentCount, icon: FileText, href: '/admin/content', delta: 'Edited' },
    { label: 'Team Members', value: usersCount, icon: Users, href: role === 'admin' ? '/admin/users' : null, delta: 'Active' },
  ]

  const quickLinks = [
    { label: 'Edit Hero', desc: 'Video, title, CTA buttons', href: '/admin/content', icon: Layout },
    { label: 'Manage News', desc: 'Add or edit articles', href: '/admin/news', icon: Newspaper },
    { label: 'About Section', desc: 'Tabs, divisions, badges', href: '/admin/content', icon: Globe },
    { label: 'Investments', desc: 'Sectors & approach cards', href: '/admin/content', icon: TrendingUp },
    { label: 'Investor Relations', desc: 'Docs & accordion sections', href: '/admin/content', icon: BarChart2 },
    { label: 'Contact & Footer', desc: 'Contact info & links', href: '/admin/content', icon: Edit3 },
  ]

  return (
    <div className="max-w-5xl space-y-8">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');
        .dash-card { transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
        .dash-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(167,147,112,0.15); }
        .pulse-dot { animation: pulse-gold 2s infinite; }
        @keyframes pulse-gold {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>
            {greeting}
          </p>
          <h1 className="text-3xl font-light" style={{ fontFamily: 'Playfair Display, serif', color: '#000' }}>
            {user?.email?.split('@')[0] || 'Welcome'}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="text-[10px] px-2.5 py-0.5 rounded-full capitalize font-medium"
              style={{
                background: role === 'admin' ? 'rgba(167,147,112,0.15)' : 'rgba(0,0,0,0.05)',
                color: role === 'admin' ? gold : '#888',
                fontFamily: 'Space Mono, monospace',
              }}
            >
              {role}
            </span>
            <span className="text-xs" style={{ color: '#bbb' }}>·</span>
            <span className="text-xs" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Live indicator */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: 'rgba(167,147,112,0.08)', border: '1px solid rgba(167,147,112,0.2)' }}
        >
          <div className="pulse-dot w-2 h-2 rounded-full" style={{ background: '#4caf50' }} />
          <span className="text-xs font-medium" style={{ color: '#666', fontFamily: 'Space Mono, monospace' }}>
            Site Live
          </span>
          <a
            href="/"
            target="_blank"
            className="ml-1"
            style={{ color: gold }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const card = (
            <div
              key={i}
              className="dash-card p-6 rounded-xl bg-white"
              style={{ border: '1px solid rgba(167,147,112,0.15)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(167,147,112,0.1)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: gold }} strokeWidth={1.5} />
                </div>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                  style={{ background: 'rgba(167,147,112,0.08)', color: gold, fontFamily: 'Space Mono, monospace' }}
                >
                  {stat.delta}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: '#999', fontFamily: 'Outfit, sans-serif' }}>{stat.label}</p>
            </div>
          )

          return stat.href ? <Link href={stat.href} key={i}>{card}</Link> : <div key={i}>{card}</div>
        })}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-5 gap-6">

        {/* Quick Access — 3 cols */}
        <div className="col-span-3 space-y-3">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
            Quick Access
          </p>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <Link href={link.href} key={i}>
                  <div
                    className="dash-card p-4 rounded-xl bg-white flex items-center gap-3"
                    style={{ border: '1px solid rgba(167,147,112,0.15)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(167,147,112,0.08)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: '#000', fontFamily: 'Outfit, sans-serif' }}>
                        {link.label}
                      </p>
                      <p className="text-[10px] truncate" style={{ color: '#aaa', fontFamily: 'Outfit, sans-serif' }}>
                        {link.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#ccc' }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent News — 2 cols */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
              Recent News
            </p>
            <Link href="/admin/news" className="text-[10px] flex items-center gap-1" style={{ color: gold }}>
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div
            className="rounded-xl overflow-hidden bg-white"
            style={{ border: '1px solid rgba(167,147,112,0.15)' }}
          >
            {recentNews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <Newspaper className="w-8 h-8 mb-3" style={{ color: 'rgba(167,147,112,0.3)' }} />
                <p className="text-xs" style={{ color: '#bbb' }}>No articles yet</p>
                <Link
                  href="/admin/news"
                  className="mt-3 text-xs px-3 py-1.5 rounded-full"
                  style={{ background: gold, color: '#fff' }}
                >
                  Add first article
                </Link>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'rgba(167,147,112,0.08)' }}>
                {recentNews.map((article, i) => (
                  <Link href="/admin/news" key={i}>
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50/30 transition-colors">
                      {article.data_en?.image_url ? (
                        <img
                          src={article.data_en.image_url}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(167,147,112,0.1)' }}
                        >
                          <Image className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: '#000', fontFamily: 'Outfit, sans-serif' }}>
                          {article.data_en?.title || 'Untitled'}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="text-[9px] px-1.5 py-px rounded capitalize"
                            style={{ background: 'rgba(167,147,112,0.1)', color: gold }}
                          >
                            {article.data_en?.category || 'news'}
                          </span>
                          <span className="text-[9px]" style={{ color: '#ccc' }}>
                            {article.data_en?.date || ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM STATUS BAR ── */}
      <div
        className="flex items-center justify-between px-5 py-3 rounded-xl"
        style={{ background: '#000' }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#4caf50' }} />
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace' }}>
              Supabase connected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3" style={{ color: gold }} />
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace' }}>
              RSW Investment Group CMS
            </span>
          </div>
        </div>
        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Mono, monospace' }}>
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>

    </div>
  )
}