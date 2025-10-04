import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helper";
import zodSchema from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";
import { _discriminatedUnion } from "zod/v4/core";

export async function PUT(request){
    try{
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized')
        }
        await connectDB()
        const payload = await request.json()
        const schema = zodSchema.pick({
            _id:true, name:true, slug:true
        })
        const validate = schema.safeParse(payload)
        if(!validate.success){
            return response(false,400,'Invalid or missing fields.',validate.error)
        }
        const {_id, name, slug} = validate.data

        const getCategory = await  CategoryModel.findOne({deletedAt:null, _id})
        if(!getCategory){
            return response(false, 404, 'Data not found.', validate.error)
        }
        getCategory.name= name
        getCategory.slug = slug
        await getCategory.save()
        return response(true, 200, 'Category updated successfully.')

    }catch(error){
        return catchError(error)
    }
}