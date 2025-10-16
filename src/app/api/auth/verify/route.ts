import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { NextRequest, NextResponse } from "next/server";

const client = createPublicClient({
  chain: base,
  transport: http(),
});

export async function POST(req: NextRequest) {
  try {
    const { address, message, signature } = await req.json();

    if (!address || !message || !signature) {
      return NextResponse.json(
        { error: "Missing required fields: address, message, signature" },
        { status: 400 }
      );
    }

    // Verify the signature using viem
    const isValid = await client.verifyMessage({
      address: address as `0x${string}`,
      message: message as string,
      signature: signature as `0x${string}`,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // TODO: Create session/JWT token here
    // For now, we'll just return success
    return NextResponse.json({
      ok: true,
      address,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
