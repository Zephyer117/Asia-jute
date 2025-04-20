'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { client, productBySlugQuery, relatedProductsQuery, getImageUrl } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';

interface SanityAsset {
  _id: string;
  _type: string;
  url: string;
  mimeType?: string;
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
  picture?: {
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
  brandName?: string;
  deliveryTime?: string;
  rating?: number;
  reviews?: number;
  specifications?: any[];
  additionalImages?: Array<{
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
    caption?: string;
  }>;
  video?: {
    asset: SanityAsset;
    title?: string;
    description?: string;
    thumbnail?: {
      asset: SanityAsset;
    };
  };
  customOptions?: {
    sizeOptions?: string[];
    colorOptions?: string[];
    handleOptions?: string[];
    closureOptions?: string[];
    brandingArea?: string;
    printingMethods?: string[];
    certifications?: string[];
    extraFeatures?: string[];
    packagingDetails?: any[];
  };
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg mb-4 text-text-third-dark">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-4xl font-bold mb-4 text-text-secondary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-3xl font-bold mb-3 text-text-secondary">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-text-third-dark">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-text-third-dark">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productData = await client.fetch(productBySlugQuery, { slug });
        console.log('Raw Product Data:', productData); // Debug log for raw data
        console.log('Custom Options Structure:', {
          hasCustomOptions: !!productData?.customOptions,
          customOptionsKeys: productData?.customOptions ? Object.keys(productData.customOptions) : [],
          customOptionsValues: productData?.customOptions ? Object.values(productData.customOptions) : []
        });
        setProduct(productData);
        
        if (productData && productData.category?._id) {
          const relatedProductsData = await client.fetch(relatedProductsQuery, { 
            categoryId: productData.category._id,
            slug: productData.slug.current
          });
          console.log('Related Products Data:', relatedProductsData); // Debug log
          
          // Add detailed logging for each related product's image
          relatedProductsData?.forEach((product: any, index: number) => {
            console.log(`Related Product ${index + 1} mainImage:`, product.mainImage);
            const imageUrl = getImageUrl(product.mainImage);
            console.log(`Related Product ${index + 1} generated URL:`, imageUrl);
          });
          
          setRelatedProducts(relatedProductsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Debug useEffect for image data
  useEffect(() => {
    if (product?.mainImage) {
      console.log('Product mainImage:', product.mainImage);
      const imageUrl = getImageUrl(product.mainImage);
      console.log('Generated Image URL:', imageUrl);
    }
  }, [product]);

  // Debug useEffect for custom options
  useEffect(() => {
    if (product?.customOptions) {
      console.log('Product Custom Options:', {
        hasCustomOptions: !!product.customOptions,
        sizeOptions: product.customOptions.sizeOptions,
        colorOptions: product.customOptions.colorOptions,
        handleOptions: product.customOptions.handleOptions,
        closureOptions: product.customOptions.closureOptions,
        brandingArea: product.customOptions.brandingArea,
        printingMethods: product.customOptions.printingMethods,
        certifications: product.customOptions.certifications,
        extraFeatures: product.customOptions.extraFeatures,
        packagingDetails: product.customOptions.packagingDetails
      });
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-primary">Product Not Found</h1>
          <p className="text-xl text-text-secondary mb-8">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
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
      <div className='absolute inset-0 bg-dark-black/10 z-0'>
        <img src="/bg-green2.jpg" alt="background" className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-background/70'></div>
      </div>
        <div className="relative z-10 min-h-screen pt-24 pb-16 bg-background animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Product Header */}
            <div className="mb-12 mt-10">
              <Link
                href={`/category/${product.category.slug.current}`}
                className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                    border-white/20 py-3 px-6 rounded-xl text-lg text-white shadow-xl 
                    transition-all duration-700 hover:-translate-y-1 hover:scale-110 
                    hover:bg-text-green-org hover:border-primary/20 
                    hover:shadow-2xl"
              >
                Back to {product.category.title} →
              </Link>
              
              <div className="text-center pt-10">
                <h1 className="text-4xl font-bold mb-6 text-text-primary">{product.title}</h1>
                
                <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                  {product.brandName && (
                    <p className="text-xl text-text-primary">Brand: {product.brandName}</p>
                  )}
                  
                  {product.price && (
                    <p className="text-3xl font-bold text-text-primary">${product.price}</p>
                  )}
                  
                  {product.deliveryTime && (
                    <p className="text-lg text-text-third-dark">Delivery Time: {product.deliveryTime}</p>
                  )}
                </div>
                
                {product.rating && (
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
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
                    </div>
                    <span className="ml-2 text-text-third-dark">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-6 gap-16 mb-12">

              {/* Left Column - Images */}
              <div className="space-y-8">
                {/* Main Image */}
                {product.mainImage?.asset && (
                  <div className="bg-third/50 rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20">
                      <Image
                        src={getImageUrl(product.mainImage) || ''}
                        alt={product.mainImage?.alt || product.title}
                        width={600}
                        height={400}
                        className="w-full h-[500px] object-cover"
                        priority
                      />
                      {product.mainImage.caption && (
                        <p className="text-sm text-text-third-dark p-4 text-center">{product.mainImage.caption}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Image */}
                {product.picture?.asset && (
                  <div className="bg-third/50 rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20">
                      <Image
                        src={getImageUrl(product.picture) || ''}
                        alt={product.picture?.alt || `${product.title} - Additional`}
                        width={600}
                        height={300}
                        className="w-full h-[300px] object-cover"
                      />
                      {product.picture.caption && (
                        <p className="text-sm text-text-third-dark p-4 text-center">{product.picture.caption}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-8">
                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  <PortableText 
                    value={product.description}
                    components={portableTextComponents}
                  />
                </div>

              </div>
            </div>

            {/* Mid Section */}
            <section className=''>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-6 gap-16 mb-12'>
              {/* Specifications */}
                              <div>
                                  {product.specifications && product.specifications.length > 0 && (
                                    <div className="bg-third/50 rounded-xl overflow-hidden shadow-lg">
                                      <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20 p-6 rounded-xl">
                                        <h2 className="text-3xl font-bold mb-6 text-text-secondary">Specifications</h2>
                                        <div className="prose prose-invert max-w-none">
                                          <PortableText 
                                            value={product.specifications}
                                            components={portableTextComponents}
                                          />
                                        </div>
                                      </div>
                                        </div>
                                      )}  
                                    </div>
                                <div>
                      {/* Custom Options Section */}
                    <div>
                        {product?.customOptions && Object.keys(product.customOptions).length > 0 && (
                                    <div className="mb-12">
                                      <div className="bg-third/50 rounded-xl overflow-hidden shadow-lg">
                                        <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20 p-6 rounded-lg">
                                          <h2 className="text-3xl font-bold mb-6 text-text-secondary">Custom Options</h2>
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {product.customOptions.sizeOptions && product.customOptions.sizeOptions.length > 0 && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Size Options</h3>
                                                <ul className="list-disc list-inside text-text-third-dark">
                                                  {product.customOptions.sizeOptions.map((size, index) => (
                                                    <li key={index}>{size}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}

                                            {product.customOptions.colorOptions && product.customOptions.colorOptions.length > 0 && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Color Options</h3>
                                                <ul className="list-disc list-inside text-text-third-dark">
                                                  {product.customOptions.colorOptions.map((color, index) => (
                                                    <li key={index}>{color}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}

                                            {product.customOptions.handleOptions && product.customOptions.handleOptions.length > 0 && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Handle Options</h3>
                                                <ul className="list-disc list-inside text-text-third-dark">
                                                  {product.customOptions.handleOptions.map((handle, index) => (
                                                    <li key={index}>{handle}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}

                                            {product.customOptions.closureOptions && product.customOptions.closureOptions.length > 0 && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Closure Options</h3>
                                                <ul className="list-disc list-inside text-text-third-dark">
                                                  {product.customOptions.closureOptions.map((closure, index) => (
                                                    <li key={index}>{closure}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}

                                            {product.customOptions.brandingArea && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Branding Area</h3>
                                                <p className="text-text-third-dark">{product.customOptions.brandingArea}</p>
                                              </div>
                                            )}

                                            {product.customOptions.printingMethods && product.customOptions.printingMethods.length > 0 && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Printing Methods</h3>
                                                <ul className="list-disc list-inside text-text-third-dark">
                                                  {product.customOptions.printingMethods.map((method, index) => (
                                                    <li key={index}>{method}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}


                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                    </div>
                  </div>
              </div>
            </section>    

            {/* Mid Special Section */}
            <section className='pb-14'>
              {/* Packaging Details */}
              {product?.customOptions && Object.keys(product.customOptions).length > 0 && (
                <div className=''>
                  <div className='flex flex-row gap-4 bg-third/50 rounded-xl overflow-hidden shadow-lg p-6 mb-12 border border-white/20'>
                    <div>
                    {product.customOptions.certifications && product.customOptions.certifications.length > 0 && (
                                              <div>
                                                <h3 className="text-xl font-semibold mb-2 text-text-secondary">Certifications</h3>
                                                <ul className="list-disc list-inside text-text-third-dark">
                                                  {product.customOptions.certifications.map((cert, index) => (
                                                    <li key={index}>{cert}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            )}
                    </div>
                    <div>
                    {product.customOptions.extraFeatures && product.customOptions.extraFeatures.length > 0 && (
                        <div>
                             <h3 className="text-xl font-semibold mb-2 text-text-secondary">Extra Features</h3>
                                  <ul className="list-disc list-inside text-text-third-dark">
                                             {product.customOptions.extraFeatures.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                           ))}
                                      </ul>
                                  </div>
                                )}             
                        </div>
                  </div>
                  {product.customOptions.packagingDetails && (
                    <div className='bg-third/50 rounded-xl overflow-hidden shadow-lg border border-white/20'>
                      <div className='bg-transparent/20 backdrop-brightness-90 p-6 rounded-lg'>
                      <PortableText 
                        value={product.customOptions.packagingDetails}
                        components={portableTextComponents}
                      />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Video Section */}
            {product.video?.asset?.url && (
              <div className="mb-16">
                <div className="bg-third/50 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20">
                    <div className="relative aspect-video">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        poster={product.video.thumbnail?.asset?.url}
                        preload="metadata"
                      >
                        <source 
                          src={product.video.asset.url} 
                          type={product.video.asset.mimeType || 'video/mp4'} 
                        />
                        Your browser does not support the video tag.
                      </video>
                      {(product.video.title || product.video.description) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                          {product.video.title && (
                            <h3 className="text-white font-semibold">{product.video.title}</h3>
                          )}
                          {product.video.description && (
                            <p className="text-white/80 text-sm mt-1">{product.video.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-text-secondary text-center">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {product.additionalImages.map((image, index) => {
                    const imageUrl = getImageUrl(image);
                    if (!imageUrl) return null;

                    return (
                      <div key={index} className="bg-third/50 rounded-lg overflow-hidden shadow-lg">
                        <div className="bg-transparent/20 backdrop-brightness-90 border border-white/20">
                          <div className="aspect-square">
                            <Image
                              src={imageUrl}
                              alt={image.alt || `${product.title} - Image ${index + 1}`}
                              width={400}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {image.caption && (
                            <p className="text-sm text-text-third-dark p-3 text-center">{image.caption}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <section className="mt-16 rounded-2xl p-8">
                <h2 className="text-3xl text-text-secondary font-bold mb-8 text-center">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct._id}
                      href={`/product/${relatedProduct.slug.current}`}
                      className="group bg-background rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="relative aspect-square">
                        {relatedProduct.mainImage && (
                          <Image 
                            src={getImageUrl(relatedProduct.mainImage) || ''}
                            alt={relatedProduct.title}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-text-primary group-hover:text-primary transition-colors duration-300">
                          {relatedProduct.title}
                        </h3>
                        {relatedProduct.price && (
                          <p className="text-xl font-bold text-primary mt-2">
                            ${relatedProduct.price}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    );
}