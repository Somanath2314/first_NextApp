import dbConnect from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"; 
import bcryptjs from "bcryptjs";


dbConnect();


export async function POST(request: NextRequest) {
    console.log("came to register");
    
    try {
        console.log(request.json);
        const {username, email, password} = await request.json();

        //find whether the username already exists
        const user2 = await User.findOne({email});
        const user1 = await User.findOne({username});
        if(user2){
            return NextResponse.json({err: "Thid email already exists"}, {status: 400});
        }
        if(user1){
            return NextResponse.json({err: "This username already exists"}, {status: 400}); 
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(password, salt);

        const user = new User({
            username, email, password: hashPass
        });
        const savedUser = await user.save();
        console.log(savedUser);
        
        return NextResponse.json({success: "User created successfully", savedUser}, {status: 200})
        
    } catch (error: any) {
        return NextResponse.json({err: error.message}, {status: 500});
    }
}