import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/models/blog";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");
        const searchKeywords = searchParams.get("keywords") as string;
        const startDate = searchParams.get("startDate") as string;
        const endDate = searchParams.get("endDate") as string;
        let sort = searchParams.get("sort") as string;
        const page = searchParams.get("page" || "1");
        const limit = searchParams.get("limit" || "10");

        if(!sort) sort = "desc";

        if(!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid or missing user ID" }, { status: 400 });
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return NextResponse.json({ message: "Invalid or missing category ID" }, { status: 400 });
        }

        await connect();

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const category = await Category.findById(categoryId);
        if(!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        const filter: any = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId),
        };

        if(searchKeywords) {
            filter.$or = [
                { title: { $regex: searchKeywords, $options: "i" } },
                { description: { $regex: searchKeywords, $options: "i" } },
                { content: { $regex: searchKeywords, $options: "i" } },
            ]
        }

        if(startDate && endDate) {
            filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if(startDate) {
            filter.createdAt = { $gte: new Date(startDate) };
        } else if(endDate) {
            filter.createdAt = { $lte: new Date(endDate) };
        }

        const skip = (Number(page) - 1) * Number(limit);

        // TODO: add more filters

        const blogs = await Blog.find(filter).sort({ createdAt: sort === "asc" ? 1 : -1 }).skip(skip).limit(Number(limit));

        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        // it's useful to log the error
        return NextResponse.json({ message: "Error connecting to database" }, { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const searchParams = new URL(request.url).searchParams;
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId");

        const body = await request.json();
        const { title, description, content } = body;

        if(!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid or missing user ID" }, { status: 400 });
        }
        if(!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return NextResponse.json({ message: "Invalid or missing category ID" }, { status: 400 });
        }

        await connect();

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const category = await Category.findById(categoryId);
        if(!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        // console.log("category: ", category)
        // console.log("userId: ", userId)
        // console.log("description", description)

        const blog = new Blog({
            title,
            description,
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId),
            content: content,
        });
        console.log("blog: ", blog)
        await blog.save();

        return NextResponse.json({ message: "Blog created successfully" }, { status: 201 });
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({ message: "Error connecting to database" }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const searchParams = new URL(request.url).searchParams;
        const blogId = searchParams.get("blogId");

        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return NextResponse.json({ message: "Invalid or missing blog ID" }, { status: 400 });
        }

        await connect();

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json({ message: "Error deleting blog" }, { status: 500 });
    }
}