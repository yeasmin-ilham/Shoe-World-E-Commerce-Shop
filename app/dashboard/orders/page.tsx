import { prisma } from "@/app/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";

async function getData(){
    const data = await prisma.order.findMany({

        select:{
            id:true,
            status:true,
            createdAt:true,
            amount:true,
            User:{
                select:{
                    firstName:true,
                    email:true,
                    profile:true,
                }
            }
        }
    })
    return data;
}


export default async function orders(){
    noStore();
    const orderdata = await getData();
    return(
       <>
       <Card>
        <CardHeader className="px-7">
            <CardTitle className="text-3xl font-bold"> Orders</CardTitle>
            <CardDescription> Recent Orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customers</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {orderdata.map((item) =>(
                      <TableRow key={item.id}>
                        <TableCell>
                            <p className="font-medium">{item.User?.firstName}</p>
                            <p className="hidden md:flex text-sm text-muted-foreground">{item.User?.email}</p>
                        </TableCell>
                        <TableCell className="font-medium">Order</TableCell>
                        <TableCell className="font-medium">{item.status}</TableCell>
                        <TableCell className="font-medium">{new Intl.DateTimeFormat("en-US").format(item.createdAt)}</TableCell>
                        <TableCell className="text-right font-medium">${new Intl.NumberFormat("en-US").format(item.amount/100)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
       </>
    )
}