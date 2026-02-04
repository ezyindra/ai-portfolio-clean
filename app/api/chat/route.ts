import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json({
    hasToken: !!process.env.GITHUB_TOKEN,
    tokenPreview: process.env.GITHUB_TOKEN
      ? process.env.GITHUB_TOKEN.slice(0, 6)
      : null,
  });
}
