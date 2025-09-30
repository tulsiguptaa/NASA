'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Download, BookOpen } from 'lucide-react';

interface Study {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  publishedDate: string;
  category: string;
  citations: number;
  doi: string;
}

interface StudyExplorerTableProps {
  searchParams?: any;
}

export default function StudyExplorerTable({ searchParams }: StudyExplorerTableProps) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortField, setSortField] = useState('publishedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);
  const [studyDetails, setStudyDetails] = useState<any>(null);

  const fetchStudies = async () => {
    setLoading(true);
    setError('');
    
    try {
      let url = `/api/v1/studies?page=${currentPage}&sort=${sortField}&order=${sortDirection}`;
      
      // Add search parameters if provided
      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) {
            url += `&${key}=${encodeURIComponent(String(value))}`;
          }
        });
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setStudies(data.studies);
        setTotalPages(data.pagination.totalPages);
      } else {
        setError('Failed to load studies');
      }
    } catch (error) {
      console.error('Error fetching studies:', error);
      setError('An error occurred while loading studies');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudyDetails = async (studyId: string) => {
    try {
      const response = await fetch(`/api/v1/studies/${studyId}`);
      const data = await response.json();
      
      if (data.success) {
        setStudyDetails(data.study);
      }
    } catch (error) {
      console.error('Error fetching study details:', error);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [currentPage, sortField, sortDirection, searchParams]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const handleExpandStudy = (studyId: string) => {
    if (expandedStudy === studyId) {
      setExpandedStudy(null);
      setStudyDetails(null);
    } else {
      setExpandedStudy(studyId);
      fetchStudyDetails(studyId);
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 inline ml-1" /> 
      : <ChevronDown className="h-4 w-4 inline ml-1" />;
  };

  if (loading && studies.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Study Explorer</h3>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Study Explorer</h3>
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          <p>{error}</p>
          <button 
            onClick={fetchStudies}
            className="mt-4 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded hover:bg-black/70"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Study Explorer</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
          <thead className="bg-black/30 backdrop-blur-sm dark:bg-gray-700/70">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('title')}
              >
                Title {renderSortIcon('title')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('authors')}
              >
                Authors {renderSortIcon('authors')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('publishedDate')}
              >
                Date {renderSortIcon('publishedDate')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('category')}
              >
                Category {renderSortIcon('category')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('citations')}
              >
                Citations {renderSortIcon('citations')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-black/20 backdrop-blur-sm dark:bg-gray-800/50 divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {studies.map((study) => (
              <>
                <tr 
                  key={study.id} 
                  className={`hover:bg-black/30 dark:hover:bg-gray-700/70 ${expandedStudy === study.id ? 'bg-black/40 backdrop-blur-md dark:bg-gray-800/70' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleExpandStudy(study.id)}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 text-left"
                      >
                        {study.title}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {study.authors.slice(0, 2).join(', ')}
                    {study.authors.length > 2 && ' et al.'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(study.publishedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {study.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {study.citations}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a 
                      href={`https://doi.org/${study.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                
                {/* Expanded study details */}
                {expandedStudy === study.id && studyDetails && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-black/30 backdrop-blur-sm dark:bg-gray-700/50">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <h4 className="font-medium mb-2">Abstract</h4>
                        <p className="mb-4">{studyDetails.abstract}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium mb-2">Keywords</h4>
                            <div className="flex flex-wrap gap-1">
                              {studyDetails.keywords.map((keyword: string, index: number) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 text-xs rounded-full bg-black/40 backdrop-blur-md text-white dark:bg-gray-800/70 dark:text-gray-200"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Related Studies</h4>
                            <ul className="list-disc list-inside">
                              {studyDetails.relatedStudies?.slice(0, 3).map((related: any) => (
                                <li key={related.id} className="mb-1">
                                  <a 
                                    href="#" 
                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleExpandStudy(related.id);
                                    }}
                                  >
                                    {related.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button 
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <BookOpen className="h-4 w-4 mr-1" />
                            View Full Study
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-6 py-3 bg-black/30 backdrop-blur-md dark:bg-gray-800/50 rounded-lg">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-white hover:bg-black/40 dark:text-gray-200 dark:hover:bg-gray-700/70'
            }`}
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-200 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-white hover:bg-black/40 dark:text-gray-200 dark:hover:bg-gray-700/70'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}