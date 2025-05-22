import { prisma } from "@/app/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(){
noStore();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user === null || !user.id){
        throw new Error("some went wrong...")
    }

    let userinDb = await prisma.user.findUnique({

        where:{
            id:user.id,
        }
    })

    if(!userinDb){
        userinDb = await prisma.user.create({
            
            data:{
                id:user.id,
                email:user.email??"",
                firstName:user.given_name??"",
                lastName:user.family_name??"",
                profile:user.picture??`https://avatar.vercel.sh/${user.given_name}`,
            }
        });
    }

    return NextResponse.redirect(process.env.NODE_ENV === "development" ? 
        "http://localhost:3000/" : "https://shoe-world-e-commerce-shop-nag4.vercel.app/"
    );
}