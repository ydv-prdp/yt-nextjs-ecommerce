import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helper";
import zodSchema from "@/lib/zodSchema";
import ProductVariantModel from "@/models/ProductVariant.model";




export async function PUT(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }
        await connectDB()
        const payload = await request.json()
        const schema = zodSchema.pick({
            _id: true,
            product: true,
            sku: true,
            color: true,
            size: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true
        })
        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields.', validate.error)
        }
        const { _id,
            product,
            sku,
            color,
            size,
            mrp,
            sellingPrice,
            discountPercentage,
            media } = validate.data

        const getProductVariant = await ProductVariantModel.findOne({ deletedAt: null, _id: _id })
        if (!getProductVariant) {
            return response(false, 404, 'Data not found.', validate.error)
        }
        getProductVariant.product = product
        getProductVariant.color = color
        getProductVariant.sku = sku
        getProductVariant.size = size
        getProductVariant.mrp = mrp
        getProductVariant.sellingPrice = sellingPrice
        getProductVariant.discountPercentage = discountPercentage
        getProductVariant.media = media
        await getProductVariant.save()
        return response(true, 200, 'Product variant updated successfully.')

    } catch (error) {
        return catchError(error)
    }
}