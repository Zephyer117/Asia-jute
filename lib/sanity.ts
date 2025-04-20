import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-05',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) {
    console.log('No source provided to urlFor');
    return null;
  }

  if (!source.asset) {
    console.log('No asset found in source:', source);
    return null;
  }

  // Handle image assets
  if (source.asset._type === 'reference' && source.asset._ref) {
    return builder.image(source);
  }

  console.log('No valid image reference found in source');
  return null;
}

// Utility function to safely get URL from Sanity assets
export function getImageUrl(source: any): string | null {
  if (!source) {
    console.log('No source provided to getImageUrl');
    return null;
  }
  
  const urlBuilder = urlFor(source);
  if (!urlBuilder) {
    console.log('No URL builder returned from urlFor');
    return null;
  }

  try {
    const url = typeof urlBuilder === 'string' ? urlBuilder : urlBuilder.url();
    console.log('Generated image URL:', url);
    return url;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return null;
  }
}

// GROQ Queries
export const categoriesQuery = `
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    features,
    order,
    isFeatured,
    metaDescription
  }
`;

export const productsQuery = `
  *[_type == "product"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    category->{
      _id,
      title,
      slug
    },
    price,
    featured,
    metaDescription,
    metaKeywords
  }
`;

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug {
      current
    },
    description,
    mainImage {
      asset-> {
        _id,
        _type,
        url
      },
      asset {
        _ref,
        _type
      },
      alt,
      caption,
      hotspot,
      crop
    },
    picture {
      asset-> {
        _id,
        _type,
        url
      },
      asset {
        _ref,
        _type
      },
      alt,
      caption,
      hotspot,
      crop
    },
    additionalImages[] {
      asset-> {
        _id,
        _type,
        url
      },
      asset {
        _ref,
        _type
      },
      alt,
      caption,
      hotspot,
      crop
    },
    category->{
      _id,
      title,
      slug {
        current
      }
    },
    price,
    featured,
    metaDescription,
    metaKeywords,
    brandName,
    deliveryTime,
    rating,
    reviews,
    specifications,
    customOptions {
      sizeOptions,
      colorOptions,
      handleOptions,
      closureOptions,
      brandingArea,
      printingMethods,
      certifications,
      extraFeatures,
      packagingDetails
    },
    video {
      asset->,
      title,
      description,
      thumbnail {
        asset->
      }
    }
  }
`;

export const featuredProductsQuery = `
  *[_type == "product" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    category->{
      _id,
      title,
      slug
    },
    price,
    featured,
    metaDescription,
    metaKeywords
  }
`;

export const productsByCategoryQuery = `
  *[_type == "product" && references($categoryId)] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    category->{
      _id,
      title,
      slug
    },
    price,
    featured,
    metaDescription,
    metaKeywords
  }
`; 

export const relatedProductsQuery = `
  *[_type == "product" && category._ref == $categoryId && slug.current != $slug] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    price
  }
`;

export const categoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    type,
    order,
    specifications,
    features,
    commonUses,
    customizationOptions,
    packingDelivery,
    priceNote,
    certifications,
    metaDescription,
    metaKeywords
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    features,
    order,
    isFeatured,
    metaDescription,
    metaKeywords
  }
`;

export const projectsByServiceQuery = `
  *[_type == "project" && references($serviceId)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    service->{
      _id,
      title,
      slug
    },
    technologies,
    featured,
    client,
    projectUrl,
    completionDate
  }
`;