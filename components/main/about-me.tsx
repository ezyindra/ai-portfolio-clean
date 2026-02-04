'use client';

import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <motion.section
      id="about-me"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full min-h-screen flex flex-col items-center px-6 md:px-20 py-24 text-white bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"
    >
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-semibold mb-10 text-center">
        About Me
      </h2>

      {/* About Content */}
      <p className="max-w-[700px] text-gray-300 text-base md:text-lg font-light leading-relaxed text-left">
        I’m a Computer Science student specializing in Artificial Intelligence and Machine
        Learning, currently in my second year at Dr. Babasaheb Ambedkar Technological University
        (BATU).
        <br />
        <br />
        I enjoy building real-world projects at the intersection of AI, machine learning, and
        modern web development — especially interactive experiences using 3D elements and
        automation.
        <br />
        <br />
        I’m currently strengthening my problem-solving skills through Data Structures and
        Algorithms (DSA) in C++, while continuously exploring scalable system design.
        <br />
        <br />
        Beyond tech, I enjoy sports, music, and science-fiction — interests that help me stay
        creative, balanced, and inspired.
      </p>

      {/* Micro Skill Highlights */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-gray-300">
        {[
          "AI & ML Engineering",
          "Interactive Web Development",
          "3D & Motion Interfaces",
          "Problem Solving Mindset",
        ].map((item) => (
          <span
            key={item}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Currently Learning */}
      <div className="mt-6">
        <span className="px-5 py-2 text-sm rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300">
          Currently learning: Data Structures & Algorithms (C++)
        </span>
      </div>

      {/* Education Timeline (Natural Stack) */}
      <div className="mt-16 max-w-[700px] w-full space-y-6">
        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-white font-medium">
            B.Tech in Computer Science (AI & ML)
          </h4>
          <p className="text-sm text-gray-400">
            Dr. Babasaheb Ambedkar Technological University (BATU) — 2025–Present
          </p>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-white font-medium">
            Diploma in Artificial Intelligence & Machine Learning
          </h4>
          <p className="text-sm text-gray-400">
            CSMSS College of Polytechnic — 82.22% (2022-2025)
          </p>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-white font-medium">
            Secondary School (10th Standard)
          </h4>
          <p className="text-sm text-gray-400">
            St. Xavier’s High School — 81.40% (2022)
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
