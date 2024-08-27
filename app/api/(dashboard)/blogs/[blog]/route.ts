import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";

export const GET = async (request: NextRequest, { params }: { params: { blog: string } }) => {
    const blogId = params.blog;
    try {
        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
        }

        await connect();

        const blog = await Blog.findById(blogId)
            .populate('category', 'title')
            .populate('user', 'username')
            .select('title description content category user likes comments createdAt');

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ blog }, { status: 200 });

    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ message: "Error fetching blog" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { blog: string } }
  ) {
    const blogId = params.blog;
    try {
      if (!blogId || !Types.ObjectId.isValid(blogId)) {
        return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
      }
  
      const { title, description, category } = await request.json();
  
      await connect();
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, description, category },
        { new: true }
      );
  
      if (!updatedBlog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
  
      return NextResponse.json({ blog: updatedBlog }, { status: 200 });
  
    } catch (error) {
      console.error("Error updating blog:", error);
      return NextResponse.json({ message: "Error updating blog" }, { status: 500 });
    }
  }

export async function DELETE(
  request: NextRequest,
  { params }: { params: { blog: string } }
) {
  const blogId = params.blog;
  try {
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    await connect();

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ message: "Error deleting blog" }, { status: 500 });
  }
}