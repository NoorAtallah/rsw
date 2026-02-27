'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Locale } from './translations'
import { createClient } from '@/lib/supabase/client'

type Direction = 'ltr' | 'rtl'

type DbContent = Record<string, Record<string, { en: string; ar: string }>>

interface I18nContextType {
  locale: Locale
  direction: Direction
  switchLanguage: (newLocale: Locale) => void
  t: (key: string) => any
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [direction, setDirection] = useState<Direction>('ltr')
  const [dbContent, setDbContent] = useState<DbContent>({})

  useEffect(() => {
    async function loadDbContent() {
      const supabase = createClient()
      const { data } = await supabase.from('content').select('*')
      if (!data) return

      const map: DbContent = {}
      data.forEach(row => {
        if (!map[row.section]) map[row.section] = {}
        map[row.section][row.key] = { en: row.value_en, ar: row.value_ar }
      })
      setDbContent(map)
    }
    loadDbContent()
  }, [])

  useEffect(() => {
    const savedLocale = (localStorage.getItem('locale') as Locale) || 'en'
    setLocale(savedLocale)
    setDirection(savedLocale === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLocale
  }, [])

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale)
    setDirection(newLocale === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('locale', newLocale)
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLocale
  }

  const t = (key: string): any => {
    const keys = key.split('.')
    const section = keys[0]
    const rest = keys.slice(1).join('.')

    // Check Supabase first
    if (dbContent[section]?.[rest]) {
      const val = dbContent[section][rest]
      return locale === 'ar' ? val.ar : val.en
    }

    // Fallback to JSON
    let value: any = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  return (
    <I18nContext.Provider value={{ locale, direction, switchLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}