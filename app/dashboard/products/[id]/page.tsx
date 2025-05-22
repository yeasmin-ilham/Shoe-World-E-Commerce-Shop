import { ProductEdit } from "@/app/components/ProductEdit";
import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId:string){
    const data = await prisma.product.findUnique({
        where:{
            id:productId,
        }
    });

    if(!data){
    return notFound();
    }

    return data;
}


export default async function EditProduct({params} : {params : {id:string}}){
    noStore();
    const data = await getData(params.id);
    return(
        <>
        <ProductEdit data={data}/>
        </>
    )
}