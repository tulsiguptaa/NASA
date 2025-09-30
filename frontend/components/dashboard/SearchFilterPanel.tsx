'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, User, Building, Tag } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  institutions: string[];
  authors: string[];
  dateRange: {
    min: string;
    max: string;
  };
  keywords: string[];
}

interface SearchFilterPanelProps {
  onSearch: (params: any) => void;
}

export default function SearchFilterPanel({ onSearch }: SearchFilterPanelProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    institutions: [],
    authors: [],
    dateRange: { min: '', max: '' },
    keywords: []
  });
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/v1/search/filters');
        const data = await response.json();
        
        if (data.success) {
          setFilterOptions(data.filters);
        }
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Handle autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      
      try {
        const response = await fetch(`/api/v1/search/autocomplete?term=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
          setSuggestions(data.suggestions);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = () => {
    const searchParams = {
      query,
      ...(selectedCategory && { category: selectedCategory }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(selectedAuthor && { author: selectedAuthor }),
      ...(selectedInstitution && { institution: selectedInstitution }),
      ...(selectedKeywords.length > 0 && { keywords: selectedKeywords.join(',') })
    };
    
    onSearch(searchParams);
  };

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setStartDate('');
    setEndDate('');
    setSelectedAuthor('');
    setSelectedInstitution('');
    setSelectedKeywords([]);
  };

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search input */}
        <div className="relative">
          <div className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search space biology research..."
                className="w-full px-4 py-2 pl-10 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {/* Autocomplete suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                      onClick={() => {
                        setQuery(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Filter toggle */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
          >
            <Filter className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {showFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-red-600 dark:text-red-400 hover:underline focus:outline-none"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {/* Category filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Categories</option>
                {filterOptions.categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date range filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={filterOptions.dateRange.min}
                max={filterOptions.dateRange.max}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={filterOptions.dateRange.min}
                max={filterOptions.dateRange.max}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            {/* Author filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <User className="h-4 w-4 inline mr-1" />
                Author
              </label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Authors</option>
                {filterOptions.authors.map((author, index) => (
                  <option key={index} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Institution filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Building className="h-4 w-4 inline mr-1" />
                Institution
              </label>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">All Institutions</option>
                {filterOptions.institutions.map((institution, index) => (
                  <option key={index} value={institution}>
                    {institution}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Keywords filter */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Tag className="h-4 w-4 inline mr-1" />
                Keywords
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {filterOptions.keywords.slice(0, 15).map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => handleKeywordToggle(keyword)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedKeywords.includes(keyword)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}