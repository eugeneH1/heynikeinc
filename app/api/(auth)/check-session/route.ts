import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = verify(token, SECRET_KEY) as { id: string, email: string };
    return NextResponse.json({ userId: decoded.id }, { status: 200 });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}