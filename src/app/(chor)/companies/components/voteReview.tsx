"use client";
import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import React from "react";
import { Review } from "@/app/(chor)/reviews/components/reviewCard";
import { voteReview } from "@/app/(chor)/reviews/actions/review";

export default function VoteReview({ review }: { review: Review }) {
  const handleVote = async (vote: 1 | -1) => {
    if (review.userVote === vote) {
      return;
    }
    await voteReview(review.id, vote);
  };
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className={`p-2 ${review.userVote === 1 ? "bg-green-100" : ""}`}
        onClick={() => handleVote(1)}
      >
        <ChevronsUp
          className={`h-4 w-4 ${review.userVote === 1 ? "text-green-500" : ""}`}
        />
      </Button>
      <span className="text-sm font-medium">{review.upvotes}</span>
      <Button
        variant="ghost"
        size="sm"
        className={`p-2 ${review.userVote === -1 ? "bg-red-100" : ""}`}
        onClick={() => handleVote(-1)}
      >
        <ChevronsDown
          className={`h-4 w-4 ${review.userVote === -1 ? "text-red-500" : ""}`}
        />
      </Button>
      <span className="text-sm font-medium">{review.downvotes}</span>
    </div>
  );
}
