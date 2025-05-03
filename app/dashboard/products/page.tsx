import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, UserIcon } from "lucide-react";
import Link from "next/link";

export default function products(){
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
                    <TableRow>
                        <TableCell><UserIcon className="w-16 h-16"/></TableCell>
                        <TableCell>Nike Air</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>$44</TableCell>
                        <TableCell>3/4/2024</TableCell>
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
                </TableBody>
            </Table>
        </CardContent>
        </Card>
        </>
    )
}