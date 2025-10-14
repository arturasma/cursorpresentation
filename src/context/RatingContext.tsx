import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { RatingStats } from '@/types/rating';
import { ratingStorage } from '@/utils/ratingStorage';

interface RatingContextType {
  ratingStats: RatingStats;
  setUserRating: (score: number) => void;
  refreshStats: () => void;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: { children: ReactNode }) {
  const [ratingStats, setRatingStats] = useState<RatingStats>(() => {
    return ratingStorage.getStats();
  });

  const refreshStats = () => {
    const stats = ratingStorage.getStats();
    setRatingStats(stats);
  };

  const setUserRating = (score: number) => {
    try {
      ratingStorage.setUserRating(score);
      refreshStats();
    } catch (error) {
      console.error('Error setting user rating:', error);
    }
  };

  // Initialize on mount
  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <RatingContext.Provider value={{ ratingStats, setUserRating, refreshStats }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRating() {
  const context = useContext(RatingContext);
  if (context === undefined) {
    throw new Error('useRating must be used within a RatingProvider');
  }
  return context;
}

