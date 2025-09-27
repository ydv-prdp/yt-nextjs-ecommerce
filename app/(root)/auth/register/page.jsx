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
import Link from 'next/link'
import { WEBSITE_LOGIN, WEBSITE_REGISTER } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'


const RegisterPage = () => {
    const [loading,setLoading] = useState(false)
    const [isTypePassword,setIsTypePassword] = useState(true)
    const loginFormSchema = zodSchema.pick({
        name:true,email: true,password:true
    }).extend({
        confirmPassword:z.string()
    }).refine((data)=>data.password === data.confirmPassword,{
        message: 'Password do not match',
        path:['confirmPassword']
    })
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
            confirmPassword:""
        },
    })
    const handleRegisterSubmit = async (values) => {
        try{
            setLoading(true)
            console.log(values)
            const{data:registerResponse} = await axios.post('/api/auth/register',values)
            if(!registerResponse.success){
                throw new Error(registerResponse.message)
            }
            form.reset()
            showToast('success',registerResponse.message)
        }catch(error){
            showToast('error',error.message)
        }
        finally{
            setLoading(false)
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
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Create An Account</h1>
                    <p>Create new account by filling out the form below.</p>
                </div>
                <div className='mt-5'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input type={"text"} placeholder="Developer Singh" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                            <Input type={"password"}
                                                 placeholder="***********" 
                                                 {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className={"relative"}>
                                        <FormLabel>Confirm Password</FormLabel>
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
                            <div className='mb-3'>
                               <ButtonLoading
                                    type={"submit"}
                                    text="Register"
                                    className={"w-full"}
                               /> 
                            </div>
                            <div className='text-center'>
                                <div className='flex justify-center items-center gap-1'>
                                    <p>Already have an account?</p>
                                    <Link 
                                        href={WEBSITE_LOGIN}
                                        className='text-primary underline'
                                    >
                                        Login!
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}

export default RegisterPage