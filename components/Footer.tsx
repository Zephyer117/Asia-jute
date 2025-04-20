import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, Icon } from 'lucide-react';

const navLinks = [
  { Icon: <Facebook size={28} />, path: 'https://facebook.com' },
  { Icon: <Instagram size={28} />, path: 'https://instagram.com' },
  { Icon: <Twitter size={28} />, path: 'https://twitter.com' },
  { Icon: <Linkedin size={28} />, path: 'https://linkedin.com' },
  { Icon: <Mail size={28} />, path: 'mailto:info@asiajute.com' },
];

const Footer = () => {

  return (
    <footer className="relative bg-accent/27 text-white">
      <div className="absolute inset-0 bg-background/25" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-8 py-12">
          {/* Company Info - Wider column */}
          <div className="sm:w-full md:w-3/5">
            <h3 className="text-secondary text-2xl font-bold">Asia Jute</h3>
            <p className="mt-5">
              Leading the way in sustainable jute products and eco-friendly solutions for a better tomorrow. We are committed to providing high-quality jute products while promoting environmental sustainability and supporting local communities.
            </p>
            <div className="flex space-x-4 mt-5">
              {navLinks.map((link) => (
                <a 
                  href={link.path} 
                  key={link.path} 
                  className="group relative hover:text-secondary-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.Icon}
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r 
                             from-text-secondary to-text-green transform origin-left 
                             transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links - Narrower column */}
          <div className="" >
            <h3 className="text-2xl font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category" className="text-lg hover:text-secondary-dark">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-lg hover:text-secondary-dark">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-lg hover:text-secondary-dark">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-lg hover:text-secondary-dark">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info - Narrower column */}
          <div className="">
            <h3 className="text-2xl font-semibold mb-4 text-secondary">Contact Us</h3>
            <ul className="flex flex-col gap-2 justify-around">
              <li className="flex items-center">
                <Mail size={18} className='mr-2'/>
                <span>info@asiajute.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className='mr-2'/>
                <span>+880 1234 567890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Asia Jute. All rights reserved.
            </p>
            <div className="flex space-x-4 text-lg">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
