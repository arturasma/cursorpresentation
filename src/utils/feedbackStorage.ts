import type { Feedback, FeedbackFormData } from '@/types/feedback';

const FEEDBACK_STORAGE_KEY = 'feedbacks';
const MOCK_INITIALIZED_KEY = 'feedbacks_mock_initialized';

const MOCK_FEEDBACKS: Omit<Feedback, 'id'>[] = [
  {
    summary: "PIN system is much faster than ID card readers",
    comment: "As a teacher, I've seen students struggle with ID card readers that don't work properly. The PIN approach would eliminate those technical issues during stressful exam situations.",
    thumbsUpCount: 12,
    createdAt: new Date('2024-10-10T10:30:00').toISOString(),
  },
  {
    summary: "SMS PIN delivery is essential for students without ID cards",
    comment: "Some students forget their ID cards on exam day. Having the PIN sent via SMS as a backup would reduce stress and prevent students from missing exams.",
    thumbsUpCount: 8,
    createdAt: new Date('2024-10-10T11:15:00').toISOString(),
  },
  {
    summary: "Teacher verification step adds important security layer",
    comment: "The in-person teacher verification ensures that even with PIN authentication, identity is confirmed visually. This maintains the security standards required for high-stakes exams.",
    thumbsUpCount: 15,
    createdAt: new Date('2024-10-10T09:45:00').toISOString(),
  },
  {
    summary: "Room code prevents students from logging in from wrong location",
    comment: "The 4-digit room code is a simple but effective way to ensure students are physically present in the correct exam room. Great security feature!",
    thumbsUpCount: 6,
    createdAt: new Date('2024-10-10T14:20:00').toISOString(),
  },
  {
    summary: "Could PIN be shorter? 6 digits might be too long",
    comment: "Students are already stressed during exams. A 4-digit PIN might be easier to remember and type quickly without sacrificing too much security.",
    thumbsUpCount: 3,
    createdAt: new Date('2024-10-11T08:30:00').toISOString(),
  },
  {
    summary: "Dashboard view helps teachers track student verification status",
    comment: "The real-time student status panel is very helpful for teachers to see who has logged in and who still needs verification. Makes managing 30+ students much easier.",
    thumbsUpCount: 10,
    createdAt: new Date('2024-10-11T10:00:00').toISOString(),
  },
];

export const feedbackStorage = {
  initializeMockData(): void {
    // Only initialize once
    const isInitialized = localStorage.getItem(MOCK_INITIALIZED_KEY);
    if (isInitialized) return;

    const existingFeedbacks = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (existingFeedbacks) return; // Don't override if user has real data

    const feedbacksWithIds: Feedback[] = MOCK_FEEDBACKS.map(mock => ({
      ...mock,
      id: crypto.randomUUID(),
    }));

    this.save(feedbacksWithIds);
    localStorage.setItem(MOCK_INITIALIZED_KEY, 'true');
  },

  getAll(): Feedback[] {
    try {
      this.initializeMockData(); // Ensure mock data exists on first load
      
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
  },

  resetToMockData(): void {
    // Reset to original mock data (useful for demo/testing)
    localStorage.removeItem(MOCK_INITIALIZED_KEY);
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    this.initializeMockData();
  }
};

