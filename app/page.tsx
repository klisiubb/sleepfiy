import { Button } from "@/components/ui/button";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Page() {
  const { isAuthenticated } = await getKindeServerSession();
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-6xl mb-10 font-bold">Sleep tracker</h1>
      {(await isAuthenticated()) ? (
        <>
          <Button asChild size="lg">
            <LogoutLink>Log out</LogoutLink>
          </Button>
          <Button className="mt-4">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </>
      ) : (
        <Button asChild size="lg">
          <LoginLink>Login</LoginLink>
        </Button>
      )}
    </div>
  );
}
