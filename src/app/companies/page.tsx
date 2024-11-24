import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CompanyForm } from "./components/company-form";
import { DialogTitle } from "@radix-ui/react-dialog";
import Companies from "./components/companies";
import { Plus } from "lucide-react";
import Search from "./components/search";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Companies</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add new Company</DialogTitle>
              <CompanyForm />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Search placeholder="Search companies" />
          <Suspense key={query + currentPage} fallback={<div> Loading...</div>}>
            <Companies query={query} currentPage={currentPage} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
