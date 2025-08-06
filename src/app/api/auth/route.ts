import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
