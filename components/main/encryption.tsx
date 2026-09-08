"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import EncryptionModal from "@/components/sub/encryption-modal";

import { AIChat } from "@/components/chat/AIChat";

export const Encryption = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [phase, setPhase] = useState<"locked" | "unlocked" | "welcome" | "chat">(
    "locked"
  );

  const handleUnlock = () => {
    setPhase("unlocked");
    setTimeout(() => setPhase("welcome"), 2400);
    setTimeout(() => setPhase("chat"), 5600);
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
              <div className="cursor-pointer group flex flex-col items-center relative">

                {/* Handle BACK */}
                <Image
                  src="/lock-top.png"
                  alt=""
                  width={60}
                  height={60}
                  className="absolute -top-4 z-0 opacity-90
                  group-hover:-translate-y-2 transition-all duration-300"
                />

                {/* Body FRONT */}
                <Image
                  src="/lock-main.png"
                  alt=""
                  width={95}
                  height={95}
                  className="relative z-10 drop-shadow-[0_0_25px_rgba(0,255,255,.45)]
                  group-hover:translate-y-1 transition-all duration-300"
                />

                <span className="mt-6 text-xs tracking-[0.3em] text-cyan-300/70">
                  ENCRYPTED VAULT
                </span>
              </div>
            }
          />
        )}

        <AnimatePresence mode="wait">

          {phase === "unlocked" && (
            <motion.div
              key="grant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            >
              <div className="text-center">
                <h1 className="text-5xl font-extrabold tracking-[0.35em] text-cyan-400">
                  ACCESS GRANTED
                </h1>
              </div>
            </motion.div>
          )}

          {phase === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            >
              <div className="text-center max-w-xl">
                <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Welcome to Indra’s Personal Assistant
                </h1>
              </div>
            </motion.div>
          )}

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

      <div className="absolute bottom-6 w-full flex justify-center text-[10px] text-cyan-400/40 tracking-[0.25em]">
        NEURAL LINK ACTIVE · ZERO RETENTION · SECURE CHANNEL
      </div>
    </section>
  );
};
