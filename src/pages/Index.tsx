
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeedbackForm } from "@/components/FeedbackForm";
import { AdminView } from "@/components/AdminView";
import { Button } from "@/components/ui/button";
import { ClipboardList, Send } from "lucide-react";

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-muted p-1 rounded-lg">
              <Button
                variant={showAdmin ? "ghost" : "default"}
                size="sm"
                onClick={() => setShowAdmin(false)}
                className={`flex items-center gap-1 ${!showAdmin ? 'bg-feedback-purple text-white' : ''}`}
              >
                <Send className="h-4 w-4" />
                <span>Submit Feedback</span>
              </Button>
              <Button
                variant={showAdmin ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowAdmin(true)}
                className={`flex items-center gap-1 ${showAdmin ? 'bg-feedback-purple text-white' : ''}`}
              >
                <ClipboardList className="h-4 w-4" />
                <span>View Feedback</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {showAdmin ? <AdminView /> : <FeedbackForm />}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
