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
import { CountContext } from "@/CountProvider";

export function Navbar() {
  const { data, status } = useSession();
  const { cartItemsCount } = useContext(CountContext);

  const Navlist: { path: string; content: string; protected: Boolean }[] = [
    { path: "/products", content: "products", protected: false },

    { path: "/brands", content: "brands", protected: false },
    { path: "/wishlist", content: "wishlist", protected: false },
    // {path:"/cart",content:"cart" ,protected:true},
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
      className="p-5 justify-between max-w-full shadow-2xl"
      viewport={false}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <Image
                src="/images/freshcart-logo.svg"
                alt="logo"
                width={100}
                height={100}
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
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              )}

              {!item.protected && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
        {status == "authenticated" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link className="relative" href="/cart">
                cart
                <span className="absolute -top-2 -right-2 w-5 h-5 ">
                  {" "}
                  {cartItemsCount}
                </span>
                <i className="fa-solid fa-cart-shopping absolute -top-1 right-4 text-main"></i>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
      <NavigationMenuList>
        {status == "authenticated" ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span className="bg-red-800 p-5">hello {data?.user.name}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span onClick={Logout}>
                  logout{" "}
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
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
                    <Link href={item.path}>{item.content}</Link>
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
