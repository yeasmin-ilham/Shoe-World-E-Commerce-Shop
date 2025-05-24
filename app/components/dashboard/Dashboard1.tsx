import { prisma } from "@/app/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";


async function DashboardInf(){

const order = await prisma.order.findMany({
    select:{
        amount:true,
    }
})

const products = await prisma.product.findMany({
    select:{
        id:true,
    }
})

const users = await prisma.user.findMany({
    select:{
        id:true,
    }
})

return{
    order,
    products,
    users,
}
}

export async function DashboardFirstPart(){
    const {order , products, users} = await DashboardInf();

    const total = order.reduce((accumolator,currentvalue) =>{
       return accumolator + currentvalue.amount
    },0)
    return(
        <>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 gap:8  lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total Revenue</CardTitle>
                    <DollarSign className="w-4 h-4 text-green-500"/>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-bold">${new Intl.NumberFormat("en-US").format(total / 100)}</p>
                <p className="text-xs text-muted-foreground">Based on 100 charges</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total Sales</CardTitle>
                    <ShoppingBag className="w-4 h-4 text-blue-500"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">+{order.length}</p>
                    <p className="text-xs text-muted-foreground">Total Sales on Shoe world</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total Products</CardTitle>
                    <PartyPopper className="w-4 h-4 text-pink-500"/>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-xs text-muted-foreground">Total Products created</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total User</CardTitle>
                    <User2 className="w-4 h-4 text-orange-500"/>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-xs text-muted-foreground">Total users signed up</p>
                </CardContent>
            </Card>
        </div>
        </>
    )
}