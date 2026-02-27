'use client'

import { I18nProvider } from '@/i18n/I18nProvider'
import RSWNavigation from './ClientNavbar'
import RSWFooter from './footer'
import SocialPopup from './popUp'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function ClientProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <I18nProvider>
      {!isAdmin && <RSWNavigation />}
      {children}
      {!isAdmin && <RSWFooter />}
      {!isAdmin && <SocialPopup />}
    </I18nProvider>
  )
}