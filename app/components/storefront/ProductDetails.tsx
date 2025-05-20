
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

    const[mainImageindex , setmainImageindex] = useState(0)

// If you are on the first image (prevIndex === 0), go to the last image (images.length - 1).
// Otherwise, just go one image back (prevIndex - 1).
// Example:
// If you're on image 0 → it jumps to the last image.
// If you're on image 3 → it goes to image 2.
    function handlePreviousClick(){
        setmainImageindex((prevIndex) => (
           prevIndex === 0 ? (images.length - 1) : (prevIndex - 1)
        ))
    }

// If you’re on the last image, go to the first.
// Otherwise, go to the next image.
// Example:
// On image 2 → goes to 3.
// On last image → jumps back to 0.
    function handleNextClick(){
        setmainImageindex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

function handleImageClick(index:number){
    setmainImageindex(index)
}

    return(
  <div className="grid gap-6 md:gap-3 items-start">
          <div className="relative overflow-hidden rounded-lg">
            <Image
            src={images[mainImageindex]}
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
            <div key={index} className= {cn(index === mainImageindex? "border-4 border-primary rounded-lg" : "relative overflow-hidden rounded-lg cursor-pointer border-gray-200")} onClick={() => handleImageClick(index)}>
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