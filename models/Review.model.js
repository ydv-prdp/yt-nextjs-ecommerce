import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    deletedAt: {
        type: String,
        default: null,
        index: true
    },


}, { timestamps: true })

reviewSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const ReviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema, 'reviews')
export default ReviewModel