import Image from "next/image";
import Link from "next/link";
import Front from "@/app/assets/front.jpg"
import Boy from "@/app/assets/boy.jpg"
import Girl from "@/app/assets/girl.jpg"

export function HeroNext1(){
    return(
        <div className="py-24 sm:py-32">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif font-extrabold tracking-tight text">
                Shop By Category
            </h2>

            <Link href="/products/all" className="text-sm text-primary font-semibold hover:text-primary/80"> Browse all Products</Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">

         <div className="sm:row-span-2 group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1">
         <Image
         src={Front}
        alt="all Product Image"
        className="object-cover object-center"/>
        <div className="bg-gradient-to-b from-transparent to-black opacity-20"/>
        <div className="flex items-end p-6">
            <Link href="/products/all">
                <h3 className="text-white font-bold">All Products</h3>
                <p className="mt-1 text-sm text-white font-semibold">Shop Now</p>
            </Link>
        </div>
         </div>

       

      <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
         <Image
         src={Boy}
        alt="Men Product Image"
        className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"/>
        <div className="bg-gradient-to-b from-transparent to-black opacity-45 sm:absolute sm:inset-0"/>
        <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <Link href="/products/men">
                <h3 className="text-white font-bold">Products for Men</h3>
                <p className="mt-1 text-sm text-white font-semibold">Shop Now</p>
            </Link>
        </div>
         </div>


         <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
         <Image
         src={Girl}
        alt="women Product Image"
        className="object-cover object-center sm:absolute sm:inset-0 sm:w-full sm:h-full"/>
        <div className="bg-gradient-to-b from-transparent to-black opacity-30 sm:absolute sm:inset-0"/>
        <div className="flex items-end p-6 sm:absolute sm:inset-0">
            <Link href="/products/women">
                <h3 className="text-white font-bold">Products for Women</h3>
                <p className="mt-1 text-sm text-white font-semibold">Shop Now</p>
            </Link>
        </div>
         </div>

       </div>

        </div>
        
    )
}