"use client"
import axios from "axios"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const router = useRouter()
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <br />
            <p className="text-4xl">Profile page</p>
            <br/>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}