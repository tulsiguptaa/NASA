// frontend/app/page.tsx
// Enhanced home page with hero section and visually appealing layout
import Link from 'next/link';
import { Search, BarChart2, TrendingUp, ArrowRight, Rocket, Microscope, Database } from 'lucide-react';
import { Suspense } from 'react';
import Image from 'next/image';

// Enhanced home page component
export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen text-white relative z-10 font-sans">
      {/* Hero section with animated background */}
      <section className="w-full flex flex-col items-center justify-center py-20 relative overflow-hidden">
        {/* Animated particles or stars could be added here */}
        <div className="absolute inset-0 bg-gradient-radial from-tech-cyan/5 to-transparent opacity-30"></div>
        
        {/* Main title with enhanced styling */}
        <div className="relative py-4 mb-6 animate-fadeIn">
          <h1 className="text-7xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue via-tech-cyan to-nasa-blue">
            BIOAstra
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-tech-cyan/70"></div>
        </div>
        
        <p className="text-2xl text-white mb-4 uppercase tracking-wider animate-fadeIn animation-delay-200">
          Space Biology Knowledge Engine
        </p>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto text-center mb-8 animate-fadeIn animation-delay-300">
          Exploring the frontiers of biology in space for 
          <span className="font-bold text-tech-cyan mx-1">Artemis</span> 
          and 
          <span className="font-bold text-nasa-red mx-1">Mars</span> 
          missions.
        </p>
        
        {/* Call to action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 animate-fadeIn animation-delay-400">
          <Link href="/dashboard" className="px-6 py-3 bg-tech-cyan text-black font-bold rounded-full hover:bg-white transition-colors flex items-center">
            <BarChart2 className="mr-2 h-5 w-5" />
            Explore Dashboard
          </Link>
          <Link href="/explore" className="px-6 py-3 bg-transparent border-2 border-tech-cyan text-tech-cyan font-bold rounded-full hover:bg-tech-cyan/10 transition-colors flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search Knowledge Base
          </Link>
        </div>
      </section>

      {/* Research Highlights - Card Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue to-tech-cyan">
          Research Highlights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800 hover:border-tech-cyan transition-all duration-300 hover:shadow-lg hover:shadow-tech-cyan/20">
            <div className="h-3 bg-gradient-to-r from-nasa-blue to-tech-cyan"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-tech-cyan/10 flex items-center justify-center mb-4">
                <BarChart2 className="text-tech-cyan" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">1,250+ Publications</h3>
              <p className="text-gray-400 mb-4">
                Comprehensive analysis of space biology research spanning decades of NASA missions.
              </p>
              <Link href="/dashboard" className="text-tech-cyan hover:text-white flex items-center text-sm font-medium">
                <span>View Research Metrics</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800 hover:border-nasa-red transition-all duration-300 hover:shadow-lg hover:shadow-nasa-red/20">
            <div className="h-3 bg-gradient-to-r from-nasa-red to-tech-cyan"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-nasa-red/10 flex items-center justify-center mb-4">
                <TrendingUp className="text-nasa-red" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Radiation Biology</h3>
              <p className="text-gray-400 mb-4">
                Leading research area representing 32% of all space biology studies.
              </p>
              <Link href="/dashboard" className="text-nasa-red hover:text-white flex items-center text-sm font-medium">
                <span>Explore Research Areas</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="group bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800 hover:border-tech-cyan transition-all duration-300 hover:shadow-lg hover:shadow-tech-cyan/20">
            <div className="h-3 bg-gradient-to-r from-tech-cyan to-nasa-blue"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-tech-cyan/10 flex items-center justify-center mb-4">
                <Search className="text-tech-cyan" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Knowledge Explorer</h3>
              <p className="text-gray-400 mb-4">
                Interactive tools to search, visualize, and analyze space biology research data.
              </p>
              <Link href="/explore" className="text-tech-cyan hover:text-white flex items-center text-sm font-medium">
                <span>Start Exploring</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Space Biology Section - With Visual Enhancement */}
      <section className="w-full py-16 bg-gradient-to-b from-black/0 via-tech-cyan/5 to-black/0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 border border-gray-800 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-tech-cyan/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nasa-red/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <h2 className="text-3xl font-bold text-tech-cyan mb-6 relative">About Space Biology</h2>
            
            <div className="prose prose-invert max-w-none relative">
              <p className="text-lg mb-6">
                Space biology is the study of how spaceflight affects living organisms, from microbes to humans. 
                This research is critical for long-duration missions to the Moon and Mars, where astronauts will 
                face unique challenges including radiation, microgravity, and isolation.
              </p>
              
              <p className="mb-6">
                NASA's space biology program investigates how space environments influence biological systems across 
                multiple generations and evolutionary processes. Key research areas include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                  <h3 className="text-tech-cyan font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-tech-cyan rounded-full mr-2"></span>
                    Radiation Biology
                  </h3>
                  <p className="text-sm text-gray-300">
                    Understanding DNA damage and repair mechanisms in space radiation environments.
                  </p>
                </div>
                
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                  <h3 className="text-tech-cyan font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-tech-cyan rounded-full mr-2"></span>
                    Microgravity Effects
                  </h3>
                  <p className="text-sm text-gray-300">
                    Studying how reduced gravity impacts cellular function and physiological systems.
                  </p>
                </div>
                
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                  <h3 className="text-tech-cyan font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-tech-cyan rounded-full mr-2"></span>
                    Plant Biology
                  </h3>
                  <p className="text-sm text-gray-300">
                    Developing sustainable food production systems for long-duration space missions.
                  </p>
                </div>
                
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                  <h3 className="text-tech-cyan font-medium mb-2 flex items-center">
                    <span className="w-2 h-2 bg-tech-cyan rounded-full mr-2"></span>
                    Human Health
                  </h3>
                  <p className="text-sm text-gray-300">
                    Creating countermeasures to protect astronauts during extended space travel.
                  </p>
                </div>
              </div>
              
              <p>
                This knowledge engine synthesizes decades of NASA-funded research to accelerate discoveries 
                and support human exploration beyond low Earth orbit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Insights Section - Enhanced */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nasa-red to-tech-cyan">
            Trending Insights
          </h2>
          <Link href="/dashboard" className="px-4 py-2 border border-tech-cyan text-tech-cyan rounded-full hover:bg-tech-cyan/10 transition-colors flex items-center text-sm">
            <span>View All Insights</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Insight Card 1 */}
          <div className="group bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800 hover:border-nasa-red transition-all duration-300 hover:shadow-lg hover:shadow-nasa-red/20">
            <div className="h-2 bg-nasa-red"></div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-nasa-red/20 text-nasa-red mb-4">
                Radiation Biology
              </span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-nasa-red transition-colors">
                DNA Repair Mechanisms Show Adaptation to Space Radiation
              </h3>
              <p className="text-gray-400 mb-6">
                Recent studies reveal cellular adaptation to chronic low-dose radiation exposure, 
                suggesting potential for enhanced DNA repair during long-duration missions.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Published: June 2023</span>
                <span className="text-nasa-red">15 related studies</span>
              </div>
            </div>
          </div>
          
          {/* Insight Card 2 */}
          <div className="group bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800 hover:border-tech-cyan transition-all duration-300 hover:shadow-lg hover:shadow-tech-cyan/20">
            <div className="h-2 bg-tech-cyan"></div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-tech-cyan/20 text-tech-cyan mb-4">
                Plant Biology
              </span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-tech-cyan transition-colors">
                Breakthrough in Space-Grown Food Production Efficiency
              </h3>
              <p className="text-gray-400 mb-6">
                Modified plant genetics combined with optimized light spectra have increased crop yields 
                by 40% in microgravity environments, critical for Mars mission planning.
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Published: August 2023</span>
                <span className="text-tech-cyan">8 related studies</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}