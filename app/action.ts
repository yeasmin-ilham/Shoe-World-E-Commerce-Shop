"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { productSchema } from "./lib/zodSchema";
import { parseWithZod } from "@conform-to/zod"

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


}