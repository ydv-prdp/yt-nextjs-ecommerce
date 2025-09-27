import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helper";
import { sendMail } from "@/lib/sendMail";
import zodSchema from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import {z} from "zod"
export async function POST(request){
    try{
        await connectDB()
        const payload = await request.json()
        const validationSchema = zodSchema.pick({
            email:true
        }).extend({
            password:z.string()
        })

        const validatedData = validationSchema.safeParse(payload)
        if (!validatedData.success){
            return response(false, 401, 'Invalid or missing input field',validatedData.error)
        }

        const {email,password} = validatedData.data
        const getUser = await UserModel.findOne({deletedAt:null,email}).select("+password")
        if(!getUser){
            return response(false, 400, 'Invalid login credentials')
        }
        if(!getUser.isEmailVerified){
          const secret = textEncoder.encode(process.env.SECRET_KEY)
                  const id = getUser._id.toString()
                  const token = await new SignJWT({userId:id})
                      .setIssuedAt()
                      .setExpirationTime('1h')
                      .setProtectedHeader({alg: 'HS256'})
                      .sign(secret)
                  await sendMail('Email Verification request from Pradeep Yadav',email,emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))
                  return response(false,401, 'Your email is not verified. We have sent a verification link to your registered email address.')
        }
        const isPasswordVerified = await getUser.comparePassword(password)
        if(!isPasswordVerified){
            return response(false, 400, 'Invalid login credentials',validatedData.error)
        }
        await OTPModel.deleteMany({email})
        const otp = generateOTP()
        const newOtpData = new OTPModel({
            email,otp
        })
        await newOtpData.save()
        const otpEmailStatus = await sendMail('Your login verification code',email,otpEmail(otp))
        if(!otpEmailStatus.success){
            return response(false,400,'Failed to send OTP')
        }
        return response(true,200,'Please verify your device')
    }catch(error){
        return catchError(error)
    }
}