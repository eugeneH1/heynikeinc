import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      // User is authorized, create and set JWT token
      const token = sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      });

      return NextResponse.json(
        { message: "Login successful" },
        {
          status: 200,
          headers: { "Set-Cookie": serialized },
        }
      );
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Error during login" }, { status: 500 });
  }
}