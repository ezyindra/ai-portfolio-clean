"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import EncryptionModal from "@/components/sub/encryption-modal";
import { AIChat } from "@/components/chat/AIChat";

export const Encryption = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [phase, setPhase] = useState<
    "locked" | "unlocked" | "welcome" | "chat"
  >("locked");

  const handleUnlock = () => {
    setPhase("unlocked");

    setTimeout(() => setPhase("welcome"), 2200);
    setTimeout(() => setPhase("chat"), 5200);
  };

  return (
    <section
      id="encryption"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <video
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      <div className="relative z-20 w-full flex justify-center px-6">

        {/* LOCK */}
        {phase === "locked" && (
          <EncryptionModal
            videoRef={videoRef}
            onUnlock={handleUnlock}
            trigger={
              <div className="cursor-pointer group flex flex-col items-center">
                <Image src="/lock-top.png" alt="" width={60} height={60}
                  className="translate-y-4 group-hover:translate-y-8 transition" />
                <Image src="/lock-main.png" alt="" width={90} height={90} />
                <span className="mt-4 text-xs tracking-widest text-white/60">
                  ENCRYPTED VAULT
                </span>
              </div>
            }
          />
        )}

        <AnimatePresence mode="wait">

          {/* ACCESS GRANTED */}
          {phase === "unlocked" && (
            <motion.div
              key="grant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <h1 className="text-5xl font-extrabold text-cyan-400 tracking-widest">
                  ACCESS GRANTED
                </h1>

                <p className="mt-4 text-cyan-300 text-sm tracking-widest animate-pulse">
                  YOU HAVE SUCCESSFULLY UNLOCKED INDRA’S VAULT
                </p>

                <div className="mt-8 h-[2px] w-60 mx-auto bg-cyan-400 animate-pulse" />
              </motion.div>
            </motion.div>
          )}

          {/* WELCOME */}
          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            >
              <motion.div
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                className="text-center max-w-xl"
              >
                <h1 className="text-6xl font-extrabold mb-6
                  bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
                  bg-clip-text text-transparent">
                  Welcome to Indra’s Personal Assistant
                </h1>

                <p className="text-white/70 leading-relaxed">
                  Here you can directly talk with Indra and explore his journey —
                  projects, skills, experience, and ideas — through an intelligent AI interface.
                </p>

                <div className="mt-10 text-cyan-400 tracking-widest text-sm animate-pulse">
                  INITIALIZING NEURAL CORE…
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* CHAT */}
          {phase === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-5xl mt-32"
            >
              <AIChat />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full flex justify-center text-xs text-cyan-400/40 tracking-wide">
        AI secured · Neural initialized · Zero retention
      </div>
    </section>
  );
};
