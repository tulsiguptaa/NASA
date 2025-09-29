'use client';

import React from 'react';
import { AlertTriangle, Lightbulb, Link as LinkIcon } from 'lucide-react';

const GraphSidebar: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-4">
      {/* Node Details Panel */}
      <div className="bg-gray-panel/70 border border-tech-cyan/20 rounded-xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-nasa-blue mb-2">Selected Node</h3>
        <div className="text-sm text-gray-400">
          Click on a node in the graph to view its details
        </div>
      </div>

      {/* Knowledge Gaps Panel */}
      <div className="bg-gray-panel/70 border border-tech-cyan/20 rounded-xl p-4 shadow-md flex-grow">
        <div className="flex items-center mb-3">
          <AlertTriangle className="text-amber-500 mr-2" size={18} />
          <h3 className="text-lg font-semibold text-nasa-blue">Knowledge Gaps</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
            Limited data on long-term radiation effects on neural stem cells
          </li>
          <li className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
            Unclear relationship between microgravity and immune cell function
          </li>
          <li className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
            Insufficient evidence for countermeasure effectiveness beyond 6 months
          </li>
        </ul>
      </div>

      {/* Related Publications */}
      <div className="bg-gray-panel/70 border border-tech-cyan/20 rounded-xl p-4 shadow-md">
        <div className="flex items-center mb-3">
          <LinkIcon className="text-tech-cyan mr-2" size={18} />
          <h3 className="text-lg font-semibold text-nasa-blue">Related Publications</h3>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <div className="h-2 w-2 rounded-full bg-tech-cyan mt-1.5 mr-2"></div>
            <a href="#" className="text-tech-cyan hover:underline">
              Effects of Spaceflight on Musculoskeletal Health (2023)
            </a>
          </li>
          <li className="flex items-start">
            <div className="h-2 w-2 rounded-full bg-tech-cyan mt-1.5 mr-2"></div>
            <a href="#" className="text-tech-cyan hover:underline">
              Radiation Exposure and Cellular Damage in LEO (2022)
            </a>
          </li>
        </ul>
      </div>

      {/* Research Opportunities */}
      <div className="bg-gray-panel/70 border border-tech-cyan/20 rounded-xl p-4 shadow-md">
        <div className="flex items-center mb-3">
          <Lightbulb className="text-yellow-400 mr-2" size={18} />
          <h3 className="text-lg font-semibold text-nasa-blue">Research Opportunities</h3>
        </div>
        <div className="text-sm">
          <p className="mb-2">Suggested areas for future investigation:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Combined effects of radiation and microgravity</li>
            <li>Novel countermeasure development</li>
            <li>Genetic factors in adaptation to space environment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraphSidebar;