// components/Pricing.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheck, FiX, FiTerminal, FiPackage, FiCpu, FiZap, FiHelpCircle } from 'react-icons/fi';

const Pricing = () => {
  const features = [
    { name: "Number of Pages", basic: "1 Page", standard: "5 Pages", premium: "10+ Pages" },
    { name: "Design Customization", basic: "Basic", standard: "Advanced", premium: "Premium" },
    { name: "Responsive Design", basic: true, standard: true, premium: true },
    { name: "Content Upload", basic: true, standard: true, premium: true },
    { name: "Source Code", basic: false, standard: true, premium: true },
    { name: "SEO Optimization", basic: false, standard: "Basic", premium: "Advanced" },
    { name: "E-commerce Functionality", basic: false, standard: false, premium: true },
    { name: "Revisions", basic: "2", standard: "5", premium: "Unlimited" },
    { name: "Delivery Time", basic: "3 Days", standard: "7 Days", premium: "14 Days" },
  ];

  const plans = [
    {
      name: "Basic",
      price: "$29",
      description: "Perfect for landing pages and simple personal sites.",
      color: "border-gray-700",
      btnColor: "bg-gray-800 hover:bg-gray-700",
      icon: <FiPackage className="w-6 h-6 text-blue-400" />
    },
    {
      name: "Standard",
      price: "$149",
      description: "Ideal for small businesses and professional portfolios.",
      color: "border-green-500",
      btnColor: "bg-green-600 hover:bg-green-500",
      isPopular: true,
      icon: <FiCpu className="w-6 h-6 text-green-400" />
    },
    {
      name: "Premium",
      price: "$399",
      description: "Full-scale web applications with robust functionality.",
      color: "border-purple-500",
      btnColor: "bg-purple-600 hover:bg-purple-500",
      icon: <FiZap className="w-6 h-6 text-purple-400" />
    }
  ];

  return (
    <section className="relative py-24 bg-[#0d1117] border-t border-gray-800" id='pricing'>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-700 px-3 py-1 rounded-full text-xs font-mono text-gray-400 mb-6">
            <FiTerminal className="text-green-500" />
            <span>./view_packages.sh</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the package that fits your project needs. No hidden fees.
          </p>
        </div>

        {/* Mobile Cards (Visible on small screens) */}
        <div className="grid md:hidden grid-cols-1 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div key={idx} className={`bg-[#161b22] border ${plan.isPopular ? 'border-green-500 relative' : 'border-gray-700'} rounded-xl p-6`}>
              {plan.isPopular && <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">RECOMMENDED</div>}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">{plan.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                  <div className="text-xl font-bold text-white">{plan.price}</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-6">
                {features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center justify-between text-sm border-b border-gray-800 pb-2 last:border-0">
                    <span className="text-gray-400">{feature.name}</span>
                    <span className="text-white font-medium">
                      {/* Logic to display value based on plan name */}
                      {plan.name === "Basic" ? (typeof feature.basic === 'boolean' ? (feature.basic ? <FiCheck className="text-green-500" /> : <FiX className="text-gray-600" />) : feature.basic) :
                        plan.name === "Standard" ? (typeof feature.standard === 'boolean' ? (feature.standard ? <FiCheck className="text-green-500" /> : <FiX className="text-gray-600" />) : feature.standard) :
                          (typeof feature.premium === 'boolean' ? (feature.premium ? <FiCheck className="text-green-500" /> : <FiX className="text-gray-600" />) : feature.premium)
                      }
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="#contact" className={`block w-full py-3 text-center rounded-lg font-bold text-white transition-colors ${plan.btnColor}`}>
                Select {plan.name}
              </Link>
            </div>
          ))}
        </div>


        {/* Desktop Comparison Table (Hidden on small screens) */}
        <div className="hidden md:block bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-[#0d1117]/50 border-b border-gray-700">
            <div className="p-8 border-r border-gray-800 flex flex-col justify-end">
              <span className="text-gray-500 text-sm font-mono">Compare Plans</span>
              <h3 className="text-2xl font-bold text-white">Features</h3>
            </div>
            {plans.map((plan, idx) => (
              <div key={idx} className={`p-8 border-r border-gray-800 last:border-r-0 relative ${plan.isPopular ? 'bg-green-900/5' : ''}`}>
                {plan.isPopular && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg">MOST POPULAR</span>
                )}
                <div className="mb-4">{plan.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                <p className="text-sm text-gray-400 mb-6">{plan.description}</p>
                <Link href="#contact" className={`block w-full py-2.5 text-center rounded text-sm font-bold text-white transition-all ${plan.btnColor}`}>
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-800">
            {features.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-4 hover:bg-white/5 transition-colors">
                <div className="p-6 border-r border-gray-800 flex items-center text-gray-300 font-medium">
                  {feature.name}
                  <FiHelpCircle className="ml-2 text-gray-600 hover:text-gray-400 cursor-help opacity-50" />
                </div>
                <div className="p-6 border-r border-gray-800 flex items-center justify-center text-center">
                  {typeof feature.basic === 'boolean' ?
                    (feature.basic ? <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><FiCheck className="text-green-400 w-4 h-4" /></div> : <FiX className="text-gray-600" />) :
                    <span className="text-gray-400">{feature.basic}</span>
                  }
                </div>
                <div className="p-6 border-r border-gray-800 flex items-center justify-center text-center bg-green-900/5">
                  {typeof feature.standard === 'boolean' ?
                    (feature.standard ? <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><FiCheck className="text-green-400 w-4 h-4" /></div> : <FiX className="text-gray-600" />) :
                    <span className="text-white font-medium">{feature.standard}</span>
                  }
                </div>
                <div className="p-6 flex items-center justify-center text-center">
                  {typeof feature.premium === 'boolean' ?
                    (feature.premium ? <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><FiCheck className="text-green-400 w-4 h-4" /></div> : <FiX className="text-gray-600" />) :
                    <span className="text-white font-bold">{feature.premium}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">Need a custom quote? <Link href="/contact" className="text-blue-400 hover:underline">Contact me directly</Link>.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;