"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [

    {    id: 1,
        name:"Dashboard",
        link : "/dashboard",

    },

    {    id:2,
        name: "Orders",
        link:"/dashboard/orders",
    },

    {     id:3,
        name:"Products",
        link:"/dashboard/products",
    },

    {     id:4,
        name:"Banner",
        link:"/dashboard/banner",
    }
];


export function DashboardNavbar(){
    const pathname = usePathname();
    return(
        <>
        {links.map((connect) =>(
            <Link key={connect.id} href={connect.link} className={cn(connect.link === pathname?
                "text-purple-600" : "text-muted-foreground"
            )}>
                {connect.name}
                </Link>
        ))}
        </>
    )
}