import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['palette', 'lqip'],
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'picture',
      title: 'Additional Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }
      ],
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      description: 'The category this product belongs to',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Price of the product',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Show this product in the featured section',
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'The brand name of the product',
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Delivery Time',
      type: 'string',
      description: 'Estimated delivery time for the product',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description: 'Product rating from 0 to 5',
    }),
    defineField({
      name: 'reviews',
      title: 'Number of Reviews',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Total number of reviews for the product',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Product specifications and features',
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      description: 'Additional product images for gallery',
    }),
    defineField({
      name: 'video',
      title: 'Product Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Video Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Video Description',
        },
        {
          name: 'thumbnail',
          type: 'image',
          title: 'Video Thumbnail',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      description: 'Product video with optional thumbnail',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO meta description for the product',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO meta keywords for the product',
    }),
    defineField({
      name: 'customOptions',
      title: 'Custom Options',
      type: 'object',
      fields: [
        {
          name: 'sizeOptions',
          title: 'Size Options',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'colorOptions',
          title: 'Color Options',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'handleOptions',
          title: 'Handle Types',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'closureOptions',
          title: 'Closure Types',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'brandingArea',
          title: 'Branding Area',
          type: 'string',
          description: 'Describe available branding space like "Front and Back up to A4 size"',
        },
        {
          name: 'printingMethods',
          title: 'Printing Methods',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'extraFeatures',
          title: 'Additional Features',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'packagingDetails',
          title: 'Packaging & Delivery Details',
          type: 'array',
          of: [{type: 'block'}],
        },
      ],
      description: 'Custom features and options specific to the product type',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category.title',
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `Category: ${select.category}`,
        media: select.media,
      }
    }
  },
});
