'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Role = 'admin' | 'manager' | null

export function useRole() {
  const [role, setRole] = useState<Role>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRole() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(data?.role ?? null)
      setLoading(false)
    }
    fetchRole()
  }, [])

  return { role, loading, isAdmin: role === 'admin', isManager: role === 'manager' }
}