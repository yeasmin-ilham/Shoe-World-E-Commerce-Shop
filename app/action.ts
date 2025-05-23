"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { bannerSchema, productSchema } from "./lib/zodSchema";
import { parseWithZod } from "@conform-to/zod"
import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { Cart } from "./lib/intefaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";


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

    await redis.set(`cart-${user.id}`, myCart);

    revalidatePath("/", "layout");
}

export async function CartDelete(formData:FormData){

        const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/")
    }
const productId = formData.get("productId");
const cart : Cart | null = await redis.get(`cart-${user.id}`);

if(cart && cart?.items){
    const updateCart : Cart = {
        userId: user.id,
        items: cart.items.filter((item) =>(item.id !== productId))
    };
    await redis.set(`cart-${user.id}` , updateCart);
}
revalidatePath("/bag");
}

export async function checkOut(){

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/")
    }
    const cart : Cart | null = await redis.get(`cart-${user.id}`);

    if(cart && cart.items){
     
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => (
            {
                price_data:{
                    currency:'usd',
                    unit_amount:item.price * 100,
                    product_data:{
                        name:item.name,
                        images:[item.imageString]
                    }
                },
                quantity:item.quantity
            }
        ))
        const session = await stripe.checkout.sessions.create({
            mode:'payment',
            line_items:lineItems,
            success_url:process.env.NODE_ENV === "development" ? "http://localhost:3000/payment/success" : "https://shoe-world-e-commerce-shop-nag4.vercel.app/payment/success",
            cancel_url:process.env.NODE_ENV === "development"? "http://localhost:3000/payment/cancel" : "https://shoe-world-e-commerce-shop-nag4.vercel.app/payment/cancel",
            metadata:{
                userId: user.id,
            }
        })

        return redirect(session.url as string);
    }
}