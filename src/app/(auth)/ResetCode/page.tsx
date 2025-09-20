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
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function ResetCode() {

  const Route=useRouter()
  
  const schemaResetCode = z.object({
      
      resetCode: z.string().nonempty("reset Code required"),
    })
  const ResetCodeForm = useForm<z.infer<typeof schemaResetCode>>({
    defaultValues: {
      resetCode: "",
      

    },
    resolver: zodResolver(schemaResetCode),
  });

  async function handleResetCode(values: z.infer<typeof schemaResetCode>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
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
    if (data.status == "Success") {
    
      
      Route.push("/ResetPassword")
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }
  return (
    <div className="w-3/4 mx-auto ">
      <h1 className="text-3xl ">send email</h1>
      <Form {...ResetCodeForm}>
        <form
          className="space-y-5 "
          onSubmit={ResetCodeForm.handleSubmit(handleResetCode)}
        >


          <FormField
            control={ResetCodeForm.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email:</FormLabel>
                <FormControl>


                  <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>




                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />






          <Button className="w-full bg-main">verfiy code</Button>
        </form>
      </Form>
    </div>
  );
}
