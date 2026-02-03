// app/about/page.tsx
"use client";

import { motion } from 'framer-motion';
import { FiGitCommit, FiGitBranch, FiTag, FiCode, FiTerminal } from 'react-icons/fi';
import Link from 'next/link';
import About from '../components/About';

const AboutPage = () => {
  const timelineData = [
    {
      year: "2024",
      title: "Freelance Success",
      description: "Started my freelance career and worked with amazing clients. Built numerous projects and gained valuable industry experience.",
      hash: "a1b2c3d",
      tag: "v2.0.0"
    },
    {
      year: "2022",
      title: "Full Stack Development",
      description: "Expanded my skills to include backend development. Learned Node.js, databases, and became a full-stack developer.",
      hash: "e5f6g7h",
      tag: "v1.5.0"
    },
    {
      year: "2020",
      title: "React & Modern Frameworks",
      description: "Embraced React and modern development frameworks. Started building complex SPAs and learned about state management.",
      hash: "i9j0k1l",
      tag: "v1.0.0"
    },
    {
      year: "2018",
      title: "Learned JavaScript",
      description: "Mastered JavaScript and started building interactive websites. Discovered the power of DOM manipulation and event handling.",
      hash: "m2n3o4p",
      tag: "v0.5.0"
    },
    {
      year: "2016",
      title: "Started My Journey",
      description: "Began my journey in web development with HTML and CSS. Built my first static websites and fell in love with creating digital experiences.",
      hash: "q5r6s7t",
      tag: "init"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Always exploring new technologies and finding creative solutions to complex problems.",
      icon: <FiCode className="w-6 h-6" />
    },
    {
      title: "Quality",
      description: "Committed to delivering high-quality, well-tested, and maintainable code.",
      icon: <FiTag className="w-6 h-6" />
    },
    {
      title: "Collaboration",
      description: "Believe in the power of teamwork and open communication to achieve the best results.",
      icon: <FiGitBranch className="w-6 h-6" />
    },
    {
      title: "Continuous Learning",
      description: "Always eager to learn new skills and stay updated with the latest industry trends.",
      icon: <FiTerminal className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono">
      {/* Hero Section with About Component */}
      <About />

      {/* Git History Timeline */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 flex items-center space-x-4"
          >
            <div className="h-px bg-gray-700 flex-1"></div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FiGitBranch className="mr-2 text-purple-500" />
              Git History
            </h2>
            <div className="h-px bg-gray-700 flex-1"></div>
          </motion.div>

          <div className="relative border-l-2 border-gray-800 ml-4 md:ml-8 space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0d1117] border-2 border-purple-500"></div>

                <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400 font-bold text-lg">{item.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-800 text-xs text-gray-400 border border-gray-700">
                        {item.tag}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 font-mono">
                      <span className="flex items-center">
                        <FiGitCommit className="mr-1" />
                        {item.hash}
                      </span>
                      <span>{item.year}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 border-t border-gray-800 bg-[#161b22]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="text-green-500">const</span> values = <span className="text-blue-400">['...']</span>;
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Principles that guide my development process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0d1117] border border-gray-700 p-6 rounded-lg hover:border-green-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#161b22] border border-gray-700 rounded-xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>

            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to collaborate?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm currently available for freelance projects and open to new opportunities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={'/contact'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiTerminal className="w-5 h-5" />
                  <span>Initialize Project</span>
                </motion.button>
              </Link>
              <Link href={'/portfolio'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold rounded hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <FiCode className="w-5 h-5" />
                  <span>View Source</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;