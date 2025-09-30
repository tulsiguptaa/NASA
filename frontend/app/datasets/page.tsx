'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Database, 
  Filter, 
  Search, 
  BarChart, 
  LineChart,
  PieChart,
  Table,
  ExternalLink,
  Info
} from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  description: string;
  source: string;
  dateCreated: string;
  lastUpdated: string;
  size: string;
  format: string;
  category: string;
  tags: string[];
  osdrLink: string;
  downloadUrl: string;
  previewAvailable: boolean;
  numericalData?: {
    type: string;
    labels: string[];
    values: number[];
  }[];
}

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [activeTab, setActiveTab] = useState('table');

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true);
      setError('');
      
      try {
        // In a real app, this would fetch from your API
        // const response = await fetch('/api/v1/datasets');
        // const data = await response.json();
        
        // For demo purposes, using mock data
        const mockDatasets: Dataset[] = [
          {
            id: "ds-001",
            name: "ISS Astronaut Bone Density Measurements 2020-2023",
            description: "Comprehensive bone density measurements from astronauts aboard the International Space Station, including pre-flight, in-flight, and post-flight assessments.",
            source: "NASA Human Research Program",
            dateCreated: "2023-06-15",
            lastUpdated: "2023-12-10",
            size: "1.2 GB",
            format: "CSV, JSON",
            category: "Human Physiology",
            tags: ["bone density", "microgravity", "astronaut health", "ISS"],
            osdrLink: "https://osdr.nasa.gov/bio/repo/data/studies/OSDR-2023-BM-15",
            downloadUrl: "/api/datasets/ds-001/download",
            previewAvailable: true,
            numericalData: [
              {
                type: "bar",
                labels: ["Pre-flight", "1 Month", "3 Months", "6 Months", "Post-flight"],
                values: [100, 97, 94, 91, 95]
              },
              {
                type: "line",
                labels: ["Week 1", "Week 5", "Week 10", "Week 15", "Week 20", "Week 25"],
                values: [100, 98, 96, 94, 92, 91]
              }
            ]
          },
          {
            id: "ds-002",
            name: "Plant Growth Experiments in Microgravity",
            description: "Data from experiments studying plant growth and development in the microgravity environment of the International Space Station.",
            source: "NASA Space Biology Program",
            dateCreated: "2022-09-20",
            lastUpdated: "2023-11-05",
            size: "850 MB",
            format: "CSV, XLSX, Images",
            category: "Plant Biology",
            tags: ["plants", "growth", "microgravity", "agriculture", "ISS"],
            osdrLink: "https://osdr.nasa.gov/bio/repo/data/studies/OSDR-2022-PG-08",
            downloadUrl: "/api/datasets/ds-002/download",
            previewAvailable: true,
            numericalData: [
              {
                type: "bar",
                labels: ["Earth Control", "ISS - Standard Light", "ISS - Enhanced Light", "ISS - Nutrient Enhanced"],
                values: [100, 78, 85, 92]
              },
              {
                type: "line",
                labels: ["Day 1", "Day 7", "Day 14", "Day 21", "Day 28"],
                values: [5, 12, 25, 45, 60]
              }
            ]
          },
          {
            id: "ds-003",
            name: "Radiation Exposure Measurements on Mars Surface",
            description: "Comprehensive dataset of radiation measurements collected by the Curiosity rover on the Martian surface, including cosmic ray and solar particle events.",
            source: "NASA Planetary Science Division",
            dateCreated: "2021-03-12",
            lastUpdated: "2023-08-30",
            size: "2.5 GB",
            format: "HDF5, CSV",
            category: "Radiation Biology",
            tags: ["radiation", "Mars", "cosmic rays", "solar particles", "Curiosity"],
            osdrLink: "https://osdr.nasa.gov/bio/repo/data/studies/OSDR-2021-RM-22",
            downloadUrl: "/api/datasets/ds-003/download",
            previewAvailable: true,
            numericalData: [
              {
                type: "bar",
                labels: ["Galactic Cosmic Rays", "Solar Particle Events", "Secondary Neutrons", "Total Exposure"],
                values: [65, 20, 15, 100]
              },
              {
                type: "line",
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                values: [85, 82, 90, 110, 105, 95, 88, 92, 98, 103, 110, 95]
              }
            ]
          },
          {
            id: "ds-004",
            name: "Microbial Growth in Spacecraft Environments",
            description: "Data on microbial populations and growth patterns in various spacecraft environments, including the ISS and simulated Mars habitats.",
            source: "NASA Astrobiology Institute",
            dateCreated: "2022-11-08",
            lastUpdated: "2023-10-15",
            size: "1.8 GB",
            format: "FASTQ, CSV, JSON",
            category: "Microbiology",
            tags: ["microbes", "bacteria", "fungi", "spacecraft", "contamination"],
            osdrLink: "https://osdr.nasa.gov/bio/repo/data/studies/OSDR-2022-MB-17",
            downloadUrl: "/api/datasets/ds-004/download",
            previewAvailable: true,
            numericalData: [
              {
                type: "pie",
                labels: ["Bacteria", "Fungi", "Archaea", "Viruses", "Unknown"],
                values: [65, 20, 8, 5, 2]
              },
              {
                type: "line",
                labels: ["Day 0", "Day 30", "Day 60", "Day 90", "Day 180", "Day 365"],
                values: [100, 250, 320, 380, 450, 520]
              }
            ]
          },
          {
            id: "ds-005",
            name: "Sleep Patterns of Astronauts During Long-Duration Spaceflight",
            description: "Comprehensive sleep data collected from astronauts during long-duration missions on the International Space Station.",
            source: "NASA Behavioral Health and Performance Laboratory",
            dateCreated: "2023-01-25",
            lastUpdated: "2023-09-18",
            size: "750 MB",
            format: "CSV, JSON, EDF",
            category: "Human Physiology",
            tags: ["sleep", "circadian rhythm", "astronaut health", "ISS", "behavioral health"],
            osdrLink: "https://osdr.nasa.gov/bio/repo/data/studies/OSDR-2023-SP-09",
            downloadUrl: "/api/datasets/ds-005/download",
            previewAvailable: true,
            numericalData: [
              {
                type: "bar",
                labels: ["Pre-flight", "First Month", "Mid-Mission", "Final Month", "Post-flight"],
                values: [7.2, 6.1, 6.5, 6.3, 7.0]
              },
              {
                type: "line",
                labels: ["Week 1", "Week 5", "Week 10", "Week 15", "Week 20", "Week 25"],
                values: [6.2, 6.0, 6.5, 6.3, 6.4, 6.1]
              }
            ]
          }
        ];
        
        setDatasets(mockDatasets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching datasets:', error);
        setError('An error occurred while loading datasets');
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory ? dataset.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(datasets.map(dataset => dataset.category))];

  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedDataset(dataset);
  };

  const renderChart = (data: { type: string; labels: string[]; values: number[] }) => {
    const maxValue = Math.max(...data.values);
    const normalizedValues = data.values.map(value => (value / maxValue) * 100);
    
    if (data.type === 'bar') {
      return (
        <div className="h-64 flex items-end space-x-2">
          {data.labels.map((label, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-tech-cyan/70 rounded-t-md hover:bg-tech-cyan transition-colors"
                style={{ height: `${normalizedValues[index]}%` }}
              ></div>
              <div className="text-xs mt-2 text-gray-300 rotate-45 origin-left truncate max-w-20">{label}</div>
              <div className="text-xs mt-1 text-tech-cyan">{data.values[index]}</div>
            </div>
          ))}
        </div>
      );
    }
    
    if (data.type === 'line') {
      const points = data.labels.map((_, index) => {
        const x = (index / (data.labels.length - 1)) * 100;
        const y = 100 - normalizedValues[index];
        return `${x},${y}`;
      }).join(' ');
      
      return (
        <div className="h-64 w-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {[...Array(4)].map((_, i) => (
              <div key={`h-${i}`} className="border-t border-gray-700/30"></div>
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={`v-${i}`} className="border-l border-gray-700/30"></div>
            ))}
          </div>
          
          {/* Line chart */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={points}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {data.labels.map((_, index) => {
              const x = (index / (data.labels.length - 1)) * 100;
              const y = 100 - normalizedValues[index];
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#06b6d4"
                  stroke="#06b6d4"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {data.labels.map((label, index) => (
              <div key={index} className="text-xs text-gray-300 -mb-6 rotate-45 origin-left">{label}</div>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between py-2">
            {[100, 75, 50, 25, 0].map((value, index) => (
              <div key={index} className="text-xs text-gray-300 -ml-6">{Math.round(maxValue * value / 100)}</div>
            ))}
          </div>
        </div>
      );
    }
    
    if (data.type === 'pie') {
      const total = data.values.reduce((sum, value) => sum + value, 0);
      let currentAngle = 0;
      
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="relative h-48 w-48">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {data.values.map((value, index) => {
                const percentage = (value / total) * 100;
                const angle = (percentage / 100) * 360;
                
                // Calculate start and end angles
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                currentAngle = endAngle;
                
                // Convert angles to radians
                const startRad = (startAngle - 90) * Math.PI / 180;
                const endRad = (endAngle - 90) * Math.PI / 180;
                
                // Calculate path
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);
                
                // Determine if the arc should be drawn as a large arc
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                // Generate a color based on the index
                const hue = (index * 60) % 360;
                const color = `hsl(${hue}, 70%, 60%)`;
                
                const path = `
                  M 50 50
                  L ${x1} ${y1}
                  A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
                  Z
                `;
                
                return (
                  <path
                    key={index}
                    d={path}
                    fill={color}
                    stroke="#111"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
            
            {/* Legend */}
            <div className="absolute top-0 right-0 transform translate-x-full -translate-y-1/4 space-y-2">
              {data.labels.map((label, index) => {
                const hue = (index * 60) % 360;
                const color = `hsl(${hue}, 70%, 60%)`;
                
                return (
                  <div key={index} className="flex items-center text-xs">
                    <div className="w-3 h-3 mr-2" style={{ backgroundColor: color }}></div>
                    <span className="text-gray-300">{label} ({Math.round((data.values[index] / total) * 100)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue via-tech-cyan to-nasa-blue">
        Space Biology Datasets
      </h1>
      <p className="text-gray-300 mb-8">
        Explore and download raw datasets from NASA's Open Science Data Repository (OSDR)
      </p>
      
      {/* Search and Filter Bar */}
      <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets..."
              className="w-full px-4 py-2 pl-10 bg-black/20 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-cyan text-white"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-black/20 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-cyan text-white appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Dataset List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Database className="h-5 w-5 mr-2 text-tech-cyan" />
                Available Datasets
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {filteredDatasets.length} datasets found
              </p>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-tech-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading datasets...</p>
                </div>
              ) : error ? (
                <div className="p-6 text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : filteredDatasets.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-400">No datasets found matching your criteria</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {filteredDatasets.map((dataset) => (
                    <div 
                      key={dataset.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedDataset?.id === dataset.id 
                          ? 'bg-tech-cyan/20' 
                          : 'hover:bg-black/40'
                      }`}
                      onClick={() => handleDatasetSelect(dataset)}
                    >
                      <h3 className="font-medium text-white">{dataset.name}</h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{dataset.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {dataset.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 text-xs rounded-full bg-black/40 backdrop-blur-sm text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {dataset.tags.length > 3 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-black/40 backdrop-blur-sm text-gray-300">
                            +{dataset.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Dataset Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedDataset ? (
            <>
              {/* Dataset Header */}
              <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedDataset.name}</h2>
                <p className="text-gray-300 mb-4">{selectedDataset.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Source</p>
                    <p className="text-white">{selectedDataset.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="text-white">{selectedDataset.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Updated</p>
                    <p className="text-white">{new Date(selectedDataset.lastUpdated).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Size</p>
                    <p className="text-white">{selectedDataset.size}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <a 
                    href={selectedDataset.osdrLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-md hover:bg-black/70 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on OSDR
                  </a>
                  <a 
                    href={selectedDataset.downloadUrl} 
                    className="inline-flex items-center px-4 py-2 bg-tech-cyan text-black font-medium rounded-md hover:bg-tech-cyan/80 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Dataset
                  </a>
                </div>
              </div>
              
              {/* Dataset Visualization */}
              <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
                <div className="border-b border-gray-700">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab('table')}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                        activeTab === 'table' 
                          ? 'bg-black/50 text-white border-b-2 border-tech-cyan' 
                          : 'text-gray-400 hover:text-white hover:bg-black/20'
                      }`}
                    >
                      <Table className="h-4 w-4 inline mr-2" />
                      Data Preview
                    </button>
                    
                    {selectedDataset.numericalData?.map((data, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(`chart-${index}`)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === `chart-${index}` 
                            ? 'bg-black/50 text-white border-b-2 border-tech-cyan' 
                            : 'text-gray-400 hover:text-white hover:bg-black/20'
                        }`}
                      >
                        {data.type === 'bar' && <BarChart className="h-4 w-4 inline mr-2" />}
                        {data.type === 'line' && <LineChart className="h-4 w-4 inline mr-2" />}
                        {data.type === 'pie' && <PieChart className="h-4 w-4 inline mr-2" />}
                        {data.type.charAt(0).toUpperCase() + data.type.slice(1)} Chart
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  {activeTab === 'table' ? (
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden border border-gray-700 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-black/40 backdrop-blur-sm">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                  Sample Data Preview
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                  <Info className="h-4 w-4 inline mr-1" />
                                  This is a simplified preview. Download the full dataset for complete data.
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-black/20 backdrop-blur-sm divide-y divide-gray-700">
                              <tr>
                                <td colSpan={2} className="px-6 py-4">
                                  <div className="text-center py-8">
                                    <Database className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                                    <p className="text-gray-400">Preview not available in this demo.</p>
                                    <p className="text-gray-500 text-sm mt-2">Download the dataset or view on OSDR for full data access.</p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    selectedDataset.numericalData?.map((data, index) => {
                      if (activeTab === `chart-${index}`) {
                        return (
                          <div key={index} className="h-full">
                            <h3 className="text-lg font-medium text-white mb-4">
                              {data.type.charAt(0).toUpperCase() + data.type.slice(1)} Chart Visualization
                            </h3>
                            {renderChart(data)}
                          </div>
                        );
                      }
                      return null;
                    })
                  )}
                </div>
              </div>
              
              {/* Download Options */}
              <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Download className="h-5 w-5 mr-2 text-tech-cyan" />
                  Download Options
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-tech-cyan transition-colors">
                    <h4 className="font-medium text-white mb-2">Complete Dataset</h4>
                    <p className="text-sm text-gray-400 mb-3">Download the entire dataset with all variables and observations.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{selectedDataset.size}</span>
                      <a 
                        href={`${selectedDataset.downloadUrl}/complete`}
                        className="inline-flex items-center text-sm text-tech-cyan hover:text-tech-cyan/80"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-tech-cyan transition-colors">
                    <h4 className="font-medium text-white mb-2">Processed Data</h4>
                    <p className="text-sm text-gray-400 mb-3">Pre-processed data ready for analysis with cleaned variables.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{selectedDataset.size.split(' ')[0] * 0.7} {selectedDataset.size.split(' ')[1]}</span>
                      <a 
                        href={`${selectedDataset.downloadUrl}/processed`}
                        className="inline-flex items-center text-sm text-tech-cyan hover:text-tech-cyan/80"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-tech-cyan transition-colors">
                    <h4 className="font-medium text-white mb-2">CSV Format</h4>
                    <p className="text-sm text-gray-400 mb-3">Data in comma-separated values format for easy import.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{selectedDataset.size.split(' ')[0] * 0.8} {selectedDataset.size.split(' ')[1]}</span>
                      <a 
                        href={`${selectedDataset.downloadUrl}/csv`}
                        className="inline-flex items-center text-sm text-tech-cyan hover:text-tech-cyan/80"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download CSV
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-tech-cyan transition-colors">
                    <h4 className="font-medium text-white mb-2">JSON Format</h4>
                    <p className="text-sm text-gray-400 mb-3">Data in JSON format for programmatic access and API integration.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{selectedDataset.size.split(' ')[0] * 0.9} {selectedDataset.size.split(' ')[1]}</span>
                      <a 
                        href={`${selectedDataset.downloadUrl}/json`}
                        className="inline-flex items-center text-sm text-tech-cyan hover:text-tech-cyan/80"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download JSON
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    By downloading this data, you agree to comply with NASA's data usage policies and to cite the source appropriately in any derived works.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 text-center">
              <Database className="h-16 w-16 mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Select a Dataset</h3>
              <p className="text-gray-400">
                Choose a dataset from the list to view details, visualizations, and download options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}