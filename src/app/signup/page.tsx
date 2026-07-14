"use client" // this statement explicitly switches the component file and its dependencies from a server component to a client component , this tells the framework that this component needs to run code inside the browser
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation" // The useRouter hook allows you to programmatically change routes inside Client Components.
import { Axios } from "axios"

export default function LoginPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    return (
        <div>
            <h1>signup</h1>
        </div>
    )
}