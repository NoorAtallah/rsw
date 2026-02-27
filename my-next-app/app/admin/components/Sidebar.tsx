'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, FileText, LogOut, ArrowUpRight, Users, Newspaper,Info } from 'lucide-react'
import { useRole } from '../hooks/useRole'

const gold = '#a79370'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { isAdmin } = useRole()



const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
  { href: '/admin/content', label: 'Content', icon: FileText, adminOnly: false },
//   { href: '/admin/about', label: 'About', icon: Info, adminOnly: false },
  { href: '/admin/news', label: 'News', icon: Newspaper, adminOnly: false },
  { href: '/admin/users', label: 'Users', icon: Users, adminOnly: true },
]


  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-60 min-h-screen flex flex-col py-8 px-4" style={{ background: '#fff', borderRight: '1px solid rgba(167,147,112,0.2)' }}>
      <div className="mb-10 px-2">
        <h1 className="font-light text-lg" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>RSW Admin</h1>
        <p className="text-xs mt-1" style={{ color: gold }}>Content Management</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon, adminOnly }) => {
          if (adminOnly && !isAdmin) return null
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: active ? 'rgba(167,147,112,0.1)' : 'transparent',
                color: active ? gold : '#888',
                borderLeft: active ? `2px solid ${gold}` : '2px solid transparent',
              }}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-2 transition-all"
          style={{ color: gold, border: `1px solid rgba(167,147,112,0.3)` }}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          View Site
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:text-red-400"
          style={{ color: '#aaa' }}
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </aside>
  )
}