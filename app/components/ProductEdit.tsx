/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@conform-to/react"
import { ChevronLeft, XIcon } from "lucide-react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { parseWithZod } from '@conform-to/zod';
import { productSchema } from "../lib/zodSchema"
import Image from "next/image";
import { useState } from "react"
import {  updateProduct } from "../action"
import { UploadDropzone } from "../utils/uploadthing"
import { category } from "../lib/category"
import { SubmitButton } from "./SubmitButton"
import { type $Enums } from "@prisma/client"

interface dataProp{
 
 data: {
    name: string;
    description: string;
    price: number;
    status: $Enums.productStatus;
    images: string[];
    category: $Enums.category;
    isFeatured: boolean;
    id: string;
    createdAt: Date;
}
}

export function ProductEdit( {data} : dataProp){

    const [pic , setpic] = useState<string[]>(data.images)
    
 const [lastResult , action] = useFormState(updateProduct, undefined);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form , fields] = useForm({

        lastResult,
        
        onValidate({formData}){
            return parseWithZod(formData, {schema:productSchema });
        },

        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",
    });

    const deleteImage = (index:number) =>{
        setpic(pic.filter(( _ , i) => i !== index))
    }

    return(
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <input type="hidden" name="productId" value={data.id}/>
        <div className="flex flex-row items-center gap-4">
            <Button asChild size="icon" variant="outline">
                <Link href="/dashboard/products">
                <ChevronLeft className="w-4 h-4"/>
                </Link>
            </Button>
            <p className="text-xl font-semibold tracking-tight">Edit Product</p>
        </div>
        <Card className="mt-5 mb-20">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Product Details</CardTitle>
                <CardDescription>In this form you can edit your product</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 w-full">
                        <Label>Name</Label>
                        <Input type="text"
                        key={fields.name.key}
                        name={fields.name.name}
                        defaultValue={data.name}
                        placeholder="Product Name"/>
                        <p className="text-red-500">{fields.name.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3 w-full">
                        <Label>Description</Label>
                        <Textarea placeholder="Write your description here..."
                        key={fields.description.key}
                        name={fields.description.name}
                        defaultValue={data.description}/>
                        <p className="text-red-500">{fields.description.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3 w-full">
                        <Label>Price</Label>
                        <Input type="number" placeholder="$55"
                        key={fields.price.key}
                        name={fields.price.name}
                        defaultValue={data.price}/>
                        <p className="text-red-500">{fields.price.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3">
                        <Label>Featured Product</Label>
                        <Switch
                           key={fields.isFeatured.key}
                           name={fields.isFeatured.name}
                           defaultChecked={data.isFeatured}/>
                            <p className="text-red-500">{fields.isFeatured.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3">
                        <Label>Status</Label>
                    <Select
                             key={fields.status.key}
                             name={fields.status.name}
                             defaultValue={data.status}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-red-500">{fields.status.errors}</p>
                    <div>

                    </div>

                    <div className="flex flex-col gap-3">
                        <Label>Category</Label>
                        <Select
                        key={fields.category.key}
                        name={fields.category.name}
                        defaultValue={data.category}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category"/>
                            </SelectTrigger>
                            <SelectContent>
                           {category.map((c) =>(
                            <SelectItem key={c.id} value={c.name}>
                                {c.title}
                            </SelectItem>
                           ))}
                            </SelectContent>
                        </Select>
                        <p className="text-red-500">{fields.category.errors}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                    <Label>Images</Label>
                    <input type="hidden" value={pic} key={fields.images.key} name={fields.images.name} defaultValue={data.images as any}/>
                {pic.length > 0 ?
                (
               <div className="flex gap-5">
                {pic.map((image , index) =>(
                    <div key={index} className="relative w-[100px] h-[100px]">
                        <Image
                        src={image}
                        width={100}
                        height={100}
                        alt="product Image"
                        className="w-full h-full object-cover rounded-lg border"/>
                        <button
                        onClick={() =>deleteImage(index)}
                        type="button"
                         className="absolute -top-3 -right-3 bg-red-600  text-white rounded-lg">
                            <XIcon/>
                        </button>
                    </div>
                ))}
               </div>
                ) : (
                    <UploadDropzone endpoint="imageUploader"
                    onClientUploadComplete={(image) => {
                        setpic(image.map((u) =>(u.url)))
                    }}
                    onUploadError={() =>{
                        alert("Upload failed please try again")
                    }}
                        className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90
                            ut-allowed-content:text-muted-foreground
                        ut-label:text-primary border-primary"/>
                )}
                <p className="text-red-500">{fields.images.errors}</p>
                    </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
            <SubmitButton text="Edit Product"/>
        </CardFooter>
        </Card>
        </form>
    )
}