'use client'
import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import verifiedImg from "@/public/assets/images/verified.gif"
import verificationFailedImg from "@/public/assets/images/verification-failed.gif"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { WEBSITE_HOME } from '@/routes/WebsiteRoute'

const EmailVerification = ({params}) => {
  const {token} = use(params)
  const [isVerified, setIsVerified] = useState(false)
  console.log("token",token)
  useEffect(()=>{
    const verify = async()=>{
      const {data: verificationResponse} = await axios.post('/api/auth/verify-email',{token})
      console.log("this is data",verificationResponse)
      if(verificationResponse.success){
        setIsVerified(true)
      }
    }
    verify()
  },[token])
  return (
    <Card className={'w-[400px]'}>
      <CardContent>
        {
          isVerified ? 
          <div>
            <div className='flex justify-center items-center'>
              <Image
                src={verifiedImg.src} 
                height={verifiedImg.height}
                width={verifiedImg.width}
                className='h-[100px] w-auto'
                alt='Verification successfull'
              />
            </div>
            <div className='text-center'>
              <h1 className='text-2xl font-bold my-5 text-green-500'>
              Email Verification Successfull!!!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>
                  Continue Shopping
                </Link>
              </Button>
            </div> 
          </div> 
          :
         <div>
            <div className='flex justify-center items-center'>
              <Image
                src={verificationFailedImg.src} 
                height={verificationFailedImg.height}
                width={verificationFailedImg.width}
                className='h-[100px] w-auto'
                alt='Verification Failed'
              />
            </div>
            <div className='text-center'>
              <h1 className='text-2xl font-bold my-5 text-red-500'>
              Email Verification Failed!!!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>
                  Continue Shopping
                </Link>
              </Button>
            </div> 
          </div> 
        }
      </CardContent>
    </Card>
  )
}

export default EmailVerification