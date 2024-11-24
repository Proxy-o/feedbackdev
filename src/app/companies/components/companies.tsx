import { Card, CardContent } from "@/components/ui/card";
import { Building2, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCompanies } from "../actions/company";
import Pagination from "./paginations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Companies({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { companies, totalPages } = await getCompanies(currentPage, query);

  return (
    <div className="my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            className="hover:shadow-lg  hover:scale-105 transition-transform duration-300"
          >
            <Link
              href={`/companies/${company.id}`}
              className="text-lg font-medium "
            >
              <CardContent className="p-4 flex items-center">
                <Avatar className="mr-4 rounded-sm size-12">
                  <AvatarImage src={company.logoUrl || ""} alt={company.name} />
                  <AvatarFallback className=" rounded-sm">
                    {company.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    {company.name}
                  </div>
                  <div className=" text-sm flex space-x-4 ">
                    {company.industry && (
                      <div className="flex items-center text-muted-foreground">
                        <Building2 className="mr-2 h-4 w-4" />
                        {company.industry}
                      </div>
                    )}
                    {company.website && (
                      <div className="flex items-center text-muted-foreground ">
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
                      <div className="flex items-center text-muted-foreground ">
                        <MapPin className="mr-2 h-4 w-4" />
                        {company.city}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
