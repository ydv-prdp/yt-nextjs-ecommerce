import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helper";
import { sendMail } from "@/lib/sendMail";
import zodSchema from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request){
    try{
         await connectDB()
        const validationSchema = zodSchema.pick({
            name:true, email:true, password:true
        })
        const payload = await request.json()
        const validatedData = validationSchema.safeParse(payload)
        if(!validatedData.success){
            return response(false, 401, 'Invalid or missing input field', validatedData.error)
        }
        const {name, email, password} = validatedData.data
        
        const checkUser = await UserModel.exists({email})
        if (checkUser){
            return response(true, 409, 'User already registered')
        }
        console.log(name,email,password)
        const NewRegistration = new UserModel({
            name,email,password
        })
        console.log(NewRegistration)
        await NewRegistration.save()
        const textEncoder = new TextEncoder()
        const secret = textEncoder.encode(process.env.SECRET_KEY)
        const id = NewRegistration._id.toString()
        const token = await new SignJWT({userId:id})
            .setIssuedAt()
            .setExpirationTime('1h')
            .setProtectedHeader({alg: 'HS256'})
            .sign(secret)
        await sendMail('Email Verification request from Pradeep Yadav',email,emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

        return response(true, 200, 'Registration success, Please verify your email address')
    }catch(error){
        catchError(error)
    }
}