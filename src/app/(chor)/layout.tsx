import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import CurrentPath from "@/components/current-path";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if not logged in, show login page
  const session = await auth();

  if (!session) redirect("/");
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar user={session.user} />
      <main className=" w-full">
        <div className="flex w-full bg-secondary/70 border-b z-50 h-8 sticky top-0 backdrop-blur-sm">
          <SidebarTrigger />
          <CurrentPath />
        </div>
        <div className="p-1 flex justify-center mx-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
