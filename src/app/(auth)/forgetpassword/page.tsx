"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {

  const Route=useRouter()
  
  const schemaForgetPassword = z.object({
      
      email: z.email("email invalid").nonempty("email required"),
    })
  const ForgetPasswordForm = useForm<z.infer<typeof schemaForgetPassword>>({
    defaultValues: {
      email: "",
      

    },
    resolver: zodResolver(schemaForgetPassword),
  });

  async function handleForgetPassword(values: z.infer<typeof schemaForgetPassword>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.message == "success") {
    
      toast.success("login success", { position: "top-center" });
      Route.push("/")
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <div className="w-3/4 mx-auto ">
      <h1 className="text-3xl">send email</h1>
      <Form {...ForgetPasswordForm}>
        <form
          className="space-y-5 "
          onSubmit={ForgetPasswordForm.handleSubmit(handleForgetPassword)}
        >


          <FormField
            control={ForgetPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />






          <Button className="w-full bg-main">send email</Button>
        </form>
      </Form>
    </div>
  );
}
