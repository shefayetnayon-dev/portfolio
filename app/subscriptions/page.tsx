// app/subscriptions/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FiMail, FiClock, FiTrash2, FiRefreshCw, FiLock, FiLogOut, FiEye, FiEyeOff } from 'react-icons/fi';

interface Subscription {
  id: number;
  email: string;
  timestamp: string;
}

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isClient, setIsClient] = useState(false); // ক্লায়েন্ট সাইড রেন্ডারিং ট্র্যাক করার জন্য

  // এখানে আপনার পাসওয়ার্ড সেট করুন
  const ADMIN_PASSWORD = "6996nayon";

  useEffect(() => {
    // ক্লায়েন্ট সাইডে আছি কিনা চেক করা
    setIsClient(true);
    
    // সেশন স্টোরেজ থেকে অথেনটিকেশন স্ট্যাটাস চেক করা
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchSubscriptions();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      setAuthError('');
      fetchSubscriptions();
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
    setPassword('');
  };

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/subscriptions');
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError('Failed to load subscriptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscription = async (id: number) => {
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSubscriptions(subscriptions.filter(sub => sub.id !== id));
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // যদি ক্লায়েন্ট সাইডে না থাকি, তাহলে লোডিং স্টেট দেখাবে
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // যদি ইউজার অথেনটিকেটেড না হয়, তাহলে লগিন ফর্ম দেখাবে
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white/20">
                <FiLock className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">Admin Access</h2>
              <p className="mt-2 text-purple-100">
                Enter password to view subscriptions
              </p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                {authError && (
                  <div className="text-red-500 text-sm">
                    {authError}
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Access Subscriptions
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // যদি ইউজার অথেনটিকেটেড হয়, তাহলে সাবস্ক্রিপশন ডাটা দেখাবে
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Newsletter <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Subscriptions</span>
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View all email subscriptions with timestamps
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              All Subscriptions ({subscriptions.length})
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchSubscriptions}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-70"
            >
              <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchSubscriptions}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No subscriptions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subscribed At
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {subscriptions.map((subscription) => (
                    <motion.tr
                      key={subscription.id}
                      variants={itemVariants}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <FiMail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {subscription.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FiClock className="mr-2 h-4 w-4" />
                          {formatDate(subscription.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteSubscription(subscription.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            Data is stored in <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">public/subscriptions.json</code>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;