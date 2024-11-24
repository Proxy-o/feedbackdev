// components/review-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReview } from "../actions/review";
import { toast } from "sonner";

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
  const formErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Write a Review for {company.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <FormItem
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={String(rating)} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {rating} {rating === 1 ? "Star" : "Stars"}
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
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="current" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Current Employee
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
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
                    <Input placeholder="Enter your job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your review"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your review here..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pros</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like about working here?"
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
                      placeholder="What didn't you like about working here?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
            {formErrors && (
              <div className="mt-4 p-4 bg-red-200 border border-red-500 rounded-lg">
                <h3 className="text-red-700 font-semibold mb-2">Form Errors</h3>
                {Object.entries(form.formState.errors).map(([field, error]) => (
                  <p key={field} className="text-red-600 text-sm">
                    {error.message}
                  </p>
                ))}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
