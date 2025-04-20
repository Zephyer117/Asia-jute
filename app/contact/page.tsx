'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import Image from 'next/image'

export default function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('3NxuO7x8kLP41_5Mc');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await emailjs.send(
        'service_u06q99s',      // Your EmailJS service ID
        'template_y3a8yes',     // Your EmailJS template ID
        formData,               // Form data that matches your template variables
        '3NxuO7x8kLP41_5Mc'    // Your EmailJS public key
      );
      setSuccess(true);
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch (err) {
      setError(true);
      console.error('EmailJS error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'info@visionasia.com'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+880 (123) 456-7890'
    },  
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Your Location Here'
    }
  ]
  
  const socialLinks = [
    {
      href: 'https://www.facebook.com',
      icon: <FaFacebook />
    },
    {
      href: 'https://www.facebook.com',
      icon: <FaFacebook />
    },
    {
      href: 'https://www.facebook.com',
      icon: <FaFacebook />
    },
    {
      href: 'https://www.facebook.com',
      icon: <FaFacebook />
    }
  ]   

  const founder = [
    {
      image: '/NextJs.png',
      name: "founder name",
      title: "Founder & Visionary",
    },
    {
      image: '/NextJs.png',
      name: "name",
      title: "Head of Product Development",
    },
    {
      image: '/NextJs.png',
      name: "name",
      title: "Community Liaison",
    },
    {
      image: '/NextJs.png',
      name: "name",
      title: "Export & Logistics Manage",
    }
  ]
  
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
    <div className='relative top-0 left-0 w-full h-24 backdrop-blur-xl bg-white/35 
    text-lg text-white shadow-xl'>
     <div className='absolute top-0 left-0 w-full h-full bg-black/2'/>             
    </div>

    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-700 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* Contact & Social Info */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className='relative rounded-2xl'>
                <div className='absolute rounded-2xl inset-0 bg-white/65 z-0'>
                    <img src="/bg-organic-about.jpg" alt="background" className='w-full h-full object-cover rounded-2xl' />
                  <div className='absolute inset-0 bg-background/40 rounded-2xl'/>
                </div>
                  <div className="backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-400/20 space-y-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <h2 className="text-2xl font-bold text-gray-700">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 group">
                        <div className="p-3 rounded-full backdrop-blur-md text-black/70 text-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-500/30 group-hover:shadow-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                          <p className="text-text-primary">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>


            {/* Social Media */}
            <div className='relative rounded-2xl'>
                <div className='absolute rounded-2xl inset-0 bg-white/65 z-0'>
                    <img src="/bg-organic4.jpg" alt="background" className='w-full h-full object-cover rounded-2xl' />
                  <div className='absolute inset-0 bg-background/40 rounded-2xl'/>
                </div>
                <div className="backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-400/20 space-y-4 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold text-gray-700">Follow Us</h2>
              <div className="flex items-center space-x-4">
                {socialLinks.map(({ href, icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-400/30 backdrop-blur-md p-3 rounded-full hover:bg-text-green-dark transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <span className="w-6 h-6 text-black/70">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='relative rounded-2xl'>
                <div className='absolute rounded-2xl inset-0 bg-white/65 z-0'>
                  <img src="/bg-organic4.jpg" alt="background" className='w-full h-full object-cover rounded-2xl' />
                  <div className='absolute inset-0 bg-background/40 rounded-2xl'/>
                </div>
                <div className="backdrop-blur-xl bg-gray-300/30 rounded-2xl p-8 shadow-lg border border-gray-400/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-400/20 bg-gray-400/30 backdrop-blur-md text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 focus:bg-gray-500/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-400/20 bg-gray-400/30 backdrop-blur-md text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 focus:bg-gray-500/30"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-400/20 bg-gray-400/30 backdrop-blur-md text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 focus:bg-gray-500/30"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500/90 backdrop-blur-md text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-[1.02]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaEnvelope className="text-lg" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Feedback Message */}
                {success && (
                  <div className="mt-4 p-4 bg-green-200/50 backdrop-blur-md border border-green-300/50 rounded-lg">
                    <p className="text-green-600 text-center">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}
                {error && (
                  <div className="mt-4 p-4 bg-red-200/50 backdrop-blur-md border border-red-300/50 rounded-lg">
                    <p className="text-red-500 text-center">Something went wrong. Please try again.</p>
                  </div>
                )}
              </div>
            </form>
          </div>
          </div>

        </div>

        <div className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-700 pb-3'>
              You Can Also Connect With
            </h1>
            <p className='text-lg text-gray-500 max-w-2xl'>
              Get to know the passionate people working behind the scenes to make sustainability happen.
            </p>
          </div>

          {/* Founder Cards with Enhanced Glass Effect */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {founder.map((person, index) => (
              <div
                key={index}
                className='group backdrop-blur-xl bg-gray-300/30 rounded-2xl border border-gray-400/20 p-6 text-center flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]'
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  width={80}
                  height={80}
                  className='rounded-full object-cover w-20 h-20 mb-4 border-4 border-gray-400/20 shadow-lg'
                />
                <h2 className='text-xl font-semibold text-gray-700 mb-1 group-hover:text-green-500 transition-colors duration-300'>
                  {person.name}
                </h2>
                <p className='text-sm text-gray-500'>{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        </div>
      )}
    </div>
  );
}
