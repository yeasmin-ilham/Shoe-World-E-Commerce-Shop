import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

export default function dashboard(){
    return( 
        <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 gap:8  lg:grid-cols-4  mt-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total Revenue</CardTitle>
                    <DollarSign className="w-4 h-4 text-green-500"/>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-bold"> $100.00</p>
                <p className="text-xs text-muted-foreground">Based on 100 charges</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total Sales</CardTitle>
                    <ShoppingBag className="w-4 h-4 text-blue-500"/>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">+50</p>
                    <p className="text-xs text-muted-foreground">Total Sales on Shoe world</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total Products</CardTitle>
                    <PartyPopper className="w-4 h-4 text-pink-500"/>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-bold"> 120</p>
                <p className="text-xs text-muted-foreground">Total Products created</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-3xl font-bold">Total User</CardTitle>
                    <User2 className="w-4 h-4 text-orange-500"/>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-bold"> 500</p>
                <p className="text-xs text-muted-foreground">Total users signed up</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10 ">

        <Card className="xl:col-span-2">
        <CardHeader>
            <CardTitle className="text-3xl font-bold">Transactions</CardTitle>
            <CardDescription>Recent transactions from your store</CardDescription>
        </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 ">
                
                <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9 font-bold">
                <AvatarFallback>HM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Farjana Yeasmin</p>
                <p className="text-sm text-muted-foreground">inilham@gmail.com</p>
            </div> 
            <p className="ml-auto font-medium">+$1,999.00</p>
                </div>

                <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9 font-bold ">
                <AvatarFallback>HM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Farjana Yeasmin</p>
                <p className="text-sm text-muted-foreground">inilham@gmail.com</p>
            </div> 
            <p className="ml-auto font-medium">+$1,999.00</p>
                </div>

                <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9 font-bold">
                <AvatarFallback>HM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Farjana Yeasmin</p>
                <p className="text-sm text-muted-foreground">ilham@gmail.com</p>
            </div> 
            <p className="ml-auto font-medium">+$1,999.00</p>
                </div>

                <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9 font-bold">
                <AvatarFallback>HM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Farjana Yeasmin</p>
                <p className="text-sm text-muted-foreground">ilham@gmail.com</p>
            </div> 
            <p className="ml-auto font-medium">+$1,999.00</p>
                </div>


            </CardContent>
        </Card>

        </div>
        </>
    )
}


