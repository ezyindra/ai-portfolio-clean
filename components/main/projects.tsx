"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";
import CurrentProjectsModal from "@/components/main/current-projects-modal";

export const Projects = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      {/* Title */}
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>

      {/* Project Cards */}
      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-10">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description}
            live={project.live}
            github={project.github}
          />
        ))}
      </div>

      {/* 🚀 Current Working Projects Button */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => setOpenModal(true)}
          className="
            px-10 py-3 rounded-full font-semibold tracking-wide
            bg-gradient-to-r from-cyan-400 to-purple-500
            text-black
            hover:scale-105 transition-all duration-300
            shadow-[0_0_30px_rgba(0,255,255,.35)]
          "
        >
          🚀 Current Working Projects
        </button>
      </div>

      {/* Modal */}
      <CurrentProjectsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
};
