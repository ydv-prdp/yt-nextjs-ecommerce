'use client'
import BreadCrumb from '@/components/Admin/BreadCrumb'
import { ADMIN_COUPON_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanelRoute'
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import { showToast } from "@/lib/showToast"
import axios from "axios"
import slugify from 'slugify'
import useFetch from '@/hooks/useFetch'
import Select from '@/components/Select'
import ModalMedia from '@/components/Admin/ModalMedia'
import Image from 'next/image'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_COUPON_SHOW, label: 'Coupons' },
    { href: '', label: 'Add Coupon' },

]
const AddCoupon = () => {
    const [loading, setLoading] = useState(false)
    const addProductSchema = zodSchema.pick({
        code:true,
        minShoppingAmount:true,
        validity:true,
        discountPercentage: true,
    })
    const form = useForm({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            code:"",
            minShoppingAmount:"",
            validity:"",
            discountPercentage: "",
        },
    })
    const onSubmit = async (values) => {
        setLoading(true)
        try {
       
            const { data: response } = await axios.post('/api/coupon/create', values)
            if (!response.success) {
                throw new Error(response.message)
            }
            form.reset()
            showToast('success', response.message)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className={"py-0"}>
                <CardHeader className={"pt-2 px-3 border-b [.border-b]:pb-2"}>
                    <h4 className="text-xl font-semibold">Add Coupon</h4>
                </CardHeader>
                <CardContent className={"pb-5"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className="grid md:grid-cols-2 gap-5">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type={"text"} placeholder="Enter code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />                             
                                <FormField
                                    control={form.control}
                                    name="discountPercentage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type={"number"} placeholder="Enter discount percentage" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="minShoppingAmount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mininum Shopping Amount <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type={"number"} placeholder="Enter minimum shopping amount" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="validity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Validity <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type={"date"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='mb-3 mt-5'>
                                <ButtonLoading
                                    loading={loading}
                                    type={"submit"}
                                    text="Add Coupon"
                                    className={"cursor-pointer"}
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCoupon