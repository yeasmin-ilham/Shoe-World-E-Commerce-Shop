import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";

async function getData(){

    const data = await prisma.product.findMany({
        orderBy:{
            createdAt:"desc",
        }
    })
    return data;
}

export default async function products(){
        const data = await getData();
    return(
        <>
        <div  className="flex items-center justify-end">
            <Button asChild>
                <Link href= "/dashboard/products/createproduct">
                <PlusCircle className="h-4 w-4"/>
                <span>Add Product</span>
                </Link>
            </Button>
        </div>

        <Card className="mt-5">
        <CardHeader>
            <CardTitle className="text-3xl font-bold">Products</CardTitle>
            <CardDescription>Manage your products and view their sales performance</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {data.map((item) =>(
                       <TableRow key={item.id}>
                       <TableCell>
                        
                       </TableCell>
                       <TableCell>{item.name}</TableCell>
                       <TableCell>{item.status}</TableCell>
                       <TableCell>{item.price}</TableCell>
                       <TableCell>{new Intl.DateTimeFormat("en-US").format(item.createdAt)}</TableCell>
                       <TableCell className="text-right">
                       <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                               <Button size= "icon" variant= "ghost">
                                   <MoreHorizontal className="w-4 h-4"/>
                               </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent>
                               <DropdownMenuLabel>Action</DropdownMenuLabel>
                               <DropdownMenuSeparator/>
                               <DropdownMenuItem >Edit </DropdownMenuItem>
                               <DropdownMenuItem>Delete </DropdownMenuItem>
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