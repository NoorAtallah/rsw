import { createClient } from '@/lib/supabase/server'
import NewsArticle from './NewsArticle'
import { notFound } from 'next/navigation'

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // ← await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('content_arrays')
    .select('*')
    .eq('section', 'news.items')

  const article = data?.find(row =>
    row.data_en?.slug === slug || row.id === slug
  )

  if (!article) return notFound()

  return <NewsArticle article={article} />
}