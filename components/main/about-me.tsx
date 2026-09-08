"use client";

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
        I’m a Computer Science student specializing in Artificial Intelligence
        and Machine Learning, currently pursuing my B.Tech at MGM University,
        Institute of Information and Communication Technology (IICT), in the
        AI & ML department.
        <br />
        <br />

        I enjoy turning ideas into practical, real-world projects by combining
        Artificial Intelligence, Machine Learning, Generative AI, and modern
        web technologies. I’m particularly interested in building intelligent
        applications, automation systems, RAG-based solutions, and interactive
        digital experiences.
        <br />
        <br />

        I’m continuously strengthening my problem-solving and programming
        fundamentals through Data Structures and Algorithms in C++, while
        exploring how intelligent systems can be designed to be useful,
        scalable, and reliable.
        <br />
        <br />

        Beyond technology, I enjoy sports, music, and science-fiction. I also
        enjoy exploring creative technologies and learning new concepts that
        help me grow both technically and personally.
      </p>

      {/* Micro Skill Highlights */}
      <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-gray-300">
        {[
          "AI & ML Engineering",
          "Generative AI",
          "RAG & Intelligent Systems",
          "Interactive Web Development",
          "Problem Solving",
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

      {/* Education Timeline */}
      <div className="mt-16 max-w-[700px] w-full space-y-6">

        {/* B.Tech */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-white font-medium">
            B.Tech in Computer Science (AI & ML)
          </h4>

          <p className="text-sm text-gray-400">
            MGM University — Institute of Information and Communication
            Technology (IICT), AI & ML Department — 2026–Present
          </p>
        </div>

        {/* Diploma */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-white font-medium">
            Diploma in Artificial Intelligence & Machine Learning
          </h4>

          <p className="text-sm text-gray-400">
            CSMSS Chh. Shahu College of Polytechnic — 82.22% (2022–2025)
          </p>
        </div>

        {/* Secondary School */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h4 className="text-white font-medium">
            Secondary School (10th Standard)
          </h4>

          <p className="text-sm text-gray-400">
            St. Xavier’s High School — 81.44% (2022)
          </p>
        </div>

      </div>
    </motion.section>
  );
};

export default AboutMe;