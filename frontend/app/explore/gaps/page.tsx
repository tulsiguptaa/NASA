// frontend/app/explore/gaps/page.tsx

export default function ResearchGapsPage() {
  return (
    <div className="w-full h-full">
      <h2 className="text-4xl font-bold mb-6 border-b border-nasa-red/50 pb-2 text-nasa-red tracking-wider">
        Research Gaps & Consensus Analysis ⚖️
      </h2>
      <p className="text-gray-400 mb-8">
        Identify areas of high uncertainty or combinations of factors lacking study. Crucial for prioritizing future research.
      </p>

      {/* Main analysis area */}
      <div className="h-[75vh] bg-gray-panel/70 border border-nasa-red/20 rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-4">
        
        <div className="bg-gray-panel p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-tech-cyan mb-3">CONSENUS MATRIX</h3>
          <p className="text-sm text-gray-400">
            [Heatmap visualization showing strong/weak support for specific relationships (Green for high consensus, Red for disagreement)]
          </p>
        </div>
        
        <div className="bg-gray-panel p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-nasa-red mb-3">CRITICAL KNOWLEDGE GAPS</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="p-2 bg-nasa-red/10 border-l-4 border-nasa-red">
              **Factor A + Factor B:** Microgravity + Lunar Regolith (Unstudied)
            </li>
            <li className="p-2 bg-nasa-red/10 border-l-4 border-nasa-red">
              **Organism/System:** Long-term Human Ocular Health (Low Data Volume)
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}