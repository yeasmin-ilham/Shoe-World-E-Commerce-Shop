import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function BagRoute(){

           const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/")
    }
    return(
        <div>
            <h1>hi</h1>
        </div>
    )
}