"use client"


import { DeleteProduct } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function deleteProduct({params} : {params : {id:string}}){
    return(
       <div className="h-[80vh] w-full flex items-center justify-center">
        <Card className="max-w-xl">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Are you absolutely sure?</CardTitle>
            </CardHeader>
            <CardDescription className="text-muted-foreground px-8">This action cannot be undone. This will permanently delete this product and
                remove all data from our server.
            </CardDescription>
            <CardFooter className="w-full flex justify-between mt-5">
                <Button variant="secondary" asChild><Link href={"/dashboard/products"}>Cancel</Link></Button>
                <form action={DeleteProduct}>
                    <input type="hidden" name="seletedId" value={params.id}/>
                    <SubmitButton variant="destructive" text="Delete Product" />
                </form>
            </CardFooter>
        </Card>
       </div>
    )
}