'use client'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zodSchema from '@/lib/zodSchema'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ButtonLoading from '@/components/Application/LoadingButton'
import { z } from 'zod'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import Link from 'next/link'
import { WEBSITE_LOGIN, WEBSITE_RESETPASSWORD } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import OTPVerification from '@/components/Application/OTPVerification'
import UpdatePasswordPage from '@/components/Application/UpdatePassword'



const ResetPassword = () => {
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false)
    const [otpVerificationLoading, setotpVerificationLoading] = useState(false)
    const [otpEmail, setOTPEmai] = useState(false)
    const [isOTPVerified, setIsOTPVerified] = useState(false)
    const formSchema = zodSchema.pick({
        email: true
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })
    const handleEmailVerification = async (values) => {
        try {
            setEmailVerificationLoading(true)
            console.log(values)
            const { data: sendOTPResponse } = await axios.post('/api/auth/reset-password/send-otp', values)
            if (!sendOTPResponse.success) {
                throw new Error(sendOTPResponse.message)
            }
            setOTPEmai(values.email)
            showToast('success', sendOTPResponse.message)
        } catch (error) {
            showToast('error', error.message)
        }
        finally {
            setEmailVerificationLoading(false)
        }
    }

    const handleOTPVerification = async (values) => {
        try {
            setotpVerificationLoading(true)
            console.log(values)
            const { data: otpResponse } = await axios.post('/api/auth/reset-password/verify-otp', values)
            if (!otpResponse.success) {
                throw new Error(otpResponse.message)
            }
            showToast('success', otpResponse.message)
            setIsOTPVerified(true)
        } catch (error) {
            showToast('error', error.message)
        }
        finally {
            setotpVerificationLoading(false)
        }
    }
    console.log("is otp veriied", isOTPVerified)
    console.log("is otp email", otpEmail)
    return (
        <Card className="w-[450px]">
            <CardContent>
                {
                    !otpEmail ?
                        <>
                            <div className='flex justify-center'>
                                <Image
                                    src={Logo.src}
                                    width={Logo.width}
                                    height={Logo.height}
                                    alt='Logo'
                                    className='max-w-[150px]'
                                />
                            </div>
                            <div className='text-center'>
                                <h1 className='text-3xl font-bold'>Reset Password</h1>
                                <p>Enter your email for password reset.</p>
                            </div>
                            <div className='mt-5'>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleEmailVerification)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type={"email"} placeholder="example@gmail.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='mb-3'>
                                            <ButtonLoading
                                                loading={emailVerificationLoading}
                                                type={"submit"}
                                                text="Send OTP"
                                                className={"w-full"}
                                            />
                                        </div>
                                        <div className='text-center'>
                                            <div className='flex justify-center items-center gap-1'>

                                                <Link
                                                    href={WEBSITE_LOGIN}
                                                    className='text-primary underline'
                                                >
                                                    Back to Login
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </>
                        :
                        <>
                            {!isOTPVerified ?
                                <OTPVerification
                                    email={otpEmail}
                                    loading={otpVerificationLoading}
                                    onSubmit={handleOTPVerification}
                                />
                                :
                                <UpdatePasswordPage email={otpEmail} />
                            }
                        </>

                }

            </CardContent>
        </Card>
    )
}

export default ResetPassword