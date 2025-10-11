import type { Feedback, FeedbackFormData } from '@/types/feedback';

const FEEDBACK_STORAGE_KEY = 'feedbacks';

export const feedbackStorage = {
  getAll(): Feedback[] {
    try {
      const feedbacks = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      const parsed: Feedback[] = feedbacks ? JSON.parse(feedbacks) : [];
      // Sort by thumbsUpCount descending (highest votes first)
      return parsed.sort((a, b) => b.thumbsUpCount - a.thumbsUpCount);
    } catch (error) {
      console.error('Error reading feedbacks from localStorage:', error);
      return [];
    }
  },

  create(formData: FeedbackFormData): Feedback {
    const feedbacks = this.getAll();
    const newFeedback: Feedback = {
      ...formData,
      id: crypto.randomUUID(),
      thumbsUpCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    feedbacks.push(newFeedback);
    this.save(feedbacks);
    return newFeedback;
  },

  addThumbsUp(id: string): Feedback | null {
    const feedbacks = this.getAll();
    const index = feedbacks.findIndex(feedback => feedback.id === id);
    
    if (index === -1) return null;
    
    feedbacks[index].thumbsUpCount += 1;
    this.save(feedbacks);
    
    // Return the updated and sorted list's version of this feedback
    const sortedFeedbacks = this.getAll();
    return sortedFeedbacks.find(f => f.id === id) || null;
  },

  save(feedbacks: Feedback[]): void {
    try {
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbacks));
    } catch (error) {
      console.error('Error saving feedbacks to localStorage:', error);
    }
  },

  clear(): void {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  }
};

