
export interface Feedback {
  id: string;
  fullName: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface FeedbackFormData {
  fullName: string;
  email: string;
  message: string;
}
