// components/BlogSection.tsx
"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiFileText, FiCalendar, FiArrowRight, FiTerminal, FiExternalLink } from 'react-icons/fi';

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  version?: string;
  readTime: string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setBlogPosts(data.slice(0, 3)); // Show only latest 3
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="py-20 bg-[#0d1117] flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <section className="relative py-24 bg-[#0d1117]" id='blog'>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-green-500 bg-green-900/10 px-2 py-1 rounded border border-green-500/20 mb-4">
              <FiTerminal />
              <span>~/dev/logs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Engineering <span className="text-gray-500">Journal</span>
            </h2>
            <p className="text-gray-400 max-w-lg">
              Technical writes, system designs, and development chronicles.
            </p>
          </div>
          <Link href="/blog" className="group text-sm font-mono text-gray-400 hover:text-white flex items-center mt-6 md:mt-0 transition-colors border-b border-transparent hover:border-gray-500 pb-0.5">
            cd ./all-posts <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="h-full bg-[#161b22]/50 backdrop-blur-sm border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1 flex flex-col relative overflow-hidden">

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Header: Category & Ver */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-900/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {post.version}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-100 mb-3 leading-snug group-hover:text-purple-400 transition-colors relative z-10">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-400 mb-6 line-clamp-3 relative z-10 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Footer: Date & Read Time */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800/50 pt-4 mt-auto relative z-10">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center font-mono group-hover:text-gray-300 transition-colors">
                      {post.readTime}
                      <FiExternalLink className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;