// app/blog/page.tsx
"use client";

import { motion } from 'framer-motion';
import { FiTerminal, FiRss, FiTag, FiCalendar, FiArrowRight, FiHash, FiFilter } from 'react-icons/fi';
import BlogSection from '../components/BlogSection';
import Link from 'next/link';

const BlogPage = () => {
  const featuredLog = {
    title: "Migrating to Next.js 14: A Comprehensive Guide",
    excerpt: "Detailed walkthrough of the migration process, including server actions, partial prerendering, and performance improvements.",
    date: "Nov 20, 2024",
    version: "v2.4.0",
    category: "Tutorial",
    tags: ["Next.js", "React", "Performance"]
  };

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
                <span>tail -f /var/log/dev_journal.log</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Development <span className="text-purple-500">Log</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Documenting the journey, sharing knowledge, and tracking changes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block p-6 bg-[#161b22] border border-gray-700 rounded-lg max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Latest Release</span>
                <span className="text-xs text-gray-500">{featuredLog.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{featuredLog.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{featuredLog.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredLog.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full py-2 bg-purple-600/10 text-purple-400 border border-purple-500/50 rounded hover:bg-purple-600/20 transition-colors text-sm font-bold flex items-center justify-center">
                Read Full Log <FiArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories / Filter Bar */}
      <section className="py-8 px-4 border-b border-gray-800 bg-[#161b22]/30">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex items-center text-sm text-gray-400 mr-4">
            <FiFilter className="mr-2" />
            <span>Filter logs:</span>
          </div>
          {["All", "Tutorials", "Case Studies", "Snippets", "Rants"].map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded text-sm border transition-colors ${cat === "All"
                  ? "bg-purple-600/10 text-purple-400 border-purple-500/50"
                  : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500"
                }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center text-sm text-gray-500">
            <FiRss className="mr-2 hover:text-orange-500 cursor-pointer" />
            <span>RSS Feed</span>
          </div>
        </div>
      </section>

      {/* Main Blog Section */}
      <BlogSection />

      {/* Newsletter / Subscribe */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#161b22] border border-gray-700 rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Subscribe to the Changelog
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get notified about new releases, technical articles, and development updates. No spam, just code.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="developer@example.com"
                className="flex-1 bg-[#0d1117] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;