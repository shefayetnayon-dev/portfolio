// components/Hero.tsx
"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiTerminal, FiGithub, FiLinkedin, FiTwitter, FiCpu, FiCode, FiDatabase, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Building digital experiences...";
  const [cursorVisible, setCursorVisible] = useState(true);
  const [glitch, setGlitch] = useState(false);

  // Advanced Typing effect
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeChar = () => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
        // Randomize typing speed for realism
        const speed = Math.random() * 50 + 50;
        timeoutId = setTimeout(typeChar, speed);
      }
    };

    typeChar();
    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Random Glitch Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1117] pt-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 transform perspective-1000 rotate-x-60 scale-150"></div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#161b22,transparent)]"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2 mb-6"
            >
              <span className="px-3 py-1 rounded-full bg-green-900/20 text-green-400 border border-green-500/30 text-xs font-mono flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                v2.0.0 Online
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-tight">
              <span className="block text-gray-500 text-2xl md:text-3xl font-mono mb-2 opacity-80">const developer =</span>
              <span className={`relative inline-block ${glitch ? 'text-green-500 translate-x-1' : ''} transition-all duration-75`}>
                Shefayet Nayon
              </span>
            </h1>

            <div className="h-8 mb-8 font-mono text-lg md:text-xl text-green-400 flex items-center bg-[#0d1117]/50 w-fit px-2 rounded border border-gray-800 backdrop-blur-sm">
              <span className="mr-3 text-blue-400">~/mission</span>
              <span className="mr-2 text-gray-500">$</span>
              <span>{text}</span>
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1 bg-green-500 w-2 h-5 inline-block`}></span>
            </div>

            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed border-l-2 border-gray-800 pl-4">
              Crafting robust applications with modern technologies.
              Specialized in building scalable full-stack solutions that solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={'/portfolio'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-mono rounded transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-green-900/20"
                >
                  <FiTerminal className="mr-2" />
                  <span>View Projects</span>
                  <FiArrowRight className="ml-1 opacity-70" />
                </motion.button>
              </Link>
              <Link href={'/contact'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[#161b22] hover:bg-[#21262d] text-gray-300 border border-gray-700 hover:border-gray-500 rounded font-mono transition-all duration-200"
                >
                  contact_me()
                </motion.button>
              </Link>
            </div>

            <div className="mt-12 flex items-center space-x-6 text-gray-500">
              <a target="_blank" href="https://github.com/shefayetnayon-dev" className="hover:text-white hover:scale-110 transition-all"><FiGithub size={24} /></a>
              <a target="_blank" href="https://linkedin.com/shefayetnayon" className="hover:text-blue-400 hover:scale-110 transition-all"><FiLinkedin size={24} /></a>
              <a target="_blank" href="https://x.com/ShefayetNayon" className="hover:text-sky-400 hover:scale-110 transition-all"><FiTwitter size={24} /></a>
            </div>
          </motion.div>

          {/* Right Content - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
            className="relative perspective-1000 hidden md:block"
          >
            <div className="relative z-20 rounded-xl bg-[#0d1117] border border-gray-700 shadow-2xl overflow-hidden font-mono text-sm transform transition-transform hover:scale-[1.01] duration-500 box-glow">
              {/* Terminal Header */}
              <div className="bg-[#161b22] px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"></div>
                </div>
                <div className="text-gray-500 text-xs flex items-center">
                  <FiCode className="mr-2" />
                  developer.ts
                </div>
                <div className="w-10"></div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 text-gray-300 overflow-x-auto bg-[#0d1117]/95 backdrop-blur-sm">
                <pre className="language-typescript leading-relaxed">
                  <code>
                    <span className="text-purple-400">interface</span> <span className="text-yellow-400">Developer</span> <span className="text-gray-400">{'{'}</span>{'\n'}
                    <span className="text-gray-500">  // Core attributes</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-blue-300">name</span><span className="text-gray-400">:</span> <span className="text-green-400">string</span><span className="text-gray-400">;</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-blue-300">location</span><span className="text-gray-400">:</span> <span className="text-green-400">string</span><span className="text-gray-400">;</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-blue-300">skills</span><span className="text-gray-400">:</span> <span className="text-green-400">string[]</span><span className="text-gray-400">;</span>{'\n'}
                    <span className="text-gray-400">{'}'}</span>{'\n\n'}
                    <span className="text-purple-400">const</span> <span className="text-blue-400">me</span><span className="text-gray-400">:</span> <span className="text-yellow-400">Developer</span> <span className="text-gray-400">= {'{'}</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-blue-300">name</span><span className="text-gray-400">:</span> <span className="text-green-400">"Shefayet"</span><span className="text-gray-400">,</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-blue-300">location</span><span className="text-gray-400">:</span> <span className="text-green-400">"Earth"</span><span className="text-gray-400">,</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-blue-300">skills</span><span className="text-gray-400">: [</span>{'\n'}
                    <span className="text-gray-400">    </span><span className="text-green-400">"Next.js"</span><span className="text-gray-400">,</span> <span className="text-green-400">"React"</span><span className="text-gray-400">,</span>{'\n'}
                    <span className="text-gray-400">    </span><span className="text-green-400">"TypeScript"</span><span className="text-gray-400">,</span> <span className="text-green-400">"Node"</span>{'\n'}
                    <span className="text-gray-400">  ]</span>{'\n'}
                    <span className="text-gray-400">{'}'};</span>
                  </code>
                </pre>
              </div>

              {/* Terminal Footer (Status Bar) */}
              <div className="bg-[#161b22] px-4 py-1.5 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500 font-mono">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center hover:text-blue-400 transition-colors cursor-pointer"><FiTerminal className="mr-1" /> TERMINAL</span>
                  <span className="flex items-center hover:text-red-400 transition-colors cursor-pointer">DEBUG CONSOLE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>Ready</span>
                  <span className="bg-gray-700 px-2 py-0.5 rounded text-gray-300">LF</span>
                  <span className="bg-gray-700 px-2 py-0.5 rounded text-gray-300">TypeScript</span>
                </div>
              </div>
            </div>

            {/* Floating Icons with improved animation */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-4 bg-[#161b22]/90 backdrop-blur rounded-xl border border-gray-700 shadow-xl z-10 glass-panel"
            >
              <FiCpu className="text-blue-400 w-10 h-10" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 p-4 bg-[#161b22]/90 backdrop-blur rounded-xl border border-gray-700 shadow-xl z-10 glass-panel"
            >
              <FiDatabase className="text-purple-400 w-10 h-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;