import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    const token = process.env.GITHUB_MODELS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { reply: "Server configuration error." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — personal assistant for Indrajeet Gangawane.

Always answer ONLY about Indrajeet.

PROFILE:

Name: Indrajeet Gangawane
Location: Chh. Sambhajinagar, India

Education:
Diploma AI & ML — 82.22%
CSMSS Chh. Shahu College of Polytechnic (2025)

Saint Xavier’s High School — 81.44%

Summary:
AI & ML practitioner focused on real-world intelligent systems, 3D web experiences, and automation.

Internship:
Application Developer Intern — Naskraft IT (May–July 2024)

Skills:
Python, JavaScript, TypeScript, C++
React, Next.js
Three.js
Apache Spark
RAG, FAISS
Generative AI

Projects:
Indra Insights
3D Portfolio
Happy Child School Website
AI Vault
KarNa App
Agentic Researcher

Links:

Portfolio https://indra-portfolio-xi.vercel.app/
GitHub https://github.com/ezyindra
LinkedIn https://www.linkedin.com/in/indra0/
Instagram https://www.instagram.com/ezyindra_/

Tone:
Friendly. Clean. Short.
`
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.4,
          max_tokens: 600
        })
      }
    );

    const raw = await response.text();

    if (!response.ok) {
      console.error(raw);
      throw new Error(raw);
    }

    const data = JSON.parse(raw);
    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({
      reply: reply || "No reply received."
    });

  } catch (err) {
    console.error("CHAT FAIL:", err);
    return NextResponse.json({
      reply: "Indra AI temporarily unavailable."
    });
  }
}
