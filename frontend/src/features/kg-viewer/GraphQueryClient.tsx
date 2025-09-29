'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const GraphQueryClient: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Executing query:', query);
    // Here you would typically dispatch the query to your backend
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-nasa-blue focus:border-nasa-blue sm:text-sm"
            placeholder="Query the knowledge graph (e.g., 'radiation effects on stem cells')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-nasa-blue hover:bg-nasa-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nasa-blue"
        >
          Execute
        </button>
      </form>
    </div>
  );
};

export default GraphQueryClient;