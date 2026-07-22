"use client"
import axios from "axios"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function UserProfile() {
    const router = useRouter()
    const [user, setUser] = useState("")
    const logout = async () => {
        try {
            const response = await axios.get("api/users/logout")
            console.log("Logout success", response.data);
            toast.success("User logout successful")
            router.push("/login") // after logout we would wanna push the user on the login page    
            
        } catch (error: any) {
            console.log("Logout failed", error.message);
            toast.error("Logout failed")
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get("/api/users/me")
        console.log(response.data);
        setUser(response.data.data._id) // because the information in the response itself is called reponse.data and the field that we require in the data field that we set
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <br />
            <p className="text-4xl">Profile page</p>
            <h2 className="p-2 rounded bg-green-500">{user === "" ? "nothing" : <Link href={`/profile/${user}`}>{user}</Link>}</h2>
            <br/>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={logout}
            >
                Logout
            </button>
            <br/>
            <button 
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md"
            onClick={getUserDetails}
            >
                Get User Details
            </button>

        </div>
    )
}