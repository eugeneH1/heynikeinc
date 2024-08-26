import { NextResponse } from "next/server";

export const config = {
    matcher: [], // Empty matcher to disable middleware for all routes
};

export default function middleware(request: Request) {
    // Allow all requests to proceed without any interception
    return NextResponse.next();
}