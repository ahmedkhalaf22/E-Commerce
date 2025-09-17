"use client"

import * as React from "react"
import Link from "next/link"


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"


export function Navbar() {

  const Navlist:{path:string,content:string}[]=[
    {path:"/products",content:"products"},
    {path:"/categories",content:"categories"},
    {path:"/brands",content:"brands"},
    {path:"/cart",content:"cart"},
    {path:"/wishlist",content:"wishlist"},
    {path:"/orders",content:"orders"},
  ]
  const NavlistAuth:{path:string,content:string}[]=[
    {path:"/login",content:"login"},
    {path:"/register",content:"register"},
  ]


  return (
    <NavigationMenu className="p-5 justify-between max-w-full shadow-2xl" viewport={false}>
      <NavigationMenuList>

        <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
            <Image src="/images/freshcart-logo.svg" alt="logo" width={100} height={100}/>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem> 

{Navlist.map((item)=>{
  return         <NavigationMenuItem  key={item.path}>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={item.path}>{item.content}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
})}


      </NavigationMenuList>
      <NavigationMenuList>

{NavlistAuth.map((item)=>{
  return         <NavigationMenuItem key={item.path}  >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={item.path}>{item.content}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
})}
        <NavigationMenuItem >
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <span>
              logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem> 

      </NavigationMenuList>
    </NavigationMenu>
  )
}


