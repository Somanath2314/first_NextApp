import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ msg: "User logged out successfully" }, { status: 200 });
        //its good to mention the expires to 0 to remove the cookie
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
    } catch (error) {
        return NextResponse.json({ err: error }, { status: 500 });
    }
}