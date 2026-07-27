"use client"

// In this page we would want to show the user the actions that takes place after he clicks the verify link in the email that is sent to him in from the server after signup, this page will take the token from the params for verification and then call the verifyEmail route and then receive a response form that route and based on that it will change the information on the page

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function verifyEmailPage(){
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            toast.success("email verified");    
        } catch (error: any) {
            setError(true)
            console.log("There is an error: ", error.message);
            toast.error("Email verification failed");
        }
    }

    // we are grabbing the url in the useEffect because we want the token from the url as soon as somebody loads this page or lands on this page 
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search) // the window.loaction.search is the built in browser property, it looks at the current address bar and grabs just the query part: "?name=alex&age=25". 
        // the new URLSearchParams() it strips away the ? and the & and organize the keys and values neatly     
        const urlToken = urlParams.get('token')
        setToken(urlToken || "") // for the initial case there will be no token in the params so it will be set to ""
    }, []);

    // initially the token is empty but as soon as we change the token in the above useEffect it this useEffect will run immediately verifying the user
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    // we are also injecting a conditional element inside the return in which if the verified is true only then the following html will render on the screen
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">
                        Email Verified</h2>
                    <Link href={"/login"} className="bg-blue-500">
                        Login
                    </Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500">Error</h2>
                </div>
            )}
            
        </div>
    )
}