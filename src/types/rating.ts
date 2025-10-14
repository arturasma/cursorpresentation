export interface Rating {
  userId: string;
  score: number; // 1-4
  createdAt: string;
}

export interface RatingStats {
  totalRatings: number;
  averageScore: number;
  userRating: number | null;
}

