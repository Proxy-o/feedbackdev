import { Badge } from "@/components/ui/badge";
import { Building2, Globe, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function CompanyCard({
  company,
}: {
  company: {
    id: string;
    name: string;
    industry: string | null;
    website: string | null;
    logoUrl: string | null;
    city: string | null;
    isActive?: boolean;
  };
}) {
  return (
    <Card
      key={company.id}
      className="group hover:shadow-lg transition-all duration-300 hover:bg-accent/5"
    >
      <Link href={`/companies/${company.id}`} className="text-lg font-medium">
        <CardContent className="p-6">
          <div className="flex  sm:flex-row gap-4">
            <Avatar className="w-16 h-16 rounded-md shrink-0">
              <AvatarImage src={company.logoUrl || ""} alt={company.name} />
              <AvatarFallback className="rounded-md bg-primary/10 text-primary font-medium">
                {company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3 w-full min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold truncate">{company.name}</h3>
                {company.isActive && (
                  <Badge variant="secondary" className="shrink-0">
                    Active
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {company.industry && (
                  <div className="flex items-center gap-2 min-w-0">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span className="truncate">{company.industry}</span>
                  </div>
                )}

                {company.website && (
                  <div className="flex items-center gap-2 min-w-0">
                    <Globe className="h-4 w-4 shrink-0" />
                    <Link
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:underline hover:text-primary transition-colors"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </Link>
                  </div>
                )}

                {company.city && (
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="truncate">{company.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
