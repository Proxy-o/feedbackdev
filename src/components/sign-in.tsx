import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";

const providers = [
  {
    id: "github",
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    color: "bg-black hover:bg-gray-800",
  },

  {
    id: "42-school",
    name: "42",
    icon: <span className="font-bold">42</span>,
    color: "bg-blue-600 hover:bg-blue-700",
  },
];

export default function SignIn() {
  return (
    <div className="w-full max-w-md mx-auto">
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id);
            }}
            className="w-full"
          >
            <Button type="submit" className={`w-full  `} variant="outline">
              <span className="flex items-center gap-2">
                {provider.icon}
                Sign in with {provider.name}
              </span>
            </Button>
          </form>
        ))}
      </CardContent>
    </div>
  );
}
