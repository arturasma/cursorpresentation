import type { Rating, RatingStats } from '@/types/rating';

const RATINGS_STORAGE_KEY = 'solution_ratings';
const USER_ID_KEY = 'user_id';
const MOCK_INITIALIZED_KEY = 'ratings_mock_initialized';

// Generate mock ratings with varied scores
const MOCK_RATINGS: Omit<Rating, 'userId'>[] = [
  { score: 4, createdAt: new Date('2024-10-08T10:30:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-08T11:15:00').toISOString() },
  { score: 4, createdAt: new Date('2024-10-09T09:20:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-09T14:45:00').toISOString() },
  { score: 4, createdAt: new Date('2024-10-09T16:10:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-10T08:30:00').toISOString() },
  { score: 2, createdAt: new Date('2024-10-10T10:50:00').toISOString() },
  { score: 4, createdAt: new Date('2024-10-10T13:25:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-10T15:40:00').toISOString() },
  { score: 4, createdAt: new Date('2024-10-11T09:15:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-11T11:30:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-11T13:45:00').toISOString() },
  { score: 4, createdAt: new Date('2024-10-11T15:20:00').toISOString() },
  { score: 2, createdAt: new Date('2024-10-12T10:10:00').toISOString() },
  { score: 3, createdAt: new Date('2024-10-12T14:35:00').toISOString() },
];

/**
 * Get or create a unique user ID for tracking individual ratings
 */
function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export const ratingStorage = {
  /**
   * Initialize mock data on first load
   */
  initializeMockData(): void {
    const isInitialized = localStorage.getItem(MOCK_INITIALIZED_KEY);
    if (isInitialized) return;

    const existingRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
    if (existingRatings) return; // Don't override if user has real data

    const ratingsWithIds: Rating[] = MOCK_RATINGS.map(mock => ({
      ...mock,
      userId: crypto.randomUUID(), // Different user IDs for mock data
    }));

    this.save(ratingsWithIds);
    localStorage.setItem(MOCK_INITIALIZED_KEY, 'true');
  },

  /**
   * Get all ratings from storage
   */
  getAll(): Rating[] {
    try {
      this.initializeMockData();
      
      const ratings = localStorage.getItem(RATINGS_STORAGE_KEY);
      return ratings ? JSON.parse(ratings) : [];
    } catch (error) {
      console.error('Error reading ratings from localStorage:', error);
      return [];
    }
  },

  /**
   * Get the current user's rating
   */
  getUserRating(): Rating | null {
    const userId = getUserId();
    const ratings = this.getAll();
    return ratings.find(r => r.userId === userId) || null;
  },

  /**
   * Set or update the current user's rating
   */
  setUserRating(score: number): Rating {
    if (score < 1 || score > 4) {
      throw new Error('Rating score must be between 1 and 4');
    }

    const userId = getUserId();
    const ratings = this.getAll();
    const existingIndex = ratings.findIndex(r => r.userId === userId);

    const newRating: Rating = {
      userId,
      score,
      createdAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      // Update existing rating
      ratings[existingIndex] = newRating;
    } else {
      // Add new rating
      ratings.push(newRating);
    }

    this.save(ratings);
    return newRating;
  },

  /**
   * Get rating statistics including user's rating
   */
  getStats(): RatingStats {
    const ratings = this.getAll();
    const userRating = this.getUserRating();

    if (ratings.length === 0) {
      return {
        totalRatings: 0,
        averageScore: 0,
        userRating: null,
      };
    }

    const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
    const averageScore = totalScore / ratings.length;

    return {
      totalRatings: ratings.length,
      averageScore: Math.round(averageScore * 10) / 10, // Round to 1 decimal
      userRating: userRating?.score || null,
    };
  },

  /**
   * Save ratings to localStorage
   */
  save(ratings: Rating[]): void {
    try {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
    } catch (error) {
      console.error('Error saving ratings to localStorage:', error);
    }
  },

  /**
   * Clear all ratings
   */
  clear(): void {
    localStorage.removeItem(RATINGS_STORAGE_KEY);
  },

  /**
   * Reset to mock data (useful for demo/testing)
   */
  resetToMockData(): void {
    localStorage.removeItem(MOCK_INITIALIZED_KEY);
    localStorage.removeItem(RATINGS_STORAGE_KEY);
    this.initializeMockData();
  },
};

