import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, ThumbsDown, Users } from "lucide-react";
import VoteReview from "../../companies/components/voteReview";
import { auth } from "@/auth";

export type Review = {
  id: string;
  rating: number;
  title: string;
  review: string;
  pros: string | null;
  cons: string | null;
  jobTitle: string;
  employmentStatus: string | null;
  isVerified: boolean | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
    id: string;
  };
  voteCount: number;
  userVote: number | null;
  upvotes: number;
  downvotes: number;
};
interface ReviewCardProps {
  review: Review;
}

export async function ReviewCard({ review }: ReviewCardProps) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return <div>Unauthorized</div>;
  }
  const isAuthor = review.user.id === session.user.id;

  return (
    <Card
      className={`mb-4 hover:scale-105 transition-transform duration-300 ${
        isAuthor ? "border-2 border-blue-500" : ""
      }`}
    >
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={review.user.image || undefined}
                alt={review.user.name || "User"}
              />
              <AvatarFallback>{review.user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {review.user.name || "Anonymous User"}
              </p>
              <p className="text-sm text-muted-foreground">{review.jobTitle}</p>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < review.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="font-semibold mb-2">{review.title}</h3>

        <p className="text-sm text-muted-foreground mb-4 flex-grow whitespace-pre-line">
          {review.review.length > 30
            ? `${review.review.slice(0, 30)}...`
            : review.review}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            {review.isVerified && (
              <Badge variant="secondary" className="text-xs">
                <Users className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {review.employmentStatus}
            </Badge>
            {!isAuthor && <VoteReview review={review} />}
          </div>

          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  Read More
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{review.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p className="break-words max-h-72 overflow-auto">
                    {review.review}
                  </p>
                  {review.pros && (
                    <div className="flex items-start space-x-2">
                      <ThumbsUp className="h-5 w-5 text-green-500 mt-1" />
                      <p>
                        <strong>Pros:</strong> {review.pros}
                      </p>
                    </div>
                  )}
                  {review.cons && (
                    <div className="flex items-start space-x-2">
                      <ThumbsDown className="h-5 w-5 text-red-500 mt-1" />
                      <p>
                        <strong>Cons:</strong> {review.cons}
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
