import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";

export async function POST(
  request: NextRequest,
  { params }: { params: { blog: string } }
) {
  const blogId = params.blog;
  try {
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    await connect();

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ likes: blog.likes }, { status: 200 });

  } catch (error) {
    console.error("Error liking blog:", error);
    return NextResponse.json({ message: "Error liking blog" }, { status: 500 });
  }
}