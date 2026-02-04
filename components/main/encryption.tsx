"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import { slideInFromTop } from "@/lib/motion";
import EncryptionModal from "@/components/sub/encryption-modal";
import { AIChat } from "@/components/chat/AIChat";

export const Encryption = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [unlocked, setUnlocked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setShowWelcome(true);

    // Hide welcome screen after 3 seconds
    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
  };

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden">

      {/* 🎥 Background video */}
      <video
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
        preload="none"
        disablePictureInPicture
        controls={false}
        className="absolute inset-0 w-full h-full object-cover -z-10 will-change-transform transform-gpu"
      >
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      {/* Title */}
      <div className="absolute top-14 w-full flex justify-center z-10 px-4">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          className="text-[32px] md:text-[40px] font-medium text-gray-200 text-center"
        >
          Performance{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            &
          </span>{" "}
          security.
        </motion.div>
      </div>

      {/* 🔒 CENTER CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-6">

        {!unlocked ? (
          <EncryptionModal
            videoRef={videoRef}
            onUnlock={handleUnlock}
            trigger={
              <div className="cursor-pointer group flex flex-col items-center transform-gpu">
                <Image
                  src="/lock-top.png"
                  alt="Lock top"
                  width={55}
                  height={55}
                  className="translate-y-4 transition-transform duration-300 motion-safe:group-hover:translate-y-8"
                  priority
                />
                <Image
                  src="/lock-main.png"
                  alt="Lock main"
                  width={80}
                  height={80}
                  className="z-10"
                  priority
                />
                <span className="mt-4 text-xs tracking-widest uppercase text-white/60">
                  Encrypted Section
                </span>
              </div>
            }
          />
        ) : (
          <>
            {/* 🔓 Welcome Animation */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="fixed inset-0 z-40 flex items-center justify-center bg-black"
                >
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                      Welcome to Indra AI
                    </h1>
                    <p className="text-white/70 text-lg">
                      Your personal assistant. Ask anything about Indra.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 🤖 AI Chat */}
            {!showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl mt-24"
              >
                <AIChat />
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 w-full flex justify-center z-10 px-4">
        <div className="cursive text-[16px] md:text-[18px] font-medium text-gray-300 text-center">
          Secure your data with end-to-end encryption.
        </div>
      </div>

    </section>
  );
};
