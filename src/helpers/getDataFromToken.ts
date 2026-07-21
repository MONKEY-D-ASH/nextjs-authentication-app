import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";

export const getDataFromToken = (request : NextRequest) => {
    try {
        const encodedToken = request.cookies.get("token")?.value || "" // grabbing the token from the request and applying a ternary check on it if the value is presnt otherwise storing an empty string in it
        const decodedToken:any = Jwt.verify(encodedToken, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (error : any) {
        return NextResponse.json({error: error.message})
    }
}