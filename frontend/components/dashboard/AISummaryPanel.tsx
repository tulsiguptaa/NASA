'use client';

import { useState, useEffect } from 'react';
import { Brain, Lightbulb, RefreshCw } from 'lucide-react';

interface AISummaryPanelProps {
  studyId?: string;
  topic?: string;
  keywords?: string[];
}

export default function AISummaryPanel({ studyId, topic, keywords }: AISummaryPanelProps) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    
    try {
      let url = '/api/v1/insights/summary?';
      
      if (studyId) {
        url += `studyId=${encodeURIComponent(studyId)}`;
      } else if (topic) {
        url += `topic=${encodeURIComponent(topic)}`;
      } else if (keywords && keywords.length > 0) {
        url += `keywords=${encodeURIComponent(keywords.join(','))}`;
      } else {
        // Default to trending topics if no specific parameters
        url = '/api/v1/insights/trending';
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setSummary(data.summary || data.trends.join('\n\n'));
      } else {
        setError('Failed to generate summary');
      }
    } catch (error) {
      console.error('Error fetching AI summary:', error);
      setError('An error occurred while generating the summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [studyId, topic, keywords?.join(',')]);

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center text-gray-800 dark:text-white">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          AI-Generated Insights
        </h3>
        <button 
          onClick={fetchSummary}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <Brain className="h-10 w-10 text-purple-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Generating insights...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-6 text-red-500 dark:text-red-400">
          <p>{error}</p>
          <button 
            onClick={fetchSummary}
            className="mt-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          {summary.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-3 text-gray-700 dark:text-gray-300">
              {index === 0 && (
                <Lightbulb className="h-5 w-5 inline-block mr-2 text-yellow-500 align-text-bottom" />
              )}
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}