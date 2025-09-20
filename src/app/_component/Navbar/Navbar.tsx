"use client";

import { useContext } from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/providers/CartProvider";
import { WishlistContext } from "@/providers/WishlistProvider";

export function Navbar() {
  const { data, status } = useSession();
  const { cartItemsCount } = useContext(CartContext);
  const { wishlistItemsCount } = useContext(WishlistContext);

  console.log(data, "getting data inside navbar");

  const Navlist: { path: string; content: string; protected: boolean }[] = [
    { path: "/allorders", content: "orders", protected: true },
  ];
  const NavlistAuth: { path: string; content: string }[] = [
    { path: "/login", content: "login" },
    { path: "/register", content: "register" },
  ];

  function Logout() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <NavigationMenu
      className="p-2 sm:p-3 md:p-5 justify-between max-w-full shadow-2xl w-screen"
      viewport={false}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <Image
                src="/images/freshcart-logo.svg"
                alt="logo"
                width={150}
                height={150}
                className="w-16 h-auto sm:w-20 md:w-24 lg:w-32"
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {Navlist.map((item) => {
          return (
            <NavigationMenuItem key={item.path}>
              {item.protected && status == "authenticated" && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={item.path}
                    className="text-xs sm:text-sm md:text-base"
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              )}

              {!item.protected && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={item.path}
                    className="text-xs sm:text-sm md:text-base"
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
        {status == "authenticated" && (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="relative" href="/wishlist">
                  <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
                    wishlist
                  </span>
                  <i className="fa-solid fa-heart text-sm sm:text-base"></i>
                  <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItemsCount}
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="relative" href="/cart">
                  <span className="hidden sm:inline text-xs sm:text-sm md:text-base">
                    cart
                  </span>
                  <i className="fa-solid fa-cart-shopping text-sm sm:text-base"></i>
                  <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-main text-white text-xs rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
      <NavigationMenuList>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <i className="fa-brands fa-instagram text-xs sm:text-sm md:text-base"></i>
          <i className="fa-brands fa-facebook text-xs sm:text-sm md:text-base"></i>
          <i className="fa-brands fa-tiktok text-xs sm:text-sm md:text-base"></i>
          <i className="fa-brands fa-twitter text-xs sm:text-sm md:text-base"></i>
          <i className="fa-brands fa-linkedin text-xs sm:text-sm md:text-base"></i>
          <i className="fa-brands fa-youtube text-xs sm:text-sm md:text-base"></i>
        </div>

        {status == "authenticated" ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span className="bg-red-400 p-2 sm:p-2 md:p-7 text-xs sm:text-sm md:text-lg font-bold">
                  <span className="hidden sm:inline">hello </span>
                  {data?.user?.name}
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span
                  className="text-xs sm:text-sm md:text-lg font-bold cursor-pointer"
                  onClick={Logout}
                >
                  <span className="hidden sm:inline">logout</span>
                  <i className="text-red-600 fa-solid fa-arrow-right-from-bracket text-xs sm:text-sm md:text-base"></i>
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            {NavlistAuth.map((item) => {
              return (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href={item.path}
                      className="text-xs sm:text-sm md:text-base"
                    >
                      {item.content}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
