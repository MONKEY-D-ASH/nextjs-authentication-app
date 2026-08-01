// this route will be used to actually fetch the user details form the database and then reset the password of the user document after the authentication of the user via the token that will be extracted from the params or the request body that appears after the user clicks on the link sent to him on the email

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token, password} = reqBody
        console.log(reqBody);

        // finding the user based on the extracted token from the forgot password email and also taking in account the time elapsed from the time of the token creation.
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }
        console.log(user);
        console.log("user fetched successfully");
        
        
        // if the user is token is valid we would want to encrypt the new password taken from the user and then update it in the database 
        const salt = await bcrypt.genSalt(10)
        console.log("about to hash password");
        const hashedPassword = await bcrypt.hash(password.newPassword, salt)
        console.log("new password hashed successfully");
        

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        const savedUser = await user.save()
        console.log(savedUser);
        console.log("user with new password save successfully");
        

        return NextResponse.json({
            message: "Password is successfully reset",
            success: true,
            savedUser
        }, {status:200})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}