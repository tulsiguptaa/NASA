// frontend/app/explore/graph/page.tsx
import GraphViewer from '@/features/kg-viewer/GraphViewer';
import GraphSidebar from '@/features/kg-viewer/GraphSidebar';
import GraphQueryClient from '@/features/kg-viewer/GraphQueryClient';
import { Search, Link as LinkIcon, AlertTriangle, Lightbulb } from 'lucide-react';

// This is a Server Component, responsible for structural layout and fetching initial static data
export default function KnowledgeGraphPage() {
  return (
    <div className="w-full h-full min-h-[90vh]">
      
      {/* HEADER */}
      <h2 className="text-4xl font-bold mb-4 border-b border-nasa-blue/50 pb-2 text-nasa-blue tracking-wider">
        Knowledge Graph Interrogation Engine 🕸️
      </h2>
      <p className="text-gray-400 mb-6 max-w-4xl">
        A dynamic, network-based view of all NASA space biology results. Trace the evidence path from environmental factors (Nodes) to biological impacts (Edges).
      </p>

      {/* INTERACTIVE AREA GRID */}
      <div className="flex space-x-6 h-[80vh]">
        
        {/* LEFT: VISUALIZATION CONTAINER (65% width) */}
        <div className="w-3/4 bg-gray-panel/70 border border-tech-cyan/20 rounded-xl shadow-2xl p-4 relative overflow-hidden">
          
          {/* Advanced Query Input */}
          <GraphQueryClient />
          
          {/* Main Visualization Component */}
          <div className="h-[90%] w-full">
            <GraphViewer /> 
            {/* This component will handle the D3/Neo4j rendering */}
            <p className="text-center text-tech-cyan/50 pt-20">
               [Interactive 3D/2D Force-Directed Graph Rendering Area]
            </p>
          </div>
          
        </div>
        
        {/* RIGHT: DETAIL SIDEBAR (35% width) */}
        <div className="w-1/4 flex flex-col space-y-4">
            
            {/* Node/Edge Detail Panel */}
            <div className="bg-gray-panel/90 p-5 rounded-xl border border-nasa-blue/30 shadow-lg flex-1 overflow-y-auto">
                <GraphSidebar />
            </div>

            {/* Pathfinding Insight Card */}
            <div className="bg-gray-panel/90 p-5 rounded-xl border border-tech-cyan/30 shadow-lg">
                <h3 className="text-xl font-semibold text-tech-cyan mb-2 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" /> Pathfinding Insight
                </h3>
                <p className="text-sm text-gray-400">
                    Find the shortest chain of evidence linking **Microgravity** to **Immune Dysfunction**.
                </p>
            </div>
            
        </div>
      </div>
    </div>
  );
}