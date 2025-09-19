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
import Link from "next/link";

export default function ResetPassword() {

  const Route=useRouter()
  
  const schemaResetPassword = z.object({
      
      email: z.email("email invalid").nonempty("email required"),
      newPassword: z
        .string()
        .nonempty("newPassword required")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 6 characters long"
        ),
    })
  const loginForm = useForm<z.infer<typeof schemaResetPassword>>({
    defaultValues: {
      email: "",
      newPassword: "",

    },
    resolver: zodResolver(schemaResetPassword),
  });

  async function handleResetPassword(values: z.infer<typeof schemaResetPassword>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "put",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.token) {
    
      
      Route.push("/login")
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <div className="w-3/4 mx-auto ">
      <h1 className="text-3xl">Reset now:</h1>
      <Form {...loginForm}>
        <form
          className="space-y-5 "
          onSubmit={loginForm.handleSubmit(handleResetPassword)}
        >


          <FormField
            control={loginForm.control}
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

          <FormField
            control={loginForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

 

          <Button className="w-full bg-main my-5">Reset Password</Button>
        </form>
      </Form>
    </div>
  );
}
