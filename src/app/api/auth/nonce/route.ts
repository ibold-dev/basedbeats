import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Generate a secure random nonce
    const nonce = crypto.randomUUID().replace(/-/g, "");

    // TODO: Store nonce in database/cache with expiration
    // For now, we'll just return it

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("Nonce generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    );
  }
}
