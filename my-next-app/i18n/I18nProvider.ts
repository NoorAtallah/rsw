'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Locale } from './translations'

type Direction = 'ltr' | 'rtl'

interface I18nContextType {
  locale: Locale
  direction: Direction
  switchLanguage: (newLocale: Locale) => void
  t: (key: string) => any
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider(props: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>('en')
  const [direction, setDirection] = useState<Direction>('ltr')

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
    let value: any = translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value ?? key
  }

  const contextValue: I18nContextType = {
    locale,
    direction,
    switchLanguage,
    t
  }

  return React.createElement(
    I18nContext.Provider,
    { value: contextValue },
    props.children
  )
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}