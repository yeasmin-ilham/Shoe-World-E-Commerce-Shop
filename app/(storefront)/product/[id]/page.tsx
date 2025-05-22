import { addItem } from "@/app/action";
import { FeaturedProduct } from "@/app/components/storefront/Featured";
import { ProductDetails } from "@/app/components/storefront/ProductDetails";
import { CartButton } from "@/app/components/SubmitButton";
import { prisma } from "@/app/lib/prisma";
import { StarIcon } from "lucide-react";

import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";


async function SpecificData(ProductId:string){
    const mydata = await prisma.product.findUnique({

        where:{
            id:ProductId,
        },

        select:{
            id:true,
            name:true,
            description:true,
            price:true,
            images:true,
        }
    })

    if(!mydata){
        return notFound();
    }

    return mydata;
}


export default async function ProductId({params} : {params : {id:string}}){
        noStore();
    const thisdata = await SpecificData(params.id);
    const addProducttoShoppingCart = addItem.bind(null, thisdata.id)
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
            <ProductDetails images={thisdata.images}/>

            <div>
                <h1 className="text-4xl font-extrabold tracking-tight">{thisdata.name}</h1>
                <p className="text-4xl mt-2 ">${thisdata.price}</p>
                <div className="mt-3 flex items-center gap-1">
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500"/>
                </div>
                <p className="text-base mt-6">{thisdata.description}</p>
            <form action={addProducttoShoppingCart}>
                <CartButton load="Please wait" name="Add to Cart"/>
            </form>
            </div>
        </div>
    
        <div className="mt-16">
            <FeaturedProduct/>
        </div>
        </>
    )
}