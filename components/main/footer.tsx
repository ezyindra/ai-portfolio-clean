"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full py-16 text-white/70">
      
      {/* Quote */}
      <div className="text-center mb-10">
        <p className="cursive text-sm text-white/60">
        
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center items-center gap-8 mb-10">
        <Link
          href="https://www.instagram.com/ezyindra_/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="transition-all duration-200 hover:text-white hover:scale-110"
        >
          <Instagram size={22} />
        </Link>

        <Link
          href="https://www.linkedin.com/in/indra0/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition-all duration-200 hover:text-white hover:scale-110"
        >
          <Linkedin size={22} />
        </Link>

        <Link
          href="https://github.com/ezyindra"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition-all duration-200 hover:text-white hover:scale-110"
        >
          <Github size={22} />
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-white/40">
        © Indrajeet Gangawane {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
};
