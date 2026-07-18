"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation" // This is the correct import file according to the latest nextjs version. The useRouter hook allows you to programmatically change routes inside Client Components.
import { Axios } from "axios"

 // here we are defining which values we will be working on in the useState and setting their initial default values, in this case we are defining a user object which will containn the following fields and these will be modified and utilised according to out requirements, intially we only need these three fields to signup a user on the signup page
export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // we need a method to talk to the database so it would be an async method and  
    const onLogin = async () => {
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />

            <div className="flex my-1">
                <label htmlFor="email" className="px-6">Email</label>
                <input 
                    className=" border border-white bg-white text-gray-950 rounded-sm px-2"
                    id="email"
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder=" email"
                />
            </div>

            <div className="flex my-1">
                <label htmlFor="password" className="px-2">Password</label>
                <input 
                    className=" border border-white bg-white text-gray-950 rounded-sm px-2"
                    id="password"
                    type="password" 
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder=" password"
                />
            </div>
            <br />
            <button
                onClick={onLogin} 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Login
            </button>
            <Link className=" hover:underline" href="/">Visit Home page</Link>

        </div>
    )
}