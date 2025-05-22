import { prisma } from "@/app/lib/prisma"
import { ImageCard } from "./Image";
import { unstable_noStore as noStore } from "next/cache";


    async function findallProduct(){
        const alldata = await prisma.product.findMany({
            
            where:{
                status:"published",
            },
            select:{
                id:true,
                name:true,
                description:true,
                price:true,
                images:true,
            },

            orderBy:{
                createdAt:"asc",
            },

            take:9,
        })
        return alldata;
    }

export async function FeaturedProduct(){
    noStore();
    const productdata = await findallProduct();
    return(
        <>
      
         <h2 className="text-3xl font-extrabold tracking-tight">Featured Items</h2>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
       {productdata.map((item) =>(
        <ImageCard alldata={item} key={item.id}/>
       ))}
        </div>
       
        </>
    )
}