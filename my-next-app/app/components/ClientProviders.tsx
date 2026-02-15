'use client'

import { I18nProvider } from '@/i18n/I18nProvider'
import RSWNavigation from './ClientNavbar'
import RSWFooter from './footer'
import SocialPopup from './popUp'
import { ReactNode } from 'react'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <RSWNavigation />

      {children}
      <RSWFooter />
    </I18nProvider>
  )
}