import React from "react";
import { ReviewForm } from "../components/review-form";
import { getCompanyDetails } from "@/app/companies/actions/company";

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const companyId = (await params).companyId;

  const { company } = await getCompanyDetails(companyId);
  if (!company) {
    return <div>no company found with id {companyId}</div>;
  } else return <ReviewForm company={company} />;
}
