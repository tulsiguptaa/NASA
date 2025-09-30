'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface InsightPanelProps {
  filter?: {
    category?: string;
    topic?: string;
  };
}

export default function InsightPanel({ filter }: InsightPanelProps) {
  const [activeTab, setActiveTab] = useState('trends');
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchInsights = async (type: string) => {
    setLoading(true);
    setError('');
    
    try {
      let url = `/api/v1/insights/${type}`;
      
      // Add filter parameters if provided
      if (filter) {
        const params = new URLSearchParams();
        if (filter.category) params.append('category', filter.category);
        if (filter.topic) params.append('topic', filter.topic);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setInsights(data);
      } else {
        setError('Failed to load insights');
      }
    } catch (error) {
      console.error(`Error fetching ${type} insights:`, error);
      setError('An error occurred while loading insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights(activeTab);
  }, [activeTab, filter]);

  const renderInsightContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <RefreshCw className="h-8 w-8 text-blue-400 animate-spin mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Loading insights...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-6 text-red-500 dark:text-red-400">
          <p>{error}</p>
          <button 
            onClick={() => fetchInsights(activeTab)}
            className="mt-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            Try again
          </button>
        </div>
      );
    }

    if (!insights) {
      return (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p>No insights available</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'trends':
        return (
          <div className="space-y-4">
            {insights.trends?.map((trend: any, index: number) => (
              <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">{trend.topic}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{trend.description}</p>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {trend.growth && (
                        <span className="inline-flex items-center mr-3">
                          <span className="text-green-600 dark:text-green-400 font-medium">+{trend.growth}%</span> growth in publications
                        </span>
                      )}
                      {trend.citations && (
                        <span className="inline-flex items-center">
                          <span className="text-purple-600 dark:text-purple-400 font-medium">{trend.citations}</span> recent citations
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'gaps':
        return (
          <div className="space-y-4">
            {insights.gaps?.map((gap: any, index: number) => (
              <div key={index} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">{gap.area}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{gap.description}</p>
                    {gap.potentialImpact && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Potential Impact:</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{gap.potentialImpact}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'consensus':
        return (
          <div className="space-y-4">
            {insights.consensus?.map((item: any, index: number) => (
              <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">{item.topic}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${item.agreementPercentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {item.agreementPercentage}% consensus
                      </span>
                    </div>
                    {item.keyStudies && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Key Studies:</span>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 list-disc list-inside">
                          {item.keyStudies.map((study: string, i: number) => (
                            <li key={i}>{study}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Research Insights</h3>
      
      <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'trends'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Trending Topics
        </button>
        
        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'gaps'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Research Gaps
        </button>
        
        <button
          onClick={() => setActiveTab('consensus')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'consensus'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Scientific Consensus
        </button>
      </div>
      
      {renderInsightContent()}
    </div>
  );
}