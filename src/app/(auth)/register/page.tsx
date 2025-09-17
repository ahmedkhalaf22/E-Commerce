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

export default function Register() {

  const Route=useRouter()
  
  const schemaregister = z
    .object({
      name: z
        .string()
        .nonempty("name required")
        .min(2, "min char 2")
        .max(15, "max char 15"),
      email: z.email("email invalid").nonempty("email required"),
      password: z
        .string()
        .nonempty("password required")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 6 characters long"
        ),
      rePassword: z.string().nonempty("rePassword required"),
      phone: z
        .string()
        .nonempty("phone required")
        .regex(/^01[0125][0-9]{8}$/, "enter valid number"),
    })
    .refine(
      (obj) => {
        return obj.password == obj.rePassword;
      },
      { path: ["rePassword"], error: "rePassword is not match" }
    );
  const RegisterForm = useForm<z.infer<typeof schemaregister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schemaregister),
  });

  async function handleRegister(values: z.infer<typeof schemaregister>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
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
    
      toast.success("account created", { position: "top-center" });
      Route.push("/login/")
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <div className="w-3/4 mx-auto ">
      <h1 className="text-3xl">register now:</h1>
      <Form {...RegisterForm}>
        <form
          className="space-y-5 "
          onSubmit={RegisterForm.handleSubmit(handleRegister)}
        >
          <FormField
            control={RegisterForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={RegisterForm.control}
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
            control={RegisterForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={RegisterForm.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>rePassword:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={RegisterForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>phone:</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full bg-main">Register</Button>
        </form>
      </Form>
    </div>
  );
}
