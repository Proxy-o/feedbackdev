import { getCompanyDetailsWithUserVotes } from "../actions/company";
import { ReviewCard } from "../../reviews/components/reviewCard";
import { auth } from "@/auth";
import CompanyDetailCard from "../components/Company-detail-card";

export default async function CompanyDetailsPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const companyId = (await params).companyId;
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return <div>Unauthorized</div>;
  }
  const userId = session.user.id;

  const { company, reviews } = await getCompanyDetailsWithUserVotes(
    companyId,
    userId
  );

  if (!company) return <div>Loading...</div>;

  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="container py-10">
      <CompanyDetailCard
        company={company}
        averageRating={averageRating}
        reviewsCount={reviews.length}
      />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
