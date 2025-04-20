'use client';

import { useEffect, useState } from 'react';
import { client, productsQuery, categoriesQuery, productsByCategoryQuery } from '@/lib/sanity';
import Link from 'next/link';
import { getImageUrl } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
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
  brandName?: string;
  deliveryTime?: string;
  rating?: number;
  reviews?: number;
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let productsData;
        if (selectedCategory) {
          productsData = await client.fetch(productsByCategoryQuery, { categoryId: selectedCategory._id });
        } else {
          productsData = await client.fetch(productsQuery);
        }
        
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Error Loading Products</h2>
          <p className="text-text-secondary mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="button-tech"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-background z-0">
        <Image 
        src="/bg-green2.jpg"
        height={1000}
        width={1000}
        alt="background" 
        className="w-full h-full object-cover"
        priority
        placeholder="blur"
        blurDataURL="/bg-organic-about-blur.jpg"
        quality={50} />
        <div className="absolute inset-0 bg-black/15"/>
        <div className="absolute inset-0 bg-third/35"/>
      </div>
      <div className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
              Our Products
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Discover our collection of high-quality products. Filter by category to find exactly what you're looking for.
            </p>
          </section>

          {/* Categories Section */}
          <section className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-third/50 text-text-primary hover:bg-text-green-org'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory?._id === category._id
                      ? 'bg-primary text-white'
                      : 'bg-third/50 text-text-primary hover:bg-text-green-org'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </section>

          {/* Products Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-text-primary text-center">
              {selectedCategory ? `${selectedCategory.title} Products` : 'All Products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  href={`/product/${product.slug.current}`}
                  key={product._id}
                  className="group"
                >
                  <div className="bg-third/50 rounded-lg shadow-lg overflow-hidden 
                    hover:shadow-xl group
                    transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
                    hover:scale-105 hover:bg-text-green-org/75">
                    <div className="relative h-48 w-full bg-secondary-dark overflow-hidden">
                      {product.mainImage &&  (
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
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2 text-text-secondary">{product.title}</h3>
                      <div className="text-text-primary line-clamp-2">
                        <PortableText value={product.description} />
                      </div>
                      {product.price && (
                        <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
                      )}
                      {product.rating && (
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating || 0)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-text-secondary">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 