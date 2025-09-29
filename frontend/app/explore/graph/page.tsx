// frontend/app/explore/graph/page.tsx

export default function KnowledgeGraphPage() {
  return (
    <div className="w-full h-full">
      <h2 className="text-4xl font-bold mb-6 border-b border-nasa-blue/50 pb-2 text-nasa-blue tracking-wider">
        Knowledge Graph Interrogation Engine 🕸️
      </h2>
      <p className="text-gray-400 mb-8">
        Visualize the complex web of extracted relationships. Select a factor or organism to see direct biological impacts.
      </p>

      {/* Main visualization area */}
      <div className="h-[75vh] bg-gray-panel/70 border border-tech-cyan/20 rounded-xl shadow-2xl p-4 flex">
        {/* Placeholder for the large Neo4j/D3.js Visualization Component */}
        <div className="w-4/5 border-r border-tech-cyan/10 pr-4">
          <p className="text-center text-tech-cyan/50 pt-20">
            [Interactive 3D Graph Visualization (Neo4j/D3.js) will be rendered here]
          </p>
        </div>
        
        {/* Detail Sidebar */}
        <div className="w-1/5 pl-4 overflow-y-auto">
          <h3 className="text-xl font-semibold text-tech-cyan mb-4">Node Details</h3>
          <div className="bg-gray-panel p-4 rounded-lg border-l-4 border-nasa-blue">
            <p className="text-sm text-gray-300">
              Select an entity (e.g., Microgravity) to load all connected publications, summarized impacts, and confidence scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}