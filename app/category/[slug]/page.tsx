'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { client, categoryBySlugQuery, productsByCategoryQuery, getImageUrl } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: any;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    caption?: string;
  };
  type: string;
  order: number;
  specifications: any[];
  features: string[];
  commonUses: string[];
  customizationOptions: string[];
  packingDelivery: any[];
  priceNote: string[];
  certifications: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: any;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    caption?: string;
  };
  category: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  price: number;
  featured: boolean;
  metaDescription?: string;
  metaKeywords?: string[];
  rating?: number;
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-third-dark">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 text-text-secondary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 text-text-secondary">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-white">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-white">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const categoryData = await client.fetch(categoryBySlugQuery, { slug });
        setCategory(categoryData);
        
        if (categoryData && categoryData._id) {
          const productsData = await client.fetch(productsByCategoryQuery, { categoryId: categoryData._id });
          setProducts(productsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-primary">Category Not Found</h1>
          <p className="text-xl text-text-secondary mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/product"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className='relative'>
        <div className='absolute inset-0 bg-background z-0'>
          <Image 
          src="/bg-green2.jpg" 
          alt="background" 
          className='w-full h-full object-cover'
          width={1000}
          height={1000}
          priority
          placeholder="blur"
          blurDataURL="/bg-organic-about-blur.jpg"
          quality={50} />
          <div className='absolute inset-0 bg-black/70'/>
          <div className='absolute inset-0 bg-third/25'/>
        </div>
    
    <section className='relative z-10 pt-24 max-w-7xl mx-auto'>
        {/* Category Header */}
        <div className="text-left z-10 px-4 sm:px-6 lg:px-8 pt-9">
          <Link
            href="/product"
            className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 py-3 px-6 rounded-xl text-lg text-white shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 
                hover:bg-text-green-org hover:border-primary/20 
                hover:shadow-2xl"
            >
            Back to Products →
          </Link>
          
          <h1 className="text-4xl font-bold mb-6 text-text-primary pt-10">{category.title}</h1>

          {category.mainImage && (
            <div className="mx-auto mb-8">
              <Image
                src={getImageUrl(category.mainImage) || ''}
                alt={category.mainImage?.alt || category.title}
                width={1000}
                height={1000}
                priority
                placeholder="blur"
                blurDataURL="/bg-organic-about-blur.jpg"
                quality={50}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {category.mainImage.caption && (
                <p className="text-md text-text-secondary mt-2 text-center">{category.mainImage.caption}</p>
              )}
            </div>
          )}          
          
              <div className="mx-auto prose prose-invert text-left text-lg">
                <div className='flex flex-col md:flex-col lg:flex-row gap-6 justify-between'>
                    <div className='max-w-3xl'>
                    <PortableText 
                              value={category.description}
                              components={portableTextComponents}
                            />
                        {/* Specifications Section */}
                        {category.specifications && category.specifications.length > 0 && (
                          <div className="mt-5">
                            <h2 className="text-3xl font-bold mb-3 text-text-secondary text-left">Specifications</h2>
                            <div className="prose prose-invert max-w-none">
                              <PortableText 
                                value={category.specifications}
                                components={portableTextComponents}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                    
                    <div className='md:max-w-xl lg:max-w-sm'>
                      <div className="mb-6">
                        <h3 className='text-2xl font-bold mb-2 text-text-secondary'>Category Type</h3>
                        <p className='text-text-third-dark capitalize'>{category.type}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className='text-2xl font-bold mb-2 text-text-secondary'>Packing & Delivery</h3>
                        <PortableText 
                          value={category.packingDelivery}
                          components={portableTextComponents}
                        />
                      </div>

                      {category.priceNote && category.priceNote.length > 0 && (
                        <div className='mb-6'>
                          <h3 className='text-2xl font-bold mb-2 text-text-secondary'>Price Note</h3>
                          <ul className="list-disc list-inside text-text-third-dark">
                            {category.priceNote.map((note, index) => (
                              <li key={index}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {category.certifications && (
                        <div className='mb-6'>
                          <h3 className='text-2xl font-bold mb-2 text-text-secondary'>Certifications & Quality</h3>
                          <p className='text-text-third-dark'>{category.certifications}</p>
                        </div>
                      )}
                    </div>
                </div>

                {/* Features Section */}
                {category.features && category.features.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-text-secondary text-center">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.features.map((feature, index) => (
                        <div className='bg-third/50 rounded-lg'>
                          <div key={index} className="bg-transparent/20 backdrop-brightness-90 border border-white/20 p-6 rounded-lg shadow-md">
                            <p className="text-text-silver-dark">{feature}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Uses Section */}
                {category.commonUses && category.commonUses.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-text-secondary text-center">Common Uses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.commonUses.map((use, index) => (
                        <div key={index} className="bg-third/50 rounded-lg shadow-md">
                          <div className='bg-trasnparent/20 backdrop-brightness-90 border border-white/20 p-6 rounded-lg shadow-md'>
                          <p className="text-text-silver-dark">{use}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customization Options Section */}
                {category.customizationOptions && category.customizationOptions.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-text-secondary text-center">Customization Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.customizationOptions.map((option, index) => (
                        <div key={index} className="bg-third/50 rounded-lg shadow-md">
                          <div className='bg-transparent/20 backdrop-brightness-90 border border-white/20 p-6 rounded-lg shadow-md'>
                          <p className="text-text-silver-dark">{option}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
        </div>
    </section>

     {/* Products Grid */}           
    <section className='relative z-10 py-16'>
        {/* Products Grid */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              {products.length > 0 && (
                <div>
                  <h2 className="text-4xl font-bold mb-8 text-text-secondary text-center">Products in this Category</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <Link
                        key={product._id}
                        href={`/product/${product.slug.current}`}
                        className="bg-third/40 rounded-lg shadow-lg overflow-hidden 
                        hover:shadow-xl group border border-white/20
                        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          {product.mainImage && (
                            <Image
                              src={getImageUrl(product.mainImage) || ''}
                              alt={product.mainImage?.alt || product.title}
                              className="w-full h-full object-cover"
                              width={1000}
                              height={1000}
                              priority
                              placeholder="blur"
                              blurDataURL="/bg-organic-about-blur.jpg"
                              quality={50}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white font-semibold">View Product →</span>
                          </div>
                        </div>
                        <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20 p-6">
                          <h3 className="text-xl font-semibold mb-2 text-text-primary">{product.title}</h3>
                          <div className="text-text-secondary line-clamp-2">
                            <PortableText 
                              value={product.description}
                              components={portableTextComponents}
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
        </div>
    </section>

    </section>
  );
} 