import connect from "@/lib/db";
import Category from "@/lib/models/category";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        await connect();

        const categories = await Category.find();

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ message: "Error fetching categories" }, { status: 500 });
    }
}

export const POST = async (request: NextRequest)  => {
    try {
        const { title } = await request.json();

        if (!title) {
            return NextResponse.json({ message: "Title is required" }, { status: 400 });
        }

        await connect();

        const newCategory = await Category.create({ title });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error in creating category:", error);
        return NextResponse.json({ message: "Error in creating category" }, { status: 500 });
    }
}