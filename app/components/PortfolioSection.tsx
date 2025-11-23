'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiStar, FiGitBranch, FiFilter, FiFolder, FiExternalLink } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  url: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
}

const categories = ["All", "Blog", "E-commerce", "Edu", "Personal", "Newspaper"];

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/portfolio.json');
        const data = await response.json();
        // Add mock data for repo feel
        const enhancedData = data.map((p: Project) => ({
          ...p,
          description: p.description || "A high-performance web application built with modern technologies.",
          language: p.category === "E-commerce" ? "TypeScript" : "JavaScript",
          stars: Math.floor(Math.random() * 50) + 10,
          forks: Math.floor(Math.random() * 20) + 1
        }));
        setProjects(enhancedData);
        setFilteredProjects(enhancedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === selectedCategory);
      setFilteredProjects(filtered);
    }
  }, [selectedCategory, projects]);

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'TypeScript': return 'bg-blue-500';
      case 'JavaScript': return 'bg-yellow-400';
      case 'Python': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <section className="py-20 px-4 bg-[#0d1117]" id='portfolio'>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
              <FiBook className="mr-3" /> Repositories
            </h2>
            <p className="text-gray-400">
              Explore my open source projects and experiments.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-400">
            <FiFilter />
            <span>Filter by type:</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-all duration-200 ${selectedCategory === category
                ? 'bg-green-600/10 text-green-400 border-green-500/50'
                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0d1117] border border-gray-700 rounded-md p-4 hover:border-gray-500 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <FiBook className="text-gray-500" />
                      <h3 className="font-bold text-blue-400 hover:underline cursor-pointer truncate">
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          {project.title.toLowerCase().replace(/\s+/g, '-')}
                        </a>
                      </h3>
                      <span className="px-2 py-0.5 text-xs border border-gray-700 rounded-full text-gray-500">Public</span>
                    </div>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                      <FiExternalLink />
                    </a>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-auto">
                    <div className="flex items-center space-x-1">
                      <span className={`w-3 h-3 rounded-full ${getLanguageColor(project.language || 'JavaScript')}`}></span>
                      <span>{project.language}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer">
                      <FiStar />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer">
                      <FiGitBranch />
                      <span>{project.forks}</span>
                    </div>
                    <div className="text-gray-600">Updated 2 days ago</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
            <FiFolder className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500">No repositories found matching this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}