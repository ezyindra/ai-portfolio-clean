import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;

    const token = process.env.GITHUB_MODELS_TOKEN;

    console.log("TOKEN LOADED:", !!token);

    if (!token) {
      return NextResponse.json({ reply: "Server configuration error." });
    }

    const res = await fetch("https://models.github.ai/inference/chat/completions", {
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
            content: "You are Indra AI. Answer ONLY about Indrajeet Gangawane."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.4,
        max_tokens: 500
      })
    });

    const text = await res.text();
    console.log(text);

    if (!res.ok) throw new Error(text);

    const data = JSON.parse(text);

    return NextResponse.json({
      reply: data.choices[0].message.content
    });

  } catch (e) {
    console.error(e);
    return NextResponse.json({
      reply: "Indra AI temporarily unavailable."
    });
  }
}
