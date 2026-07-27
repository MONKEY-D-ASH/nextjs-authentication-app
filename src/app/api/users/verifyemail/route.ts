import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

// we want a functionality that when the user visits this route a email is sent to his email for the email verification, and when the user clicks on 

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        // since we already stored the token when we generted it during the mail generation, to verify that we just have to find the user document from the database using that stored token but with a conditional check for the time validation 
        const user = await User.findOne({verifyToken: token, 
            verifyTokenExpiry: {$gt: Date.now()} // since we stored this field in the memory with some added time for the user to complete the verification in, so we would want to find the user document if the stored time is still greater than the time that is going right now
        })
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        //  if we get the user details then we update the following fields and reset the verifyToken and verifyTokenExpiry fields to flush out the unnecessary data and saving the user document
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()
        
        return NextResponse.json({
            message: "Email verified",
            success: true
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}