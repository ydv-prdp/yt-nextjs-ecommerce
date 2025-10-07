import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    discountPercentage: {
        type: Number,
        required: true,
        trim: true,
    },
    minShoppingAmount: {
        type: Number,
        required: true,
        trim: true,
    },
    validity: {
        type: Date,
        default: null,
        index: true,
    },
    deletedAt: {
        type: String,
        default: null,
        index: true
    },


}, { timestamps: true })

couponSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const CouponModel = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema, 'coupons')
export default CouponModel