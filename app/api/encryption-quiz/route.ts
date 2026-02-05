import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = process.env.OPENROUTER_API_KEY;

    if (!token) {
      return NextResponse.json({ questions: [] }, { status: 500 });
    }

    // Force randomness every call
    const seed = Math.floor(Math.random() * 1000000);

    const prompt = `
Random seed: ${seed}

Generate EXACTLY 3 DIFFERENT cybersecurity multiple choice questions.

RULES:
- Must be NEW every request.
- 4 options each.
- Exactly ONE correct answer.
- Topics: encryption, hashing, HTTPS, authentication, networking, web security.
- Beginner to intermediate.
- STRICT JSON ONLY.
- No markdown.
- No explanations.

Return format:

{
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correctIndex": 0
    }
  ]
}
`;

    const upstream = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "Indra Vault",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          temperature: 1.1,
          top_p: 0.95,
          max_tokens: 600,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const raw = await upstream.json();
    const content = raw?.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty response");

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
            question: "What does HTTPS mainly provide?",
            options: [
              "Speed",
              "Encrypted communication",
              "Compression",
              "SEO",
            ],
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
