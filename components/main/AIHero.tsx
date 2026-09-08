"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AIHero = () => {
  const text = "Your personal assistant. Ask anything about Indra.";
  const [typed, setTyped] = useState("");

  // Typewriter
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(t);
    }, 40);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Soft animated glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[160px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff11_1px,transparent_1px),linear-gradient(to_bottom,#00ffff11_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_#00ffff80]">
          Welcome to Indra AI
        </h1>

        <p className="text-cyan-200 text-lg tracking-wide min-h-[28px]">
          {typed}
          <span className="animate-pulse">▌</span>
        </p>

        <motion.div
          className="mt-8 text-cyan-400 text-sm"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing neural interface…
        </motion.div>
      </motion.div>
    </div>
  );
};
