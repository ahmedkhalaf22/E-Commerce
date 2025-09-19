"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { checkoutPaymemts } from '@/orderAction/orderAction';
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function page() {
  const {cartid}:{cartid:string} = useParams()

  const shippingSchema = z.object({
  details: z.string().nonempty("details is required"),
  phone: z.string()
    .nonempty("phone is required")
        .regex(/^01[0125][0-9]{8}$/, "enter valid number"),
  city: z.string().nonempty("City is required").min(1)
})



  const shippingform=useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues:{
      
        details: "",
        phone: "",
        city: ""
    }
  })
 async  function handleCheckout(values:{details:string,phone:string,city:string}){
    const data = await checkoutPaymemts(cartid,values)
    window.location.href=data.session.url
   }
  return (
    <div className='w-3/4 mx-auto my-5'>
      <h1 className='text-2xl'>checkout payment</h1>
      <Form {...shippingform}>
  <form className='space-y-1' onSubmit={shippingform.handleSubmit(handleCheckout)}>
    <FormField
    control={shippingform.control}
    name="details"
    render={({field}) => (
      <FormItem>
        <FormLabel >details</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>

        <FormMessage />
      </FormItem>
    )}
  />
    <FormField
    control={shippingform.control}
    name="phone"
    render={({field}) => (
      <FormItem>
        <FormLabel >phone</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>

        <FormMessage />
      </FormItem>
    )}
  />
    <FormField
    control={shippingform.control}
    name="city"
    render={({field}) => (
      <FormItem>
        <FormLabel >city</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>

        <FormMessage />
      </FormItem>
    )}
  />
  <Button> pay now</Button>
  </form>
</Form>
    </div>
  )
}
 