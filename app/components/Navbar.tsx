// components/Navbar.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTerminal, FiCommand, FiHome, FiUser, FiBriefcase, FiFeather, FiMail, FiSearch } from 'react-icons/fi';
import { Command } from 'cmdk';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle Command Palette with Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const navItems = [
    { name: '~/home', path: '/' },
    { name: './about', path: '/about' },
    { name: './projects', path: '/portfolio' },
    { name: './blog', path: '/blog' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-40 transition-all duration-300 border-b border-transparent ${isScrolled
          ? 'bg-[#0d1117]/80 backdrop-blur-md border-gray-800'
          : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/50 flex items-center justify-center group-hover:border-green-400 transition-colors">
                <FiTerminal className="text-green-500" />
              </div>
              <span className="font-mono font-bold text-gray-300 group-hover:text-white transition-colors">
                shefayet_nayon<span className="animate-pulse text-green-500">_</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 bg-[#161b22]/50 rounded-full px-2 py-1 border border-gray-800 backdrop-blur-sm">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="px-4 py-1.5 rounded-full text-sm font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-[#161b22] hover:bg-[#1c2128] border border-gray-700 hover:border-gray-600 rounded-md text-sm text-gray-400 transition-all group"
              >
                <FiSearch className="w-3 h-3 group-hover:text-white transition-colors" />
                <span>Search...</span>
                <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-gray-700 bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <Link href="/contact">
                <button className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors shadow-lg shadow-green-900/20">
                  Hire Me
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiCommand className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-[#0d1117] border-b border-gray-800"
            >
              <div className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-300 hover:text-green-400 font-mono"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setOpen(true);
                  }}
                  className="w-full text-left text-gray-300 hover:text-green-400 font-mono flex items-center space-x-2"
                >
                  <FiSearch /> <span>Search...</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#161b22] border border-gray-700 rounded-xl shadow-2xl overflow-hidden glass-panel z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Command className="w-full h-full bg-transparent flex flex-col">
                <div className="flex items-center border-b border-gray-700 px-3 shrink-0">
                  <FiSearch className="mr-2 h-5 w-5 text-gray-400 shrink-0" />
                  <div className="sr-only" id="command-label">Global Command Menu</div>
                  <Command.Input
                    placeholder="Type a command or search..."
                    aria-labelledby="command-label"
                    className="w-full bg-transparent py-4 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="hidden sm:flex border border-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    ESC
                  </button>
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="text-xs font-bold text-gray-500 px-2 py-1.5 uppercase tracking-wider mb-2">
                    <Command.Item
                      onSelect={() => { setOpen(false); router.push('/'); }}
                      className="flex items-center px-2 py-2 rounded-md text-sm text-gray-300 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                    >
                      <FiHome className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { setOpen(false); router.push('/about'); }}
                      className="flex items-center px-2 py-2 rounded-md text-sm text-gray-300 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                    >
                      <FiUser className="mr-2 h-4 w-4" />
                      <span>About</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { setOpen(false); router.push('/portfolio'); }}
                      className="flex items-center px-2 py-2 rounded-md text-sm text-gray-300 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                    >
                      <FiBriefcase className="mr-2 h-4 w-4" />
                      <span>Projects</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { setOpen(false); router.push('/blog'); }}
                      className="flex items-center px-2 py-2 rounded-md text-sm text-gray-300 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                    >
                      <FiFeather className="mr-2 h-4 w-4" />
                      <span>Blog</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator className="my-1 h-px bg-gray-800" />

                  <Command.Group heading="Socials" className="text-xs font-bold text-gray-500 px-2 py-1.5 uppercase tracking-wider mb-2">
                    <Command.Item
                      onSelect={() => { setOpen(false); window.open('https://github.com/shefayetnayon-dev', '_blank'); }}
                      className="flex items-center px-2 py-2 rounded-md text-sm text-gray-300 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                    >
                      <FiTerminal className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => { setOpen(false); router.push('/contact'); }}
                      className="flex items-center px-2 py-2 rounded-md text-sm text-gray-300 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                    >
                      <FiMail className="mr-2 h-4 w-4" />
                      <span>Contact Me</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;