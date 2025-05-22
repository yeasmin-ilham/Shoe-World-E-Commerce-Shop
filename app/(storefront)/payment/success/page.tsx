import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function CanecRoute(){
    return(
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[500px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <Check className="w-16 h-16 rounded-full bg-green-500/30 text-green-500 p-2"/>
                    </div>

                    
                <div className="mt-4 text-center sm:mt-6 w-full">
                    <h3 className="text-2xl leading-6 font-medium">Payment Successfull</h3>
                    <p className="mt-4 text-sm text-muted-foreground">Congrats to your purchase. Your payment was successfull. 
                     We hope you enjoy your product.
                    </p>
                    <Button asChild className="w-full mt-5 sm:mt-6 mb-3">
                        <Link href="/">Back to Home Page</Link>
                    </Button>
                </div>
                </div>

            </Card>
        </section>
    )
}