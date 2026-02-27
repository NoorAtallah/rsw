import { createClient } from '@/lib/supabase/server'
import { translations } from '@/i18n/translations'
import type { Locale } from '@/i18n/translations'

export async function getContent(section: string, locale: Locale) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('content')
    .select('*')
    .eq('section', section)

  const fallback = translations[locale][section as keyof typeof translations['en']] as Record<string, string>

  if (!data || data.length === 0) return fallback

  const result = { ...fallback }
  data.forEach(row => {
    result[row.key] = locale === 'ar' ? row.value_ar : row.value_en
  })

  return result
}

export async function getArrayContent(section: string, locale: Locale) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('content_arrays')
    .select('*')
    .eq('section', section)
    .order('order_index')

  if (!data || data.length === 0) return null

  return data.map(row => locale === 'ar' ? row.data_ar : row.data_en)
}

export async function getPageContent(slug: string, locale: Locale) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('pages_content')
    .select('*')
    .eq('page_slug', slug)

  if (!data || data.length === 0) return null

  const result: Record<string, string> = {}
  data.forEach(row => {
    result[row.key] = locale === 'ar' ? row.value_ar : row.value_en
  })

  return result
}
