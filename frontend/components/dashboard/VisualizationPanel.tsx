'use client';

import { useState, useEffect } from 'react';
import { BarChart, LineChart, PieChart, Network, Cloud } from 'lucide-react';

interface VisualizationPanelProps {
  filter?: {
    category?: string;
    startDate?: string;
    endDate?: string;
    author?: string;
    institution?: string;
  };
}

export default function VisualizationPanel({ filter }: VisualizationPanelProps) {
  const [activeTab, setActiveTab] = useState('trends');
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVisualizationData = async (type: string) => {
    setLoading(true);
    setError('');
    
    try {
      let url = `/api/v1/visualizations/${type}`;
      
      // Add filter parameters if provided
      if (filter) {
        const params = new URLSearchParams();
        if (filter.category) params.append('category', filter.category);
        if (filter.startDate) params.append('startDate', filter.startDate);
        if (filter.endDate) params.append('endDate', filter.endDate);
        if (filter.author) params.append('author', filter.author);
        if (filter.institution) params.append('institution', filter.institution);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setChartData(data.data);
      } else {
        setError('Failed to load visualization data');
      }
    } catch (error) {
      console.error(`Error fetching ${type} visualization:`, error);
      setError('An error occurred while loading the visualization');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisualizationData(activeTab);
  }, [activeTab, filter]);

  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-200/80 dark:bg-blue-700/80 backdrop-blur-md mb-2"></div>
            <div className="h-4 w-32 bg-blue-200/80 dark:bg-blue-700/80 backdrop-blur-md rounded"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-64 text-red-500 dark:text-red-400">
          <p>{error}</p>
        </div>
      );
    }

    if (!chartData) {
      return (
        <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
          <p>No data available</p>
        </div>
      );
    }

    // In a real implementation, we would use a charting library like Chart.js, D3.js, or Recharts
    // For this prototype, we'll display a placeholder with the data
    return (
      <div className="h-64 p-4 border rounded-lg dark:border-gray-700 overflow-auto">
        <div className="text-center mb-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">
            {activeTab === 'trends' && 'Publication Trends Over Time'}
            {activeTab === 'categories' && 'Research by Category'}
            {activeTab === 'citations' && 'Citation Impact Analysis'}
            {activeTab === 'network' && 'Collaboration Network'}
            {activeTab === 'keywords' && 'Keyword Cloud'}
          </h4>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {activeTab === 'trends' && chartData.trends && (
            <div className="col-span-2">
              <div className="flex items-end h-40 border-b border-l dark:border-gray-700">
                {chartData.trends.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col items-center mx-1">
                    <div 
                      className="w-8 bg-blue-500/80 dark:bg-blue-600/80 backdrop-blur-md rounded-t" 
                      style={{ height: `${(item.count / Math.max(...chartData.trends.map((i: any) => i.count))) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'categories' && chartData.categories && (
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-2">
                {chartData.categories.map((item: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="h-4 bg-indigo-500 dark:bg-indigo-600 rounded" 
                      style={{ width: `${(item.count / Math.max(...chartData.categories.map((i: any) => i.count))) * 100}%` }}
                    ></div>
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{item.category} ({item.count})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'citations' && chartData.citations && (
            <div className="col-span-2">
              <div className="flex items-end h-40 border-b border-l dark:border-gray-700">
                {chartData.citations.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col items-center mx-1">
                    <div 
                      className="w-8 bg-green-500 dark:bg-green-600 rounded-t" 
                      style={{ height: `${(item.citations / Math.max(...chartData.citations.map((i: any) => i.citations))) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1 text-gray-600 dark:text-gray-400 truncate w-16 text-center">{item.title.substring(0, 10)}...</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'network' && chartData.network && (
            <div className="col-span-2 flex justify-center">
              <div className="relative h-40 w-40 border rounded-full dark:border-gray-700 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Network className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                </div>
                {chartData.network.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="absolute h-3 w-3 bg-purple-500 rounded-full"
                    style={{ 
                      left: `${50 + 40 * Math.cos(index * (2 * Math.PI / chartData.network.length))}%`,
                      top: `${50 + 40 * Math.sin(index * (2 * Math.PI / chartData.network.length))}%`
                    }}
                  >
                    <span className="absolute text-xs whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 mt-4 text-gray-600 dark:text-gray-400">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'keywords' && chartData.keywords && (
            <div className="col-span-2">
              <div className="flex flex-wrap justify-center">
                {chartData.keywords.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="m-1 px-2 py-1 rounded-full bg-blue-100/70 dark:bg-blue-900/70 backdrop-blur-md"
                    style={{ 
                      fontSize: `${Math.max(0.7, (item.count / Math.max(...chartData.keywords.map((i: any) => i.count))) * 1.5)}rem` 
                    }}
                  >
                    {item.keyword}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Research Visualizations</h3>
      
      <div className="flex overflow-x-auto mb-4 pb-2">
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
            activeTab === 'trends'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <LineChart className="h-4 w-4 mr-2" />
          Publication Trends
        </button>
        
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
            activeTab === 'categories'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <PieChart className="h-4 w-4 mr-2" />
          Categories
        </button>
        
        <button
          onClick={() => setActiveTab('citations')}
          className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
            activeTab === 'citations'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <BarChart className="h-4 w-4 mr-2" />
          Citation Impact
        </button>
        
        <button
          onClick={() => setActiveTab('network')}
          className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
            activeTab === 'network'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Network className="h-4 w-4 mr-2" />
          Collaboration Network
        </button>
        
        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap ${
            activeTab === 'keywords'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Cloud className="h-4 w-4 mr-2" />
          Keyword Cloud
        </button>
      </div>
      
      {renderChart()}
    </div>
  );
}