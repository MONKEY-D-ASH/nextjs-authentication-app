import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// we are gonna configure all the http request methods for the signup page in this single file and the router will automatically route the request to the appropriate api

// In Next.js, writing your database connect() function directly inside a route file (such as an API route or Server Action) ensures that your backend establishes a database connection only when that specific endpoint is requested.
connect() 

// since we are talking to the database this is a async function and we are handling the post request that is why we are mentioning the POST method type here and in this function we are handling the request object, although we can handle both the request and the response object just like in the express js 
export async function POST(request: NextRequest){
    try {
        // we have to await for the request body to fully load inside the server as it takes time to load the body of the request and till then the function pauses its execution, after the body is loaded and system has parsed it into a clean javascipt object the function continues
        const reqBody = await request.json()
        const {username, email, password} = reqBody // extracting all the required details from the body
        console.log(reqBody);
        
        // check if the user already exists, if yes then sending back an error response 
        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        
        // hash password : since both takes time so both functions are await 
        const salt = await bcrypt.genSalt(10) // this generates a string of random data which is added to your password before it is hashed
        const hashedPassword = await bcrypt.hash(password, salt) // this hashes your password with the salt you generated  

        // creating the user document inside the mongoDB and saving it, during saving the validations we described in the schema will run and even if a single validation rules fails, the save operation stops and mongoose throws a validation error.
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser);

        // send verification email : what we are doing here is that we are using the email that we took from the body of this http request and them sending it to the sendEmail helper with the rest of the required arguments, this email will be sent to the user as soon as the user hits this signup route.
        await sendEmail({email, emailType: "VERIFY",userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, {status: 200})

    } catch (error : any) {
        // This methods converts the plain javascript data using json.stringify() into a completely formatted web compliant HTTP response object, and the NextResponse is used to send the response to the browser. It automatically attaches the HTTP header Content-Type: application/json
        return NextResponse.json({error: error},
            {status: 500})
    }
}