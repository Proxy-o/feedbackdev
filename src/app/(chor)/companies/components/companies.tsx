import React from "react";
import { getCompanies } from "../actions/company";
import Pagination from "./paginations";
import CompanyCard from "./company-card";
import Link from "next/link";

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
        {companies.length ? (
          companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <div className="text-muted-foreground text-center w-full">
            No companies found add a new company
            <Link
              href="/companies/new"
              className="text-primary hover:underline ml-2"
            >
              Here
            </Link>
          </div>
        )}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
