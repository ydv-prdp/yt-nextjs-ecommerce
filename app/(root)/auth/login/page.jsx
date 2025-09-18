'use client'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zodLoginSchema from '@/lib/zodSchema'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ButtonLoading from '@/components/Application/LoadingButton'
import {z} from 'zod'
import {FaRegEyeSlash} from 'react-icons/fa'
import {FaRegEye} from 'react-icons/fa'


const LoginPage = () => {
    const [loading,setLoading] = useState(false)
    const [isTypePassword,setIsTypePassword] = useState(true)
    const loginFormSchema = zodLoginSchema.pick({
        email: true
    }).extend({
        password:z.string().min('3',"Password field is required")
    })
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const handleLoginSubmit = async (values) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                                            onClick={()=>setIsTypePassword(!isTypePassword)}
                                        >
                                                {   isTypePassword ? 
                                                        <FaRegEyeSlash/>
                                                        :
                                                        <FaRegEye/>
                                                }
                                            </button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                               <ButtonLoading
                                    type={"submit"}
                                    text="Login"
                                    className={"w-full"}
                               /> 
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginPage