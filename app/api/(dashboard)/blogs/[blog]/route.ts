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

// export const PATCH = async (request: NextRequest, { params }: { params: { blog: string } }) => {
//     const blogId  = params.blog;
//     try {
//         const { title, description } = await request.json();
//         const searchParams = request.nextUrl.searchParams;

//         const userId = searchParams.get("userId");
//         if(!userId) {
//             return NextResponse.json({ message: "User ID is required" }, { status: 400 });
//         }

//         const categoryId = searchParams.get("categoryId");
//         if(!categoryId) {
//             return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
//         }

//         if(!blogId) {
//             return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
//         }

//         await connect();

//         const user = await User.findById(userId);
//         if(!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         const blog = await Blog.findOne({ _id: blogId, user: userId});
//         if(!blog) {
//             return NextResponse.json({ message: "Blog not found" }, { status: 404 });
//         }

//         const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, description }, { new: true });

//         await blog.save();

//         return NextResponse.json({ message: "Blog updated successfully" }, { status: 200 });    
//     } catch (error) {
        
//     }
// }