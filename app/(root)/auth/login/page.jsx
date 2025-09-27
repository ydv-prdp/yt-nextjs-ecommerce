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
import { WEBSITE_REGISTER } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import OTPVerification from '@/components/Application/OTPVerification'


const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [otpVerificationLoading, setotpVerificationLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(true)
    const [otpEmail, setOtpEmail] = useState()
    const loginFormSchema = zodSchema.pick({
        email: true
    }).extend({
        password: z.string().min('3', "Password field is required")
    })
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const handleLoginSubmit = async (values) => {
        try {
            setLoading(true)
            console.log(values)
            const { data: loginResponse } = await axios.post('/api/auth/login', values)
            if (!loginResponse.success) {
                throw new Error(loginResponse.message)
            }
            setOtpEmail(values.email)
            form.reset()
            showToast('success', loginResponse.message)
        } catch (error) {
            showToast('error', error.message)
        }
        finally {
            setLoading(false)
        }

    }
    const handleOTPVerification = async(values)=>{
         try {
            setotpVerificationLoading(true)
            console.log(values)
            const { data: otpResponse } = await axios.post('/api/auth/verify-otp', values)
            if (!otpResponse.success) {
                throw new Error(otpResponse.message)
            }
            setOtpEmail('')
            showToast('success', otpResponse.message)
        } catch (error) {
            showToast('error', error.message)
        }
        finally {
            setotpVerificationLoading(false)
        }
    }
    return (
        <Card className="w-[450px]">
            <CardContent>
                <div className='flex justify-center'>
                    <Image
                        src={Logo.src}
                        width={Logo.width}
                        height={Logo.height}
                        alt='Logo'
                        className='max-w-[150px]'
                    />
                </div>
                {
                    !otpEmail ?
                        <>
                            <div className='text-center'>
                                <h1 className='text-3xl font-bold'>Login Into Account</h1>
                                <p>Login into your account by filling out the form below</p>
                            </div>
                            <div className='mt-5'>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-8">
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
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className={"relative"}>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type={isTypePassword ? "password" : "text"}
                                                            placeholder="***********"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <button
                                                        type='button'
                                                        className='cursor-pointer absolute top-1/2 right-3'
                                                        onClick={() => setIsTypePassword(!isTypePassword)}
                                                    >
                                                        {isTypePassword ?
                                                            <FaRegEyeSlash />
                                                            :
                                                            <FaRegEye />
                                                        }
                                                    </button>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className='mb-3'>
                                            <ButtonLoading
                                                type={"submit"}
                                                text="Login"
                                                className={"w-full"}
                                            />
                                        </div>
                                        <div className='text-center'>
                                            <div className='flex justify-center items-center gap-1'>
                                                <p>Dont have an account?</p>
                                                <Link
                                                    href={WEBSITE_REGISTER}
                                                    className='text-primary underline'
                                                >
                                                    Create account!
                                                </Link>
                                            </div>
                                            <div>
                                                <Link
                                                    href={""}
                                                    className='text-primary underline'
                                                >
                                                    Forgot password!
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </>
                        :
                        <OTPVerification 
                            email={otpEmail} 
                            loading={otpVerificationLoading} 
                            onSubmit={handleOTPVerification}
                        />
                }

            </CardContent>
        </Card>
    )
}

export default LoginPage