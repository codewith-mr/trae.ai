"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="bg-background shadow-1 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/primary2.png" alt="TBS Logo" className="w-20" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            href="/" 
            className={`font-body font-semibold transition-colors ${isActive('/') && pathname === '/' ? 'text-primary' : 'text-text hover:text-primary'}`}
          >
            Home
          </Link>
          <Link 
            href="/courses" 
            className={`font-body font-semibold transition-colors ${isActive('/courses') ? 'text-primary' : 'text-text hover:text-primary'}`}
          >
            Courses
          </Link>
          <Link 
            href="/blog" 
            className={`font-body font-semibold transition-colors ${isActive('/blog') ? 'text-primary' : 'text-text hover:text-primary'}`}
          >
            Blog
          </Link>
          <Link 
            href="/tools" 
            className={`font-body font-semibold transition-colors ${isActive('/tools') ? 'text-primary' : 'text-text hover:text-primary'}`}
          >
            Tools
          </Link>
          <Link 
            href="/tips-tricks" 
            className={`font-body font-semibold transition-colors ${isActive('/tips-tricks') ? 'text-primary' : 'text-text hover:text-primary'}`}
          >
            Tips & Tricks
          </Link>
          <Link 
            href="/about" 
            className={`font-body font-semibold transition-colors ${isActive('/about') ? 'text-primary' : 'text-text hover:text-primary'}`}
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-neutral-200 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`font-body font-semibold py-2 transition-colors ${isActive('/') && pathname === '/' ? 'text-primary' : 'text-text hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`font-body font-semibold py-2 transition-colors ${isActive('/courses') ? 'text-primary' : 'text-text hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/blog" 
              className={`font-body font-semibold py-2 transition-colors ${isActive('/blog') ? 'text-primary' : 'text-text hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/tools" 
              className={`font-body font-semibold py-2 transition-colors ${isActive('/tools') ? 'text-primary' : 'text-text hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              href="/tips-tricks" 
              className={`font-body font-semibold py-2 transition-colors ${isActive('/tips-tricks') ? 'text-primary' : 'text-text hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tips & Tricks
            </Link>
            <Link 
              href="/about" 
              className={`font-body font-semibold py-2 transition-colors ${isActive('/about') ? 'text-primary' : 'text-text hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;