// app/blog/[slug]/page.tsx
"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiTerminal, FiArrowLeft, FiCalendar, FiTag, FiUser, FiClock, FiHash } from 'react-icons/fi';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  readTime?: string;
  version?: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch('/blog.json');
        const data: BlogPost[] = await response.json();
        const post = data.find(post => post.slug === slug);

        if (!post) {
          notFound();
        }

        // Add mock metadata if missing
        const enhancedPost = {
          ...post,
          author: post?.author || "DevAdmin",
          readTime: post?.readTime || "5 min read",
          version: post?.version || `v1.${Math.floor(Math.random() * 9)}.${Math.floor(Math.random() * 9)}`
        };

        setBlogPost(enhancedPost as BlogPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center font-mono">
        <div className="flex items-center space-x-2 text-green-500 mb-4">
          <FiTerminal className="animate-pulse" />
          <span>loading_resource...</span>
        </div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-progress"></div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return null; // handled by notFound()
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono">
      {/* Top Bar / Breadcrumb */}
      <div className="sticky top-0 z-50 bg-[#0d1117]/90 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center text-sm text-gray-500 hover:text-blue-400 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span>cd ..</span>
          </Link>
          <div className="text-xs text-gray-600 hidden md:block">
            /var/log/dev_journal/{slug}.md
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center text-gray-500">
              <FiHash className="mr-1" />
              {blogPost.version}
            </span>
            <span className="px-2 py-0.5 bg-green-900/20 text-green-400 border border-green-900/50 rounded">
              Read-Only
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-gray-800 pb-12"
        >
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="flex items-center text-purple-400 bg-purple-900/10 px-3 py-1 rounded border border-purple-500/20">
              <FiTag className="mr-2" />
              {blogPost.category}
            </span>
            <span className="flex items-center text-gray-500">
              <FiCalendar className="mr-2" />
              {formatDate(blogPost.date)}
            </span>
            <span className="flex items-center text-gray-500">
              <FiClock className="mr-2" />
              {blogPost.readTime}
            </span>
            <span className="flex items-center text-gray-500">
              <FiUser className="mr-2" />
              {blogPost.author}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blogPost.title}
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed border-l-4 border-gray-700 pl-6 italic">
            {blogPost.excerpt}
          </p>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {/* Featured Image as a "Resource" */}
          <div className="mb-12 bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden p-2">
            <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-gray-700 mb-2 rounded-t">
              <span className="text-xs text-gray-500">preview.jpg</span>
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
              </div>
            </div>
            <div className="relative h-64 md:h-96 w-full rounded overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt={blogPost.title}
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-6 text-gray-300">
            {blogPost.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Mock Code Block for vibe */}
            <div className="my-8 rounded-lg overflow-hidden border border-gray-700 bg-[#161b22]">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-gray-700">
                <span className="text-xs text-blue-400">example.ts</span>
                <span className="text-xs text-gray-500">TypeScript</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{`interface Response {
  status: 200 | 404 | 500;
  message: string;
  data?: unknown;
}

async function fetchData(): Promise<Response> {
  // Implementation details...
  return { status: 200, message: "Success" };
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer / Navigation */}
        <div className="mt-20 pt-8 border-t border-gray-800 flex justify-between items-center">
          <Link
            href="/blog"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-sm transition-colors"
          >
            ← Back to Logs
          </Link>
          <button
            className="px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/50 hover:bg-blue-600/20 rounded text-sm transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ^ Top
          </button>
        </div>
      </div>
    </div>
  );
}