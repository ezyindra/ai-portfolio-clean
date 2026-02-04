import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please type something 🙂" });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("Missing GITHUB_TOKEN on server");
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
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.6,
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: `
You are Indra AI — friendly personal assistant for Indrajeet Gangawane.

RULES:
Only talk about Indra.
If unrelated: reply politely you only help about Indra.

Profile:
Indrajeet Gangawane — AI & ML practitioner from Chh. Sambhajinagar, India.

Education:
Diploma AI & ML — 82.22%
Saint Xavier’s High School — 81.44%

Skills:
AI/ML, Python, JS, TS, React, Next.js, Three.js, Apache Spark.

Projects:
Indra Insights, 3D Portfolio, AI Vault Assistant.

Links:
GitHub: https://github.com/ezyindra
LinkedIn: https://www.linkedin.com/in/indra0/
Instagram: https://www.instagram.com/ezyindra_/
Portfolio: https://indra-portfolio-xi.vercel.app/

Tone: casual, friendly, short answers.
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

    const text = await response.text();

    if (!response.ok) {
      console.error("GitHub Models error:", text);
      throw new Error(text);
    }

    const data = JSON.parse(text);
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) throw new Error("Empty reply");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("CHAT API ERROR:", err);

    return NextResponse.json({
      reply: "Indra AI is temporarily unavailable. Please try again shortly."
    });
  }
}
