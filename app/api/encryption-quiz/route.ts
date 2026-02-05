import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractJSON(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found");
  return JSON.parse(match[0]);
}

export async function GET() {
  try {
    const token = process.env.OPENROUTER_API_KEY;

    if (!token) throw new Error("Missing key");

    const prompt = `
Return ONLY raw JSON.

Generate exactly 3 cybersecurity MCQ questions.

Rules:
- 4 options each
- exactly 1 correctIndex
- beginner/intermediate
- topics: HTTPS, hashing, auth, encryption, networking

FORMAT:

{
 "questions":[
   {
     "question":"",
     "options":["A","B","C","D"],
     "correctIndex":0
   }
 ]
}
`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        temperature: 0.9,
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const raw = await res.json();
    const content = raw?.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty AI");

    const parsed = extractJSON(content);

    if (!parsed.questions?.length) throw new Error("No questions");

    return NextResponse.json(parsed, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("Quiz error:", e);

    return NextResponse.json(
      {
        questions: [
          {
            question: "What does HTTPS primarily provide?",
            options: ["Speed", "Encrypted communication", "SEO", "Caching"],
            correctIndex: 1,
          },
          {
            question: "What is hashing mainly used for?",
            options: [
              "Encrypt files",
              "Password storage",
              "Compression",
              "Key exchange",
            ],
            correctIndex: 1,
          },
          {
            question: "Which ensures identity verification?",
            options: ["Authorization", "Authentication", "Encryption", "Firewall"],
            correctIndex: 1,
          },
        ],
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
