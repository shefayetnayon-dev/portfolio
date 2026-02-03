// components/About.tsx
"use client";
import { motion } from 'framer-motion';
import { FiUser, FiFolder, FiFileText, FiCode, FiCpu, FiGitBranch } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const About = () => {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js",
    "TailwindCSS", "PostgreSQL", "Docker", "AWS"
  ];

  const experiences = [
    {
      year: "2020 - Present",
      role: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      desc: "Leading development of scalable web applications."
    },
    {
      year: "2018 - 2020",
      role: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      desc: "Created responsive user interfaces."
    }
  ];

  // Hydration fix: Generate random data only on client
  const [contributionData, setContributionData] = useState<string[]>([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const data = Array(30).fill(0).map(() => {
      const rand = Math.random();
      if (rand > 0.7) return 'bg-green-500';
      if (rand > 0.4) return 'bg-green-700';
      if (rand > 0.2) return 'bg-green-900';
      return 'bg-gray-800';
    });
    setContributionData(data);
  }, []);

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
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-20 bg-[#0d1117] text-gray-300 font-mono" id='about'>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto border border-gray-700 rounded-lg bg-[#0d1117] overflow-hidden shadow-2xl"
        >
          {/* Window Header */}
          <div className="bg-[#161b22] px-4 py-2 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiUser className="text-gray-500" />
              <span className="text-sm font-bold">shefayet_nayon / README.md</span>
            </div>
            <div className="flex space-x-2">
              <div className="px-2 py-0.5 text-xs border border-gray-600 rounded text-gray-400">Edit</div>
              <div className="px-2 py-0.5 text-xs bg-green-600 text-white rounded border border-green-500">Preview</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Sidebar (File Explorer style) */}
            <div className="hidden md:block w-64 border-r border-gray-700 bg-[#0d1117] p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-4">
                <FiFolder className="text-blue-400" />
                <span className="font-bold">portfolio-v2</span>
              </div>
              <ul className="space-y-2 text-sm ml-4 border-l border-gray-700 pl-4">
                <li className="flex items-center space-x-2 text-green-400 bg-gray-800/50 p-1 rounded -ml-2">
                  <FiFileText />
                  <span>README.md</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 cursor-pointer p-1 transition-colors">
                  <FiCode />
                  <span>package.json</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 cursor-pointer p-1 transition-colors">
                  <FiGitBranch />
                  <span>.gitignore</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 cursor-pointer p-1 transition-colors">
                  <FiCpu />
                  <span>src/</span>
                </li>
              </ul>
            </div>

            {/* Main Content (README Preview) */}
            <div className="flex-1 p-8 bg-[#0d1117]">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2"
                >
                  Hi there, I'm Shefayet Nayon 👋
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 leading-relaxed text-gray-400"
                >
                  I'm a passionate <span className="text-blue-400">Full Stack Developer</span> from Bangladesh.
                  I love building software that solves real-world problems. My stack includes React, Next.js, and Node.js.
                </motion.p>

                <h3 className="text-xl font-bold text-white mb-4 mt-8 flex items-center">
                  <span className="text-green-500 mr-2">#</span> Tech Stack
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-blue-900/20 text-blue-400 border border-blue-500/30 rounded text-sm hover:bg-blue-900/40 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-4 mt-8 flex items-center">
                  <span className="text-green-500 mr-2">#</span> Experience
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="relative pl-6 border-l-2 border-gray-700"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-700 border-2 border-[#0d1117]"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 className="font-bold text-white">{exp.role}</h4>
                        <span className="text-xs text-gray-500 font-mono bg-gray-800 px-2 py-0.5 rounded">{exp.year}</span>
                      </div>
                      <p className="text-blue-400 text-sm mb-2">@ {exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">
                      <span className="font-bold text-white">1,337</span> contributions in the last year
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {contributionData.length > 0 ? (
                      contributionData.map((color, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.01 }}
                          className={`w-3 h-3 rounded-sm ${color} hover:ring-1 ring-gray-400`}
                        ></motion.div>
                      ))
                    ) : (
                      // Skeleton for SSR
                      [...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm bg-gray-800"
                        ></div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
