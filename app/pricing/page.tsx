// app/pricing/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FiCheck, FiStar, FiClock, FiAward, FiUsers, FiTrendingUp, FiDollarSign, FiHeadphones, FiSmile } from 'react-icons/fi';
import Link from 'next/link';
import Pricing from '../components/Pricing';

const PricingPage = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Track client-side rendering to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const reasonsToHire = [
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Expertise & Experience",
      description: "With 5+ years of experience in web development, I bring deep technical knowledge and proven solutions to every project.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Timely Delivery",
      description: "I understand the importance of deadlines and consistently deliver projects on time without compromising quality.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Every project undergoes rigorous testing to ensure it meets the highest standards of performance and reliability.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Clear Communication",
      description: "I maintain transparent communication throughout the project, keeping you informed at every stage of development.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Results-Driven",
      description: "My focus is on delivering solutions that drive real business results and help you achieve your goals.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Competitive Pricing",
      description: "I offer fair and transparent pricing with no hidden costs, providing excellent value for your investment.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "Ongoing Support",
      description: "I provide comprehensive post-launch support to ensure your project continues to perform optimally.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "Client Satisfaction",
      description: "My ultimate goal is your satisfaction. I go above and beyond to ensure you're happy with the results.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const checkVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // If not client-side yet, show loading state
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Reasons to Hire Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Reasons to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Choose Me</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are compelling reasons why I should be your preferred development partner
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {reasonsToHire.map((reason, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${reason.color}`}></div>
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6`}>
                    <div className="text-white">
                      {reason.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {reason.description}
                  </p>
                  
                  <div className="flex items-center text-purple-600 dark:text-purple-400">
                    <motion.div
                      variants={checkVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mr-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-medium">Proven track record</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  What You Get When You Hire Me
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Custom solutions tailored to your specific business needs",
                    "Clean, maintainable code that's easy to scale",
                    "Modern, responsive designs that work on all devices",
                    "SEO optimization to improve your online visibility",
                    "Regular updates and transparent project management",
                    "Post-launch support and maintenance"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Investment That Pays Off</h3>
                <p className="mb-6">
                  Hiring me isn't just an expense—it's an investment in quality, reliability, and results. 
                  My clients consistently see improved performance, higher user engagement, and better 
                  conversion rates after implementing my solutions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h4 className="font-bold mb-1">95%</h4>
                    <p className="text-sm">Client Satisfaction</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h4 className="font-bold mb-1">100+</h4>
                    <p className="text-sm">Projects Completed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Start?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Let's discuss how I can help bring your project to life. I offer a free consultation 
                  to understand your needs and provide a detailed proposal.
                </p>
                <Link href={'/contact'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 rounded-lg"
                >
                  Contact Me
                </motion.button></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className='pricingtable'>
        <Pricing/>
      </section>
      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              I'm excited to learn about your project and discuss how we can work together to achieve your goals
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href={'/portfolio'} target='_blank'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full flex items-center justify-center gap-2 text-lg"
              >
                View Portfolio
              </motion.button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;