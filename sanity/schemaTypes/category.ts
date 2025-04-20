import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
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
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          { title: 'Traditional Items', value: 'traditional' },
          { title: 'Diversified Items', value: 'diversified' },
          { title: 'Jute Bag Types', value: 'bags' },
          { title: 'Handicrafts & Others', value: 'handicrafts' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Order in which this category should appear (lower numbers appear first)',
    }),

    // 🔽 NEW FIELDS ADDED BELOW

    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Key product specifications (e.g., Material, Weave Type, Sizes)',
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of product features (e.g., Biodegradable, Reusable, UV Resistant)',
    }),

    defineField({
      name: 'commonUses',
      title: 'Common Uses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Typical uses for this category of product (e.g., Agricultural, Construction)',
    }),

    defineField({
      name: 'customizationOptions',
      title: 'Customization Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Available customization features like printing, lamination, drawstrings, etc.',
    }),

    defineField({
      name: 'packingDelivery',
      title: 'Packing & Delivery Info',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Details about packing method, MOQ, lead time, port of dispatch, etc.',
    }),

    defineField({
      name: 'priceNote',
      title: 'Price Note',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add a note about price flexibility or request for quotation',
    }),

    defineField({
      name: 'certifications',
      title: 'Certifications & Quality',
      type: 'string',
      description: 'Mention any quality assurance standards like ISO or SGS if applicable',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      type: 'type',
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `Type: ${select.type}`,
        media: select.media,
      }
    }
  },
});
