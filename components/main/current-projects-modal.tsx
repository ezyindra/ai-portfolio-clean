"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
    open: boolean;
    onClose: () => void;
};

const CURRENT_PROJECTS = [
   
    {
        title: "Agentic Deep Researcher",
        desc: "Autonomous research agent using RAG pipelines, FAISS, and multi-step reasoning.",
    },

];

export default function CurrentProjectsModal({ open, onClose }: Props) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-xl w-full mx-6
            bg-gradient-to-br from-[#020617] via-[#050b18] to-black
            border border-cyan-400/30 rounded-2xl p-8
            shadow-[0_0_60px_rgba(0,255,255,.2)]"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-red-400"
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Current Working Projects
                        </h2>

                        <div className="space-y-4">
                            {CURRENT_PROJECTS.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                                >
                                    <h3 className="text-cyan-300 font-semibold">{p.title}</h3>
                                    <p className="text-white/70 text-sm mt-1">{p.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-6 text-xs text-cyan-400/50">
                            
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
