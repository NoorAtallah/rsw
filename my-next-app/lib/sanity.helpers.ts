import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

// Initialize image builder
const builder = imageUrlBuilder(client)

// Function to get image URLs
export function urlFor(source: any) {
  return builder.image(source)
}

// Function to get localized content
export function getLocalizedField(field: any, locale: 'en' | 'ar') {
  if (!field) return ''
  return field[locale] || field.en || ''
}

// Function to format dates
export function formatDate(date: string, locale: 'en' | 'ar') {
  return new Date(date).toLocaleDateString(
    locale === 'ar' ? 'ar-AE' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )
}