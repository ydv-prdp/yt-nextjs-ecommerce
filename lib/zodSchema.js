import { z } from 'zod';

const emailSchema = z.email({ message: 'Invalid email address' });

const passwordSchema = z.string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(64, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' });

const nameSchema = z.string()
  .min(2, { message: 'Name must be at least 2 characters long' })
  .max(50, { message: 'Name must be at most 50 characters long' })
  .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' });

const otpSchema = z.string()
  .length(6, 'OTP must be 6 digits')
  .regex(/^\d{6}$/, 'OTP must contain only numbers');

const idSchema = z.string().min(3,'_id is required');
const altSchema = z.string().min(3,'Alt is required');
const titleSchema = z.string().min(3,'Title is required.'); 
const slugSchema = z.string().min(3,'Slug is required');
const categorySchema = z.string().min(3,'Category required')
const mrpSchema = z.union([
  z.number().positive('Expected positive value, received negative'),
  z.string().transform((val)=>Number(val)).refine((val)=>!isNaN(val) && val>=0, 'Please enter a positive number')
])
const descriptionSchema = z.string().min(3,'Description is required')
const sellingPriceSchema = z.union([
  z.number().positive('Expected positive value, received negative'),
  z.string().transform((val)=>Number(val)).refine((val)=>!isNaN(val) && val>=0, 'Please enter a positive number')
])
const discountPercentageSchema=z.union([
  z.number().positive('Expected positive value, received negative'),
  z.string().transform((val)=>Number(val)).refine((val)=>!isNaN(val) && val>=0, 'Please enter a positive number')
])
const mediasSchema = z.array(z.string())
const zodSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name:nameSchema,
  otp:otpSchema,
  _id:idSchema,
  alt:altSchema,
  title:titleSchema,
  slug:slugSchema,
  category:categorySchema,
  discountPercentage:discountPercentageSchema,
  sellingPrice:sellingPriceSchema,
  mrp:mrpSchema,
  description:descriptionSchema,
  media:mediasSchema
});

export default zodSchema;