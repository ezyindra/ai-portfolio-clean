
import { Encryption } from "@/components/main/encryption";
import Hero  from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import { Certifications } from "@/components/main/certifications";
import AboutMe from "@/components/main/about-me";
import { Contact } from "@/components/main/contact";
import { Experience } from "@/components/main/experience";





export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <AboutMe />
        <Contact />
        <Encryption />
      
      </div>
    </main>
  );
}
