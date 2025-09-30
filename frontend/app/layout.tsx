// frontend/app/layout.tsx
import './globals.css';
// Import the background wrapper and our new Navbar
import DynamicBackgroundWrapper from '@/components/space/DynamicBackgroundWrapper'; 
import Navbar from '@/components/layout/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-space-dark text-white font-sans antialiased">
        
        {/* Background wrapper */}
        <DynamicBackgroundWrapper />

        {/* Content with navbar */}
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="p-4 md:p-8 pt-24"> 
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}