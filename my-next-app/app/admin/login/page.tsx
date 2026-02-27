'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const gold = '#a79370'

export default function AdminLogin() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

async function handleLogin(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError('')

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    setError('Invalid email or password')
    setLoading(false)
    return
  }

  // Hard redirect — ensures cookies are sent with the next request on Vercel
  window.location.href = '/admin/dashboard'
}

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#faf9f6' }}>
      <div className="w-full max-w-md p-10 rounded-sm bg-white" style={{ border: '1px solid rgba(167,147,112,0.25)' }}>
        
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>
            RSW Investment Group
          </p>
          <h1 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>
            Admin Login
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm outline-none rounded-sm"
              style={{ border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6', color: '#000' }}
              placeholder="admin@rsw.ae"
            />
          </div>

          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm outline-none rounded-sm"
              style={{ border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6', color: '#000' }}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-medium transition-opacity rounded-sm"
            style={{ background: gold, color: '#fff', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}