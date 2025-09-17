import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"ecommerce.routemisr.com",
        pathname:"/Route-Academy-products/**"

      }
    ]
  }
};
// https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg) on `next/image
export default nextConfig;
