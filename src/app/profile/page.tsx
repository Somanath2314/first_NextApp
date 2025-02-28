"use client";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";  
import Link from "next/link";

export default function profile() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("loading...");
    const router = useRouter();


    async function getDetails() {
        try {
            setLoading(true);
            const response = await axios.get("/api/users/me");
            console.log(response);
            setData(response.data.user.username);
            // router.push(`/profile/${response.data.user.username}`);
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
            <h2>{data==="loading..."? "loading..." : <Link href={`/profile/${data}`}>click here to visit {data}</Link>}</h2>
            <br /> 
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getDetails}>Get some Details</button>

        </div>
    );
}