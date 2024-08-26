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

    const { author, content } = await request.json();

    if (!author || !content) {
      return NextResponse.json({ message: "Author and content are required" }, { status: 400 });
    }

    await connect();

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $push: { comments: { author, content } } },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ comment: blog.comments[blog.comments.length - 1] }, { status: 201 });

  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Error adding comment" }, { status: 500 });
  }
}