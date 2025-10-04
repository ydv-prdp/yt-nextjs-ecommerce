'use client'
import BreadCrumb from '@/components/Admin/BreadCrumb'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'

import { use, useEffect, useState } from "react"

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

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
  { href: '', label: 'Add Category' },

]
const AddCategory = () => {
  const [loading, setLoading] = useState(false)
  const addCategorySchema = zodSchema.pick({
    name: true, slug: true
  })
  const form = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
      slug: ""
    },
  })

  useEffect(() => {
    const name = form.getValues('name')
    if(name){
      form.setValue('slug',slugify(name).toLowerCase())
    }
  }, [form.watch('name')])


  const onSubmit = async(values) => {
    setLoading(true)
    try{  
      const {data:response} = await axios.post('/api/category/create',values)
      if(!response.success){
        throw new Error(response.message)
      }
      form.reset()
      showToast('success',response.message)
    }catch(error){
      showToast('error', error.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className={"py-0"}>
        <CardHeader className={"pt-2 px-3 border-b [.border-b]:pb-2"}>
          <h4 className="text-xl font-semibold">Add Category</h4>
        </CardHeader>
        <CardContent className={"pb-5"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type={"text"} placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input type={"text"} placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mb-3'>
                <ButtonLoading
                  loading={loading}
                  type={"submit"}
                  text="Add Category"
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

export default AddCategory