
import { MessageSquare } from "lucide-react";

export function Header() {
  return (
    <header className="py-6">
      <div className="container">
        <div className="flex justify-center items-center">
          <MessageSquare className="h-6 w-6 text-feedback-purple mr-2" />
          <h1 className="text-2xl font-bold text-feedback-darkPurple">Feedback Collector</h1>
        </div>
      </div>
    </header>
  );
}
