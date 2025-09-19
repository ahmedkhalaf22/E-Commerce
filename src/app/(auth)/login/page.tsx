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
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GetUserToken } from "@/GetUserToken";
import { getcartdata } from "@/CardAction/CardAction";
import { CartData } from "@/interface/cart.interface";
import { CountContext } from "@/CountProvider";

export default function login() {
  const { setCartItemsCount } = useContext(CountContext);
  const Route = useRouter();

  const schemalogin = z.object({
    email: z.email("email invalid").nonempty("email required"),
    password: z
      .string()
      .nonempty("password required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 6 characters long"
      ),
  });
  const loginForm = useForm<z.infer<typeof schemalogin>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemalogin),
  });

  async function handlelogin(values: z.infer<typeof schemalogin>) {
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (data?.ok) {
      toast.success("login success", { position: "top-center" });
      const token: any = await GetUserToken();
      if (token) {
        const data: CartData = await getcartdata();
        let sum = data.data.products.reduce(
          (total, item) => (total += item.count),
          0
        );
        setCartItemsCount(sum);
      }
      Route.push("/");
    } else {
      toast.error(data?.error, { position: "top-center" });
    }

    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
    //   {
    //     method: "post",
    //     body: JSON.stringify(values),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // );
    // const data = await res.json();
    // console.log(data);
    // if (data.message == "success") {

    //   toast.success("login success", { position: "top-center" });
    //   Route.push("/")
    // } else {
    //   toast.error(data.message, { position: "top-center" });
    // }
  }
  return (
    <div className="w-3/4 mx-auto ">
      <h1 className="text-3xl">login now:</h1>
      <Form {...loginForm}>
        <form
          className="space-y-5 "
          onSubmit={loginForm.handleSubmit(handlelogin)}
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

          <Link href="/forgetpassword">forget password </Link>

          <Button className="w-full bg-main my-5">login</Button>
        </form>
      </Form>
    </div>
  );
}
