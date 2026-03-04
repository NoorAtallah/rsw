'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Loader2, Trash2, Mail, MailOpen, Search, X,
  ChevronDown, ChevronUp, Building2, Tag, MessageSquare, Globe
} from 'lucide-react'

const gold = '#a79370'

interface Submission {
  id: string
  name: string
  email: string
  company: string | null
  interest: string | null
  message: string | null
  locale: string
  read: boolean
  created_at: string
}

const PAGE_SIZE = 10

const inputStyle = {
  width: '100%',
  padding: '9px 14px',
  border: '1px solid rgba(167,147,112,0.3)',
  background: '#faf9f6',
  borderRadius: 4,
  fontSize: 13,
  color: '#000',
  outline: 'none',
}

export default function ContactSubmissions() {
  const supabase = createClient()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterRead, setFilterRead] = useState<'all' | 'unread' | 'read'>('all')
  const [page, setPage] = useState(1)

  useEffect(() => { fetchSubmissions() }, [])
  useEffect(() => { setPage(1) }, [search, filterRead])

  async function fetchSubmissions() {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setSubmissions(data)
    setLoading(false)
  }

  async function markRead(id: string, read: boolean) {
    await supabase.from('contact_submissions').update({ read }).eq('id', id)
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, read } : s))
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this submission?')) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    setSubmissions(prev => prev.filter(s => s.id !== id))
  }

  function handleExpand(id: string) {
    const next = expanded === id ? null : id
    setExpanded(next)
    // Auto mark as read when opened
    const sub = submissions.find(s => s.id === id)
    if (next && sub && !sub.read) markRead(id, true)
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return submissions.filter(s => {
      const matchesRead =
        filterRead === 'all' ||
        (filterRead === 'unread' && !s.read) ||
        (filterRead === 'read' && s.read)
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.company ?? '').toLowerCase().includes(q) ||
        (s.interest ?? '').toLowerCase().includes(q) ||
        (s.message ?? '').toLowerCase().includes(q)
      return matchesRead && matchesSearch
    })
  }, [submissions, search, filterRead])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const paginated = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)
  const unreadCount = submissions.filter(s => !s.read).length

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin" style={{ color: gold }} />
    </div>
  )

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>Inbox</p>
          <h2 className="text-3xl font-light flex items-center gap-3" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>
            Contact Submissions
            {unreadCount > 0 && (
              <span
                className="text-sm font-medium px-2.5 py-0.5 rounded-full"
                style={{ background: gold, color: '#fff', fontFamily: 'Space Mono, monospace' }}
              >
                {unreadCount} new
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: '#bbb' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, email, message…"
            style={{ ...inputStyle, paddingLeft: 34, paddingRight: search ? 34 : 14 }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#bbb' }}>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {(['all', 'unread', 'read'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => setFilterRead(filter)}
            className="px-4 py-2 rounded-sm text-xs font-medium capitalize transition-all"
            style={{
              background: filterRead === filter ? gold : 'transparent',
              color: filterRead === filter ? '#fff' : gold,
              border: `1px solid ${filterRead === filter ? gold : 'rgba(167,147,112,0.35)'}`,
            }}
          >
            {filter}
            {filter === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 opacity-80">({unreadCount})</span>
            )}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs mb-4" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
        {filtered.length} {filtered.length === 1 ? 'submission' : 'submissions'}
        {(search || filterRead !== 'all') ? ' found' : ' total'}
        {totalPages > 1 && ` — page ${clampedPage} of ${totalPages}`}
      </p>

      {/* List */}
      <div className="space-y-2">
        {paginated.length === 0 ? (
          <div className="text-center py-16 rounded-sm" style={{ border: '1px dashed rgba(167,147,112,0.25)', color: '#bbb' }}>
            <p className="text-sm">No submissions found.</p>
          </div>
        ) : (
          paginated.map(sub => {
            const isExpanded = expanded === sub.id
            return (
              <div
                key={sub.id}
                className="rounded-sm bg-white overflow-hidden transition-all"
                style={{
                  border: `1px solid ${sub.read ? 'rgba(167,147,112,0.15)' : 'rgba(167,147,112,0.45)'}`,
                }}
              >
                {/* Row header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer gap-4"
                  onClick={() => handleExpand(sub.id)}
                >
                  {/* Unread dot */}
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mt-0.5" style={{ background: sub.read ? 'transparent' : gold }} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <p className="text-sm font-medium truncate" style={{ color: '#000' }}>{sub.name}</p>
                      <p className="text-xs truncate" style={{ color: gold }}>{sub.email}</p>
                      {sub.interest && (
                        <span className="text-[10px] px-2 py-0.5 rounded-sm" style={{ background: 'rgba(167,147,112,0.1)', color: gold }}>
                          {sub.interest}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] mt-0.5 truncate" style={{ color: '#bbb' }}>
                      {sub.message ? sub.message.slice(0, 80) + (sub.message.length > 80 ? '…' : '') : 'No message'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] hidden sm:block" style={{ color: '#ccc', fontFamily: 'Space Mono, monospace' }}>
                      {formatDate(sub.created_at)}
                    </span>

                    <button
                      onClick={e => { e.stopPropagation(); markRead(sub.id, !sub.read) }}
                      className="p-1.5 rounded transition-all hover:bg-amber-50"
                      title={sub.read ? 'Mark unread' : 'Mark read'}
                      style={{ color: sub.read ? '#ccc' : gold }}
                    >
                      {sub.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(sub.id) }}
                      className="p-1.5 rounded transition-all hover:bg-red-50"
                      style={{ color: '#ddd' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {isExpanded
                      ? <ChevronUp className="w-4 h-4" style={{ color: '#ccc' }} />
                      : <ChevronDown className="w-4 h-4" style={{ color: '#ccc' }} />
                    }
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 space-y-4" style={{ borderTop: '1px solid rgba(167,147,112,0.1)' }}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>Name</p>
                        <p className="text-sm" style={{ color: '#000' }}>{sub.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>Email</p>
                        <a href={`mailto:${sub.email}`} className="text-sm underline" style={{ color: gold }}>{sub.email}</a>
                      </div>
                      {sub.company && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>Company</p>
                          <p className="text-sm flex items-center gap-1.5" style={{ color: '#000' }}>
                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: gold }} />
                            {sub.company}
                          </p>
                        </div>
                      )}
                      {sub.interest && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#bbb' }}>Interest</p>
                          <p className="text-sm flex items-center gap-1.5" style={{ color: '#000' }}>
                            <Tag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: gold }} />
                            {sub.interest}
                          </p>
                        </div>
                      )}
                    </div>

                    {sub.message && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color: '#bbb' }}>
                          <MessageSquare className="w-3 h-3" />
                          Message
                        </p>
                        <p className="text-sm leading-relaxed p-4 rounded-sm whitespace-pre-wrap" style={{ background: '#faf9f6', color: '#333', border: '1px solid rgba(167,147,112,0.15)' }}>
                          {sub.message}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-4">
                        <p className="text-[10px]" style={{ color: '#bbb', fontFamily: 'Space Mono, monospace' }}>
                          {formatDate(sub.created_at)}
                        </p>
                        <span className="text-[10px] flex items-center gap-1" style={{ color: '#bbb' }}>
                          <Globe className="w-3 h-3" />
                          {sub.locale === 'ar' ? 'Arabic' : 'English'}
                        </span>
                      </div>
                      <a
                        href={`mailto:${sub.email}?subject=Re: Your Inquiry`}
                        className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-medium transition-all"
                        style={{ background: gold, color: '#fff' }}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Reply
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className="px-4 py-2 rounded-sm text-xs font-medium"
            style={{
              border: '1px solid rgba(167,147,112,0.35)',
              color: clampedPage === 1 ? '#ccc' : gold,
              cursor: clampedPage === 1 ? 'default' : 'pointer',
            }}
          >
            ← Previous
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="w-8 h-8 rounded-sm text-xs font-medium"
                style={{
                  background: n === clampedPage ? gold : 'transparent',
                  color: n === clampedPage ? '#fff' : gold,
                  border: `1px solid ${n === clampedPage ? gold : 'rgba(167,147,112,0.35)'}`,
                }}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className="px-4 py-2 rounded-sm text-xs font-medium"
            style={{
              border: '1px solid rgba(167,147,112,0.35)',
              color: clampedPage === totalPages ? '#ccc' : gold,
              cursor: clampedPage === totalPages ? 'default' : 'pointer',
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}