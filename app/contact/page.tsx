// app/contact/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import Image from 'next/image';
import { FiMapPin, FiServer, FiGlobe, FiWifi, FiCpu } from 'react-icons/fi';

const ContactPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center font-mono">
        <div className="flex items-center space-x-2 text-green-500">
          <FiServer className="animate-pulse" />
          <span>establishing_connection...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono">

      {/* Header Section */}
      <section className="py-12 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded text-sm text-green-400 mb-4 border border-green-900/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>System Online</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-blue-500">./</span>contact_me
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Initiate communication protocol. Send a secure message or locate the physical node.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact Form Column */}
        <div>
          <div className="flex items-center space-x-2 mb-6 text-xl font-bold text-white">
            <FiCpu className="text-purple-500" />
            <span>Message Input Stream</span>
          </div>
          <ContactForm />
        </div>

        {/* Map / Location Column */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2 mb-6 text-xl font-bold text-white">
            <FiGlobe className="text-blue-500" />
            <span>Physical Node Location</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden relative"
          >
            {/* Terminal Header for Map */}
            <div className="bg-[#0d1117] px-4 py-2 border-b border-gray-700 flex items-center justify-between text-xs">
              <span className="text-gray-500">location_tracker.exe</span>
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-80 w-full group">
              <Image
                src="https://i.postimg.cc/W1Drq3Dj/location.png"
                alt="Map location"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0"
              />

              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none"></div>

              {/* Location Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-[#0d1117] z-10 relative"></div>
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75 h-4 w-4"></div>
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50 h-4 w-4 delay-75"></div>
                </div>

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#0d1117]/90 border border-blue-500/30 px-3 py-1 rounded text-xs text-blue-400 whitespace-nowrap backdrop-blur-sm">
                  <span className="font-mono">Lat: 23.64, Long: 88.85</span>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="p-6 border-t border-gray-700 bg-[#0d1117]/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <FiMapPin className="text-red-500" />
                    Eidgah Para, Chuadanga
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-mono">
                    Region: Khulna Division<br />
                    Country: Bangladesh
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-green-500 text-xs font-mono mb-1">
                    <FiWifi />
                    <span>Connected</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/TcDQB2CCo2WbbV7L9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    [Open in Google Maps]
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Network Status / Extra Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#161b22] border border-gray-700 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Response Time</div>
              <div className="text-xl font-bold text-green-400 font-mono">&lt; 24h</div>
            </div>
            <div className="bg-[#161b22] border border-gray-700 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Availability</div>
              <div className="text-xl font-bold text-blue-400 font-mono">Open</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;