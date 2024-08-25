import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require('mongoose').Types.ObjectId;

export const GET = async () => {
    try{
        await connect();
        const users = await User.find();
        return NextResponse.json(users, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        await connect();
        const user = new User(body);
        await user.save();
        return NextResponse.json({ user: user, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const { userId, newUserName, email } = await request.json();
        await connect();

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        if (!newUserName && !email) {
            return NextResponse.json({ message: "At least one field (newUserName or email) is required for update" }, { status: 400 });
        }

        const updateFields: { username?: string; email?: string } = {};
        if (newUserName) updateFields.username = newUserName;
        if (email) updateFields.email = email;

        const updateUser = await User.findByIdAndUpdate(
            new ObjectId(userId),
            updateFields,
            { new: true }
        );

        if (!updateUser) {
            return NextResponse.json({ message: "User not found in database" }, { status: 404 });
        }

        return NextResponse.json({ user: updateUser, message: "User updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Error updating user" }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        if(!Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        await connect();
        await User.findByIdAndDelete(userId);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
    }
}