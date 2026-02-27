import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in → redirect to login
  if (!user && request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Logged in but trying to access /admin/users → check role
  if (user && request.nextUrl.pathname.startsWith('/admin/users')) {
    const { data } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (data?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*']
}