'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zodSchema from '@/lib/zodSchema'
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
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import { useRouter } from 'next/navigation'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'


const UpdatePasswordPage = ({ email }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(true)
    const loginFormSchema = zodSchema.pick({
        email: true, password: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword']
    })
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: email,
            password: "",
            confirmPassword: ""
        },
    })
    const handlePasswordUpdate = async (values) => {
        try {
            setLoading(true)
            const { data: updatePasswordResponse } = await axios.put('/api/auth/reset-password/update-password', values)
            if (!updatePasswordResponse.success) {
                throw new Error(updatePasswordResponse.message)
            }
            form.reset()
            showToast('success', updatePasswordResponse.message)
            router.push(WEBSITE_LOGIN)
        } catch (error) {
            showToast('error', error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Update Password</h1>
                <p>Update your password by filling the form below.</p>
            </div>
            <div className='mt-5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePasswordUpdate)} className="space-y-8">
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
                                text="Update Password"
                                className={"w-full"}
                            />
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default UpdatePasswordPage