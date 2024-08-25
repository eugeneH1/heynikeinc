import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid or missing user ID" }, { status: 400 });
        }

        await connect();

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const categories = await Category.find({
            user: new Types.ObjectId(userId),
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching categories" }, { status: 500 });
    }
}

export const POST = async (request: NextRequest)  =>{
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        const {title} = await request.json();

        if(!userId || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid or missing user ID" }, { status: 400 });
        }

        await connect();

        const user = await User.findById(userId);
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const newCategory = await Category.create({
            title,
            user: new Types.ObjectId(userId),
        });

        await newCategory.save();

        return NextResponse.json(newCategory, { status: 201 });


    } catch(error){
        console.error("Error in creating category:", error);
        return NextResponse.json({ message: "Error in creating category" }, { status: 500 });
    }
}