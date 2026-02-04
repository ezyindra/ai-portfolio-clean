"use client";

import HeroContent from "@/components/sub/hero-content";

export default function Hero() {
  const handleViewWork = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "/");
    }
  };

  return (
    <div id="home" className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent onViewWork={handleViewWork} />
    </div>
  );
}
