'use server'

import { createClient } from '@supabase/supabase-js'

export async function createAdminUser(email: string, password: string, role: 'admin' | 'manager') {
  // Service role client — only exists server-side, never exposed to browser
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // NOT the anon key
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Create the auth user
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip confirmation email
  })

  if (error || !data.user) {
    return { error: error?.message || 'Failed to create user' }
  }

  // Assign role in admin_users table
  const { error: insertError } = await supabaseAdmin
    .from('admin_users')
    .insert({ id: data.user.id, email, role })

  if (insertError) {
    return { error: insertError.message }
  }

  return { success: true, userId: data.user.id }
}

// actions/create-user.ts — add this alongside createAdminUser

export async function deleteAdminUser(userId: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Delete from Auth first (this cascades or you can do both)
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId)
  if (authError) return { error: authError.message }

  // Delete from your custom table
  const { error: tableError } = await supabaseAdmin
    .from('admin_users')
    .delete()
    .eq('id', userId)

  if (tableError) return { error: tableError.message }

  return { success: true }
}