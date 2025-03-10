import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error) {
        throw new Error("Failed to get data from token");
    }
}