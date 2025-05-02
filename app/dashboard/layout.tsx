import {  ReactNode } from "react";
import { DashboardNavbar } from "../components/dashboard/DashboardNavbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Logo from "../assets/pngegg (3).png"


export default async function dashboardLayout({children} : {children : ReactNode}){

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user.email !== "farjanayeasminilham@gmail.com"){
        return redirect("/");
    }

    return( 
        <>
        <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b">
        
            <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-6 md:text-[15px] md:font-bold lg:text-[16px] lg:gap-8">
            <Image src={Logo} width="30" height="30" alt="Logo"/>
            <DashboardNavbar/>
            </nav>

            <Sheet>
                <SheetTrigger asChild >
                    <Button 
                    className="md:hidden shrink-0 "
                    variant= "outline"
                    size= "icon">
                        <MenuIcon className="h-5 w-5"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side= "left">
                    <nav className="flex flex-col gap-6 font-medium text-lg mt-3">
                    <Image src={Logo} width="33" height="33" alt="Logo" className="ml-6"/>
                        <DashboardNavbar/>
                    </nav>
                </SheetContent>
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="rounded-full" variant="secondary" size= "icon">
                        <CircleUser className="w-5 h-5"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild>
                        <LogoutLink> Logout </LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
        {children}
        </div>
        
        </>
    )
}