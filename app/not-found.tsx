"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiTerminal } from 'react-icons/fi';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-red-900/50 bg-red-900/10 rounded-lg p-6 mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
                    <div className="flex items-start gap-4">
                        <FiAlertTriangle className="text-red-500 text-4xl flex-shrink-0 mt-1" />
                        <div>
                            <h1 className="text-2xl font-bold text-red-400 mb-2">Error 404: Module Not Found</h1>
                            <p className="text-gray-400 mb-4">
                                The requested resource could not be located in the current directory.
                            </p>
                            <div className="bg-[#0d1117] p-4 rounded border border-gray-800 font-mono text-sm overflow-x-auto">
                                <p className="text-red-400">Error: ENOENT: no such file or directory</p>
                                <p className="text-gray-500">    at resolvePath (/usr/src/app/router.ts:404:12)</p>
                                <p className="text-gray-500">    at RouteHandler.handle (/usr/src/app/handler.ts:23:45)</p>
                                <p className="text-gray-500">    at process.nextTick (node:internal/process/task_queues:60:5)</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <p className="text-gray-500 mb-6">
                        Suggested recovery strategy: Return to safe execution context.
                    </p>

                    <Link href="/">
                        <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#238636] text-white font-bold rounded hover:bg-[#2ea043] transition-colors">
                            <FiTerminal />
                            <span>cd /home</span>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Execute return command
                            </span>
                        </button>
                    </Link>
                </motion.div>

                <div className="mt-12 flex justify-center gap-8 text-sm text-gray-600">
                    <Link href="/blog" className="hover:text-blue-400 transition-colors">/blog</Link>
                    <Link href="/portfolio" className="hover:text-blue-400 transition-colors">/portfolio</Link>
                    <Link href="/about" className="hover:text-blue-400 transition-colors">/about</Link>
                </div>
            </div>
        </div>
    );
}
