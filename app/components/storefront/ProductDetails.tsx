
"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


interface ImageProps{

     images: string[];
}

export function ProductDetails({images} : ImageProps){

    const[mainImage , setimage] = useState(0)

    function handlePreviousClick(){
        setimage((prevIndex) => (
           prevIndex === 0 ? (images.length - 1) : (prevIndex - 1)
        ))
    }

    function handleNextClick(){
        setimage((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

function handleImageClick(index:number){
    setimage(index)
}

    return(
  <div className="grid gap-6 md:gap-3 items-start">
          <div className="relative overflow-hidden rounded-lg">
            <Image
            src={images[mainImage]}
            width={600}
            height={600}
            alt="product Image" className="object-cover w-[600px] h-[600px]"/>

            <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button variant="ghost" size="icon" onClick={handlePreviousClick}>
                <ChevronLeft className="w-6 h-6"/>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextClick}>
                <ChevronRight className="w-6 h-6"/>
            </Button>
        </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) =>(
            <div key={index} className= {cn(index === mainImage? "border-4 border-primary " : "relative overflow-hidden rounded-lg cursor-pointer  border-gray-200")} onClick={() => handleImageClick(index)}>
                <Image src={image}
                width={100}
                height={100}
                alt="Image" className="object-cover w-[100px] h-[100px]"/>
            </div>
        ))}
        </div>
  </div>

    )   
}