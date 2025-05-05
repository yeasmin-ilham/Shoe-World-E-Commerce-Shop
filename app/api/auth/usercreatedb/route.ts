import { prisma } from "@/app/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server";

export async function GET(){

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

    return NextResponse.redirect("http://localhost:3000/");
}