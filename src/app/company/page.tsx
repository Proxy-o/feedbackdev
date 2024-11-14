"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useState, useEffect } from "react";
import { getCompanies } from "./actions/company";

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
      <div>
        <CardHeader>
          <CardTitle>Companies</CardTitle>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <a
                key={company.id}
                href={`/companies/${company.id}`}
                className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <h3 className="text-lg font-medium">{company.name}</h3>
                  <p className="text-gray-600">{company.industry ?? "-"}</p>
                  <p className="text-gray-600">
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {company.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
}
