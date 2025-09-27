// components/Header.js
import Link from 'next/link';

// A modern, sticky header with a backdrop blur effect.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-dark-navy/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Site Title / Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white hover:text-bright-blue transition-colors">
              Rohit Hegde
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-light-slate hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/blog" className="text-light-slate hover:text-white transition-colors font-medium">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}