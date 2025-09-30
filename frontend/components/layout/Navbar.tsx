'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Search, Database, BookOpen, FileText } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 mr-2 relative">
                <Image
                  src="/https://cdn.wallpapersafari.com/45/43/nWKNt3.png"
                  alt="NASA Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue via-tech-cyan to-nasa-blue">
                BIOAstra
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                  ? 'text-white bg-tech-cyan/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard')
                  ? 'text-white bg-tech-cyan/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              Dashboard
            </Link>

            <Link
              href="/explore"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/explore')
                  ? 'text-white bg-tech-cyan/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Explore
            </Link>

            <Link
              href="/resources"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/resources')
                  ? 'text-white bg-tech-cyan/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Resources
            </Link>

            <Link
              href="/datasets"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/datasets')
                  ? 'text-white bg-tech-cyan/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
            >
              <Database className="w-4 h-4 mr-2" />
              Datasets
            </Link>

            <Link
              href="/publication/pub-1234"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/publication')
                  ? 'text-white bg-tech-cyan/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Publications
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}