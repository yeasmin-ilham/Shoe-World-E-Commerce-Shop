import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div>
      <Button>
        <LoginLink>Login</LoginLink>
        </Button>
      <Button>
        <RegisterLink> Signup</RegisterLink>
      </Button>
    </div>
  );
}
