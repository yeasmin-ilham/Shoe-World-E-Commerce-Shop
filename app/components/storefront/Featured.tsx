import { prisma } from "@/app/lib/prisma"
import { ImageCard } from "./Image";


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
                createdAt:"desc",
            }
        })
        return alldata;
    }

export async function FeaturedProduct(){
    const productdata = await findallProduct();
    return(
        <>
       <div className="pb-24">
         <h2 className="text-3xl font-extrabold tracking-tight">Featured Items</h2>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
       {productdata.map((item) =>(
        <ImageCard alldata={item} key={item.id}/>
       ))}
        </div>
       </div>
        </>
    )
}