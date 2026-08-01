'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // This is the correct import file according to the latest nextjs version. The useRouter hook allows you to programmatically change routes inside Client Components.
import axios from "axios"
import toast from "react-hot-toast"


export default function forgotpassword(){
    const [email, setEmail] = useState("")
    const router = useRouter();

    const changePassword = async () => {
        try {
            const response = await axios.post("/api/users/forgotpassword", {email});
            console.log("verification email sent", response.data);
            toast.success("email sent successfully")
            router.push("/resetpassword")        
        } catch (error: any) {
            console.log("There is an error while changing password", error);
            toast.error("change password failed")
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />

            <div className="flex my-1">
                <label htmlFor="email" className="px-6">Email</label>
                <input 
                    className=" border border-white bg-white text-gray-950 rounded-sm px-2"
                    id="email"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" email"
                />
            </div>

            <br />
            <button 
            className="hover:underline"
            onClick={changePassword}
            >
            send verification email
            </button>

        </div>
    )
}