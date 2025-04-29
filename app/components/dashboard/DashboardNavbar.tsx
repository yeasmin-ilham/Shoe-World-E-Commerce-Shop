import Link from "next/link";

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
    return(
        <>
        {links.map((connect) =>(
            <Link key={connect.id} href={connect.link}>{connect.name}</Link>
        ))}
        </>
    )
}