import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navbar } from "./_component/Navbar/Navbar";
import Footer from "./_component/Footer/Footer";
import { Toaster } from "@/components/ui/sonner"
import UserProvider from "@/UserProvider";
import CartProvider from "@/providers/CartProvider";
import WishlistProvider from "@/providers/WishlistProvider";

const Encode_Sansfont = Encode_Sans({
 weight:["100","400","800"],
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce website",
  authors:[{name:"ahmed khalaf"}],
  keywords:["shop","shopping"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ Encode_Sansfont.className} `}
      >
<UserProvider>
<CartProvider>
<WishlistProvider>
<div className="flex flex-col min-h-screen">
              <Navbar/>
        <main className="p-5 flex-1 ">
          {children}
        </main>
        <Footer/>
</div>
        <Toaster/>
</WishlistProvider>
</CartProvider>
</UserProvider>

      </body>
    </html>
  );
}
