"use server"

import { auth } from "@/auth"
import db from "@/db"
import { companies, reviews, reviewVotes } from "@/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function createReview(formData: FormData) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        error: "Unauthorized"
      }
    }
    const userId = session.user.id
    const companyId = formData.get("companyId") as string
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



export async function voteReview(reviewId: string, vote: 1 | -1) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");

  }
  const userId = session.user.id;
  

  try {
    // Check if user has already voted
    const existingVote = await db.query.reviewVotes.findFirst({
      where: and(
        eq(reviewVotes.userId, userId),
        eq(reviewVotes.reviewId, reviewId)
      ),
    });

    if (existingVote) {
      // If same vote, delete it (toggle off)
      if (existingVote.vote === vote) {
        await db
          .delete(reviewVotes)
          .where(
            and(
              eq(reviewVotes.userId, userId),
              eq(reviewVotes.reviewId, reviewId)
            )
          );
      } else {
        // Update existing vote
        await db
          .update(reviewVotes)
          .set({ vote })
          .where(
            and(
              eq(reviewVotes.userId, userId),
              eq(reviewVotes.reviewId, reviewId)
            )
          );
      }
    } else {
      // Create new vote
      await db.insert(reviewVotes).values({
        userId,
        reviewId,
        vote,
      });
    }

    // Revalidate the company page to reflect the new vote
    revalidatePath('/company/[companyId]', 'page');
    
    return { success: true };
  } catch (error) {
    console.error("Error recording vote:", error);
    throw new Error("Failed to record vote");
  }
}