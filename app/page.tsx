'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client, categoriesQuery, productsQuery, getImageUrl } from '@/lib/sanity';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { FaLinkedin } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import VideoPlayer from './components/VideoPlayer';
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
  };
  features: Array<{
    title: string;
    description?: string;
  }>;
  order: number;
  isFeatured: boolean;
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
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-text-secondary">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 text-text-primary">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-text-secondary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-text-secondary">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          client.fetch(categoriesQuery),
          client.fetch(productsQuery),
        ]);
        setCategories(categoriesData || []);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          if (entry.target.hasAttribute('data-testimonial-card')) {
            entry.target.classList.add('translate-y-0');
          }
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe testimonial elements
    const testimonialTitle = document.querySelector('[data-testimonial-title]');
    const testimonialCards = document.querySelectorAll('[data-testimonial-card]');
    
    if (testimonialTitle) observer.observe(testimonialTitle);
    testimonialCards.forEach(card => observer.observe(card));

    return () => {
      if (testimonialTitle) observer.unobserve(testimonialTitle);
      testimonialCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const EcoProduct = [
    {
      name: '',
      title: 'ECO-FRIENDLY MANUFACTURING',
      content: 'We emphasize transparency and eco-consciousness at every stage of the production process. Our materials and techniques are selected to minimize environmental impact without compromising quality.',
      image: '♻️',
    },
    {
      name: '',
      title: 'STRICT QUALITY ASSURANCE',
      content: 'Our quality control process ensures that every product meets global standards. Each item is tested and verified to maintain consistency and durability throughout all batches.',
      image: '🌾',
    },
    {
      name: '',
      title: 'PROMPT & RELIABLE SHIPPING',
      content: 'We guarantee timely delivery, backed by a dedicated logistics team. In the rare event of delays, we offer flexible compensation and ensure our clients stay updated with real-time tracking.',
      image: '🚚',
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Awards Won', value: '10+' },
  ];

  const socialmedia = [
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: 'https://www.facebook.com/webnexter',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/webnexter',
    },
    {
      name: 'Twitter',  
      icon: <FaTwitter />,
      url: 'https://www.twitter.com/webnexter',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/webnexter',
    },
  ];

  const heroinfo = [
    {/* 
      
    */}
  ];

  const heroinfoFeatures = [
    {
      title: 'Sustainable Solutions',
      image: '/approval.png',
      description: 'We deliver sustainable alternatives that help minimize environmental impact and promote responsible living.',
    },
    {
      title: 'Cost-Effective Services',
      image: '/devices.png',
      description: 'Our solutions are designed to be budget-friendly without compromising quality helping you save while making a difference.',
    },
    {
      title: 'Global Impact',
      image: '/online-business.png',
      description: 'Our eco-conscious practices aim to create long-term global change by supporting green innovations across borders.',
    },
    {
      title: 'Environmental Commitment',
      image: '/online-business.png',
      description: 'From materials to operations, everything we do is focused on preserving nature and promoting environmental safety for all.',
    },
  ];

  const FocusSection = [
    { label: '🛠️ Sustainable Product Development ', 
      description: 'We create practical, eco-friendly products using renewable materials like jute and cotton. Sustainability is embedded in every stage from design to production ensuring low environmental impact and long-term value.' },
    { label: '🤝 Community Empowerment', 
      description: 'Our work supports rural communities by offering fair jobs, skill development, and opportunities especially for women and youth. We aim to turn local craftsmanship into meaningful economic growth.' },
    { label: '🌍 Eco-Friendly Export Solutions', 
      description: 'We offer businesses worldwide sustainable alternatives through ethical sourcing and low-impact packaging. Our export process ensures that quality meets conscious responsibility at every step.' },
    { label: '🌐 Global Partnerships', 
      description: 'We team up with NGOs, governments, and ethical brands to scale sustainable impact globally. These collaborations help us innovate, grow, and bring green solutions to international markets.' },
  ];

  return (
    
    <main className="min-h-screen">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
         <div>
        <section className="relative pt-58 pb-32 min-h-screen">
        {/* Gradient Background Layers */}
         <div className='absolute inset-0 bg-background z-0'>
          <Image
            src="/bg-organic3.jpg"
            alt="background"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="/bg-organic3-blur.jpg"
            priority // Ensures it's loaded early since it's above the fold
            quality={70}
          />
          <div className='absolute inset-0 bg-background/80'/>
        </div>
        {/* Container */}
        <div className="container mx-auto px-6 relative z-10 duration-1000">
          <div className="max-w-4xl text-center mx-auto animate-fade-in">
            {/* Animated Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-text-silver tracking-tight leading-tight flex justify-center flex-wrap gap-1 animate-fade-in-down">
              {"Vision  Asia".split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-slide-down"
                  style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
                <h1 className='text-4xl md:text-5xl font-bold text-text-green mt-6 mb-4'>
                    International      
                </h1>  
            {/* Subtitle */}
            <p className="text-xl md:text-3xl font-bold text-text-secondary mt-6 mb-4">
            Empowering Change Through Sustainable Solutions
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-text-primary mb-10 max-w-3xl mx-auto animate-fade-in-left leading-relaxed">
            At Vision Asia International, we are committed to creating a better, greener, and more inclusive future. Join us in our mission to drive impactful change across industries, uplift communities, and protect our environment.
            </p>

            {/* CTA + Social */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-6 animate-fade-in-right">
              <Link
                href="#contact"
                className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 px-6 py-3 rounded-xl text-xl text-white shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-br 
                hover:from-primary/35 hover:to-secondary-dark/48 hover:border-primary/20 
                hover:shadow-2xl"
              >
                Know More 
              </Link>

              <div className="flex justify-center gap-4">
                {socialmedia.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 p-3 rounded-xl text-2xl text-white shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-br 
                hover:from-primary/46 hover:to-secondary-dark/64 hover:border-primary/20 
                hover:shadow-2xl"
                  >

                    <span className="relative z-10">{item.icon}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-scroll-dot" />
          </div>
          <p className="mt-2 text-sm text-white/60">Scroll down</p>
        </div>

        {/* Extra Keyframe Animation Styles *
        <style jsx>{`
          @keyframes scroll-dot {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(6px); opacity: 1; }
          }
          .animate-scroll-dot {
            animation: scroll-dot 1.5s infinite;
          }
          @keyframes fade-up {
            0% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-fade-up {
            animation: fade-up 0.5s forwards;
          }
          `}</style> */}

      </section>
      {/* Stats Section */}
      {/* Welcome to Vision Asia International Section */}
      <section className="relative py-15 lg:py-36 bg-secondary-dark/15">
        {/* Stats Content */}
           <section className="relative py-15 overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group text-center p-8 rounded-2xl border border-white/10 
                    bg-gradient-to-br from-white/5 via-white/10 to-white/5 
                    shadow-md backdrop-blur-sm relative overflow-hidden transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl hover:border-primary/20 cursor-pointer"
                  >
                    {/* Gradient Glow Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-2xl pointer-events-none" />

                    {/* Light Glow Shimmer */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 
                    transition-opacity duration-300 rounded-2xl blur-sm pointer-events-none" />

                    <div className="relative z-10">
                      <div className="text-4xl font-extrabold text-primary group-hover:text-secondary transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           </section>
          <div className="absolute inset-0 z-0 bg-background">
              <Image src="/bg-organic2.jpg" 
              alt="background" 
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/bg-organic2-blur.jpg"
              priority // Ensures it's loaded early since it's above the fold
              quality={70} />
              <div className="absolute inset-0 bg-primary-dark/35"/>
          </div>
            <div className="flex flex-col lg:flex-row items-center 
            justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col gap-8 w-full md:w-3/4 lg:w-1/2 mt-5">
              <div className='w-full block lg:hidden'>
                    <h2 className="text-5xl font-bold text-center mb-4 
                    animate-slide-down text-secondary">Welcome to Vision Asia International</h2>
              </div>
                {heroinfo.map((item, index)=>(
                  <div key={index} className="flex flex-col md:flex-row items-center gap-4 w-full">
                    {/*<Image src={item.image} alt={item.title} className="w-16 h-16 rounded-xl bg-dark-black" />*/}
                    <div>
                      <p className="text-text-primary text-left md:text-center text-lg">
                        {`At Vision Asia International, we are committed to driving inclusive growth through innovative ventures and sustainable development. Our initiatives empower underprivileged communities, especially women, by creating employment opportunities across both urban and rural regions.
                            We strive to reduce poverty and uplift lives by delivering reliable, high-quality services and eco-conscious products that meet the evolving needs of today's global market.
                            With a focus on integrity, quality, and consistency, Vision Asia International is on the path to becoming a trusted name in our industry valued by partners and appreciated by customers around the world.`}</p>
                    </div>
                  </div>
                ))}
              </div>   
              <div className='w-full md:w-1/2 lg:w-1/2 hidden lg:block'>
            <h2 className="text-5xl font-bold text-center mb-4 
            animate-slide-down text-secondary">Welcome to Vision Asia International</h2>
              </div>
            </div>
      </section>

      {/* Product Section */}
      <section className="relative pt-25 pb-36 bg-secondary-dark/24">
        <div className="absolute inset-0 bg-third/55" /> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-4 animate-slide-down text-text-primary">Our Products</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug.current}`}
                  className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
            transition-all duration-500 ease-in-out transform hover:-translate-y-2 
            hover:scale-[1.02] bg-gradient-to-br from-secondary-light to-secondary"
                >
                  <div className="relative h-48 bg-secondary">
                    {product.mainImage && getImageUrl(product.mainImage) && (
                      <Image
                        src={getImageUrl(product.mainImage)!}
                        alt={product.mainImage.alt || product.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-md font-semibold text-primary 
                    bg-gradient-to-br from-primary-dark to-secondary-light rounded-full mb-2">
                      {product.category?.title || 'Uncategorized'}
                    </span>
                    <h3 className="text-2xl font-semibold mb-2 text-text-primary">{product.title}</h3>
                    <div className="text-text-secondary text-md mb-4">
                      <PortableText 
                        value={product.description.slice(0, 2)}
                        components={portableTextComponents}
                      />
                    </div>
                    {product.price && (
                      <p className="text-2xl font-bold text-primary">${product.price}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/*Our Company Provide Best Just For You Section */}
      <section className="py-0 relative overflow-hidden ">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 ">
          <Image  
            src="/bg-organic.png" 
            alt="background" 
            fill
            className="w-full h-full object-cover"
            placeholder="blur"
            blurDataURL="/bg-organic-blur.jpg"
            priority // Ensures it's loaded early since it's above the fold
            quality={70}
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-background/75"/>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
          <div className='text-center md:text-left lg:text-center w-full lg:w-3/4 xl:w-3/4 
          md:mx-0 lg:mx-auto px-4 sm:px-6 lg:px-8 py-2'>
            <h2 className="text-text-secondary text-4xl font-bold mb-4 animate-slide-down w-4/5 md:w-6/6 mx-auto">
              We provide the best products for you
            </h2>
            <p className='text-text-primary text-lg'>
              At Vision Asia International, we believe in building a greener, smarter, and more sustainable future. Our mission is to create eco-friendly solutions that not only benefit businesses but also contribute to a cleaner planet. With innovation and integrity at our core, we aim to lead the way toward a healthier environment and a better tomorrow.
            </p>
          </div>        

          <div className="flex flex-row items-center justify-center">
            <div className='md:w-full lg:w-2/3 relative z-10'>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 w-full md:w-full lg:w-4/5 mt-5">
                {heroinfoFeatures.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center gap-4 
                  group text-center p-4 rounded-2xl border border-white/10 
                    bg-gradient-to-br from-white/5 via-white/10 to-white/5 
                    shadow-md backdrop-blur-sm relative overflow-hidden transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl hover:border-primary/20 cursor-pointer">
                    <Image src={item.image} 
                    alt={item.title} 
                    width={500}
                    height={500}
                    className="w-16 h-16 rounded-1/2" />
                    <div>
                      <h3 className="text-2xl font-bold text-center md:text-left">{item.title}</h3>
                      <p className="text-center md:text-left">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='absolute md:absolute lg:relative w-3/3 sm:w-2/2 md:w-1/2 z-1 overflow-hidden'>
              <Image 
                src="/organic-Photoroom.png" 
                alt="organic" 
                width={500}
                height={500}
                className="rounded-1/2 shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-24 bg-primary-dark/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-primary 
            mb-10 animate-slide-down tracking-tight">
              Vision Asia Products.
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-14 w-14 border-4 b
                order-t-transparent border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in stagger-children">
                {categories.slice(0, 3).map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug.current}`}
                    className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                    transition-all duration-500 ease-in-out transform hover:-translate-y-2 
                    hover:scale-[1.02] bg-gradient-to-br from-secondary-light to-secondary"
                  >
                    <div className="relative h-52 bg-secondary-dark">
                      {category.mainImage && getImageUrl(category.mainImage) && (
                        <Image
                          src={getImageUrl(category.mainImage)!}
                          alt={category.mainImage.alt || category.title}
                          className="w-full h-full object-cover transition-opacity 
                          duration-300 group-hover:opacity-90"
                          width={500}
                          height={500}
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-3 text-text-primary 
                      group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h3>
                      <div className="text-text-secondary text-base md:text-lg line-clamp-3 mb-6">
                        <PortableText
                          value={category.description.slice(0, 2)}
                          components={portableTextComponents}
                        />
                      </div>
                      <div className="text-primary font-medium hover:text-primary-dark 
                      transition-colors inline-flex items-center gap-1">
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
      </section>

      {/* Focus Section */}
      <section className="relative py-20 overflow-hidden bg-accent/27">
          <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-background/25" />
            </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className='text-4xl font-bold text-center text-text-secondary mb-5 animate-slide-down'>
            🌿 Core Areas of Focus
            </h1>
            <p className='text-text-white text-center text-lg mb-10 animate-slide-down w-3/4 mx-auto'>
            Our work centers around meaningful action and scalable change. 
            From sustainable product innovation to education and international collaboration, 
            we focus on areas that help build resilient communities and a healthier planet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
              {FocusSection.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center p-8 rounded-2xl border border-white/10 
                  bg-gradient-to-br from-white/5 via-white/10 to-white/5 
                  shadow-md backdrop-blur-sm relative overflow-hidden transition-all duration-300 
                  hover:scale-105 hover:shadow-2xl hover:border-primary/20 cursor-pointer"
                >
                  {/* Gradient Glow Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-secondary/30 to-accent/20 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md rounded-2xl pointer-events-none" />

                  {/* Light Glow Shimmer */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 
                  transition-opacity duration-300 rounded-2xl blur-sm pointer-events-none" />

                  <div className="relative z-10 w-6/7 mx-auto">
                    <div className="text-2xl font-extrabold text-primary group-hover:text-secondary transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-36 bg-gradient-to-br from-secondary to-secondary-dark text-text-primary">
        <div className="absolute inset-0 z-0">
          <Image src="/bg-organic4.jpg" 
          alt="background" 
          fill
          className="w-full h-full object-cover" 
          placeholder="blur"
          blurDataURL="/bg-organic4-blur.jpg"
          priority // Ensures it's loaded early since it's above the fold
          quality={70} />
          <div className="absolute inset-0 bg-background/80"/>
        </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-secondary text-5xl font-bold mb-12 animate-slide-down">Want To Get In Touch?</h2>
                    <p className="text-2xl mb-10 max-w-3xl mx-auto animate-slide-down">
                    Got a question or want to discuss your project? 
                    We'd love to hear from you! Drop us a message to say hi, 
                    and our friendly team will get back to you soon.
                    </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className=" group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 px-6 py-2 rounded-4xl text-2xl font-bold shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-br 
                hover:from-primary/46 hover:to-secondary-dark/64 hover:border-primary/20 
                hover:shadow-2xl z-10">
                  Get In Touch
                </Link>
              </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative pt-25 pb-36 overflow-hidden bg-secondary-dark/20" id="testimonials">
        <div className="absolute inset-0 bg-third/55" />
            {/* Enhanced 3D-like Background Elements */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <h2 className="text-text-secondary text-4xl font-bold text-center transition-opacity duration-1000">
                Eco-Friendly & Sustainable Future
              
              </h2>
              <p className="text-center text-xl animate-slide-down w-3/4 mx-auto mt-5">
              At Vision Asia International, our product line reflects our deep commitment to environmental responsibility and quality. 
              Each item is designed to promote sustainability while meeting the highest standards of functionality and aesthetics. 
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {EcoProduct.map((EcoProduct, index) => (
                  <div 
                    key={index}
                    className="group bg-secondary/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg 
                    hover:shadow-xl hover:-translate-y-1
                    border border-secondary/10 relative overflow-hidden opacity-0 translate-y-20 transition-all duration-1000"
                    data-testimonial-card
                    style={{ transitionDelay: `${index * 200}ms` }}
                  > 
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20 flex items-center justify-center">
                          <span className="text-4xl text-primary text-center">
                            {EcoProduct.image}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
                            {EcoProduct.name}
                          </h3>
                          <p className="text-2xl font-bold text-text-secondary">{EcoProduct.title}</p>
                        </div>
                      </div>
                      <p className="text-primary text-lg italic relative pl-6">
                        <span className="absolute left-0 top-0 text-4xl text-primary/20 group-hover:text-primary/30 transition-colors duration-300">"</span>
                        {EcoProduct.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </section>
         </div>
      )}
    </main>
  );
}
