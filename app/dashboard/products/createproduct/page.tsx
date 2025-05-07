"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { CreateProduct } from "@/app/action";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchema";

export default function createproduct(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [lastResult , action] = useFormState(CreateProduct, undefined);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form , fields] = useForm({

        lastResult,
        
        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",

        onValidate({formData}){
            return parseWithZod(formData, {schema:productSchema });
        },

    });
    return(
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <div className="flex flex-row items-center gap-4">
            <Button asChild size="icon" variant="outline">
                <Link href="/dashboard/products">
                <ChevronLeft className="w-4 h-4"/>
                </Link>
            </Button>
            <p className="text-xl font-semibold tracking-tight">New Product</p>
        </div>
        <Card className="mt-5 mb-10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Product Details</CardTitle>
                <CardDescription>In this form you can create your product</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 w-full">
                        <Label>Name</Label>
                        <Input type="text"
                        key={fields.name.key}
                        name={fields.name.name}
                        defaultValue={fields.name.initialValue}
                        placeholder="Product Name"/>
                        <p className="text-red-500">{fields.name.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3 w-full">
                        <Label>Description</Label>
                        <Textarea placeholder="Write your description here..."
                        key={fields.description.key}
                        name={fields.description.name}
                        defaultValue={fields.description.initialValue}/>
                        <p className="text-red-500">{fields.description.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3 w-full">
                        <Label>Price</Label>
                        <Input type="number" placeholder="$55"
                        key={fields.price.key}
                        name={fields.price.name}
                        defaultValue={fields.price.initialValue}/>
                        <p className="text-red-500">{fields.price.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3">
                        <Label>Featured Product</Label>
                        <Switch
                           key={fields.isFeatured.key}
                           name={fields.isFeatured.name}
                           defaultValue={fields.isFeatured.initialValue}/>
                            <p className="text-red-500">{fields.isFeatured.errors}</p>
                    </div>

                    <div className=" flex flex-col gap-3">
                        <Label>Status</Label>
                    <Select
                             key={fields.status.key}
                             name={fields.status.name}
                             defaultValue={fields.status.initialValue}
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

                    </div >
                    <Label>Images</Label>
                    <UploadDropzone endpoint="imageUploader" className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90
                        ut-allowed-content:text-muted-foreground
                    ut-label:text-muted-foreground border-primary"/>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
            <Button>Create Product</Button>
        </CardFooter>
        </Card>
        </form>
    )
}