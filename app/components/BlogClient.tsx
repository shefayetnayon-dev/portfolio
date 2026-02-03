"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiArrowLeft, FiArrowRight, FiTerminal, FiCalendar, FiExternalLink } from 'react-icons/fi';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    version: string;
    readTime: string;
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Filter posts based on search
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono px-4 py-20">
            <div className="max-w-6xl mx-auto">

                {/* Header & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Development Log</h1>
                        <p className="text-gray-400 text-sm">/var/logs/notes.md</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-[#161b22] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                            placeholder="grep 'search_query' ...."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
                        />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <AnimatePresence>
                        {currentPosts.map((post) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={post.slug}
                            >
                                <Link href={`/blog/${post.slug}`} className="block h-full group">
                                    <div className="h-full bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all duration-300 flex flex-col relative overflow-hidden">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] uppercase tracking-wider text-blue-400 bg-blue-900/10 px-2 py-0.5 rounded border border-blue-500/20">
                                                {post.category}
                                            </span>
                                            <span className="text-[10px] text-gray-500">{post.version}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-100 mb-3 group-hover:text-green-400 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 mb-6 flex-grow line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
                                            <div className="flex items-center">
                                                <FiCalendar className="mr-1.5" />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                {post.readTime}
                                                <FiExternalLink className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <FiTerminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No matches found for "{searchQuery}"</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border border-gray-700 bg-[#161b22] text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FiArrowLeft />
                        </button>
                        <span className="text-sm text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border border-gray-700 bg-[#161b22] text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <FiArrowRight />
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
