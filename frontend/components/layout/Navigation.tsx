// frontend/components/layout/Navigation.tsx
'use client'; 
// Navigation needs 'use client' for the Link components and active state logic
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Orbit, BarChart3, FlaskConical } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Search },
  { name: 'Knowledge Graph', href: '/explore/graph', icon: Orbit },
  { name: 'Research Gaps', href: '/explore/gaps', icon: BarChart3 },
  { name: 'Metrics', href: '/metrics', icon: FlaskConical },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-gray-panel/80 backdrop-blur-md border-b border-tech-cyan/30 shadow-2xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo/Title */}
        <Link href="/" className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue to-tech-cyan drop-shadow-md">
          BIOAstra
        </Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 
                  ${isActive 
                    ? 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan shadow-lg shadow-tech-cyan/30' 
                    : 'text-gray-400 hover:bg-gray-panel/50 hover:text-white border border-transparent'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Mission Status Placeholder */}
        <div className="text-xs uppercase tracking-wider text-tech-green/70">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tech-green"></span>
          </span>
          System Online
        </div>
      </div>
    </nav>
  );
}