import React from "react";
import Link from "next/link";
import { Building, Globe, MapPin, Plus, Star } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompanyDetailCardProps {
  company: {
    id: string;
    name: string;
    industry: string | null;
    website: string | null;
    logoUrl: string | null;
    city: string | null;
  };
  averageRating: number;
  reviewsCount: number;
}

export default function CompanyDetailCard({
  company,
  averageRating,
  reviewsCount,
}: CompanyDetailCardProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 rounded-md">
              <AvatarImage src={company.logoUrl || ""} alt={company.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                {company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
          </div>
          <div className="w-full lg:w-auto">
            <Link href={`/reviews/${company.id}`} className="w-full lg:w-auto">
              <Button className="flex items-center gap-2 w-full lg:w-auto">
                <Plus className="w-4 h-4" />
                Write a Review
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
          </div>
          <span className="text-muted-foreground">
            ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
