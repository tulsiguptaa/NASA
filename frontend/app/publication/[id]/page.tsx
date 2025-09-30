'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  Database, 
  BookOpen, 
  Download, 
  ExternalLink, 
  Network, 
  Beaker, 
  Lightbulb,
  ArrowLeft
} from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  publishedDate: string;
  doi: string;
  keywords: string[];
  aiSummary: string;
  methods: string;
  results: string;
  osdrDataset?: {
    id: string;
    name: string;
    url: string;
  };
  taskBookInfo?: {
    grantId: string;
    investigator: string;
    institution: string;
    url: string;
  };
  relatedStudies: {
    id: string;
    title: string;
    similarity: number;
  }[];
}

export default function PublicationDetail() {
  const { id } = useParams();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('results');

  useEffect(() => {
    const fetchPublicationDetails = async () => {
      setLoading(true);
      setError('');
      
      try {
        // In a real app, this would fetch from your API
        const response = await fetch(`/api/v1/publications/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setPublication(data.publication);
        } else {
          setError('Failed to load publication details');
        }
      } catch (error) {
        console.error('Error fetching publication details:', error);
        setError('An error occurred while loading publication details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPublicationDetails();
    }
  }, [id]);

  // For demo purposes, create mock data if API call fails
  useEffect(() => {
    if (error) {
      const mockPublication: Publication = {
        id: id as string,
        title: "Effects of Microgravity on Bone Density in Astronauts During Long-Duration Spaceflight",
        authors: ["Jane Smith", "John Doe", "Robert Johnson", "Emily Chen"],
        abstract: "This study investigates the effects of prolonged exposure to microgravity on bone mineral density in astronauts during long-duration missions aboard the International Space Station. Using advanced imaging techniques and biomarker analysis, we quantified bone loss rates and identified potential countermeasures to mitigate these effects.",
        journal: "Journal of Space Biology",
        publishedDate: "2023-05-15",
        doi: "10.1234/jsb.2023.0501",
        keywords: ["microgravity", "bone density", "astronaut health", "spaceflight", "countermeasures"],
        aiSummary: "This research demonstrates that astronauts experience significant bone density loss during long-duration spaceflight, with rates of 1-2% per month in weight-bearing bones. The study found that resistance exercise combined with bisphosphonate medication reduced bone loss by 40-50% compared to exercise alone. Recovery post-flight was incomplete, with only 50-60% of lost bone mass restored after one year on Earth. The findings suggest that current countermeasures are insufficient for maintaining bone health during potential Mars missions, and highlight the need for improved interventions combining pharmacological, nutritional, and exercise-based approaches.",
        methods: "Twenty-four astronauts (16 male, 8 female) participating in ISS missions lasting 4-6 months were monitored before, during, and after spaceflight. Bone mineral density was assessed using dual-energy X-ray absorptiometry (DXA) and high-resolution peripheral quantitative computed tomography (HR-pQCT) at multiple timepoints. Biochemical markers of bone turnover were measured in blood and urine samples. Participants were divided into three groups: control (standard exercise protocol), intervention A (enhanced resistance exercise), and intervention B (enhanced resistance exercise plus bisphosphonate medication).",
        results: "All astronauts experienced bone loss, with the control group showing the greatest decreases in bone mineral density (1.5-2% per month in weight-bearing bones). Intervention group A demonstrated 25-30% less bone loss compared to controls, while intervention group B showed 40-50% less bone loss. Biochemical markers indicated increased bone resorption in all groups, with intervention B showing the smallest changes. Post-flight recovery was incomplete, with only 50-60% of lost bone mass restored after one year on Earth. Female astronauts showed slightly better preservation of bone density compared to males, though the difference was not statistically significant when controlling for age and pre-flight exercise habits.",
        osdrDataset: {
          id: "OSDR-2023-BM-15",
          name: "ISS Astronaut Bone Density Measurements 2020-2023",
          url: "https://osdr.nasa.gov/bio/repo/data/studies/OSDR-2023-BM-15"
        },
        taskBookInfo: {
          grantId: "NNH18ZTT003N-HRP",
          investigator: "Dr. Jane Smith",
          institution: "Space Medicine Research Institute",
          url: "https://taskbook.nasa.gov/task/10284"
        },
        relatedStudies: [
          {
            id: "pub-1234",
            title: "Muscle Atrophy in Microgravity: Mechanisms and Countermeasures",
            similarity: 0.85
          },
          {
            id: "pub-2345",
            title: "Calcium Metabolism During Spaceflight",
            similarity: 0.78
          },
          {
            id: "pub-3456",
            title: "Exercise Protocols for Maintaining Musculoskeletal Health in Microgravity",
            similarity: 0.72
          },
          {
            id: "pub-4567",
            title: "Pharmacological Interventions for Bone Loss in Simulated Microgravity",
            similarity: 0.68
          }
        ]
      };
      
      setPublication(mockPublication);
      setError('');
      setLoading(false);
    }
  }, [error, id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6 animate-pulse">
          <div className="h-8 bg-gray-300/30 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300/30 rounded w-1/2 mb-8"></div>
          <div className="h-32 bg-gray-300/30 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-300/30 rounded"></div>
            <div className="h-64 bg-gray-300/30 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Publication Not Found</h1>
          <p className="text-gray-200 mb-4">The publication you are looking for could not be found.</p>
          <Link href="/dashboard" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
      
      {/* Publication Header */}
      <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2 text-white">{publication.title}</h1>
        <div className="flex flex-wrap items-center text-gray-300 mb-4">
          <span className="mr-4">{publication.authors.join(', ')}</span>
          <span className="mr-4">•</span>
          <span className="mr-4">{publication.journal}</span>
          <span className="mr-4">•</span>
          <span>{new Date(publication.publishedDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.keywords.map((keyword, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs rounded-full bg-black/40 backdrop-blur-md text-white"
            >
              {keyword}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          <a 
            href={`https://doi.org/${publication.doi}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-black/50 backdrop-blur-md text-white rounded-md hover:bg-black/70 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Publisher Site
          </a>
          <a 
            href="#" 
            className="inline-flex items-center px-3 py-1.5 bg-black/50 backdrop-blur-md text-white rounded-md hover:bg-black/70 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </a>
          <a 
            href="#" 
            className="inline-flex items-center px-3 py-1.5 bg-black/50 backdrop-blur-md text-white rounded-md hover:bg-black/70 transition-colors"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Cite This Paper
          </a>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Abstract</h2>
            <p className="text-gray-200">{publication.abstract}</p>
          </div>
          
          {/* Methods & Results Tabs */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b border-gray-700">
              <button 
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'results' ? 'bg-black/50 text-white' : 'text-gray-400 hover:text-white hover:bg-black/20'}`}
                onClick={() => setActiveTab('results')}
              >
                Results
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${activeTab === 'methods' ? 'bg-black/50 text-white' : 'text-gray-400 hover:text-white hover:bg-black/20'}`}
                onClick={() => setActiveTab('methods')}
              >
                Methods
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'results' ? (
                <div>
                  <div className="flex items-center mb-4">
                    <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                    <h2 className="text-xl font-semibold text-white">Key Results</h2>
                  </div>
                  <p className="text-gray-200 whitespace-pre-line">{publication.results}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center mb-4">
                    <Beaker className="h-5 w-5 text-purple-400 mr-2" />
                    <h2 className="text-xl font-semibold text-white">Methodology</h2>
                  </div>
                  <p className="text-gray-200 whitespace-pre-line">{publication.methods}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Studies */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Network className="h-5 w-5 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Related Studies</h2>
            </div>
            
            <div className="space-y-4">
              {publication.relatedStudies.map((study) => (
                <div key={study.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 hover:bg-black/40 transition-colors">
                  <Link href={`/publication/${study.id}`} className="text-white hover:text-blue-300">
                    {study.title}
                  </Link>
                  <div className="mt-2 flex items-center">
                    <div className="text-xs text-gray-400">Relevance:</div>
                    <div className="ml-2 h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${study.similarity * 100}%` }}
                      ></div>
                    </div>
                    <div className="ml-2 text-xs text-gray-400">{Math.round(study.similarity * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          {/* AI Summary */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                <span className="text-xs font-bold text-white">AI</span>
              </div>
              <h2 className="text-xl font-semibold text-white">AI Summary</h2>
            </div>
            <p className="text-gray-200 whitespace-pre-line">{publication.aiSummary}</p>
          </div>
          
          {/* OSDR Dataset */}
          {publication.osdrDataset && (
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-green-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Research Data</h2>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">OSDR Dataset</h3>
                <p className="text-sm text-gray-300 mb-2">{publication.osdrDataset.name}</p>
                <p className="text-xs text-gray-400 mb-3">ID: {publication.osdrDataset.id}</p>
                <a 
                  href={publication.osdrDataset.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Access Dataset
                </a>
              </div>
            </div>
          )}
          
          {/* Task Book Info */}
          {publication.taskBookInfo && (
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-yellow-400 mr-2" />
                <h2 className="text-xl font-semibold text-white">Grant Information</h2>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">NASA Task Book</h3>
                <p className="text-sm text-gray-300 mb-1">
                  <span className="text-gray-400">Grant ID:</span> {publication.taskBookInfo.grantId}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  <span className="text-gray-400">PI:</span> {publication.taskBookInfo.investigator}
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  <span className="text-gray-400">Institution:</span> {publication.taskBookInfo.institution}
                </p>
                <a 
                  href={publication.taskBookInfo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Grant Details
                </a>
              </div>
            </div>
          )}
          
          {/* Knowledge Graph Visualization Placeholder */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Network className="h-5 w-5 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Knowledge Graph</h2>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 h-64 flex items-center justify-center">
              <p className="text-gray-400 text-center">Interactive knowledge graph visualization would appear here</p>
            </div>
            <div className="mt-4 text-center">
              <a 
                href="/explore/graph" 
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
              >
                <Network className="h-3 w-3 mr-1" />
                Explore in Knowledge Graph
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}