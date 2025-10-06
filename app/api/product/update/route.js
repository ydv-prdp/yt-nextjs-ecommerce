import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helper";
import zodSchema from "@/lib/zodSchema";

import ProductModel from "@/models/Product.model";


export async function PUT(request){
    try{
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized')
        }
        await connectDB()
        const payload = await request.json()
        const schema = zodSchema.pick({
            _id:true,
            name: true,
            slug: true,
            category: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            description: true,
            media:true
        })
        const validate = schema.safeParse(payload)
        if(!validate.success){
            return response(false,400,'Invalid or missing fields.',validate.error)
        }
        const {  _id, 
            name,
            slug,
            category,
            mrp,
            sellingPrice,
            discountPercentage,
            description,
            media} = validate.data

        const getProduct = await  ProductModel.findOne({deletedAt:null, _id:_id})
        if(!getProduct){
            return response(false, 404, 'Data not found.', validate.error)
        }
        getProduct.name= name
        getProduct.slug = slug
        getProduct.category = category
        getProduct.mrp = mrp
        getProduct.sellingPrice = sellingPrice
        getProduct.discountPercentage = discountPercentage
        getProduct.description = description
        getProduct.media = media
        await getProduct.save()
        return response(true, 200, 'Product updated successfully.')

    }catch(error){
        return catchError(error)
    }
}