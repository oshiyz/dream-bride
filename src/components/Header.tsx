'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Dream Bride
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/') ? 'text-blue-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/collections"
              className={`text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/collections') ? 'text-blue-600' : ''
              }`}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/about') ? 'text-blue-600' : ''
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/contact') ? 'text-blue-600' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              href="/"
              className={`block text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/') ? 'text-blue-600' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/collections"
              className={`block text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/collections') ? 'text-blue-600' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`block text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/about') ? 'text-blue-600' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`block text-gray-800 hover:text-blue-600 transition-colors ${
                isActive('/contact') ? 'text-blue-600' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 