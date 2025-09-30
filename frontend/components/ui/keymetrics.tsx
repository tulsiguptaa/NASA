'use client';

import React, { useEffect, useState } from 'react';
import { FileText, Rocket, FlaskConical } from 'lucide-react';

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState({
    publications: 0,
    missions: 0,
    organisms: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/dashboard/metrics');
        const data = await response.json();
        setMetrics({
          publications: data.totalPublications,
          missions: data.totalMissions,
          organisms: data.totalOrganisms
        });
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        // Fallback to mock data if API fails
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Publications Metric */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-500/30 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-tech-cyan/20">
        <div className="bg-nasa-blue/20 p-4 rounded-full mb-4">
          <FileText size={36} className="text-tech-cyan" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Publications</h3>
        <p className="text-4xl font-black text-tech-cyan">{metrics.publications}</p>
        <p className="text-sm text-gray-400 mt-2">Total research studies</p>
      </div>

      {/* Missions Metric */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-500/30 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-tech-cyan/20">
        <div className="bg-nasa-red/20 p-4 rounded-full mb-4">
          <Rocket size={36} className="text-nasa-red" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Missions</h3>
        <p className="text-4xl font-black text-nasa-red">{metrics.missions}</p>
        <p className="text-sm text-gray-400 mt-2">Space missions analyzed</p>
      </div>

      {/* Organisms Metric */}
      <div className="bg-black/40 backdrop-blur-md border border-gray-500/30 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:shadow-tech-cyan/20">
        <div className="bg-tech-green/20 p-4 rounded-full mb-4">
          <FlaskConical size={36} className="text-tech-green" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Organisms</h3>
        <p className="text-4xl font-black text-tech-green">{metrics.organisms}</p>
        <p className="text-sm text-gray-400 mt-2">Unique species studied</p>
      </div>
    </div>
  );
};

export default KeyMetrics;