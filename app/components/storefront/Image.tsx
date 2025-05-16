import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface imageProps{
    alldata: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
}
}

export function ImageCard({alldata}:imageProps){
    return(
        <div className="rounded-lg ">
        <Carousel className="w-full mx-auto">
            <CarouselContent>
                {alldata.images.map((item , index) =>(
                    <CarouselItem key={index}>
                    <div className="relative h-[330px]">
                        <Image
                        src={item}
                        fill
                        alt="Image"
                        className="object-cover object-center w-full h-full rounded-lg  border-gray-300 border-2"/>
                    </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16"/>
            <CarouselNext className="mr-16"/>
        </Carousel>
        <div className="flex justify-between items-center mt-2">
            <h1 className="font-semibold text-xl">{alldata.name}</h1>
            <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary">${alldata.price}</h3>
        </div> 
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{alldata.description}</p>
        <Button asChild className="w-full mt-5">
            <Link href={`/product/${alldata.id}`}>Learn More</Link>
        </Button>
        </div>
    )
}