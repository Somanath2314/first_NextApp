import dbConnect from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"; 
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
    console.log("Came to login");
    
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ msg: "User is not registered" }, { status: 400 });
        }

        const valid = await bcryptjs.compare(password, user.password);
        if (!valid) {
            return NextResponse.json({ msg: "Invalid email or password" }, { status: 401 });
        }

        // Generate JWT token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({ msg: "User logged in successfully" }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ err: error.message || "Internal Server Error" }, { status: 500 });
    }
}
