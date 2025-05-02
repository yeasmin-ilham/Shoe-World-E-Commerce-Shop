import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function orders(){
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
                    <TableRow>
                        <TableCell>
                            <p className="font-medium">Farjana Yeasmin</p>
                            <p className="hidden md:flex text-sm text-muted-foreground">test@gmail.com</p>
                        </TableCell>
                        <TableCell className="font-medium">Sale</TableCell>
                        <TableCell className="font-medium">Successful</TableCell>
                        <TableCell className="font-medium">25-06-15</TableCell>
                        <TableCell className="text-right font-medium">$132.0</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
       </Card>
       </>
    )
}