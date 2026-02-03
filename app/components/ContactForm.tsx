// components/ContactForm.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiInstagram,
  FiTerminal,
  FiAlertCircle
} from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `> ${message}`]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addLog("Validation failed. Checks inputs.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setLogs([]); // Clear previous logs

    // Simulate Terminal Process Start
    addLog("Initializing secure handshake...");
    await new Promise(r => setTimeout(r, 600));
    addLog("Resolving host address...");
    await new Promise(r => setTimeout(r, 600));

    try {
      addLog("Encrypting payload (AES-256)...");
      await new Promise(r => setTimeout(r, 800));
      addLog(`Connecting to API gateway...`);

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addLog("Sending packets...");
        await new Promise(r => setTimeout(r, 600));
        addLog("200 OK: Message delivered successfully.");
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        console.error('Submission failed');
        addLog("Error: 500 Internal Server Error. Packet lost.");
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      addLog("Network Error: Connection refused.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 px-4 bg-[#0d1117] font-mono" id='contact'>
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 mb-4 border border-gray-700">
            <FiTerminal />
            <span>root@portfolio:~/contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-green-500">$</span> ./send_message.sh
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Initiate a secure connection to discuss your next project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#161b22] rounded-lg border border-gray-700 shadow-2xl overflow-hidden flex flex-col h-full"
          >
            <div className="bg-[#0d1117] px-4 py-2 border-b border-gray-700 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 ml-2">bash — 80x24</span>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <AnimatePresence mode='wait'>
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 text-green-400 font-mono text-sm space-y-2"
                  >
                    {logs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                    <div ref={logsEndRef}></div>
                    <div className="mt-8 border-t border-gray-700 pt-4">
                      <p className="flex items-center mb-4"><FiCheckCircle className="mr-2" /> Message transmitted.</p>
                      <button
                        onClick={() => { setSubmitStatus('idle'); setLogs([]); }}
                        className="text-blue-400 hover:text-white hover:underline flex items-center"
                      >
                        ./send_another.sh
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 flex-1"
                  >
                    {/* Logs view during submission */}
                    {isSubmitting ? (
                      <div className="h-full font-mono text-sm text-blue-400 space-y-1">
                        {logs.map((log, i) => (
                          <div key={i} className="animate-pulse">{log}</div>
                        ))}
                        <div ref={logsEndRef}></div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label htmlFor="name" className="block text-sm text-blue-400 mb-1">
                            <span className="text-green-500">➜</span> name:
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-gray-700 focus:border-green-500 text-gray-300 py-1 px-2 focus:outline-none transition-colors placeholder-gray-700"
                            placeholder="Enter your name..."
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" /> {errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm text-blue-400 mb-1">
                            <span className="text-green-500">➜</span> email:
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-gray-700 focus:border-green-500 text-gray-300 py-1 px-2 focus:outline-none transition-colors placeholder-gray-700"
                            placeholder="Enter your email..."
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" /> {errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm text-blue-400 mb-1">
                            <span className="text-green-500">➜</span> subject:
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-gray-700 focus:border-green-500 text-gray-300 py-1 px-2 focus:outline-none transition-colors placeholder-gray-700"
                            placeholder="Enter subject..."
                          />
                          {errors.subject && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" /> {errors.subject}</p>}
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm text-blue-400 mb-1">
                            <span className="text-green-500">➜</span> message:
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-[#0d1117] border border-gray-700 focus:border-green-500 text-gray-300 p-2 rounded focus:outline-none transition-colors placeholder-gray-700 resize-none"
                            placeholder="Type your message here..."
                          ></textarea>
                          {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center"><FiAlertCircle className="mr-1" /> {errors.message}</p>}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2 bg-green-600/10 text-green-500 border border-green-500/50 hover:bg-green-600/20 hover:border-green-500 transition-all rounded mt-4 flex items-center justify-center space-x-2 group"
                        >
                          <FiTerminal className="group-hover:translate-x-1 transition-transform" />
                          <span>Execute Send</span>
                        </button>
                      </>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-gray-300"
          >
            <div className="bg-[#161b22] p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                <span className="text-purple-400">const</span> contactInfo <span className="text-purple-400">=</span> {'{'}
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex">
                  <span className="text-blue-400 w-24">email:</span>
                  <span className="text-green-400 break-all">"shefayetnayon@gmail.com"</span>,
                </div>
                <div className="flex">
                  <span className="text-blue-400 w-24">location:</span>
                  <span className="text-green-400">"Khulna, Bangladesh"</span>,
                </div>
                <div className="flex">
                  <span className="text-blue-400 w-24">status:</span>
                  <span className="text-yellow-400">"Open for opportunities"</span>
                </div>
                <div className="text-gray-500">{'}'}</div>
              </div>
            </div>

            <div className="bg-[#161b22] p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                <span className="text-purple-400">import</span> Socials <span className="text-purple-400">from</span> 'network';
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: FiGithub, link: "https://github.com/shefayetnayon-dev", label: "GitHub" },
                  { icon: FiLinkedin, link: "https://linkedin.com/shefayetnayon", label: "LinkedIn" },
                  { icon: FiTwitter, link: "https://x.com/ShefayetNayon", label: "Twitter" },
                  { icon: FiFacebook, link: "https://facebook.com/shefayetnayon", label: "Facebook" },
                  { icon: FiInstagram, link: "https://www.instagram.com/its_your_nayon/?hl=en", label: "Instagram" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#0d1117] border border-gray-700 rounded hover:border-green-500 hover:text-green-400 transition-all group hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;