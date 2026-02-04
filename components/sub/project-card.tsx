import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  live?: string;
  github?: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  live,
  github,
}: ProjectCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2A0E61] bg-black/40 backdrop-blur shadow-lg transition hover:scale-[1.02]">
      
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full h-60 object-cover"
      />

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>

        <div className="flex gap-4 pt-3">
          {live && (
            <Link href={live} target="_blank" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
              <ExternalLink size={18} /> Live
            </Link>
          )}

          {github && (
            <Link href={github} target="_blank" className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
              <Github size={18} /> GitHub
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
