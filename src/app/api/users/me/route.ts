import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: error }, { status: 500 });
    }
}