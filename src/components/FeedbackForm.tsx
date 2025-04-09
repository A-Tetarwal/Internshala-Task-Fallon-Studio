
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitFeedback } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { FeedbackFormData } from "@/types/feedback";

const feedbackSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters" })
    .max(500, { message: "Feedback must be less than 500 characters" }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FeedbackFormValues) {
    try {
      setIsSubmitting(true);
      // Explicitly cast the data to FeedbackFormData to ensure type compatibility
      const feedbackData: FeedbackFormData = {
        fullName: data.fullName,
        email: data.email,
        message: data.message,
      };
      
      await submitFeedback(feedbackData);
      
      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate you taking the time to share your thoughts.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-feedback-darkPurple">Share Your Feedback</h2>
        <p className="text-feedback-gray mt-2">
          We'd love to hear your thoughts and suggestions
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your thoughts with us..." 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-feedback-purple hover:bg-feedback-darkPurple"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
