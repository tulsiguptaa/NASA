'use client';

import { useState } from 'react';
import SearchFilterPanel from '@/components/dashboard/SearchFilterPanel';
import AISummaryPanel from '@/components/dashboard/AISummaryPanel';
import VisualizationPanel from '@/components/dashboard/VisualizationPanel';
import StudyExplorerTable from '@/components/dashboard/StudyExplorerTable';
import InsightPanel from '@/components/dashboard/InsightPanel';
import KeyMetrics from '@/components/ui/keymetrics';
import TopicDistribution from '@/components/ui/topicdistribution';

export default function KnowledgeDashboard() {
  const [searchParams, setSearchParams] = useState<any>({});
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleSearch = (params: any) => {
    setSearchParams(params);
    // If search includes a topic, update the selected topic for AI summaries
    if (params.category) {
      setSelectedTopic(params.category);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8 text-white relative z-10 font-sans">
      {/* ----------------- ADVANCED HEADER & TITLE ----------------- */}
      <header className="relative text-center mb-12 pt-8 overflow-hidden w-full">
        <div className="relative py-4">
          <h1 className="text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue via-tech-cyan to-nasa-blue mb-4">
            BIOAstra
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-tech-cyan/70"></div>
        </div>
        
        <p className="text-xl text-white mb-2 uppercase tracking-wider">
          Space Biology Knowledge Engine
        </p>
        
        <p className="text-base text-gray-300 max-w-2xl mx-auto">
          Synthesizing decades of NASA bioscience for 
          <span className="font-bold text-tech-cyan mx-1">Artemis</span> 
          and 
          <span className="font-bold text-nasa-red mx-1">Mars</span> 
          exploration.
        </p>
      </header>

      {/* ----------------- DASHBOARD CONTENT ----------------- */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Search & Filter Panel */}
        <SearchFilterPanel onSearch={handleSearch} />
        
        {/* Two-column layout for main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visualization Panel */}
            <VisualizationPanel filter={searchParams} />
            
            {/* Study Explorer Table */}
            <StudyExplorerTable searchParams={searchParams} />
          </div>
          
          {/* Right column (1/3 width on large screens) */}
          <div className="space-y-6">
            {/* AI Summary Panel */}
            <AISummaryPanel 
              topic={selectedTopic} 
              keywords={searchParams.keywords?.split(',') || []} 
            />
            
            {/* Insight Panel */}
            <InsightPanel 
              filter={{
                category: searchParams.category,
                topic: selectedTopic
              }} 
            />
          </div>
        </div>
        
        {/* Key Metrics (full width) */}
        <div className="mt-8 mb-12">
          <h2 className="text-2xl font-bold text-tech-cyan mb-6">Research Metrics</h2>
          <KeyMetrics />
        </div>
        
        {/* Topic Distribution (full width) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-tech-cyan mb-6">Research Focus Areas</h2>
          <TopicDistribution />
        </div>
      </div>
    </main>
  );
}