import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface Identity{
    name:string;
    email:string;
    profilePic:string;
}

export function UserDropdown({name,email,profilePic}: Identity){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className=" relative rounded-full">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={profilePic} alt="Image"/>
                        <AvatarFallback>{name.slice(0,3)}</AvatarFallback>/
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-muted-foreground text-sm leading-none">{email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild >
                    <LogoutLink>Logout</LogoutLink> 
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}