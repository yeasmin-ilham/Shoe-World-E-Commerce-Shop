import { prisma } from "@/app/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


async function getOrderData(){
    const data = await prisma.order.findMany({

        select:{
            id:true,
            amount:true,
            User:{
                select:{
                    firstName:true,
                    email:true,
                    profile:true,
                }
            }
        },

        orderBy:{
            createdAt:"desc",
        },
        take:7,
    })
    return data;
    
}

export async function DashboardSecondPart(){
    const data = await getOrderData();
    return(
        <>
                <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Recent Sales</CardTitle>
            </CardHeader>
            {data.map((item) =>(
                  <CardContent key={item.id} className="flex flex-col gap-8">
                
                <div className="flex items-center gap-4">
            <Avatar className="hidden sm:flex h-9 w-9 font-bold">
                <AvatarImage src={item.User?.profile}/>
                <AvatarFallback>{item.User?.firstName.slice(0,3)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{item.User?.firstName}</p>
                <p className="text-sm text-muted-foreground">{item.User?.email}</p>
            </div> 
            <p className="ml-auto font-medium">+${item.amount/100}</p>
                </div>
            </CardContent>
            ))}
        </Card>
        </>
    )
}