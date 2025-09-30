import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helper";
import zodSchema from "@/lib/zodSchema";
import UserModel from "@/models/User.model";

export async function PUT(request){
    try{
        await connectDB()
        const payload = await request.json()
        const validattionSchema = zodSchema.pick({
            email:true, password:true
        })
        const validatedData = validattionSchema.safeParse(payload)
        if(!validatedData){
            return response(false,401,'Invalid or missing input field', validatedData.success)
        }
        const {email,password} = validatedData.data
        console.log("updatepassword",email,password)
        const getUser= await UserModel.findOne({deletedAt:null, email}).select("+password")
        if(!getUser){
            return response(false,404,'User not found', validatedData.success)
        }
        getUser.password = password
        await getUser.save()
        return response(true, 200, 'Password update success.')
    }catch(error){
        catchError(error)
    }
}