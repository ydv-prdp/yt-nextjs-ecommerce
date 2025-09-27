import zodSchema from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ButtonLoading from "./LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { showToast } from "@/lib/showToast"
import axios from "axios"

const OTPVerification = ({ email, onSubmit, loading }) => {
    const [isResendingOTP, setIsResendingOTP] = useState(false)
    const formSchema = zodSchema.pick({
        otp: true, email: true
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: email
        }
    })
    const handleOTPVerification = async (values) => {
        onSubmit(values)
    }
    const resendOTP = async()=>{
          try {
            setIsResendingOTP(true)
            const { data: resendOTPResponse } = await axios.post('/api/auth/resend-otp',{email})
            if (!resendOTPResponse.success) {
                throw new Error(resendOTPResponse.message)
            }
            showToast('success', resendOTPResponse.message)
        } catch (error) {
            showToast('error', error.message)
        }
        finally {
            setIsResendingOTP(false)
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOTPVerification)} className="space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">
                            Please complete verification
                        </h1>
                        <p className="text-md">We have sent a One Time Password(OTP) to your registered email address. The OTP is valid for 10 minutes only.</p>
                    </div>
                    <div className="mb-5 mt-5 flex justify-center">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={"font-semibold"}>One Time Password (OTP)</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        {...field}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot className="text-xl size-10" index={0} />
                                            <InputOTPSlot className="text-xl size-10" index={1} />
                                            <InputOTPSlot className="text-xl size-10" index={2} />
                                            <InputOTPSlot className="text-xl size-10" index={3} />
                                            <InputOTPSlot className="text-xl size-10" index={4} />
                                            <InputOTPSlot className="text-xl size-10" index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className='mb-3'>
                        <ButtonLoading
                            type={"submit"}
                            text="Verify"
                            className={"w-full"}
                            loading={loading}
                        />
                        {
                            !isResendingOTP ?
                            <div className="text-center mt-5">
                                <button onClick={resendOTP} type="button" className="text-blue-500 cursor-pointer hover:underline">
                                    Resend OTP
                                </button>
                            </div> 
                            :
                            <span className="text-md">Resending...</span>
                        
                        }
                        
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default OTPVerification