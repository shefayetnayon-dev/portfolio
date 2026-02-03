// components/Services.tsx
"use client";
import { motion } from 'framer-motion';
import { FiCpu, FiLayout, FiSmartphone, FiDatabase, FiServer, FiSettings, FiTerminal } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiLayout className="w-8 h-8" />,
      title: "Frontend Architecture",
      code: "import { UI } from '@sys/frontend';",
      description: "Building scalable, component-driven user interfaces with React and Next.js.",
      features: ["Component Systems", "State Management", "Performance Tuning"]
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: "Backend Engineering",
      code: "const api = require('server-core');",
      description: "Robust server-side solutions designed for high concurrency and reliability.",
      features: ["API Design", "Microservices", "System Design"]
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile Solutions",
      code: "class App extends MobilePlatform {}",
      description: "Cross-platform mobile applications delivering native performance.",
      features: ["React Native", "iOS & Android", "Offline First"]
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: "Database Design",
      code: "SELECT * FROM optimized_schema;",
      description: "Efficient data modeling and query optimization for complex datasets.",
      features: ["SQL & NoSQL", "Data Migration", "Caching Strategies"]
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: "DevOps & Cloud",
      code: "docker-compose up -d --scale app=3",
      description: "Automated CI/CD pipelines and cloud infrastructure management.",
      features: ["AWS/GCP", "Docker/K8s", "Infrastructure as Code"]
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: "System Optimization",
      code: "process.optimize({ level: 'max' });",
      description: "Comprehensive auditing and optimization of existing systems.",
      features: ["Load Testing", "Security Audits", "Code Refactoring"]
    }
  ];

  return (
    <section className="relative py-20 bg-[#0d1117] overflow-hidden" id='services'>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section heading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 mb-4">
              <FiTerminal />
              <span>systemctl list-units --type=service</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-blue-500">System</span> Modules
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Core services and capabilities available for deployment.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#161b22] border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gray-800 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    {service.icon}
                  </div>
                  <div className="text-xs font-mono text-gray-500">v2.0.4</div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <div className="bg-[#0d1117] p-2 rounded border border-gray-800 mb-4 font-mono text-xs text-green-400 overflow-x-auto">
                  {service.code}
                </div>

                <p className="text-gray-400 mb-4 text-sm">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-xs text-green-500 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Active
                  </span>
                  <button className="text-xs text-blue-400 hover:text-white uppercase font-bold tracking-wider">
                    Initialize &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;