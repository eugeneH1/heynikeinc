import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH = async (request: NextRequest, { params }: { params: { category: string } }) => {
    const categoryId = params.category;
    console.log(categoryId);

    try {
        const body = await request.json();
        // console.log(body);
        const { title } = body;

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

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

        const category = await Category.findOne({ _id: categoryId, user: userId });

        if(!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { title }, { new: true });

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Error updating category" }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest, { params }: { params: { category: string } }) => {
    const categoryId = params.category;
    console.log(categoryId);

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

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

        const category = await Category.findOne({ _id: categoryId, user: userId });

        if(!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        await Category.findByIdAndDelete(categoryId);

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Error deleting category" }, { status: 500 });
    }
}