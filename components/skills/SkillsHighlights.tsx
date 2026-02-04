"use client";

import { SkillBox3D } from "./SkillBox3D";

export const SkillsHighlights = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      
      {/* LEFT SIDE */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto">
        <SkillBox3D
          title="Problem Solving & Debugging"
          description="Breaking down complex problems, identifying root causes, and delivering reliable solutions through structured thinking and systematic debugging."
          align="left"
        />
        <SkillBox3D
          title="Web Development"
          description="Building modern, scalable web applications with clean architecture, performance optimization, and maintainable codebases."
          align="left"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto">
        <SkillBox3D
          title="Web Design & UI Thinking"
          description="Designing intuitive, user-centered interfaces with a strong focus on usability, visual hierarchy, and overall experience."
          align="right"
        />
        <SkillBox3D
          title="Team Collaboration"
          description="Collaborating effectively within teams through clear communication, shared ownership, and collaborative problem-solving."
          align="right"
        />
      </div>
    </div>
  );
};
