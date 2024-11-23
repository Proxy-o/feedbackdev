"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, Globe, MapPin, Plus } from "lucide-react";
import { getCompanies } from "./actions/company";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CompanyForm } from "./components/company-form";
import { DialogTitle } from "@radix-ui/react-dialog";

type Company = {
  id: string;
  name: string;
  industry: string | null;
  website: string | null;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  const fetchCompanies = useCallback(async () => {
    const { companies } = await getCompanies(1, search);
    setCompanies(companies);
  }, [search]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

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
          <div className="flex items-center space-x-2 mb-6">
            <Search className="text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card
                key={company.id}
                className="hover:shadow-lg  hover:scale-105 transition-transform duration-300"
              >
                <Link
                  href={`/company/${company.id}`}
                  className="text-lg font-medium "
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      {company.name}
                    </div>
                    <div className="space-y-2 text-sm">
                      {company.industry && (
                        <div className="flex items-center text-muted-foreground">
                          <Building2 className="mr-2 h-4 w-4" />
                          {company.industry}
                        </div>
                      )}
                      {company.website && (
                        <div className="flex items-center text-muted-foreground">
                          <Globe className="mr-2 h-4 w-4" />
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {company.website}
                          </a>
                        </div>
                      )}
                      {company.city && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {company.city}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
