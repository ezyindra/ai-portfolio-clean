import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("Incoming message:", message);

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("GITHUB_TOKEN missing");
      return NextResponse.json(
        { error: "GITHUB_TOKEN missing" },
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
          temperature: 0.7,
          max_tokens: 800,
          messages: [
            {
              role: "system",
              content:
                "You are Indra AI, a professional assistant that answers about Indra's skills, projects, education, and experience.",
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

    console.log("Upstream status:", upstream.status);
    console.log("Upstream body:", raw);

    if (!upstream.ok) {
      throw new Error(raw);
    }

    const data = JSON.parse(raw);
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) throw new Error("Empty model reply");

    return NextResponse.json(
      { reply },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Chat API fatal:", err);

    return NextResponse.json(
      {
        reply:
          "AI service is busy. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
