// components/Hero.tsx
"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiTerminal, FiGithub, FiLinkedin, FiTwitter, FiCpu, FiCode, FiDatabase } from 'react-icons/fi';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Building digital experiences...";
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const codeSnippet = `
class Developer {
  constructor() {
    this.name = "Shefayet Nayon";
    this.role = "Full Stack Developer";
    this.skills = [
      "React", "Next.js", 
      "Node.js", "TypeScript"
    ];
  }

  build() {
    return "Scalable Solutions";
  }
}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1117] pt-20">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#161b22,transparent)]"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-500/30 text-xs font-mono">
                v2.0.0 Available
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30 text-xs font-mono">
                Open for work
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
              <span className="block text-gray-500 text-2xl md:text-3xl font-mono mb-2">const developer =</span>
              Shefayet Nayon
            </h1>

            <div className="h-8 mb-8 font-mono text-xl text-green-400">
              <span className="mr-2">$</span>
              {text}
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
            </div>

            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
              Crafting robust applications with modern technologies.
              Specialized in building scalable full-stack solutions that solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={'/portfolio'}>
                <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-mono rounded transition-all duration-200 flex items-center space-x-2 group">
                  <FiTerminal className="group-hover:translate-x-1 transition-transform" />
                  <span>View Projects</span>
                </button>
              </Link>
              <Link href={'/contact'}>
                <button className="px-8 py-3 bg-[#161b22] hover:bg-[#21262d] text-gray-300 border border-gray-700 rounded font-mono transition-all duration-200">
                  Contact Me
                </button>
              </Link>
            </div>

            <div className="mt-12 flex items-center space-x-6 text-gray-500">
              <a  target="_blank" href="https://github.com/shefayetnayon-dev" className="hover:text-white transition-colors"><FiGithub size={24} /></a>
              <a target="_blank" href="https://linkedin.com/shefayetnayon" className="hover:text-white transition-colors"><FiLinkedin size={24} /></a>
              <a target="_blank" href="https://x.com/ShefayetNayon" className="hover:text-white transition-colors"><FiTwitter size={24} /></a>
            </div>
          </motion.div>

          {/* Right Content - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg bg-[#0d1117] border border-gray-700 shadow-2xl overflow-hidden font-mono text-sm">
              {/* Terminal Header */}
              <div className="bg-[#161b22] px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-gray-500 text-xs">developer.ts</div>
                <div className="w-10"></div> {/* Spacer for centering */}
              </div>

              {/* Terminal Content */}
              <div className="p-6 text-gray-300 overflow-x-auto">
                <pre className="language-typescript">
                  <code>
                    <span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span> <span className="text-gray-400">{'{'}</span>{'\n'}
                    <span className="text-gray-400">  </span><span className="text-purple-400">constructor</span><span className="text-gray-400">() {'{'}</span>{'\n'}
                    <span className="text-gray-400">    </span><span className="text-blue-400">this</span><span className="text-gray-400">.</span><span className="text-blue-300">name</span> <span className="text-gray-400">=</span> <span className="text-green-400">"Shefayet Nayon"</span><span className="text-gray-400">;</span>{'\n'}
                    <span className="text-gray-400">    </span><span className="text-blue-400">this</span><span className="text-gray-400">.</span><span className="text-blue-300">role</span> <span className="text-gray-400">=</span> <span className="text-green-400">"Full Stack Developer"</span><span className="text-gray-400">;</span>{'\n'}
                    <span className="text-gray-400">    </span><span className="text-blue-400">this</span><span className="text-gray-400">.</span><span className="text-blue-300">skills</span> <span className="text-gray-400">= [</span>{'\n'}
                    <span className="text-gray-400">      </span><span className="text-green-400">"React"</span><span className="text-gray-400">,</span> <span className="text-green-400">"Next.js"</span><span className="text-gray-400">,</span>{'\n'}
                    <span className="text-gray-400">      </span><span className="text-green-400">"Node.js"</span><span className="text-gray-400">,</span> <span className="text-green-400">"TypeScript"</span>{'\n'}
                    <span className="text-gray-400">    ];</span>{'\n'}
                    <span className="text-gray-400">  {'}'}</span>{'\n\n'}
                    <span className="text-gray-400">  </span><span className="text-purple-400">build</span><span className="text-gray-400">() {'{'}</span>{'\n'}
                    <span className="text-gray-400">    </span><span className="text-purple-400">return</span> <span className="text-green-400">"Scalable Solutions"</span><span className="text-gray-400">;</span>{'\n'}
                    <span className="text-gray-400">  {'}'}</span>{'\n'}
                    <span className="text-gray-400">{'}'}</span>
                  </code>
                </pre>
              </div>

              {/* Terminal Footer (Status Bar) */}
              <div className="bg-[#161b22] px-4 py-1 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center"><FiCode className="mr-1" /> TypeScript</span>
                  <span className="flex items-center"><FiDatabase className="mr-1" /> UTF-8</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>Ln 12, Col 34</span>
                </div>
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 p-4 bg-[#161b22] rounded-lg border border-gray-700 shadow-xl z-[-1]"
            >
              <FiCpu className="text-blue-400 w-8 h-8" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 p-4 bg-[#161b22] rounded-lg border border-gray-700 shadow-xl z-[-1]"
            >
              <FiDatabase className="text-purple-400 w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;