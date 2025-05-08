"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { productSchema } from "./lib/zodSchema";
import { parseWithZod } from "@conform-to/zod"
import { prisma } from "./lib/prisma";

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
            isFeatured:submission.value.isFeatured,
        }
    });

    redirect("/dashboard/products")

}