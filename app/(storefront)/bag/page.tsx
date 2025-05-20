import { Cart } from "@/app/lib/intefaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function BagRoute(){

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/")
    }
    const cart : Cart | null = await redis.get(`cart-${user?.id}`);


    return(
        <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
            {cart?.items.length === 0 ? (
            <h1>no cart item</h1>
            ) : (
            <div className="flex flex-col space-y-10">
                {cart?.items.map((data) =>(
                <div key={data.id} className="flex items-center gap-8">
                   <div className=" relative w-24 h-24 sm:w-32 sm:h-32 ">
                     <Image 
                    src={data.imageString}
                    fill
                    alt="image" className="rounded-md object-cover "/>
                   </div>
                 <div className="flex justify-between items-center w-full font-medium">
                      <p className="font-bold text-xl"> {data.name}</p>
                   <div className="flex gap-x-2 font-bold">
                    <p>{data.quantity} X</p>
                   <p>${data.price}</p>
                   </div>
                   <Button className="font-medium">Delete</Button>
                 </div>
                </div>
                ))}
            </div>
            )}
        </div>
    )
}