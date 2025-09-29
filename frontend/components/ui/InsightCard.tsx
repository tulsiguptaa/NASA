// frontend/components/ui/InsightCard.tsx
'use client'; 
// This is a Client Component because it uses third-party libraries (lucide-react) 
// and will be nested inside the Server Component (app/page.tsx).

import Link from 'next/link';
import { Orbit, BarChart3, Brain, LucideIcon } from 'lucide-react'; 

// Map string names to the actual Lucide Icon components
const IconMap = { Orbit, BarChart3, Brain };
type IconName = keyof typeof IconMap;

interface InsightCardProps {
  title: string;
  description: string;
  icon: IconName;
  color: string; // Tailwind color variable (e.g., #0077B6)
  href?: string;
}

export default function InsightCard({ title, description, icon, color, href }: InsightCardProps) {
  const IconComponent = IconMap[icon];
  
  const content = (
    <>
      {/* Icon rendering using dynamic style for color */}
      <IconComponent className={`h-10 w-10 mb-3`} style={{ color }} />
      
      {/* Title with dynamic styling */}
      <h3 className={`text-2xl font-bold mb-1 tracking-wide`} style={{ color }}>{title}</h3>
      
      {/* Description */}
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </>
  );

  // Common styles for the card panel (HUD aesthetic)
  const cardClasses = `p-8 bg-gray-panel/60 border-t-4 hover:bg-gray-panel/90 transition duration-300 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden`;

  // Render as a Link if 'href' is provided (for navigation)
  if (href) {
    return (
      <Link 
        href={href} 
        className={`${cardClasses} hover:shadow-[0_0_20px] hover:shadow-tech-cyan/50 transform hover:-translate-y-1`}
        style={{ borderTopColor: color }}
      >
        {content}
      </Link>
    );
  }

  // Render as a simple div for AI insights
  return (
    <div 
      className={cardClasses}
      style={{ borderTopColor: color }}
    >
      {content}
    </div>
  );
}