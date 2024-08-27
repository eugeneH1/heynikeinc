import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { blog: string; id: string } }
) {
  const blogId = params.blog;
  const commentId = params.id;

  try {
    if (!blogId || !Types.ObjectId.isValid(blogId) || !commentId || !Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ message: "Invalid blog ID or comment ID" }, { status: 400 });
    }

    await connect();

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found or comment not deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ message: "Error deleting comment" }, { status: 500 });
  }
}