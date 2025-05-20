"use client"
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag} from "lucide-react";
import { useFormStatus } from "react-dom"

interface buttonProps{

 text:string;
 variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined

}

export function SubmitButton({text , variant} : buttonProps){
    const {pending} = useFormStatus();

    return(
        <>
        {pending? (
            <Button disabled variant={variant} >
                <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
                Please Wait
            </Button>
        ) : (
            <Button variant={variant} type="submit">
            {text}
            </Button>
        )}
        </>
    )
}

export function CartButton(){

    const {pending} = useFormStatus();
    return(
        <>
        {pending? (
  <Button disabled className="w-full mt-5" size="lg">
                    <Loader2 className="mr-4 h-5 w-5 animate-spin"/> Please Wait
                </Button>
        ) : (
  <Button className="w-full mt-5" size="lg" type="submit">
                    <ShoppingBag className="mr-4 h-5 w-5"/> Add to Cart
                </Button>
        )}
        </>
    )
}

