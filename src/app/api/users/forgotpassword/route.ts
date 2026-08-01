import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody;
        console.log(email);
        

        // check if the user exists or not 
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }

        // sending the email
        const response = await sendEmail(
            {email: email, emailType: "RESET", userId:user._id}
        )
        return NextResponse.json({message: "password email sent successfully", sucess: true})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 404})
    }
}