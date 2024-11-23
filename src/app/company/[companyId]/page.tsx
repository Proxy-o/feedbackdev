import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Building, MapPin, Globe, Plus } from "lucide-react";
import { getCompanyDetailsWithUserVotes } from "../actions/company";
import { ReviewCard } from "../components/reviewCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";

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
      <Card className="mb-8 ">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle className="text-3xl mb-2">{company.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                {company.industry && (
                  <Badge variant="secondary" className="flex items-center">
                    <Building className="mr-1 h-3 w-3" />
                    {company.industry}
                  </Badge>
                )}
                {company.city && (
                  <Badge variant="outline" className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {company.city}
                  </Badge>
                )}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Globe className="mr-1 h-3 w-3" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href={`/reviews/${company.id}`}>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-6 w-6 ${
                    index < Math.round(averageRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-semibold">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </CardContent>
      </Card>

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
