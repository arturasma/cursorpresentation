export interface Feedback {
  id: string;
  summary: string;
  comment: string;
  thumbsUpCount: number;
  createdAt: string;
}

export interface FeedbackFormData {
  summary: string;
  comment: string;
}

