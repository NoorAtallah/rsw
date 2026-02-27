export type FieldType = 'text' | 'textarea' | 'image' | 'video'

export interface Field {
  key: string
  label: string
  type: FieldType
}

export interface SectionConfig {
  label: string
  fields: Field[]
}

export const sectionConfigs: Record<string, SectionConfig> = {
  hero: {
    label: 'Hero Section',
    fields: [
      { key: 'video', label: 'Background Video', type: 'video' },
      { key: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { key: 'title.line1', label: 'Title Line 1', type: 'text' },
      { key: 'title.line2', label: 'Title Line 2 (Gold)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cta.explore', label: 'CTA - Explore Button', type: 'text' },
      { key: 'cta.investor', label: 'CTA - Investor Button', type: 'text' },
      { key: 'verticalText', label: 'Vertical Text', type: 'text' },
      { key: 'scroll', label: 'Scroll Indicator Text', type: 'text' },
      { key: 'ctaCard.title', label: 'CTA Card Title', type: 'text' },
      { key: 'ctaCard.subtitle', label: 'CTA Card Subtitle', type: 'text' },
    ]
  },
  about: {
    label: 'About Section',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'divisionsTitle', label: 'Divisions Title', type: 'text' },
      { key: 'cta.title', label: 'CTA Title', type: 'text' },
      { key: 'cta.description', label: 'CTA Description', type: 'textarea' },
      { key: 'cta.primary', label: 'CTA Primary Button', type: 'text' },
      { key: 'cta.secondary', label: 'CTA Secondary Button', type: 'text' },
    ]
  },
  investments: {
    label: 'Investments Section',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'vision.title', label: 'Vision Title', type: 'text' },
      { key: 'vision.description', label: 'Vision Description', type: 'textarea' },
      { key: 'approachTitle', label: 'Approach Title', type: 'text' },
      { key: 'sectorsTitle', label: 'Sectors Title', type: 'text' },
      { key: 'learnMore', label: 'Learn More Button', type: 'text' },
    ]
  },
  investorRelations: {
    label: 'Investor Relations',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'documentsTitle', label: 'Documents Title', type: 'text' },
      { key: 'documentsSubtitle', label: 'Documents Subtitle', type: 'text' },
      { key: 'contact.title', label: 'Contact Title', type: 'text' },
      { key: 'contact.description', label: 'Contact Description', type: 'textarea' },
      { key: 'contact.button', label: 'Contact Button', type: 'text' },
    ]
  },
  contact: {
    label: 'Contact Section',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'methods.phone.label', label: 'Phone Number', type: 'text' },
      { key: 'methods.email.label', label: 'Email Address', type: 'text' },
      { key: 'location.title', label: 'Location Title', type: 'text' },
      { key: 'location.address', label: 'Address', type: 'textarea' },
      { key: 'form.title', label: 'Form Title', type: 'text' },
      { key: 'form.subtitle', label: 'Form Subtitle', type: 'text' },
      { key: 'form.submit', label: 'Submit Button', type: 'text' },
    ]
  },
  footer: {
    label: 'Footer',
    fields: [
      { key: 'tagline', label: 'Tagline', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'copyright', label: 'Copyright Text', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'regulated', label: 'Regulated Text', type: 'text' },
      { key: 'backToTop', label: 'Back to Top', type: 'text' },
    ]
  },
  news: {
    label: 'News Section',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'updated', label: 'Updated Text', type: 'text' },
      { key: 'readMore', label: 'Read More Button', type: 'text' },
      { key: 'viewMore', label: 'View More Button', type: 'text' },
    ]
  },
}