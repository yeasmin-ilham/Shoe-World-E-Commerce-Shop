import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(){
    const data =  await prisma.banner.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    return data;
}

export default async function bannerRoute(){
    const data = await getData();
    return(
        <>
        <div className="flex justify-end">
            <Button asChild className="flex items-center">
                
                <Link href={"/dashboard/banner/create"}>
                <PlusCircle/>
                <span>Add Banner</span>
                </Link>
            </Button>
        </div>

        <Card className="mt-7">
        <CardHeader>
            <CardTitle className="text-3xl font-bold">Banner</CardTitle>
            <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                
                <TableHeader>
                     <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
               
               <TableBody>
               {data.map((banner,index) =>(
                 <TableRow key={index}>
                    <TableCell>
                        <Image
                        src={banner.image}
                        height={100}
                        width={100}
                        alt="Image"
                        className="rounded-lg object-cover"/>
                    </TableCell>
                    <TableCell>{banner.title}</TableCell>
                    <TableCell className="text-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant= "ghost">
                                    <MoreHorizontal className="w-4 h-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild><Link href={`/dashboard/banner/${banner.id}`}>Delete</Link></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
               ))}
               </TableBody>
            </Table>
        </CardContent>
        </Card>
        </>
    )
}