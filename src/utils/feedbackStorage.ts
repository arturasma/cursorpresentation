import type { Feedback, FeedbackFormData } from '@/types/feedback';

const FEEDBACK_STORAGE_KEY = 'feedbacks';
const MOCK_INITIALIZED_KEY = 'feedbacks_mock_initialized';

const MOCK_FEEDBACKS: Omit<Feedback, 'id'>[] = [
  {
    summary: "Could PIN be shorter? 8 digits might be too long",
    comment: "Students are already stressed during exams. A 4-digit PIN might be easier to remember and type quickly without sacrificing too much security.",
    thumbsUpCount: 18,
    createdAt: new Date('2024-10-11T08:30:00').toISOString(),
  },
  {
    summary: "Add ability to print student PINs for distribution",
    comment: "Would be helpful if teachers could generate a printable sheet with all student PINs before the exam starts. Some students might not have access to view their PIN online.",
    thumbsUpCount: 15,
    createdAt: new Date('2024-10-10T09:15:00').toISOString(),
  },

  {
    summary: "Notification when student enters PIN but awaits verification",
    comment: "Teachers need an audio or visual alert when a student submits their PIN. Right now you have to keep refreshing the dashboard to see new verification requests.",
    thumbsUpCount: 21,
    createdAt: new Date('2024-10-11T10:05:00').toISOString(),
  },
  
  {
    summary: "Allow multiple teachers to co-manage the same exam",
    comment: "For large exams with multiple exam rooms, it would be useful to have 2-3 teachers able to verify students and manage the same exam session.",
    thumbsUpCount: 14,
    createdAt: new Date('2024-10-10T08:20:00').toISOString(),
  },
  

  {
    summary: "Improvement: Show student photo during teacher verification",
    comment: "When verifying student identity, display their ID card photo from the authentication system. This would speed up verification and reduce errors.",
    thumbsUpCount: 16,
    createdAt: new Date('2024-10-09T14:25:00').toISOString(),
  },
  {
    summary: "Request: SMS/Email reminder 24 hours before exam",
    comment: "Automatically send students a reminder with their exam details and a link to view their PIN 24 hours before the scheduled exam time.",
    thumbsUpCount: 22,
    createdAt: new Date('2024-10-08T12:10:00').toISOString(),
  },


  {
    summary: "Improvement: Color-code exams by status on calendar view",
    comment: "Add a calendar view where exams are color-coded by status (scheduled/active/completed). Makes it easier to visualize upcoming exam schedule.",
    thumbsUpCount: 13,
    createdAt: new Date('2024-10-10T13:45:00').toISOString(),
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

