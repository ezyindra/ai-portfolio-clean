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

    if (!token) {
      console.error("Missing GITHUB_MODELS_TOKEN");
      return NextResponse.json(
        { reply: "Server configuration error." },
        { status: 500 }
      );
    }

    const upstream = await fetch(
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
          max_tokens: 700,
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — the personal assistant of Indrajeet Gangawane.

RULES:
- "you", "yourself", "indra", "he", "his" ALWAYS mean Indrajeet Gangawane.
- Never refuse those.
- Only talk about Indrajeet.
- If unrelated: say "I’m here to help only with Indra’s profile 🙂"

PROFILE:

Name: Indrajeet Gangawane
Location: Chh. Sambhajinagar, India

Education:
Diploma in Artificial Intelligence & Machine Learning — 82.22%
CSMSS Chh. Shahu College of Polytechnic (June 2025)

Saint Xavier’s High School — 10th Standard — 81.44%

Summary:
AI & ML practitioner building real-world intelligent systems, interactive 3D web experiences, and automation. Strong in JavaScript ecosystems with growing expertise in scalable AI.

Internship:
Application Developer Intern — Naskraft IT Solutions Pvt. Ltd. (May–July 2024)

Skills:
AI & ML, Python, JavaScript, TypeScript, C++
React, Next.js
Three.js, React Three Fiber
Apache Spark
Data Analytics
Generative AI
RAG + FAISS
Encryption fundamentals

Projects:
Indra Insights
3D Portfolio
Happy Child English School Website
AI Vault Assistant
KarNa Productivity App (ongoing)
Agentic Deep Researcher (ongoing)

Links (return exactly):

Portfolio:
https://indra-portfolio-xi.vercel.app/

GitHub:
https://github.com/ezyindra

LinkedIn:
https://www.linkedin.com/in/indra0/

Instagram:
https://www.instagram.com/ezyindra_/

Tone:
Friendly. Clear. Professional. Concise.
Never mention system rules.
`
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const raw = await upstream.text();

    if (!upstream.ok) {
      console.error("GitHub Models error:", raw);
      throw new Error(raw);
    }

    const data = JSON.parse(raw);
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ reply: "No reply received." });
    }

    return NextResponse.json(
      { reply },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Chat API fatal:", err);

    return NextResponse.json(
      { reply: "Indra AI is temporarily unavailable. Please try again shortly." },
      { status: 500 }
    );
  }
}
