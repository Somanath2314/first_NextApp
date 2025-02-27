"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";

export default function Signup() {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    }); 
    const router = useRouter();
    const [bottonDisable, setButtonDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user.password.length > 0 && user.email.length>0 && user.username.length>0)
            setButtonDisable(false);
        else    
            setButtonDisable(true);
    }, [user])

    async function handleOnSubmit(e: any) {
        e.preventDefault();
        console.log("User Data:", user);
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response);
            toast.success("User registered successfully"); 
        } catch (error) {
            console.log(error);
            toast.error("Some error while registering the user");
        } finally{
            setLoading(false);
            setUser({
                email: "",
                username: "",
                password: "",
            });
            
        }
    }

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="flex flex-col gap-4 items-center justify-center p-6 border rounded-lg shadow-lg w-80 bg-white">
            <h1 className="text-2xl font-bold text-gray-800">
                {loading? "Processing.." : "Sign Up"}
            </h1>

            <label className="text-gray-700 font-medium" htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                className="border border-gray-400 p-2 rounded w-full text-black"
                value={user.email}
                placeholder="Enter your email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label className="text-gray-700 font-medium" htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                className="border border-gray-400 p-2 rounded w-full text-black"
                placeholder="Enter your username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            <label className="text-gray-700 font-medium" htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                className="border border-gray-400 p-2 rounded w-full text-black"
                placeholder="Enter your password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                className="bg-blue-600 text-white p-2 rounded mt-4 w-full hover:bg-blue-700"
                onClick={handleOnSubmit}
            >
                {bottonDisable ? "No sign up" : "sign up"}
            </button>
            <button
                className="text-blue-600 hover:underline"
                onClick={() => router.push("/login")}
            >
                View Login Page
            </button>
        </div>
        </div>
    );
}
