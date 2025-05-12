"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseWithZod } from '@conform-to/zod';
import { UploadDropzone } from "@/app/utils/uploadthing";
import { SubmitButton } from "@/app/components/SubmitButton";
import { useFormState } from "react-dom";
import { CreateBanner } from "@/app/action";
import { useForm } from "@conform-to/react";
import { bannerSchema } from "@/app/lib/zodSchema";
import { useState } from "react";
import Image from "next/image";

export default function bannerCreate(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [lastResult , action] = useFormState(CreateBanner, undefined)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const  [form, fields] = useForm({

        lastResult,

        onValidate({formData}){
            return parseWithZod(formData , {schema:bannerSchema})
        },

    shouldValidate:"onBlur",
    shouldRevalidate:"onInput",

    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [image , setimage] = useState<string|undefined>(undefined)

    return(
        <>
        <form id= {form.id} onSubmit={form.onSubmit} action={action}>
        <Card className="mb-7">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Banner Details</CardTitle>
                <CardDescription>
                    Create your banner right here
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-3">
                     <Label>Title</Label>
                <Input type="text"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue} placeholder="Create title for Banner"/>
                <p className="text-red-500">{fields.title.errors}</p>
             </div>
            
            <div className="flex flex-col gap-3"> 
                <Label>Image</Label>
                <Input type="hidden" key={fields.image.key}
                name={fields.image.name}
                defaultValue={fields.image.initialValue}/>
                 
                 {image !== undefined ?
                 (
                  <div>

                            <Image 
                            src={image}
                            width={200}
                            height={200}
                            alt="image"
                            className="object-cover border w-[200px] h-[200px] rounded-lg"/>
                            
                  </div>
                 ) : (
                    <UploadDropzone endpoint="bannerUploader"
                    onClientUploadComplete={(pic) => setimage(pic[0].url) }
                className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90
                    ut-allowed-content:text-muted-foreground ut-label:text-primary border-primary"
                    onUploadError={() =>{
                        alert("something went wrong");
                    }}/>)}
                    <p className="text-red-500">{fields.image.errors}</p>
            </div>
              </div>
            </CardContent>
            <CardFooter>
                <SubmitButton text="Create Banner"/>
            </CardFooter>
        </Card>
        </form>
        </>
    )
}