import { CartDelete, checkOut } from "@/app/action";
import { CartButton, SubmitButton } from "@/app/components/SubmitButton";
import { Cart } from "@/app/lib/intefaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function BagRoute(){
    noStore();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/")
    }
    const cart : Cart | null = await redis.get(`cart-${user?.id}`);

    let totalPrice = 0;
    cart?.items.forEach((item) =>{
        totalPrice += item.price * item.quantity;
    })


    return(
        <div className="max-w-2xl mx-auto mt-10 min-h-[65vh]">
            {!cart || !cart.items? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg border-dashed p-8 text-center mt-20">
                <div className="flex items-center justify-center bg-primary/10 h-20 w-20 rounded-full">
                    <ShoppingBag className="w-10 h-10 text-primary"/>
                </div>
                <h2 className="mt-6 text-xl font-bold">You dont have any products in your Bag</h2>
                <p className="text-muted-foreground mb-8 mt-2 text-center text-sm leading-6 max-w-sm mx-auto">
                You currently dont have any products in your Shopping Bag.
                Please add some so that you can see them right here.
                </p>
                <Button asChild>
                    <Link href= "/">Shop Now !</Link>
                </Button>
            </div>
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
                   <div className="flex gap-x-2 font-medium">
                    <p>{data.quantity} X</p>
                   <p>${data.price}</p>
                   </div>
                   <form action={CartDelete} className="text-end">
                    <input type="hidden" name="productId" value={data.id}/>
                    <SubmitButton text="Delete"/>
                   </form>
                 </div>
                </div>
                ))}
                <div className="mt-10">
                    <div className="flex items-center justify-between font-bold">
                        <p>Subtotal:</p>
                        <p>${new Intl.NumberFormat('en-Us').format(totalPrice)}</p>
                    </div>
                    <form action={checkOut}>
                        <CartButton load="Please Wait" name="Checkout"/>
                    </form>
                </div>
            </div>
            )}
        </div>
    )
}