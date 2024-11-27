"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "../actions/review";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  rating: z.string({
    required_error: "Please select a rating.",
  }),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  review: z.string().min(50, {
    message: "Review must be at least 50 characters.",
  }),
  pros: z.string().optional(),
  cons: z.string().optional(),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  employmentStatus: z.enum(["current", "former"], {
    required_error: "Please select your employment status.",
  }),
});

type Company = {
  id: string;
  name: string;
};

interface ReviewFormProps {
  company: Company;
}

export function ReviewForm({ company }: ReviewFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      review: "",
      pros: "",
      cons: "",
      jobTitle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("companyId", company.id);

    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const result = await createReview(formData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Review submitted successfully.");

      form.reset();
      router.push(`/companies/${company.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          Write a Review for {company.name}
        </CardTitle>
        <CardDescription>
          Share your experience to help others make informed decisions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Rating</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-1"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FormItem key={rating}>
                          <FormControl>
                            <RadioGroupItem
                              value={String(rating)}
                              className="sr-only peer"
                              id={`rating-${rating}`}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`rating-${rating}`}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:text-yellow-500 [&:has([data-state=checked])]:text-primary cursor-pointer"
                          >
                            <Star className="w-6 h-6 mb-1  peer-data-[state=checked]:text-primary [&:has([data-state=checked])]:text-primary" />
                            <span className="text-xs font-medium">
                              {rating}
                            </span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Employment Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="current" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Current Employee
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="former" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Former Employee
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Software Engineer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your current or most recent position at {company.name}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Summarize your experience" {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief headline for your review
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience working at this company..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about your role, work environment, company
                    culture, and overall experience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="pros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pros</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What did you like about working here?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cons</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What could be improved?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </Button>
      </CardFooter>
    </Card>
  );
}
