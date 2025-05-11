import { ProductEdit } from "@/app/components/ProductEdit";
import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"

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
    const data = await getData(params.id);
    return(
        <>
        <ProductEdit data={data}/>
        </>
    )
}