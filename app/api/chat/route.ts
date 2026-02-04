import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json({ reply: "Message missing." }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("GITHUB_TOKEN not set on Vercel");
      return NextResponse.json(
        { reply: "Server configuration error." },
        { status: 500 }
      );
    }

    // ---- Build messages cleanly
    const messages = [
      {
        role: "system",
        content: `
You are Indra AI — a friendly, casual personal assistant for Indrajeet Gangawane.

PERSONALITY:
- Natural, warm, conversational.
- Short clear replies by default.

RULES:
- Only talk about Indra.
- If unrelated: say you only help with Indra 🙂

PROFILE:

Name: Indrajeet Gangawane
Location: Chh. Sambhajinagar, India

Education:
- Diploma in AI & ML — 82.22% (CSMSS Chh. Shahu College of Polytechnic, June 2025)
- Saint Xavier’s High School — 10th: 81.44%

Summary:
AI & ML practitioner focused on real-world systems, interactive 3D web, and automation.

Internship:
Application Developer Intern — Naskraft IT Solutions (May–July 2024)

Skills:
AI/ML, Python, JavaScript, TypeScript, C++
React, Next.js
Three.js, R3F
Apache Spark
Data Analytics
Generative AI, Prompt Engineering
RAG, FAISS
Encryption basics

Projects:
Indra Insights
3D Portfolio
Happy Child English School Website
AI Vault Assistant
KarNa App (WIP)
Agentic Deep Researcher (WIP)

Links (return exactly):
Portfolio: https://indra-portfolio-xi.vercel.app/
GitHub: https://github.com/ezyindra
LinkedIn: https://www.linkedin.com/in/indra0/
Instagram: https://www.instagram.com/ezyindra_/
`,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // ---- Timeout protection (CRITICAL for Vercel)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const upstream = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.7,
          max_tokens: 600,
          messages,
        }),
      }
    );

    clearTimeout(timeout);

    const raw = await upstream.text();

    if (!upstream.ok) {
      console.error("GitHub Models error:", raw);
      throw new Error("Upstream failed");
    }

    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error("Bad JSON from model");
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) throw new Error("Empty model reply");

    return NextResponse.json(
      { reply },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Chat API fatal:", err);

    return NextResponse.json(
      {
        reply:
          "Sorry — Indra AI is waking up 😅 Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
