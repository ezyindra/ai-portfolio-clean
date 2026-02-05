import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = process.env.OPENROUTER_API_KEY;

    if (!token) throw new Error("Missing API key");

    // Random entropy so every request differs
    const seed = Math.random().toString(36).slice(2);

    const prompt = `
Generate exactly 3 DIFFERENT cybersecurity multiple choice questions.

Rules:
- Always vary questions.
- Each has 4 options.
- Exactly ONE correct answer.
- Topics: encryption, networking, web security, hashing, authentication.
- Beginner/intermediate.
- STRICT JSON ONLY.

Seed:${seed}

Return:

{
 "questions":[
   {
     "question":"...",
     "options":["A","B","C","D"],
     "correctIndex":0
   }
 ]
}
`;

    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        temperature: 1.1,
        presence_penalty: 0.6,
        frequency_penalty: 0.6,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const raw = await upstream.json();
    const content = raw?.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty AI response");

    const parsed = JSON.parse(content);

    return NextResponse.json(parsed, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Quiz API error:", err);

    return NextResponse.json(
      {
        questions: [
          {
            question: "Which protocol encrypts web traffic?",
            options: ["FTP", "HTTP", "HTTPS", "SMTP"],
            correctIndex: 2,
          },
          {
            question: "What does hashing protect?",
            options: ["Passwords", "Bandwidth", "Latency", "SEO"],
            correctIndex: 0,
          },
          {
            question: "Which enables identity verification?",
            options: ["Caching", "Authentication", "Compression", "Routing"],
            correctIndex: 1,
          },
        ],
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
