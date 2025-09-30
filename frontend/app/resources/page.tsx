'use client';

import { useState, useEffect } from 'react';
import { Book, Database, FileText, BookOpen, ExternalLink, Loader } from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/v1/resources');
        
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        
        const data = await response.json();
        setResources(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to load resources. Please try again later.');
        // Use mock data as fallback
        setResources([
          {
            id: 1,
            title: "NASA Open Science Data Repository",
            description: "Access open science data from NASA's space biology research programs.",
            url: "https://osdr.nasa.gov/bio/",
            category: "data",
            icon: "database"
          },
          {
            id: 2,
            title: "NASA Space Life Sciences Library",
            description: "Comprehensive library of space life sciences publications and research.",
            url: "https://lsda.jsc.nasa.gov/",
            category: "publications",
            icon: "book"
          },
          {
            id: 3,
            title: "NASA Task Book",
            description: "Information on research projects funded by NASA's biological research programs.",
            url: "https://taskbook.nasaprs.com/tbp/index.cfm",
            category: "research",
            icon: "file-text"
          },
          {
            id: 4,
            title: "Space Biology Publications",
            description: "Collection of 608 full-text open-access Space Biology publications.",
            url: "https://www.nasa.gov/missions/station/iss-research/space-biology-publications/",
            category: "publications",
            icon: "book-open"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = activeCategory 
    ? resources.filter(resource => resource.category === activeCategory)
    : resources;

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'database':
        return <Database className="text-tech-cyan" />;
      case 'book':
        return <Book className="text-nasa-red" />;
      case 'file-text':
        return <FileText className="text-tech-cyan" />;
      case 'book-open':
        return <BookOpen className="text-nasa-red" />;
      default:
        return <Database className="text-tech-cyan" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'data', label: 'Data Repositories' },
    { id: 'publications', label: 'Publications' },
    { id: 'research', label: 'Research Projects' }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-nasa-blue to-tech-cyan">
            NASA Space Biology Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access official NASA resources for space biology research, including publications, 
            data repositories, and research projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id === 'all' ? null : category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (category.id === 'all' && activeCategory === null) || category.id === activeCategory
                  ? 'bg-tech-cyan text-black'
                  : 'bg-black/30 text-gray-300 hover:bg-black/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin text-tech-cyan mr-2" />
            <span>Loading resources...</span>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-900 text-red-200 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map(resource => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-black/30 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-tech-cyan transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center flex-shrink-0">
                  {getIconComponent(resource.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-tech-cyan transition-colors">
                      {resource.title}
                    </h3>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-tech-cyan transition-colors" />
                  </div>
                  <p className="text-gray-400 mb-3">{resource.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-black/50 text-gray-300 capitalize">
                    {resource.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Publications Highlight */}
        <div className="mt-16 bg-black/40 backdrop-blur-md rounded-xl p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-tech-cyan">Space Biology Publications</h2>
              <p className="text-gray-300">
                Access 608 full-text open-access Space Biology publications from NASA's research programs.
              </p>
            </div>
            <Link 
              href="/publications"
              className="px-6 py-3 bg-tech-cyan/20 hover:bg-tech-cyan/30 text-tech-cyan rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">Browse Publications</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}