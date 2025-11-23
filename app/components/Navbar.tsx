// components/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiTerminal, FiCommand } from 'react-icons/fi';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
}

interface SearchResult {
  type: 'blog' | 'page';
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch blog posts for search
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/blog.json');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search in blog posts
    blogPosts.forEach(post => {
      if (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'blog',
          title: post.title,
          slug: `/blog/${post.slug}`,
          excerpt: post.excerpt,
          category: post.category
        });
      }
    });

    // Search in pages
    const pages = [
      { title: 'Home', slug: '/' },
      { title: 'About', slug: '/about' },
      { title: 'Services', slug: '/services' },
      { title: 'Portfolio', slug: '/portfolio' },
      { title: 'Pricing', slug: '/pricing' },
      { title: 'Blog', slug: '/blog' },
      { title: 'Contact', slug: '/contact' },
    ];

    pages.forEach(page => {
      if (page.title.toLowerCase().includes(query)) {
        results.push({
          type: 'page',
          title: page.title,
          slug: page.slug
        });
      }
    });

    setSearchResults(results.slice(0, 5)); // Limit to 5 results
  }, [searchQuery, blogPosts]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Menu items
  const menuItems = [
    { name: '~/home', href: '/' },
    { name: './about', href: '/about' },
    { name: './services', href: '/services' },
    { name: './portfolio', href: '/portfolio' },
    { name: './blog', href: '/blog' },
    { name: './contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled
        ? 'bg-[#0d1117]/90 backdrop-blur-md border-gray-800'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left section: Profile image and name */}
          <div className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded border border-green-500/50 bg-black/50 flex items-center justify-center overflow-hidden group-hover:border-green-400 transition-colors">
              <Link href={'/'}>
                <FiTerminal className="text-green-500 w-6 h-6" />
              </Link>
            </div>
            <Link href={'/'}>
              <span className="font-mono font-bold text-lg text-gray-300 group-hover:text-green-400 transition-colors">
                <span className="text-green-500">&gt;</span> shefayet_nayon
                <span className="animate-pulse">_</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1 bg-[#161b22] rounded-full px-4 py-1 border border-gray-800">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 rounded-full text-sm font-mono text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right section: Search and button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search input with animation */}
            <div className="relative" ref={searchRef}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCommand className="h-4 w-4 text-gray-500 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="find..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="pl-10 pr-4 py-1.5 bg-[#0d1117] text-sm font-mono text-gray-300 rounded border border-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-300 w-32 focus:w-64 placeholder-gray-600"
                />
              </div>

              {/* Search results dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-[#161b22] rounded border border-gray-700 shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-1">
                      {searchResults.map((result, index) => (
                        <Link
                          key={index}
                          href={result.slug}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="block p-2 rounded hover:bg-[#0d1117] group transition-colors duration-200"
                        >
                          <div className="flex items-center">
                            <span className="font-mono text-xs text-gray-500 mr-2 w-12 text-right">
                              {result.type === 'blog' ? '[LOG]' : '[DIR]'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-mono text-gray-300 group-hover:text-green-400 truncate">
                                {result.title}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hire Me button */}
            <Link href={'/contact'}>
              <button className="flex items-center space-x-2 px-4 py-1.5 bg-green-600/10 text-green-500 border border-green-500/50 rounded hover:bg-green-600/20 hover:border-green-500 transition-all duration-300 font-mono text-sm">
                <span>$ contact_me</span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 overflow-hidden border-t border-gray-800"
            >
              <div className="flex flex-col space-y-1 pt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-sm font-mono text-gray-400 hover:text-green-400 hover:bg-gray-800/50 transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="px-4 py-3 text-sm font-mono text-green-500 hover:bg-green-900/10 transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  $ contact_me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;