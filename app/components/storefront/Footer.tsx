import {  FacebookIcon, Instagram,  Mail, Twitter } from "lucide-react"
import Link from "next/link"


export function Footer(){
    return(
        <div className="mt-16  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-primary/10 pb-11 ">
            <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 ">

    <div className="grid sm:grid-cols-2 pt-3 px-10">

                 <div >
                <p className="text-xl font-bold font-serif">Shoe World</p>
                <p className="text-sm mt-1">Shoe World is the most popular and qualityful <br/> Shoe Brand in Bangladesh.You can buy your dream.</p>
                <p className="mt-4 text-sm  font-medium"> +8801353532 - info@shoeworld.com</p>
                <div className="flex mt-7 gap-2 text-primary ">
                    <p><Link href= "https://en.wikipedia.org/wiki/Facebook"><FacebookIcon className="hover:text-white hover:bg-primary hover:scale-110 hover:transition-all"/></Link></p>
                    <p><Link href= "https://en.wikipedia.org/wiki/Email"><Mail className="hover:text-white hover:bg-primary hover:scale-110 hover:transition-all"/></Link></p>
                    <p><Link href="https://en.wikipedia.org/wiki/Twitter"><Twitter className="hover:text-white hover:bg-primary hover:scale-110 hover:transition-all"/></Link></p>
                    <p><Link href="https://en.wikipedia.org/wiki/Instagram"><Instagram className="hover:text-white hover:bg-primary hover:scale-110 hover:transition-all"/></Link></p>
                </div>
             </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-3 sm:mt-0">

                <div>
                <p className="font-bold mb-2">Links</p>
                <div className="text-sm text-blue-500 underline space-y-1">
                       <p><Link href= "http://localhost:3000/">Home</Link></p>
               <p> <Link href= "http://localhost:3000/products/all">All Products</Link></p>
                <p><Link href= "http://localhost:3000/products/men">Men</Link></p>
                <p><Link href= "http://localhost:3000/products/women">Women</Link></p>
               <p> <Link href= "http://localhost:3000/products/kids">Kids</Link></p>
                </div>
                <p className="text-xs text-muted-foreground mt-5">Press this links to go your dream category page find your product</p>
             </div>

                 <div>
                <p className="font-bold mb-2">Information</p>
                <div className="text-sm space-y-1">
                    <p>About Us</p>
                <p>Privacy policy</p>
                <p>Refund Policy</p>
                <p>Shipping Policy</p>
                </div>
                <p className="text-xs text-muted-foreground mt-5">Press this links to go your dream</p>
             </div>

                 <div>
                <p className="font-bold mb-2">Shop</p>
                <div className="text-sm space-y-1">
                    <p>Store</p>
                <p>Discount</p>
                <p>New arrival</p>
                <p>Best deals</p>
                </div>
                <p className="text-xs text-muted-foreground mt-5">Press this links to go your dream</p>
             </div>
            </div>
             <p className="text-xs text-muted-foreground ">Shoe World is the most popular and qualityful <br/> Shoe Brand in Bangladesh.You can buy your dream.</p>

            </div>
            </div>
        </div>
    )
}