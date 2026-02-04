"use client";

import Image from "next/image";
import { CERTIFICATIONS } from "@/constants";

/* 🔮 Animated border trace */
function HoverBorder() {
  return (
    <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
      <span
        className="
          absolute inset-0 rounded-2xl p-[1px]
          animate-border
          bg-[linear-gradient(90deg,transparent,rgba(168,85,247,.6),transparent)]
          bg-[length:200%_200%]
          [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
          [mask-composite:exclude]
        "
      />
    </span>
  );
}

export function Certifications() {
  if (!CERTIFICATIONS?.length) return null;

  return (
    <section
      id="certifications"
      className="w-full py-28 flex flex-col items-center text-white"
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
        Certifications & Credentials
      </h2>

      <p className="text-white/50 mb-16 text-center max-w-xl">
        Verified expertise through industry-recognized programs and applied learning.
      </p>

      {/* Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-10
          max-w-7xl
          w-full
          px-6
        "
      >
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={i}
            className="
              group
              relative
              rounded-2xl
              border border-white/10
              bg-gradient-to-b from-white/[0.06] to-white/[0.02]
              p-6
              transition-all
              overflow-hidden
            "
          >
            {/* Soft glow under content */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex gap-4 items-start">
              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-[15px] leading-snug text-white">
                  {cert.title}
                </h3>

                <p className="text-xs text-white/50 mt-1">
                  {cert.issuer}
                </p>

                <p className="text-sm text-white/70 mt-3 line-clamp-2">
                  {cert.skills}
                </p>
              </div>

              {/* Preview */}
              <div
                className="
                  w-28 h-20
                  rounded-lg
                  overflow-hidden
                  border border-white/10
                  bg-black/40
                  shrink-0
                  transition-transform
                  group-hover:scale-[1.05]
                "
              >
                <Image
                  src={cert.image}
                  alt={`${cert.title} preview`}
                  width={160}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between mt-6">
              <span className="text-xs text-white/40">
                {cert.year}
              </span>

              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:underline tracking-wide"
              >
                View certificate →
              </a>
            </div>

            {/* Animated border */}
            <HoverBorder />
          </div>
        ))}
      </div>
    </section>
  );
}
