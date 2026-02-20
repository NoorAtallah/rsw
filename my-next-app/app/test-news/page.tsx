// app/test-news/page.tsx
import { client } from '@/lib/sanity.client'
import { urlFor, getLocalizedField, formatDate } from '@/lib/sanity.helpers'
import RSWNewsSection from '@/app/components/newsSection'

// Interface matching the component
interface NewsItem {
  _id: string
  title: string
  excerpt: string
  category: string
  tag: string
  date: string
  readTime: string
  imageUrl: string
  slug: string
}

// Fetch news from Sanity
async function getNews(locale: 'en' | 'ar'): Promise<NewsItem[]> {
  const query = `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    tag,
    mainImage,
    publishedAt,
    readTime
  }`
  
  try {
    const newsData = await client.fetch(query)
    
    // Transform Sanity data to match component format
    return newsData.map((item: any) => ({
      _id: item._id,
      title: getLocalizedField(item.title, locale),
      excerpt: getLocalizedField(item.excerpt, locale),
      category: item.category || 'general',
      tag: getLocalizedField(item.tag, locale),
      date: formatDate(item.publishedAt, locale),
      readTime: `${item.readTime} ${locale === 'ar' ? 'دقيقة' : 'min read'}`,
      imageUrl: item.mainImage ? urlFor(item.mainImage).width(1200).url() : '',
      slug: item.slug.current,
    }))
  } catch (error) {
    console.error('Error fetching news from Sanity:', error)
    return []
  }
}

export default async function TestNewsPage() {
  const locale = 'en' // Change to 'ar' to test Arabic
  const newsItems = await getNews(locale)
  
  return (
    <div>
      {/* Show a banner if using Sanity data */}
      {newsItems.length > 0 && (
        <div style={{
          background: '#a79370',
          color: '#000',
          padding: '12px 20px',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          ✅ Using Sanity CMS Data ({newsItems.length} articles)
        </div>
      )}
      
      {/* Your existing component */}
      <RSWNewsSection newsItems={newsItems} />
      
      {/* Debug info */}
      {newsItems.length === 0 && (
        <div style={{
          maxWidth: '600px',
          margin: '40px auto',
          padding: '30px',
          background: '#fff3cd',
          border: '2px solid #ffc107',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#856404' }}>
            No Sanity Content Yet
          </h3>
          <p style={{ fontSize: '14px', color: '#856404', marginBottom: '16px' }}>
            Create your first news article in the Sanity Studio:
          </p>
          <a 
            href="/studio" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#a79370',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Open Sanity Studio
          </a>
        </div>
      )}
    </div>
  )
}

// Enable ISR - page updates every 60 seconds
export const revalidate = 60