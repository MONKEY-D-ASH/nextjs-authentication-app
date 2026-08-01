"use client"

// this page appears to the user after he clicks the link in the that is sent to him on the email for reseting the password and when the user clicks on the link he will be directed to this resetpassword page on which he will enter the new password and the new password will be hashed and will be stored in the user database and after all this action the user will be directed to the login page for login

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function verifyEmailPage(){
    const [token, setToken] = useState("");
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const router = useRouter()

    const resetUserPassword = async () => {
        try {
            // sending both token and password for processig in the resetpassword route 
        if (password.newPassword !== password.confirmPassword) {
            throw new Error("Both fields must be Identical");
        }
        const response = await axios.post("/api/users/resetpassword", {token, password})
        console.log(response.data);
        toast.success("password reset success");
        router.push("/login");
        } catch (error: any) {
            console.log("There is an error: ", error.message);
            toast(error.message)
            toast.error("Password Reset Failed");
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
        if (token.length > 0 && password.newPassword.length > 0 && password.confirmPassword.length > 0) {
            resetUserPassword();
        }
    }, [token])

    // we are also injecting a conditional element inside the return in which if the verified is true only then the following html will render on the screen
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl">Reset Password</h1>
                <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            <br />
                <div className="flex ">
                    <label className="my-1 mx-5">new password</label>
                    <input type="password"
                    placeholder="new password"
                    value={password.newPassword}
                    onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                    className="bg-white text-gray-900 rounded-sm p-0.5"
                    />
                </div>
            <br />
                <div className="flex ">
                    <label className="my-1 mx-2">confirm password</label>
                    <input type="password"
                    placeholder="confirm new password"
                    value={password.confirmPassword}
                    onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
                    className="bg-white text-gray-900 rounded-sm p-0.5"
                    />
                </div>
            <br />
                <button 
                className="bg-blue-500 p-2 rounded-sm hover:bg-blue-700"
                onClick={resetUserPassword}
                >
                    Reset Password
                </button>
        </div>
    )
}