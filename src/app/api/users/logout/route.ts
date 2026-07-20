// To logout the user you just have to simply clear out the access token which is stored inside the broswer cookie 

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
                message: "Logout successful",
                success: true,
            })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // we are expiring the token immediately but there is no need for this as we are setting the option as httpOnly as true
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}