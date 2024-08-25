import { NextResponse } from "next/server";
import { authMiddleware } from "./middleware/api/authMiddleware";
import { logMiddleware } from "./middleware/api/logMiddleware";


export const config = {
    matcher: ["/api/:path*"],
};

export default function middleware(request: Request) {
    if(request.url.includes("/api/blogs")) {
        const logResult = logMiddleware(request);
        console.log("logResult", logResult.response);
    }

    const authResults = authMiddleware(request);
    console.log("authResults.isValid", authResults?.isValid);

    if (!authResults?.isValid) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.next();
}