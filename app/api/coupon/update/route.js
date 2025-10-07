import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helper";
import zodSchema from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";



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
            code: true,
            minShoppingAmount: true,
            validity: true,
            discountPercentage: true,
        })
        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields.', validate.error)
        }
        const { _id,
            code,
            minShoppingAmount,
            validity,
            discountPercentage } = validate.data

        const getCoupon = await CouponModel.findOne({ deletedAt: null, _id: _id })
        if (!getCoupon) {
            return response(false, 404, 'Data not found.', validate.error)
        }
        console.log("this is backend", _id, code, minShoppingAmount, validity, discountPercentage)
        getCoupon.code = code
        getCoupon.minShoppingAmount = minShoppingAmount
        getCoupon.validity = validity
        getCoupon.discountPercentage = discountPercentage
        await getCoupon.save()
        return response(true, 200, 'Coupon updated successfully.')

    } catch (error) {
        return catchError(error)
    }
}