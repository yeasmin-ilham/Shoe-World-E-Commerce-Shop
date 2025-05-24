import Link from "next/link";
import { NavbarLinks } from "../storefront/NavbarLinks";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import {  MenuIcon, ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import Logo from "@/app/assets/pngegg (8).png"
import Image from "next/image";
import { ModeToggle } from "../modetoggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Cart } from "@/app/lib/intefaces";
import { redis } from "@/app/lib/redis";

export async function Navbar(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    const cart : Cart | null = await redis.get(`cart-${user?.id}`);
    
    const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0
    
    return(
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-7 lg:px-8 py-5 flex items-center justify-between">
       

          <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 sm:gap-3">
                      <Image
            src={Logo}
            width="30" height="30" alt="Logo"/>
                    <Link href={"/"}>
                <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">Shoe<span className="text-primary">World</span></h1>
                </Link>
                </div>

                <div className="hidden font-medium md:flex md:flex-row sticky md:items-center md:gap-5 md:text-[15px] md:font-bold lg:text-[16px] lg:gap-8">
                    <NavbarLinks/>
                </div>
          </div>
                
            
            <div className="flex gap-2 sm:gap-3 lg:gap-6 ">
                <ModeToggle/> 
            {user? (
                <>
               <div className="flex">
                 <Link href={"/bag"} className="group p-2 flex items-center mr-2">
                <ShoppingBagIcon className="w-4 h-4 sm:w-7 sm:h-7 text-gray-400 group-hover:text-gray-600 mt-0"/>
                <span className="ml-2 text-sm sm:text-lg lg:text-xl font-semibold">{total}</span>
                </Link>
                <UserDropdown name={user.given_name as string}
                email={user.email as string}
                profilePic={user.picture?? `https://avatar.vercel.sh/rauchg?rounded=60`}/>
               </div>
                </>
            ) : (
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end space-x-2 lg:space-x-3">
                <Button asChild className="bg-purple-200 text-black hover:bg-purple-300 font-semibold  lg:p-4"><LoginLink>Login</LoginLink></Button>
                <span className="h-6 w-px bg-gray-200"></span>
                <Button asChild className="bg-purple-200 text-black  hover:bg-purple-300 font-semibold  lg:p-4"><RegisterLink>Sign Up</RegisterLink></Button>
            </div>
            )}
             <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden shrink-0 w-3 h-3 mt-3 sm:w-8 sm:h-8 sm:mt-1"
                    variant= "outline"
                    size= "icon" >
                        <MenuIcon className=" h-3 w-3 sm:h-5 sm:w-5"/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                   
                        <nav className="flex flex-col gap-6 font-medium text-lg mt-7 ">
                            <NavbarLinks/>
                        </nav>

                        <div className=" mt-5 flex flex-col space-y-5">
                <Button asChild className="bg-purple-200 text-black hover:bg-purple-300 font-semibold  lg:p-4"><LoginLink>Login</LoginLink></Button>
                <Button asChild className="bg-purple-200 text-black  hover:bg-purple-300 font-semibold  lg:p-4"><RegisterLink>Sign Up</RegisterLink></Button>
            </div>
                    
                </SheetContent>
            </Sheet>
            </div>
        </nav>
    )
}