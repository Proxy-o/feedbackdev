import { auth } from "@/auth";
import InfoPart from "@/components/info-part";
import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 z-50 ">
        {!session ? (
          <Card className="w-full max-w-md bg-secondary/30 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Choose your preferred login method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SignIn />
            </CardContent>
          </Card>
        ) : (
          <Link href="/companies">
            <Button className="w-full max-w-md">
              <span className="text-2xl ">Browse companies</span>
            </Button>
          </Link>
        )}
      </div>
      <InfoPart />
    </div>
  );
}
