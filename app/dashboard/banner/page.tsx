import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";

export default function bannerRoute(){
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
                <TableRow>
                    <TableCell>
                        <User2/>
                    </TableCell>
                    <TableCell>new Banner</TableCell>
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
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
               </TableBody>
            </Table>
        </CardContent>
        </Card>
        </>
    )
}