import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Empty message." });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json({
        reply: "Server configuration error.",
      });
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
          temperature: 0.6,
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content:
                "You are Indra AI, a friendly assistant that ONLY answers about Indrajeet Gangawane.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const json = await res.json();

    console.log("MODEL RESPONSE:", json);

    const reply =
      json?.choices?.[0]?.message?.content ||
      json?.choices?.[0]?.delta?.content ||
      "No reply received.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      reply: "Indra AI is temporarily unavailable.",
    });
  }
}
