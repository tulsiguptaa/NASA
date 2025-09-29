// frontend/app/layout.tsx
import './globals.css';
// 1. Correct the import path to the new wrapper
import DynamicBackgroundWrapper from '@/components/space/DynamicBackgroundWrapper'; 
import Navigation from '@/components/layout/Navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-space-dark text-white font-sans antialiased">
        
        {/* 2. Replace the direct component import with the wrapper */}
        <DynamicBackgroundWrapper />

        {/* Remove blur and dark overlay to make background fully visible */}
        <div className="relative z-10 min-h-screen">
          <Navigation />
          <main className="p-4 md:p-8 pt-24"> 
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}