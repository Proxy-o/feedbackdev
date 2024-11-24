import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanyListSkeleton() {
  return (
    <div className="my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-4 flex items-center">
              <Skeleton className="mr-4 rounded-sm h-12 w-12" />
              <div className="w-full">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-6 w-3/4" />
                </div>
                <div className="text-sm flex flex-col space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  );
}
