// app/actions/company.ts
"use server"

import db from "@/db"
import { companies } from "@/db/schema"
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
    return {
      error: "Failed to create company"
    }
  }
}