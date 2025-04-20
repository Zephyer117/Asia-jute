'use client';

import FancyCarousel from '@/components/FancyCarousel';
import FancyCarousel2 from '@/components/FancyCarousel2';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function About() {

  const skills = [
    { name: 'Web Development', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Mobile Development', level: 80 },
    { name: 'Project Management', level: 75 },
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'React/Next.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'UI Frameworks', level: 90 },
  ];

  const workExp = [
    {
      title: 'Sustainability at the Core',
      description: 'We design every product with the planet in mind using biodegradable, renewable, and recyclable materials. Our goal is not just to reduce harm but to create lasting value through eco-conscious innovation.',
      icon: '🌿',
    },
    {
      title: 'Purpose-Driven Innovation',
      description: 'We blend traditional craftsmanship with forward-thinking design. The result? Beautiful, functional, and sustainable products that reflect our values and meet the needs of a conscious global market.',
      icon: '🔧',
    },
    {
      title: 'Integrity in Every Step',
      description: 'Ethical business is our foundation. From sourcing to shipping, we uphold complete transparency, uncompromising quality, and environmental responsibility across every part of our process.',
      icon: '✅',
    },
    {
      title: 'People-First Philosophy',
      description: 'Our impact starts with people. We collaborate with rural communities, skilled artisans, and emerging entrepreneurs providing fair wages, inclusive opportunities, and pathways to economic independence.',
      icon: '👥',
    },
  ];

  const ourImpact = [
    {
      title: 'Sustainability at the Core',
      description: 'Empowered hundreds of families by creating fair and sustainable livelihoods in underserved communities.',
    },
    {
      title: 'Purpose-Driven Innovation',
      description: 'Reduced plastic waste by replacing harmful materials with biodegradable, earth-friendly alternatives.',
    },
    {
      title: 'Integrity in Every Step',
      description: 'Supplied eco-conscious products to local and international markets that value purpose over profit.',
      icon: '✅',
    },
  ];

const impactNUmber = [
    {
      title: 'Sustainability at the Core',
      description: '👥 500+ families supported',
    },
    {
      title: 'Purpose-Driven Innovation',
      description: '♻️ 10+ tons of plastic waste saved',
    },
    {
      title: 'Integrity in Every Step',
      description: '🌍 15 countries reached',
    },
];


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div>
      {/* Profile Section */}
      <section className='relative pt-36 pb-16 bg-gradient-to-br 
        from-text-green/50 via-bg-secondary-dark/80 to-text-green-dark/30'>
            <div className="absolute inset-0 z-0 bg-background">
              <Image 
                src="/bg-organic-about.jpg" 
                width={1000}
                height={1000}
                alt="background" 
                className="w-full h-full object-cover"
                priority
                placeholder="blur"
                blurDataURL="/bg-organic-about-blur.jpg"
                quality={50}
              />
              <div className="absolute inset-0 bg-dark-black/55"/>
            </div>
            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-16 animate-fade-in">
                      <div className="w-48 h-48 rounded-full overflow-hidden bg-secondary-dark flex-shrink-0">
                        {/* Placeholder for profile image */}
                        <div className="w-full h-full flex items-center justify-center text-text-secondary">
                          Profile Image
                        </div>
                      </div>
                  <div className="flex-1 text-center md:text-left">
                  <h1 className="text-5xl font-bold text-left mb-4 
                  bg text-wrap bg-gradient-to-r from-text-secondary  
                  to-text-secondary bg-clip-text text-transparent">About Vision Asia</h1>
                    <h2 className="text-2xl font-semibold mb-4 text-text-primary">Empowering Sustainable Innovation</h2>
                    <p className="text-text-secondary mb-4">
                    At Vision Asia International, we believe in a world where progress and sustainability 
                    go hand in hand. Our mission is to lead the transition towards a 
                    greener, more inclusive global economy by offering environmentally 
                    friendly products, empowering communities, and building meaningful partnerships.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                      <Link
                        href="/contact"
                        className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 py-3 px-6 rounded-xl text-lg text-white shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 hover:bg-text-green-org-dark hover:border-primary/20 
                hover:shadow-2xl"
                      >
                        Contact Me
                      </Link>
                      <Link
                        href="/history"
                        className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 py-3 px-6 rounded-xl text-lg text-white shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 
                hover:bg-text-green-org hover:border-primary/20 
                hover:shadow-2xl"
                      >
                        Our History
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
        </section>
        
        {/* Whoo We are Section */}
        <section className='animate-fade-in'>
          <div className='flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-4 justify-center'>
              <h1 className='text-4xl font-semibold text-text-secondary'>Who We Are</h1>
              <p className='text-lg text-text-primary mb-4'>Vision Asia International is a forward-thinking organization dedicated to developing and promoting sustainable solutions across industries. From natural fiber-based goods to ethically produced lifestyle products, our offerings are carefully crafted to reduce environmental impact and inspire conscious living.</p>
            </div>
            <div className="flex items-center justify-center">
            <FancyCarousel />
            </div>
          </div>
        </section>
 
        {/* What We Stand For Section */}
        <section className="relative py-20 overflow-hidden bg-accent/27">
          <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-background/25" />
            </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className='text-4xl font-bold text-center text-text-secondary mb-5 animate-slide-down'>
            What <span className='text-text-green-dark/85'>Vision Asia</span> Stands For
            </h1>
            <p className='text-text-white text-center text-lg mb-10 animate-slide-down w-3/4 mx-auto'>
            Our work centers around meaningful action and scalable change. 
            From sustainable product innovation to education and international collaboration, 
            we focus on areas that help build resilient communities and a healthier planet.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
              {workExp.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center p-8 rounded-2xl border border-white/10 
                  bg-gradient-to-br from-white/5 via-white/10 to-white/5 
                  shadow-md backdrop-blur-sm relative overflow-hidden transition-all duration-300 
                  hover:scale-105 hover:shadow-2xl hover:border-primary/20 cursor-pointer"
                >
                  {/* Gradient Glow Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br 
                  from-text-green/35 
                  via-accent-dark/25 to-text-green-dark/30 
                  opacity-0 group-hover:opacity-100 transition-opacity 
                  duration-300 blur-md rounded-2xl pointer-events-none" />

                  {/* Light Glow Shimmer */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 
                  transition-opacity duration-300 rounded-2xl blur-sm pointer-events-none" />

                  <div className="relative z-10 w-6/7 mx-auto">
                    <div className="text-2xl font-extrabold text-primary group-hover:text-secondary transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8'>
              <div>
                <h1 className='text-center text-text-secondary text-4xl font-bold py-4'>Founder's Message</h1>
                <div className="flex gap-4">
                      {/* Decorative Bar */}
                      <div className="w-3 bg-text-secondary rounded-full" />
                      {/* Quote Text */}
                      <p className="text-text-primary text-left text-lg py-2">
                        <span className="text-text-secondary text-xl">" </span>
                        <span className='text-text-green-dark'>Vision Asia International</span>  was born from a belief that commerce can 
                        be a force for good. Growing up around rural craftsmanship 
                        and witnessing both its beauty and struggles, I saw an opportunity 
                        to connect tradition with the future. Today, we stand for more than 
                        products we stand for people, planet, and purpose. Thank you for being 
                        part of our journey toward a greener, fairer world.<span className="text-text-secondary text-xl"> "</span>
                        <br />
                        <span className="text-xl block mt-2 font-semibold text-text-secondary">Mr. [Your Name], Founder & CEO</span>
                      </p>
                    </div>
              </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section>
              <div className="mb-16 animate-fade-in max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className='flex flex-col lg:flex-row gap-4'>
                  <div>
                    <div className='flex flex-col gap-4 justify-center'>
                      <h2 className="text-4xl font-semibold mb-2 text-text-secondary">Our Impact</h2>
                        <p className='text-lg text-text-primary mb-4'>
                        At Vision Asia International, impact isn't just a goal it's our measure of success. 
                        Over the years, we've cultivated a growing network of changemakers, 
                        including small-scale farmers, women-led cooperatives, ethical brands, 
                        and conscious consumers across the globe. Together, 
                        we are reshaping industries through responsible innovation.
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 justify-center'>
                        {ourImpact.map((impact, index) => (
                          <div key={index}>
                            <ul>
                              <li className="text-primary mb-2">🟢{impact.description}</li>
                            </ul>
                          </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-2 justify-center mt-1'>
                        {impactNUmber.map((impact, index) => (
                          <div key={index}>
                            <ul>
                              <li className="text-primary mb-2">{impact.description}</li>
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <FancyCarousel2 />  
                  </div>     
                </div>
              </div>
        </section>

        {/* Looking Ahead CTA Section */} 
        <section className="relative py-36 bg-gradient-to-br from-secondary to-secondary-dark text-text-primary">
        <div className="absolute inset-0 z-0">
          <Image 
          width={1000}
          height={1000}
          src="/bg-organic-about2.jpg" 
          alt="background" 
          className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80"/>
        </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-secondary text-5xl font-bold mb-12 animate-slide-down">Looking Ahead</h2>
                    <p className="text-2xl mb-10 max-w-3xl mx-auto animate-slide-down">
                    Our journey is far from over. We're committed to scaling our impact 
                    through global partnerships, sustainable development, and community 
                    empowerment. Vision Asia International isn't just a brand it's a movement 
                    towards a cleaner, fairer future for all.
                    </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden backdrop-blur-md bg-white/10 border 
                border-white/20 py-3 px-6 rounded-2xl text-lg text-white shadow-xl 
                transition-all duration-700 hover:-translate-y-1 hover:scale-110 
                hover:bg-text-green-org hover:border-primary/20 
                hover:shadow-2xl">
                  Get In Touch
                </Link>
              </div>
        </div>
        </section>
        </div>
      )}
      </div>
  );
} 