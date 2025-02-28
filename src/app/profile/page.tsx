"use client";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";  
import Link from "next/link";

export default function profile() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("loading...");
    const [verfied, setVerfied] = useState(false);
    const router = useRouter();


    async function getDetails() {
        try {
            setLoading(true);
            const response = await axios.get("/api/users/me");
            console.log(response);
            setUsername(response.data.user.username);
            setVerfied(response.data.user.verfied);
            // router.push(`/profile/${response.username.user.username}`);
        } catch (error) {
            console.log(error);
            toast.error("Some error while fetching user details");
        }finally{
            setLoading(false);
        }
    }

    async function handleLogout(params:any) {
        try {
            setLoading(true);
            const response = await axios.get("/api/users/logout");
            console.log(response);
            toast.success("User logged out successfully");
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error("Some error while logging out  the user");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className=" h-screen p-4 text-center dark:text-white flex flex-col justify-center items-center">
            <h1>{loading? "Processing" : "Profile page"}</h1>
            {/* <hr /> */}
            <br />
            <h2>{username==="loading..."? "loading..." : <Link href={`/profile/${username}`}>click here to visit {username}</Link>}</h2>
            <br /> 
            <h2>{verfied? "verfied" : "not verfied yet"}</h2>
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getDetails}>Get some Details</button>

        </div>
    );
}