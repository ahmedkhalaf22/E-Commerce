"use server";
// @ts-expect-error depricated
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GetUserToken() {
  const cookiesData = await cookies();
  const encrypttoken = cookiesData.get("next-auth.session-token")?.value;
  const data = await decode({
    token: encrypttoken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return data?.token as string;
}
