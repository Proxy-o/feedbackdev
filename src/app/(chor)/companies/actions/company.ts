"use server"

import db from "@/db"
import { companies,reviews } from "@/db/schema"
import { count, like } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm";


export async function createCompany(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const industry = formData.get("industry") as string
    const website = formData.get("website") as string
    const logoUrl = formData.get("logoUrl") as string
    const city = formData.get("city") as string

    if (!name) {
      return {
        error: "Company name is required"
      }
    }
    await db.insert(companies).values({
      name,
      industry,
      website,
      logoUrl,
      city,

    })
    revalidatePath("/company")
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
    totalPages: Math.ceil(totalCount[0].count / ITEMS_PER_PAGE),
    companies: companiesData,
  };
};


export async function getCompanyDetails(companyId: string) {
  const company = await db.query.companies.findFirst({
    where: eq(companies.id, companyId),
  });

  return { company };
}

export async function getCompanyDetailsWithUserVotes(companyId: string, userId: string | null) {
  const company = await db.query.companies.findFirst({
    where: eq(companies.id, companyId),
  });

  // First get reviews
  const companyReviews = await db.query.reviews.findMany({
    where: eq(reviews.companyId, companyId),
    with: {
      user: {
        columns: {
          name: true,
          image: true,
          id: true,
        },
      },
      // This will get all votes for each review through the relation you defined
      votes: true,
    },
    orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
  });

  // Transform the results to include vote counts and user's vote
  const transformedReviews = companyReviews.map(review => {
    // Calculate vote metrics from the votes relation
    const allVotes = review.votes || [];
    const voteCount = allVotes.reduce((sum, vote) => sum + vote.vote, 0);
    const upvotes = allVotes.filter(vote => vote.vote === 1).length;
    const downvotes = allVotes.filter(vote => vote.vote === -1).length;
    const userVote = userId 
      ? allVotes.find(vote => vote.userId === userId)?.vote ?? null
      : null;

    return {
      ...review,
      voteCount,
      upvotes,
      downvotes,
      userVote,
      votes: undefined, // Remove the raw votes array from the response
    };
  });

  return { company, reviews: transformedReviews };
}