import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'News & Updates',
  type: 'document',
  fields: [
    // Title (English & Arabic)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { 
          name: 'en', 
          type: 'string', 
          title: 'English',
          validation: (Rule) => Rule.required()
        },
        { 
          name: 'ar', 
          type: 'string', 
          title: 'Arabic' 
        },
      ],
    }),
    
    // URL-friendly slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    // Short description
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ar', type: 'text', title: 'Arabic' },
      ],
    }),
    
    // Category dropdown
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Real Estate', value: 'real-estate' },
          { title: 'Technology', value: 'technology' },
          { title: 'Construction', value: 'construction' },
          { title: 'Investment', value: 'investment' },
        ],
      },
    }),
    
    // Tag (like "Breaking News")
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ar', type: 'string', title: 'Arabic' },
      ],
    }),
    
    // Featured image
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping
      },
    }),
    
    // Article content
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'block' }],
        },
        {
          name: 'ar',
          type: 'array',
          title: 'Arabic',
          of: [{ type: 'block' }],
        },
      ],
    }),
    
    // Publication date
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    
    // Read time
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
  ],
  
  // Preview in studio
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage',
      subtitle: 'category',
    },
  },
})