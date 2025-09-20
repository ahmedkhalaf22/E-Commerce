import { getServerSession } from "next-auth/next";
import React from "react";
import { NextOption } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const x = await getServerSession(NextOption);
  console.log(x);
  console.log("ahmedaaaaaaaaaaaaaaaaaa");

  return <div></div>;
}
