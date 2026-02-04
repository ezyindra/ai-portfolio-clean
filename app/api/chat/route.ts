import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json({ reply: "Missing message." }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("GITHUB_TOKEN not found on server");
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
          temperature: 0.6,
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — a friendly, casual personal assistant for Indrajeet Gangawane.

Rules:
- Only answer about Indra.
- If unrelated: say you only help with Indra 🙂
- Be natural and concise.

Profile:
Indrajeet Gangawane — AI & ML practitioner from Chh. Sambhajinagar, India.

Education:
Diploma AI & ML — 82.22%
Saint Xavier’s High School — 81.44%

Skills:
AI/ML, Python, JavaScript, TypeScript, React, Next.js, Three.js, Apache Spark, GenAI.

Projects:
3D Portfolio, AI Vault Assistant, Indra Insights, School Website, KarNa App.

Links:
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
          ],
        }),
      }
    );

    const text = await upstream.text();

    if (!upstream.ok) {
      console.error("Upstream error:", text);
      throw new Error(text);
    }

    const data = JSON.parse(text);
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) throw new Error("Empty reply");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API crash:", err);
    return NextResponse.json(
      { reply: "Indra AI is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
