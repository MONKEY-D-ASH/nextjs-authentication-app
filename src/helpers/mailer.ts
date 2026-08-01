import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10) 
        // create a hashed token using the userId provided from the user document of the user that is accessing this method and whether the user is asking to verify the email or reset password the hashed string will be generated and will be updated inside the user document
        // we used the toString() method here because the userId might be in the BSON format

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, 
            {verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, 
            {forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // we are defining the details or the paramters of the options which will be passed to the sendMail method
        const mailOptions = {
            from: "aashishkumarrana17@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY"? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse


    } catch (error: any) {
        throw new Error(error.message)
    }
}