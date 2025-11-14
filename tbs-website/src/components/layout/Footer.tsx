import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const settings = await prisma.siteSettings.findFirst({ where: { id: 1 } });
  const footerText = settings?.footerText || `© ${currentYear} The Business Sidekick. All rights reserved.`;

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/secondry.png" 
                alt="TBS Logo" 
                className="w-full sm:w-33" 
                width={240}
                height={60}
                style={{ maxWidth: '15rem' }} 
              />
            </Link>
            <p className="text-secondary mb-4 font-body">
              Think. Build. Scale. An action-oriented learning hub for practical skills that convert directly into income.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="https://twitter.com/tbs" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="h-6 w-6 text-white hover:text-secondary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://youtube.com/tbs" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg className="h-6 w-6 text-white hover:text-secondary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://instagram.com/tbs" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="h-6 w-6 text-white hover:text-secondary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-white hover:text-secondary transition-colors font-body">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-secondary transition-colors font-body">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-white hover:text-secondary transition-colors font-body">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-secondary transition-colors font-body">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-secondary transition-colors font-body">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-heading font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/community" className="text-white hover:text-secondary transition-colors font-body">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-white hover:text-secondary transition-colors font-body">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white hover:text-secondary transition-colors font-body">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white hover:text-secondary transition-colors font-body">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-heading font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-white mb-4 font-body">
              Subscribe to our newsletter for the latest updates, tips, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md focus:outline-none text-text font-body"
                aria-label="Email for newsletter"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-primary rounded-md hover:bg-white transition-colors font-body font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-accent mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm mb-4 md:mb-0 font-body">
            {footerText}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-white hover:text-secondary transition-colors text-sm font-body flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-2.257-2.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"></path>
              </svg>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white hover:text-secondary transition-colors text-sm font-body flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
              </svg>
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-white hover:text-secondary transition-colors text-sm font-body flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
