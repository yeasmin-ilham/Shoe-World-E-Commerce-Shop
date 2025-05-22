
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { DashboardFirstPart } from "../components/dashboard/Dashboard1";
import { DashboardSecondPart } from "../components/dashboard/Dashboard2";
import { Chart } from "../components/dashboard/Chart";
import { prisma } from "../lib/prisma";

async function getData (){

     const now = new Date();
     const sevendaysAgo = new Date();
        sevendaysAgo.setDate(now.getDate() -7)

    const data= await prisma.order.findMany({

        where:{
            createdAt:{
                gte:sevendaysAgo,
            }
        },

        select:{
            amount:true,
            createdAt:true,
        },

        orderBy:{
            createdAt:'asc'
        }
    })

    const result = data.map((item) =>({
        date: new Intl.DateTimeFormat('en-US').format(item.createdAt),
        revenue:item.amount / 100,
    }))
    
    return result;
}

export default async function dashboard(){
    const data = await getData();
    return( 
        <>
       <DashboardFirstPart/>

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10 ">

          <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                    Recent Transactions from your store
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Chart data={data}/>
            </CardContent>
            </Card>  
        <DashboardSecondPart/>

        </div>
        </>
    )
}


