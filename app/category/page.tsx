'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client, categoriesQuery, productsByCategoryQuery, getImageUrl } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
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
  features: Array<{
    title: string;
    description?: string;
  }>;
  order: number;
  isFeatured: boolean;
  metaDescription?: string;
  metaKeywords?: string[];
  brandName?: string;
  startPrice?: number;
  deliveryTime?: string;
  rating?: number;
  reviews?: number;
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
  price: number;
  rating?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData);

        // Fetch products for each category
        const productsPromises = categoriesData.map(async (category: Category) => {
          const products = await client.fetch(productsByCategoryQuery, { categoryId: category._id });
          return { categoryId: category._id, products: products || [] };
        });

        const productsResults = await Promise.all(productsPromises);
        const productsMap = productsResults.reduce((acc, { categoryId, products }) => {
          acc[categoryId] = products;
          return acc;
        }, {} as Record<string, Product[]>);

        setCategoryProducts(productsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
        <section className='relative'>
          <div className='absolute inset-0 bg-dark-black/10 z-0'>
            <Image src="/bg-green2.jpg" alt="background" className='w-full h-full object-cover'
            width={1000}
            height={1000}
            priority
            placeholder="blur"
            blurDataURL="/bg-organic-about-blur.jpg"
            quality={50} />
            <div className='absolute inset-0 bg-background/70'></div>
          </div>
          <div className="relative z-10 min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
              <h1 className="text-5xl font-bold mb-12 text-text-primary text-center">Our Categories</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <div key={index} className='bg-transparent rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'>
                        <div  
                          key={category._id}
                          className="bg-text-silver/5 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                          <Link href={`/category/${category.slug.current}`}>
                            <div className="relative h-48 w-full bg-secondary-dark overflow-hidden">
                              {category.mainImage && category.mainImage.asset && (
                                <Image
                                  src={getImageUrl(category.mainImage) || ''}
                                  alt={category.mainImage?.alt || category.title}
                                  className="w-full h-full object-cover"
                                  width={1000}
                                  height={1000}
                                  priority
                                  placeholder="blur"
                                  blurDataURL="/bg-organic-about-blur.jpg"
                                  quality={50}
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white font-semibold">Know More →</span>
                              </div>
                            </div>
                          </Link>

                          <div className="p-4 z-10">
                            <h2 className="text-2xl font-bold mb-4 text-text-primary">{category.title}</h2>
                            
                            <div className="text-text-secondary line-clamp-2 mb-4">
                              <PortableText value={category.description.slice(0, 100)} />
                            </div>

                            {category.startPrice && (
                              <p className="text-primary font-bold mb-4">Starting from ${category.startPrice}</p>
                            )}

                            {/* Related Products */}
                            {categoryProducts[category._id] && categoryProducts[category._id].length > 0 && (
                              <div className="mt-6 bg-third/40 p-4 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <h3 className="text-lg font-semibold mb-3 text-text-primary">Related Products</h3>
                                <div className="space-y-4">
                                  {categoryProducts[category._id].slice(0, 2).map((product) => (
                                    <Link
                                      key={product._id}
                                      href={`/product/${product.slug.current}`}
                                      className="flex group items-center gap-4 p-3 backdrop-brightness-90 bg-transparent border 
                                        border-white/20 py-3 px-3 rounded-xl text-lg text-white shadow-xl 
                                        transition-all duration-700 hover:-translate-y-1 hover:scale-103 
                                        hover:bg-text-green-org hover:border-primary/20 
                                        hover:shadow-2xl"
                                    >
                                      {product.mainImage && (
                                        <Image
                                          src={getImageUrl(product.mainImage) || ''}
                                          alt={product.mainImage?.alt || product.title}
                                          className="w-16 h-16 object-cover rounded"
                                          width={1000}
                                          height={1000}
                                          priority
                                          placeholder="blur"
                                          blurDataURL="/bg-organic-about-blur.jpg"
                                          quality={50}
                                        />
                                      )}
                                      <div>
                                        <h4 className="font-medium text-text-primary">{product.title}</h4>
                                        {product.price && (
                                          <p className="text-primary font-bold">${product.price}</p>
                                        )}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                                {categoryProducts[category._id].length > 1 && (
                                  <Link
                                    href={`/category/${category.slug.current}`}
                                    className="mt-4 inline-flex items-center text-primary font-bold hover:text-primary-dark"
                                  >
                                    View the product
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
              <section className='relative'>
                    <div className='absolute inset-0 bg-dark-black/10 z-0'>
                      <Image src="/bg-green2.jpg" alt="background" className='w-full h-full object-cover'
                      width={1000}
                      height={1000}
                      priority
                      placeholder="blur"
                      blurDataURL="/bg-organic-about-blur.jpg"
                      quality={50} />
                    <div className='absolute inset-0 bg-background/70'></div>
                  </div>
              </section>
    </div>
  );
} 