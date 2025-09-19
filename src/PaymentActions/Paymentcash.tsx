// import { GetUserToken } from "@/GetUserToken";
// import axios from "axios";

// export async function cashPaymentActions(id :string, values:object){
// const token:any = await GetUserToken()

// if(!token){
//         throw new Error("INVALID TOKEN")
//         }

//         const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,values,{
//             headers:{
//                 token:token as string
//             }
//         })

//         return data
// }

import { GetUserToken } from "@/GetUserToken";
import axios from "axios";

export async function cashPaymentActions(
  id: string,
  values: { shippingAddress: { details: string; phone: string; city: string } }
) {
  console.log(id, "id");
  const token: any = await GetUserToken();

  if (!token) {
    throw new Error("INVALID TOKEN");
  }

  try {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`, // نفس الـ endpoint اللي عندك
      values, // { shippingAddress: { details, phone, city } }
      {
        headers: {
          token: token as string,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Payment failed");
  }
}
