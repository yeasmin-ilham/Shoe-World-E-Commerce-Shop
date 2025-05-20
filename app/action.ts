"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { bannerSchema, productSchema } from "./lib/zodSchema";
import { parseWithZod } from "@conform-to/zod"
import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { Cart } from "./lib/intefaces";
import { revalidatePath } from "next/cache";


export async function CreateProduct( prevState:unknown, formData:FormData){

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user.email !== "farjanayeasminilham@gmail.com"){
        return redirect("/")
    }

    const submission = parseWithZod(formData, {schema:productSchema});

    if(submission.status !== "success"){
        return submission.reply();
    }
    
    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    await prisma.product.create({
        data:{
            name:submission.value.name,
            description:submission.value.description, 
            price:submission.value.price,
            status:submission.value.status,
            images:flattenUrls,
            category: submission.value.category,
            isFeatured:submission.value.isFeatured === true ? true : false,
        }
    });

    redirect("/dashboard/products")

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct( prevState:any,  formData:FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user.email !== "farjanayeasminilham@gmail.com"){
        return redirect("/")
    }

    const submission = parseWithZod(formData , {schema:productSchema});

    if(submission.status !== "success"){
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) =>
        urlString.split(",").map((url) => url.trim())
    );

    const productId = formData.get("productId") as string

    await prisma.product.update({
        where:{
            id: productId,
        },

        data:{
            name:submission.value.name,
            description:submission.value.description, 
            price:submission.value.price,
            status:submission.value.status,
            images:flattenUrls,
            category: submission.value.category,
            isFeatured:submission.value.isFeatured === true ? true : false,
        }
    })

    redirect("/dashboard/products")
}


export async function DeleteProduct(formData:FormData){

     const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user.email !== "farjanayeasminilham@gmail.com"){
        return redirect("/")
    }
    
    await prisma.product.delete({
        where:{
            id:formData.get("seletedId") as string,
        }
    })
    return redirect("/dashboard/products")
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateBanner(prevState:any ,formData:FormData){

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user.email !== "farjanayeasminilham@gmail.com"){
        return redirect("/")
    }

    const submission = parseWithZod(formData , {schema:bannerSchema})

    if(submission.status !== "success"){
        return submission.reply();
    }

    await prisma.banner.create({
        data:{
              title:submission.value.title,
              image:submission.value.image,
        }
    })

    redirect("/dashboard/banner");
}

export async function DeleteBanner(formData:FormData){
    
        const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user.email !== "farjanayeasminilham@gmail.com"){
        return redirect("/")
    }

    await prisma.banner.delete({
        where:{
            id:formData.get("BannerId") as string,
        }
    })
    redirect("/dashboard/banner");
}


export async function addItem(productId : string){
        const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/")
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);
    
    const seletedProduct = await prisma.product.findUnique({
        where:{
            id: productId,
        },
        select:{
            id:true,
            name:true,
            price:true,
            images:true,
        }
    })

    if(!seletedProduct){
        throw new Error("id not found")
    } 

    let myCart = {} as Cart

    if(! cart || !cart.items){
        myCart = {
        userId:user.id,
        items:[
            {
                price:seletedProduct.price,
                id:seletedProduct.id,
                imageString:seletedProduct.images[0],
                name:seletedProduct.name,
                quantity:1,
            }
        ]
        }
    }else{
        let itemFound = false;

        myCart.items = cart.items.map((item) =>{
            if(item.id === productId) {
                itemFound = true;
                item.quantity += 1;
            }

            return item;
        })

        if(!itemFound){
            myCart.items.push({
                id:seletedProduct.id,
                imageString:seletedProduct.images[0],
                name:seletedProduct.name,
                price:seletedProduct.price,
                quantity:1,
            })
        }
    }

    await redis.set(`cart-$(user.id)`, myCart);

    revalidatePath("/", "layout");
}