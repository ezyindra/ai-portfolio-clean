import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    const token = process.env.GITHUB_MODELS_TOKEN;

    // HARD DEBUG
    if (!token) {
      console.error("TOKEN MISSING");
      return NextResponse.json(
        { reply: "Server configuration error." },
        { status: 500 }
      );
    }

    const res = await fetch(
      "https://models.github.ai/inference/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — personal assistant for Indrajeet Gangawane.

RULE:
Whenever user says you / yourself / he / indra — they mean Indrajeet.

Never refuse those.

Only answer about Indrajeet.

If unrelated:
"I'm here only for Indra 🙂"

PROFILE:

Name: Indrajeet Gangawane
Location: Chh. Sambhajinagar, India

Education:
Diploma AI & ML — 82.22%
CSMSS Chh. Shahu College of Polytechnic (2025)

Saint Xavier’s High School — 81.44%

Summary:
AI & ML practitioner focused on real-world systems, 3D web, automation.

Internship:
Application Developer Intern — Naskraft IT (May–July 2024)

Skills:
Python, JS, TS, C++
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

Portfolio:
https://indra-portfolio-xi.vercel.app/

GitHub:
https://github.com/ezyindra

LinkedIn:
https://www.linkedin.com/in/indra0/

Instagram:
https://www.instagram.com/ezyindra_/

Tone:
Friendly.
Short.
Professional.
`
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    const raw = await res.text();

    if (!res.ok) {
      console.error(raw);
      throw new Error(raw);
    }

    const data = JSON.parse(raw);
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) return NextResponse.json({ reply: "No reply received." });

    return NextResponse.json({ reply });

  } catch (e) {
    console.error("API FAIL:", e);
    return NextResponse.json({
      reply: "Indra AI temporarily unavailable."
    });
  }
}
