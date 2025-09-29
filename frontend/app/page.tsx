// frontend/app/page.tsx
// This is a Server Component, responsible for fast, structural rendering.
import Link from 'next/link';
// We only import Search here because the SearchInput component (defined below) uses it.
import { Search } from 'lucide-react'; 
import InsightCard from '@/components/ui/InsightCard'; 

// NOTE: The InsightCard component must be created at '@/components/ui/InsightCard.tsx'
// and must contain the 'use client' directive.

export default function KnowledgeDashboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-white relative z-10 font-sans">
      
      {/* ----------------- HEADER & TITLE ----------------- */}
      <header className="text-center mb-16 pt-20">
        <h1 className="text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue to-tech-cyan mb-4 drop-shadow-lg [text-shadow:0_0_15px_#00FFFF]">
          BIOAstra
        </h1>
        <p className="text-2xl text-gray-400 mb-2 uppercase tracking-widest">
          Space Biology Knowledge Engine
        </p>
        <p className="text-lg text-tech-cyan/70">
          Synthesizing decades of NASA bioscience for **Artemis** and **Mars** exploration.
        </p>
      </header>

      {/* ----------------- CENTRAL SEARCH INTERFACE ----------------- */}
      <SearchInput />

      {/* ----------------- EXECUTIVE INSIGHTS GRID ----------------- */}
      <div className="w-full max-w-6xl grid grid-cols-3 gap-8 pb-20">
        
        {/* 1. Knowledge Graph Link */}
        <InsightCard 
          icon="Orbit"
          title="KNOWLEDGE GRAPH CORE"
          description="Visualize the network: Organism ↔ Factor ↔ Outcome across all 608 studies. Identify key systemic interactions."
          color="#0077B6" // nasa-blue
          href="/explore/graph"
        />

        {/* 2. AI Actionable Insight (The Brain icon) */}
        <InsightCard 
          icon="Brain"
          title="MISSION INSIGHT (AI)"
          description='Actionable: High consensus (93%) suggests prolonged microgravity necessitates pharmacological counter-measures for bone density maintenance on Mars transit.'
          color="#00FF00" // tech-green
        />

        {/* 3. Research Gaps Link */}
        <InsightCard 
          icon="BarChart3"
          title="IDENTIFY RESEARCH GAPS"
          description="Pinpoint unstudied combinations (e.g., Combined Radiation + Regolith exposure) and conflicting results."
          color="#C8102E" // nasa-red
          href="/explore/gaps"
        />
      </div>
      
    </main>
  );
}

// ----------------------------------------------------------------------
// 2. Client Component for Search Functionality
//    This component must be defined here or in its own file with 'use client'
//    to handle interactive input.
// ----------------------------------------------------------------------

// In a full application, move this to: frontend/components/search/SearchInput.tsx
function SearchInput() {
    return (
        <div className="w-full max-w-4xl relative mb-16">
            <input
                type="text"
                placeholder="Semantic Search: Effects of 'Radiation on Plant Growth' or 'Microgravity on Immune System'"
                className="w-full p-5 pl-16 rounded-xl bg-gray-panel/80 border-2 border-tech-cyan/70 text-lg text-tech-cyan placeholder-gray-500 focus:outline-none focus:border-tech-cyan focus:ring-4 focus:ring-tech-cyan/30 transition-all duration-300 shadow-2xl shadow-tech-cyan/20"
                // Placeholder for future state management/onChange handlers
                // onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(e.target.value) }} 
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-tech-cyan" />
        </div>
    );
}