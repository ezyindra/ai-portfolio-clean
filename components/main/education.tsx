'use client';

import { motion } from "framer-motion";

const educationData = [
  {
    degree: "Bachelor of Engineering (Computer Engineering)",
    institution: "XYZ Institute of Technology",
    duration: "2022 – 2026",
    description:
      "Focused on software engineering, data structures, algorithms, databases, and full-stack web development.",
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "ABC Polytechnic",
    duration: "2019 – 2022",
    description:
      "Built a strong foundation in programming, operating systems, networking, and practical software development.",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-20 text-white"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
      >
        Education
      </motion.h2>

      {/* Education Cards */}
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-lg shadow-purple-900/20"
          >
            {/* Degree */}
            <h3 className="text-xl md:text-2xl font-semibold text-purple-300">
              {edu.degree}
            </h3>

            {/* Institution & Duration */}
            <p className="mt-2 text-sm md:text-base text-gray-300">
              {edu.institution} • <span className="text-gray-400">{edu.duration}</span>
            </p>

            {/* Description */}
            <p className="mt-4 text-gray-400 leading-relaxed">
              {edu.description}
            </p>

            {/* Glow Accent */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-purple-500/10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
