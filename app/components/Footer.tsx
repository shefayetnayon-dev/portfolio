// components/Footer.tsx
"use client";

import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiGitBranch, FiWifi, FiCpu } from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub className="w-4 h-4" />, url: 'https://github.com/shefayetnayon-dev', label: 'GitHub' },
    { icon: <FiLinkedin className="w-4 h-4" />, url: 'https://linkedin.com/in/shefayetnayon', label: 'LinkedIn' },
    { icon: <FiTwitter className="w-4 h-4" />, url: 'https://twitter.com/shefayetnayon', label: 'Twitter' },
    { icon: <FiInstagram className="w-4 h-4" />, url: 'https://www.instagram.com/its_your_nayon/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#0d1117] border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white mb-4 block">
              Shefayet<span className="text-gray-500">Nayon</span>
            </Link>
            <p className="text-gray-500 text-sm mb-6 max-w-md">
              Full Stack Developer specializing in building exceptional digital experiences.
              Currently focused on accessible, human-centered products.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Sitemap</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">~/home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">~/about</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400 transition-colors">~/projects</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">~/blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center">
                <FiMail className="mr-2" />
                <a href="mailto:shefayetnayon@gmail.com" className="hover:text-blue-400 transition-colors">
                  shefayetnayon@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="mr-2" />
                <a href="https://wa.me/8801822580581" className="hover:text-blue-400 transition-colors">
                  +880 1822580581
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="flex items-center">
              <FiGitBranch className="mr-1" />
              main
            </span>
            <span className="flex items-center">
              <FiWifi className="mr-1" />
              Online
            </span>
            <span className="flex items-center">
              <FiCpu className="mr-1" />
              v2.4.0
            </span>
          </div>

          <div className="text-center md:text-right">
            <p>&copy; {currentYear} Shefayet Nayon.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
