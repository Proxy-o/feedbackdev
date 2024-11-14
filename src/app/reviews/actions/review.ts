"use server"

import db from "@/db"
import { companies, reviews } from "@/db/schema"
import { desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createReview(formData: FormData) {
  try {
    const companyId = formData.get("companyId") as string
    const userId = "cbbdacdf-5b03-4a8a-8cf8-5f43e770794b" // Replace with actual user ID from your auth system
    const rating = formData.get("rating") as string
    const title = formData.get("title") as string
    const review = formData.get("review") as string
    const pros = formData.get("pros") as string
    const cons = formData.get("cons") as string
    const jobTitle = formData.get("jobTitle") as string
    const employmentStatus = formData.get("employmentStatus") as "current" | "former"

    if (!companyId || !rating || !title || !review || !jobTitle) {
      return {
        error: "All required fields must be filled"
      }
    }

    await db.insert(reviews).values({
        companyId,
        userId,
        rating: parseInt(rating),
        title,
        review,
        pros,
        cons,
        jobTitle,
        employmentStatus,      
    })

    revalidatePath(`/companies/${companyId}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return {
      error: "Failed to create review"
    }
  }
}

export async function getCompanies() {
  try {
    return await db.select().from(companies).orderBy(desc(companies.name))
  } catch (error) {
    console.error(error)
    return []
  }
}