// app/portfolio/page.tsx
"use client";

import { motion } from 'framer-motion';
import { FiBook, FiStar, FiGitBranch, FiActivity, FiTerminal } from 'react-icons/fi';
import PortfolioSection from '../components/PortfolioSection';
import { useState, useEffect } from 'react';

const PortfolioPage = () => {
  const pinnedRepos = [
    {
      name: "portfolio-v2",
      description: "My personal portfolio website built with Next.js and Tailwind CSS.",
      language: "TypeScript",
      stars: 124,
      forks: 35,
      color: "bg-blue-500"
    },
    {
      name: "react-terminal-ui",
      description: "A lightweight, customizable terminal UI component for React applications.",
      language: "JavaScript",
      stars: 89,
      forks: 12,
      color: "bg-yellow-400"
    },
    {
      name: "dev-tools-cli",
      description: "Command line interface for developer productivity and workflow automation.",
      language: "Rust",
      stars: 256,
      forks: 42,
      color: "bg-orange-500"
    }
  ];

  // Hydration fix: Generate random data only on client
  const [contributionData, setContributionData] = useState<string[]>([]);

  useEffect(() => {
    const data = Array(52).fill(0).map(() => {
      const rand = Math.random();
      if (rand > 0.8) return 'bg-green-400';
      if (rand > 0.6) return 'bg-green-600';
      if (rand > 0.4) return 'bg-green-800';
      return 'bg-gray-800';
    });
    setContributionData(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 mb-6">
                <FiTerminal />
                <span>git remote -v</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Open Source <span className="text-green-500">Projects</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                A collection of repositories, experiments, and production-ready applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block p-6 bg-[#161b22] border border-gray-700 rounded-lg max-w-sm w-full"
            >
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Contribution Activity</h3>
              <div className="flex gap-1 flex-wrap">
                {contributionData.length > 0 ? (
                  contributionData.map((color, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${color}`}
                    ></div>
                  ))
                ) : (
                  // Skeleton for SSR
                  [...Array(52)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm bg-gray-800"
                    ></div>
                  ))
                )}
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pinned Repositories */}
      <section className="py-12 px-4 border-b border-gray-800 bg-[#161b22]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-bold text-gray-400 mb-6 flex items-center">
            <FiActivity className="mr-2" /> Pinned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pinnedRepos.map((repo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0d1117] border border-gray-700 rounded-md p-4 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <FiBook className="text-gray-500" />
                  <span className="font-bold text-blue-400">{repo.name}</span>
                  <span className="px-2 py-0.5 text-xs border border-gray-700 rounded-full text-gray-500">Public</span>
                </div>
                <p className="text-xs text-gray-400 mb-4 h-10 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span className={`w-3 h-3 rounded-full ${repo.color}`}></span>
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiStar />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiGitBranch />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Portfolio Section */}
      <PortfolioSection />

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            Want to contribute?
          </h2>
          <p className="text-gray-400 mb-8">
            Check out my GitHub profile for more open source projects and contributions.
          </p>
          <a
            href="https://github.com/shefayetnayon-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#238636] text-white font-bold rounded hover:bg-[#2ea043] transition-colors"
          >
            <FiGitBranch className="mr-2" />
            View GitHub Profile
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
