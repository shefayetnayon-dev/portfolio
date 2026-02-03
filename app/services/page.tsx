// app/services/page.tsx
"use client";

import { motion } from 'framer-motion';
import { FiTerminal, FiActivity, FiLayers } from 'react-icons/fi';
import Services from '../components/Services';
import Link from 'next/link';

const ServicesPage = () => {
  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      command: "init_discovery.sh",
      description: "Analyzing requirements and defining system architecture.",
      status: "Completed"
    },
    {
      step: "02",
      title: "Planning",
      command: "git checkout -b feature/plan",
      description: "Creating detailed roadmap and technical specifications.",
      status: "Pending"
    },
    {
      step: "03",
      title: "Development",
      command: "npm run build:prod",
      description: "Implementing robust solutions with clean code practices.",
      status: "Queued"
    },
    {
      step: "04",
      title: "Deployment",
      command: "docker-compose up -d",
      description: "Launching to production with automated CI/CD pipelines.",
      status: "Waiting"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 mb-6">
              <FiTerminal />
              <span>./services_overview.sh</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              System <span className="text-blue-500">Capabilities</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive technical solutions engineered for scalability and performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Component */}
      <Services />

      {/* Process Section */}
      <section className="py-20 px-4 bg-[#161b22]/50 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="text-green-500">function</span> executeProcess() {'{'}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Standard operating procedure for project execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line (Desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-800 -z-10"></div>
                )}

                <div className="bg-[#0d1117] border border-gray-700 p-6 rounded-lg hover:border-blue-500/50 transition-all h-full">
                  <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center mx-auto mb-4 border border-gray-700 text-blue-400 font-bold text-xl">
                    {item.step}
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <div className="bg-gray-900 px-2 py-1 rounded text-xs font-mono text-green-400 mb-3 inline-block">
                      $ {item.command}
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 text-gray-500 font-mono">
            {'}'}
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="flex items-center justify-center mb-6">
              <FiActivity className="w-12 h-12 text-blue-500" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to deploy?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Initiate a new project cycle and elevate your digital infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={'/contact'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiTerminal className="w-5 h-5" />
                  <span>Start Project</span>
                </motion.button>
              </Link>
              <Link href={'/portfolio'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold rounded hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <FiLayers className="w-5 h-5" />
                  <span>View Case Studies</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;