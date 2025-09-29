// frontend/app/publication/[doi]/page.tsx
// This uses Next.js dynamic routing to load content based on the DOI in the URL.

// Dummy data fetcher (replace with your actual Node.js API call)
async function fetchPublicationData(doi: string) {
  // In a real application, replace this URL with your Node.js API:
  // const res = await fetch(`http://localhost:8000/api/v1/publications/${doi}`); 
  // const data = await res.json();
  // return data;

  // Mock Data for structure:
  await new Promise(resolve => setTimeout(resolve, 500)); 
  return {
    doi,
    title: "Transcriptomic Changes in Arabidopsis Thaliana under Simulated Martian Gravity",
    authors: ["S. Gilroy", "R. Barker", "J. Smith"],
    journal: "Space Life Sciences Journal",
    year: 2023,
    abstract: "We investigate how plant gene expression responds to fractional gravity environments...",
    ai_summary: "Actionable: Simulated Martian gravity caused significant differential expression in genes related to cell wall synthesis, indicating structural weakness. Requires a stronger crop strain for Mars colonization.",
    extracted_entities: ["Arabidopsis thaliana (Organism)", "Martian Gravity (Factor)", "Gene Expression (Outcome)"],
  };
}

export default async function PublicationDetailPage({ params }: { params: { doi: string } }) {
  const data = await fetchPublicationData(params.doi);

  return (
    <div className="max-w-7xl mx-auto bg-gray-panel/80 p-8 rounded-2xl border border-tech-cyan/20 shadow-2xl shadow-black/70">
      
      <h1 className="text-4xl font-bold text-tech-cyan mb-2">{data.title}</h1>
      <p className="text-lg text-gray-400 italic mb-4">
        {data.authors.join(', ')} • {data.journal} ({data.year})
      </p>

      {/* AI Actionable Insight Panel (The most important part) */}
      <div className="mb-8 p-5 bg-nasa-blue/20 border-l-4 border-nasa-blue rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-nasa-blue mb-2 flex items-center">
          <Brain className="h-6 w-6 mr-2" /> AI Actionable Insight
        </h3>
        <p className="text-lg text-white/90">{data.ai_summary}</p>
      </div>

      {/* Metadata & Abstract */}
      <h3 className="text-2xl font-semibold text-gray-300 mb-2 border-b border-gray-700 pb-1">Publication Details</h3>
      <p className="mb-4 text-gray-500">DOI: {data.doi}</p>
      <p className="text-gray-300 mb-6">{data.abstract}</p>

      {/* Extracted Entities */}
      <h3 className="text-2xl font-semibold text-gray-300 mb-2 border-b border-gray-700 pb-1">Extracted Key Entities</h3>
      <div className="flex flex-wrap gap-2">
        {data.extracted_entities.map(entity => (
          <span key={entity} className="px-3 py-1 bg-tech-cyan/10 text-tech-cyan text-sm rounded-full border border-tech-cyan/50">
            {entity}
          </span>
        ))}
      </div>
    </div>
  );
}
