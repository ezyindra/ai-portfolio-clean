import { FaYoutube } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

/* ================= CERTIFICATIONS ================= */

export const CERTIFICATIONS = [
  {
    title: "Gemini Certified Educator",
    issuer: "Google for Education",
    skills: "Generative AI · Gemini · AI in Education · Prompting",
    year: "2026",
    image: "/certificates/gemini educator.png",
    file: "/certificates/gemini educator.pdf",
  },
  {
    title: "Introduction to Prompt Engineering with GitHub Copilot",
    issuer: "Microsoft · Simplilearn SkillUp",
    skills: "Prompt Engineering · AI-assisted Development · GitHub Copilot",
    year: "2025",
    image: "/certificates/intro to prompt eng.png",
    file: "/certificates/prompt-engineering-github-copilot.pdf",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud · Simplilearn SkillUp",
    skills: "Generative AI · LLM Fundamentals · AI Concepts",
    year: "2025",
    image: "/certificates/intro to gen ai.png",
    file: "/certificates/introduction-to-generative-ai.pdf",
  },
  {
    title: "Data Analytics with Generative AI",
    issuer: "Simplilearn SkillUp",
    skills: "Data Analytics · Generative AI · AI-driven Insights",
    year: "2025",
    image: "/certificates/data ana with gen ai.png",
    file: "/certificates/data-analytics-with-generative-ai.pdf",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    skills: "Data Analysis · Forensic Technology · Real-world Simulation",
    year: "2025",
    image: "/certificates/deloite.png",
    file: "/certificates/deloitte-data-analytics-job-simulation.pdf",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    skills: "Data Science · Analytics · Foundations",
    year: "2025",
    image: "/certificates/intro to data sci.png",
    file: "/certificates/Introduction_to_Data_Science_certificate_indrajeetgangawane08-gmail-com_849dc119-8d43-436c-bb6a-b920b03c55a8.pdf",
  },
] as const;


/* ================= SKILLS ================= */

export const SKILL_DATA = [
  { skill_name: "HTML", image: "html.png", width: 80, height: 80 },
  { skill_name: "CSS", image: "css.png", width: 80, height: 80 },
  { skill_name: "JavaScript", image: "js.png", width: 65, height: 65 },
  { skill_name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
  { skill_name: "React", image: "react.png", width: 80, height: 80 },
  { skill_name: "Redux", image: "redux.png", width: 80, height: 80 },
  { skill_name: "React Query", image: "reactquery.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Next.js 14", image: "next.png", width: 80, height: 80 },
  { skill_name: "Framer Motion", image: "framer.png", width: 80, height: 80 },
  { skill_name: "Stripe", image: "stripe.png", width: 80, height: 80 },
  { skill_name: "Node.js", image: "node.png", width: 80, height: 80 },
  { skill_name: "MongoDB", image: "mongodb.png", width: 40, height: 40 },
] as const;

/* ================= SOCIALS ================= */

export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/ezyindra_/",
  },
  {
    name: "Linkedin",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/indra0/",
  },
] as const;

/* ================= SKILL GROUPS ================= */

export const FRONTEND_SKILL = [
  { skill_name: "HTML", image: "html.png", width: 80, height: 80 },
  { skill_name: "CSS", image: "css.png", width: 80, height: 80 },
  { skill_name: "JavaScript", image: "js.png", width: 65, height: 65 },
  { skill_name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
  { skill_name: "Material UI", image: "mui.png", width: 80, height: 80 },
  { skill_name: "React", image: "react.png", width: 80, height: 80 },
  { skill_name: "Redux", image: "redux.png", width: 80, height: 80 },
  { skill_name: "React Query", image: "reactquery.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Next.js 14", image: "next.png", width: 80, height: 80 },
] as const;

export const BACKEND_SKILL = [
  { skill_name: "Node.js", image: "node.png", width: 80, height: 80 },
  { skill_name: "Express.js", image: "express.png", width: 80, height: 80 },
  { skill_name: "MongoDB", image: "mongodb.png", width: 40, height: 40 },
  { skill_name: "Firebase", image: "firebase.png", width: 55, height: 55 },
  { skill_name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { skill_name: "MySQL", image: "mysql.png", width: 70, height: 70 },
  { skill_name: "Prisma", image: "prisma.png", width: 70, height: 70 },
  { skill_name: "Graphql", image: "graphql.png", width: 80, height: 80 },
] as const;

export const FULLSTACK_SKILL = [
  { skill_name: "React Native", image: "reactnative.png", width: 70, height: 70 },
  { skill_name: "Tauri", image: "tauri.png", width: 70, height: 70 },
  { skill_name: "Docker", image: "docker.png", width: 70, height: 70 },
  { skill_name: "Figma", image: "figma.png", width: 50, height: 50 },
] as const;

export const OTHER_SKILL = [
  { skill_name: "Go", image: "go.png", width: 60, height: 60 },
] as const;

/* ================= PROJECTS ================= */

export const PROJECTS = [
  {
    title: "Happy Child English School — Official Website",
    description:
      "Sponsored diploma group project: a fully responsive school website designed for students and parents. Built with HTML, CSS, and JavaScript, featuring clean UI, mobile-first layout, and clear presentation of academics, admissions, and contact details. Demonstrates real client delivery, teamwork, and production-ready frontend development.",
    image: "/projects/schoolproject.png",
    live: "https://happychildenglishschool.in/",
    github: "",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Indra-Insights — AI News Credibility Platform",
    description:
      "AI-powered platform that analyzes articles for credibility using NLP, trust scoring, and intelligent summarization. Built to explore real-world applications of Generative AI and data analytics.",
    image: "/projects/indra-insights.png",
    live: "https://indra-insights.vercel.app/",
    github: "",
    tech: ["Next.js", "TypeScript", "AI/NLP", "Data Analytics"],
  },
  {
    title: "3D AI Portfolio Website",
    description:
      "High-performance futuristic portfolio featuring interactive 3D elements, smooth animations, and an integrated AI assistant. Built with Next.js 14, Three.js, React Three Fiber, and Framer Motion.",
    image: "/projects/ai-portfolio.png",
    live: "https://ai-portfolio-clean-indra.vercel.app/",
    github: "",
    tech: ["Next.js 14", "Three.js", "React Three Fiber", "Framer Motion"],
  },
] as const;


/* ================= FOOTER ================= */

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      { name: "YouTube", icon: FaYoutube, link: "https://youtube.com" },
      { name: "GitHub", icon: RxGithubLogo, link: "https://github.com/" },
      { name: "Discord", icon: RxDiscordLogo, link: "https://discord.com" },
    ],
  },
  {
    title: "Social Media",
    data: [
      { name: "Instagram", icon: RxInstagramLogo, link: "https://www.instagram.com/ezyindra_/" },
      { name: "Twitter", icon: RxTwitterLogo, link: "https://twitter.com" },
      { name: "Linkedin", icon: RxLinkedinLogo, link: "https://www.linkedin.com/in/indra0/" },
    ],
  },
] as const;

/* ================= NAV ================= */

export const NAV_LINKS = [
  { title: "Home", link: "#home" },
  { title: "Skills", link: "#skills" },
  { title: "Projects", link: "#projects" },
  { title: "Experience", link: "#experience" },
  { title: "Certifications", link: "#certifications" },
  { title: "About me", link: "#about-me" },
  { title: "Contact", link: "#contact" },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/space-portfolio",
};
