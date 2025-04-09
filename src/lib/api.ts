
import { Feedback, FeedbackFormData } from "@/types/feedback";

// Use localStorage for persistent storage
const STORAGE_KEY = "feedback_submissions";

// Helper function to get all feedback items
const getAllFeedback = (): Feedback[] => {
  const storedFeedback = localStorage.getItem(STORAGE_KEY);
  return storedFeedback ? JSON.parse(storedFeedback) : [];
};

// Helper function to save all feedback
const saveFeedback = (feedback: Feedback[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
};

// Submit new feedback
export const submitFeedback = async (data: FeedbackFormData): Promise<Feedback> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const newFeedback: Feedback = {
    id: Date.now().toString(),
    ...data,
    timestamp: new Date().toISOString(),
  };
  
  const allFeedback = getAllFeedback();
  allFeedback.push(newFeedback);
  saveFeedback(allFeedback);
  
  return newFeedback;
};

// Get all feedback entries
export const getFeedback = async (): Promise<Feedback[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return getAllFeedback();
};
