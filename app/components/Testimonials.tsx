// components/Testimonials.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiThumbsUp, FiGitCommit, FiTerminal } from 'react-icons/fi';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  commitHash: string;
}

const Testimonials = () => {
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "LGTM! The new frontend architecture significantly improved our core web vitals. Great work on the optimization.",
      avatar: "https://i.postimg.cc/tCHbmTdm/filters-no-upscale.webp",
      commitHash: "a1b2c3d"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "StartupHub",
      content: "Code quality is top-notch. The modular approach makes it easy for the team to scale. Approved for production.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      commitHash: "e5f6g7h"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Lead Designer",
      company: "BrandVision",
      content: "The implementation perfectly matches the design specs. The animations are smooth and add a nice touch.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      commitHash: "i9j0k1l"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isClient, testimonials.length]);

  if (!isClient) return null;

  return (
    <section className="relative py-20 bg-[#0d1117] border-t border-gray-800" id='testimonials'>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 mb-4">
            <FiTerminal />
            <span>git log --grep="review"</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Code <span className="text-purple-500">Reviews</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feedback from collaborators and clients on delivered code.
          </p>
        </div>

        {/* Main Review Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#21262d] px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Review details</span>
                  <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded border border-green-900/50">
                    Approved
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-xs font-mono">
                  <FiGitCommit className="mr-1" />
                  {testimonials[currentIndex].commitHash}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="text-white font-bold text-sm">
                        {testimonials[currentIndex].name}
                        <span className="text-gray-500 font-normal ml-2">
                          commented on {testimonials[currentIndex].company}
                        </span>
                      </h3>
                      <span className="text-gray-600 text-xs">2 days ago</span>
                    </div>

                    <div className="text-gray-300 text-sm leading-relaxed mb-4">
                      {testimonials[currentIndex].content}
                    </div>

                    {/* Reactions */}
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 bg-[#21262d] hover:bg-gray-700 border border-gray-700 rounded-full px-3 py-1 text-xs text-gray-400 transition-colors">
                        <FiThumbsUp className="w-3 h-3" />
                        <span>2</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-[#21262d] hover:bg-gray-700 border border-gray-700 rounded-full px-3 py-1 text-xs text-gray-400 transition-colors">
                        <FiMessageSquare className="w-3 h-3" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-purple-500 w-4'
                  : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;