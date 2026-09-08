"use client";

import { motion } from "framer-motion";

interface SkillBox3DProps {
  title: string;
  description: string;
  align: "left" | "right";
}

export const SkillBox3D = ({ title, description, align }: SkillBox3DProps) => {
  return (
    <motion.div
      whileHover={{ rotateX: 6, rotateY: align === "left" ? -6 : 6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className={`relative w-[280px] p-5 rounded-xl 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        shadow-[0_0_40px_rgba(139,92,246,0.15)]
        text-white
        ${align === "left" ? "text-left" : "text-right"}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow Layer */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 blur-xl -z-10" />

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};
