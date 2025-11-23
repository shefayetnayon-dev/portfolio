// components/BlogSection.tsx
"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiFileText, FiHash, FiCalendar, FiArrowRight, FiTerminal } from 'react-icons/fi';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  version?: string;
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/blog.json');
        const data = await response.json();
        // Add mock version numbers
        const enhancedData = data.slice(0, 4).map((post: any) => ({
          ...post,
          version: `v${Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`
        }));
        setBlogPosts(enhancedData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="py-20 bg-[#0d1117] flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-[#0d1117] border-t border-gray-800" id='blog'>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <FiTerminal />
              <span>cat /var/log/dev_journal.log</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="text-purple-500">Dev</span>Log
            </h2>
            <p className="text-gray-400">
              Latest updates, tutorials, and technical deep dives.
            </p>
          </div>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300 text-sm flex items-center mt-4 md:mt-0">
            View all logs <FiArrowRight className="ml-1" />
          </Link>
        </div>

        {/* Blog posts list */}
        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-all duration-300 flex flex-col md:flex-row gap-6">
                  {/* Date & Version Column */}
                  <div className="md:w-48 flex-shrink-0 flex flex-col justify-center md:border-r md:border-gray-700 md:pr-6">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <FiCalendar className="mr-2" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded w-fit">
                      <FiHash className="mr-1" />
                      {post.version}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="flex items-center text-blue-400 bg-blue-900/10 px-2 py-1 rounded border border-blue-500/20">
                        <FiFileText className="mr-1" />
                        {post.category}
                      </span>
                      <span className="text-gray-600">Read time: 5 min</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center text-gray-600 group-hover:text-purple-500 transition-colors">
                    <FiArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;