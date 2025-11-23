// components/Pricing.tsx
"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiPackage, FiCpu, FiZap, FiTerminal } from 'react-icons/fi';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: "Indie Dev",
      price: isAnnual ? "$29" : "$39",
      period: "/mo",
      description: "Essential tools for solo developers.",
      features: [
        "5 Projects",
        "Basic Analytics",
        "Community Support",
        "1GB Storage",
        "Public Repos Only"
      ],
      highlight: false,
      icon: <FiPackage className="w-6 h-6" />
    },
    {
      name: "Startup",
      price: isAnnual ? "$79" : "$99",
      period: "/mo",
      description: "Scalable solutions for growing teams.",
      features: [
        "Unlimited Projects",
        "Advanced Analytics",
        "Priority Email Support",
        "10GB Storage",
        "Private Repos",
        "CI/CD Pipelines"
      ],
      highlight: true,
      icon: <FiCpu className="w-6 h-6" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Full-scale infrastructure for large orgs.",
      features: [
        "Dedicated Infrastructure",
        "Custom SLA",
        "24/7 Phone Support",
        "Unlimited Storage",
        "SSO & Audit Logs",
        "On-premise Deployment"
      ],
      highlight: false,
      icon: <FiZap className="w-6 h-6" />
    }
  ];

  return (
    <section className="relative py-20 bg-[#0d1117] border-t border-gray-800" id='pricing'>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 mb-4">
            <FiTerminal />
            <span>./billing_config.sh --mode={isAnnual ? 'annual' : 'monthly'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-green-500">Support</span> Plans
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the infrastructure capacity that fits your deployment needs.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-mono ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-700 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-green-500 transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-1'
                  }`}
              />
            </button>
            <span className={`text-sm font-mono ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Annual <span className="text-xs text-green-400 ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg border ${tier.highlight
                  ? 'bg-[#161b22] border-green-500 shadow-lg shadow-green-900/20'
                  : 'bg-[#0d1117] border-gray-700'
                } p-8 flex flex-col`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  RECOMMENDED
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tier.highlight ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-400'
                  }`}>
                  {tier.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-500 ml-2">{tier.period}</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <FiCheck className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-green-400' : 'text-gray-500'
                      }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded font-mono text-sm font-bold transition-all ${tier.highlight
                    ? 'bg-green-600 text-white hover:bg-green-500'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                {tier.price === "Custom" ? "Contact Sales" : "Deploy Now"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;