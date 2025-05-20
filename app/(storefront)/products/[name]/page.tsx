import { ImageCard } from "@/app/components/storefront/Image"
import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import men from "@/app/assets/men.jpg"
import women from "@/app/assets/women.jpg"
import kids from "@/app/assets/kids.jpg"
import Image from "next/image"
import all from "@/app/assets/all.png"

async function getData(productcategory: string){

    switch(productcategory){
        case "all":{
        const data = await prisma.product.findMany({
            select:{
                name:true,
                images:true,
                description:true,
                price:true,
                id:true,
            },
            where:{
                status:"published",
            }
        })

        return {
            title:"All Products",
            data:data,
            image:all,
        }
        } case "men":{
            const data = await prisma.product.findMany({
                where:{
                    status:"published",
                    category:"men",
                },
                select:{
                name:true,
                images:true,
                description:true,
                price:true,
                id:true,
                }
            })
            return{
                title:"Products for Men",
                data:data,
                image:men,
            } 
        } case "women":{
            const data = await prisma.product.findMany({

                where:{
                    status:"published",
                    category:"women",
                },

                select:{
                name:true,
                images:true,
                description:true,
                price:true,
                id:true,
                }
            });
            return{
                title:"Products for Women",
                data:data,
                image:women,
            }
        } case "kids":{
            const data = await prisma.product.findMany({

                where:{
                    status:"published",
                    category:"kids",
                },
                
                select:{
                name:true,
                images:true,
                description:true,
                price:true,
                id:true,
                }
            })

                return{
                title:"Products for Kids",
                image: kids,
                data:data,
            }
        } default:{
            return notFound();
        }
    }
}

export default async function CategoriesPage({params} : {params : {name: string}}){
        
        const {data , title , image} = await getData(params.name)
    return(
       <section>
        <h1 className="text-4xl font-bold font-mono text-primary flex justify-center"> {title}</h1>
       <div className="relative h-[250px] mt-3">
         <Image
        src={image}
        fill
        alt="Image" className="object-cover w-full h-full rounded-xl object-center"
        />
       </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {data.map((item) =>(
                <ImageCard alldata={item} key={item.id}/>
            ))}
        </div>
       </section>
    )
}