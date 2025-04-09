
import { useEffect, useState } from "react";
import { Feedback } from "@/types/feedback";
import { getFeedback } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Mail, User, MessageSquare, Loader2 } from "lucide-react";

export function AdminView() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeedback = async () => {
      setIsLoading(true);
      try {
        const data = await getFeedback();
        setFeedbacks(data);
      } catch (error) {
        console.error("Failed to load feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedback();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-8 w-8 animate-spin text-feedback-purple" />
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-feedback-darkPurple">No Feedback Yet</h3>
        <p className="text-feedback-gray mt-2">When users submit feedback, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-feedback-darkPurple text-center mb-8">
        Submitted Feedback
      </h2>
      
      <ScrollArea className="max-h-[500px] pr-4">
        <div className="grid grid-cols-1 gap-6">
          {feedbacks.map((feedback) => (
            <Card 
              key={feedback.id} 
              className="feedback-card-shadow hover:border-feedback-purple transition-all duration-200"
            >
              <CardHeader className="pb-2">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-feedback-purple" />
                    <h3 className="font-medium text-feedback-darkGray">{feedback.fullName}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-feedback-gray">
                    <Mail className="h-4 w-4" />
                    <span>{feedback.email}</span>
                  </div>
                </div>
                <div className="text-xs text-feedback-gray mt-1">
                  {formatDistanceToNow(new Date(feedback.timestamp), { addSuffix: true })}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-start mt-2">
                  <MessageSquare className="h-4 w-4 text-feedback-purple mt-1 flex-shrink-0" />
                  <p className="text-feedback-darkGray">{feedback.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
