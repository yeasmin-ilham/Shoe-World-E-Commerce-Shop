
"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbarlinks = [
    {
        id: 0,
        name:"Home",
        link:"/",
    },
    {
        id:1,
        name:"All Products",
        link:"/products/all",
    },

    {
        id:2,
        name:"Men",
        link:"/products/men",
    } ,
    {
        id:3,
        name:"Women",
        link:"/products/women",
    },
    {
        id:4,
        name:"Kids",
        link:"/products/kids",
    },

];


export function NavbarLinks(){
    const pathname = usePathname()
    return(
        <>
            {Navbarlinks.map((res) =>(
                <Link href={res.link} key={res.id} className={cn(res.link === pathname? 
                "text-pink-600 bg-pink-500/10 px-2 md:rounded-full" : "text-muted-foreground transition hover:text-pink-500/85 hover:scale-105 ")}>
                    {res.name}
                    </Link>
            ))}
        </>
    )
}