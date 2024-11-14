// app/actions/company.ts
"use server"

import db from "@/db"
import { companies } from "@/db/schema"
import { count, like } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createCompany(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const industry = formData.get("industry") as string
    const website = formData.get("website") as string

    if (!name) {
      return {
        error: "Company name is required"
      }
    }

    await db.insert(companies).values({
      name,
      industry,
      website,
    })

    revalidatePath("/companies")
    return { success: true }
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to create company"
    }
  }
}

const ITEMS_PER_PAGE = 10;

export const getCompanies = async (page: number, search: string) => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const [totalCount, companiesData] = await Promise.all([
    db
      .select({ count: count() })
      .from(companies)
      .where(like(companies.name, `%${search}%`)),
    db
      .select()
      .from(companies)
      .where(like(companies.name, `%${search}%`))
      .orderBy(companies.name)
      .limit(take)
      .offset(skip),
  ]);

  return {
    totalCount: totalCount[0].count,
    companies: companiesData,
  };
};