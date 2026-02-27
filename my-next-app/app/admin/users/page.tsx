'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRole } from '../hooks/useRole'
import { useRouter } from 'next/navigation'
import { Loader2, UserPlus, Trash2 } from 'lucide-react'
import { createAdminUser, deleteAdminUser } from '@/app/admin/actions/create-use'
const gold = '#a79370'

interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
}

export default function UsersPage() {
  const { isAdmin, loading } = useRole()
  const router = useRouter()
  const supabase = createClient()

  const [users, setUsers] = useState<AdminUser[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'manager'>('manager')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !isAdmin) router.push('/admin/dashboard')
  }, [loading, isAdmin])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const { data } = await supabase.from('admin_users').select('*')
    if (data) setUsers(data)
  }

// Replace the entire handleAddUser function:
async function handleAddUser(e: React.FormEvent) {
  e.preventDefault()
  setAdding(true)
  setError('')

  const result = await createAdminUser(email, password, role)

  if (result.error) {
    setError(result.error)
  } else {
    setEmail('')
    setPassword('')
    fetchUsers()
  }

  setAdding(false)
}

async function handleDelete(userId: string) {
  if (!confirm('Are you sure you want to delete this user?')) return
  const result = await deleteAdminUser(userId)
  if (result.error) setError(result.error)
  else fetchUsers()
}

  if (loading) return <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin" style={{ color: gold }} /></div>
  if (!isAdmin) return null

  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: gold, fontFamily: 'Space Mono, monospace' }}>
          Admin Only
        </p>
        <h2 className="text-3xl font-light" style={{ color: '#000', fontFamily: 'Playfair Display, serif' }}>
          User Management
        </h2>
      </div>

      {/* Add User Form */}
      <div className="p-6 rounded-sm bg-white mb-8" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <h3 className="text-sm font-medium mb-4" style={{ color: '#000' }}>Add New User</h3>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm rounded-sm outline-none"
                style={{ border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6' }}
                placeholder="user@rsw.ae"
              />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 text-sm rounded-sm outline-none"
                style={{ border: '1px solid rgba(167,147,112,0.3)', background: '#faf9f6' }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#999' }}>Role</label>
            <div className="flex gap-3">
              {(['admin', 'manager'] as const).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className="px-4 py-2 rounded-sm text-xs font-medium capitalize transition-all"
                  style={{
                    background: role === r ? gold : 'transparent',
                    color: role === r ? '#fff' : '#888',
                    border: `1px solid ${role === r ? gold : 'rgba(167,147,112,0.3)'}`,
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: '#bbb' }}>
              {role === 'admin' ? 'Full access — can manage users, content, and all settings' : 'Can only edit content sections'}
            </p>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={adding}
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium"
            style={{ background: gold, color: '#fff' }}
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {adding ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="rounded-sm bg-white overflow-hidden" style={{ border: '1px solid rgba(167,147,112,0.2)' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(167,147,112,0.15)' }}>
          <h3 className="text-sm font-medium" style={{ color: '#000' }}>Current Users</h3>
        </div>
        {users.map((user, i) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: i < users.length - 1 ? '1px solid rgba(167,147,112,0.1)' : 'none' }}
          >
            <div>
              <p className="text-sm" style={{ color: '#000' }}>{user.email}</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block capitalize"
                style={{
                  background: user.role === 'admin' ? 'rgba(167,147,112,0.15)' : 'rgba(0,0,0,0.05)',
                  color: user.role === 'admin' ? gold : '#888'
                }}
              >
                {user.role}
              </span>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="p-2 rounded-sm transition-all hover:bg-red-50"
              style={{ color: '#ccc' }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}