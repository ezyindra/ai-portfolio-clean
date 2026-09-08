"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Experience = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="experience" className="w-full py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-white"
        >
          Professional{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Experience
          </span>
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-xl rounded-2xl p-10"
        >
          {/* Left */}
          <div>
            <h3 className="text-2xl font-semibold text-cyan-300 mb-1">
              Application Developer Intern
            </h3>

            <p className="text-white/70">
              Naskraft IT Solutions Pvt. Ltd.
            </p>

            <p className="text-sm text-white/50 mb-6">
              May 2024 – July 2024 · Aurangabad, Maharashtra · On-site
            </p>

            <p className="text-white/70 mb-6 leading-relaxed">
              Completed a 12-week internship gaining hands-on experience in software
              development. Worked on the CREED Play application using JavaScript in
              NetBeans IDE. Learned full end-to-end development including requirement
              analysis, coding, debugging, and testing.
            </p>

            <ul className="space-y-2 text-white/70 text-sm list-disc pl-5">
              <li>Built real application features using JavaScript</li>
              <li>Worked across full feature lifecycle</li>
              <li>Strengthened debugging & problem-solving skills</li>
              <li>Collaborated in a professional IT environment</li>
            </ul>
          </div>

          {/* Certificate Preview */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Image
              src="/certificates/internship.jpeg"
              alt="Internship Certificate"
              width={320}
              height={220}
              className="rounded-xl opacity-90 hover:opacity-100 transition"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Certificate */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative"
            >
              <Image
                src="/certificates/internship.jpeg"
                alt="Certificate"
                width={700}
                height={900}
                className="rounded-xl"
              />

              <button
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-white/70 hover:text-red-400 text-xl"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
