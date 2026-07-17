"use client" // this statement explicitly switches the component file and its dependencies from a server component to a client component , this tells the framework that this component needs to run code inside the browser

// PHASE : 1
// so when th user type your websites link on the browser it first requests your server and the server identifies your request route and looks at your page file and then it executes all server components on that page , it runs db queries and api fetches directly on the server 
// the nextjs generates two things simultaneously :
// a html file containing the structure, text and images 
//  A lightweight, specialized JSON-like text stream. This stream contains the fetched data and specific "placeholders" marking exactly where Client Components need to go.
// : The server sends the HTML and the RSC Payload down to the browser over the network

//  PHASE : 2
// the browser reads your html file and renders the layout on the screen which the user can see 
// At this exact millisecond, the website is frozen. If the user clicks an interactive button, nothing happens because the interactive JavaScript hasn't loaded yet
// While the user looks at the static page, the browser downloads the bundled JavaScript code only for the Client Components

// PHASE : 3
// The downloaded Client Component JavaScript boots up in the browser.
// React reads the RSC Payload data, matches the JavaScript code to the static HTML elements already sitting on the screen, and attaches the event listeners (like onClick).
// : The page becomes fully alive. The user can now click buttons, open menus, and interact seamlessly.

// HOW A CLIENT COMPONENT CODE IS BROKEN DOWN BY THE NEXTJS AND SHIPPED TO THE BROWSER
// Inside the return block: This is JSX/HTML. It defines the initial visual skeleton of the page.
// Outside/Above the return block: This is the core Client JS. It defines the live brain, state, and actions of the component.

import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation" // This is the correct import file according to the latest nextjs version. The useRouter hook allows you to programmatically change routes inside Client Components.
import { Axios } from "axios"

export default function LoginPage() {
    // here we are defining which values we will be working on in the useState and setting their initial default values, in this case we are defining a user object which will containn the following fields and these will be modified and utilised according to out requirements, intially we only need these three fields to signup a user on the signup page
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    // we need a method to talk to the database so it would be an async method and  
    const onSignup = async () => {
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />

            <div className="flex my-1">
                <label htmlFor="username" className="px-2">Username</label>
                <input 
                    className=" border border-white bg-white text-gray-950 rounded-sm px-2"
                    id="username"
                    type="text" 
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder=" username"
                />
            </div>

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
                onClick={onSignup} 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                Signup
            </button>
            <Link className=" hover:underline" href="/login">Visit Login Page</Link>

        </div>
    )
}