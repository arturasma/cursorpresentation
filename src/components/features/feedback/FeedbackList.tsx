import { useState, useEffect } from 'react';
import FeedbackItem from './FeedbackItem';
import { feedbackStorage } from '@/utils/feedbackStorage';
import type { Feedback } from '@/types/feedback';

// Constants
const EMPTY_STATE_MESSAGE = 'No feedback yet. Be the first to share your thoughts!';

/**
 * FeedbackList Component
 * 
 * Displays a list of feedback items sorted by thumbs up count (descending).
 * Automatically loads feedback on mount and provides functionality to update thumbs up counts.
 * 
 * @component
 * @returns {JSX.Element} Rendered list of feedback items or empty state message
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FeedbackList />
 * ```
 * 
 * @remarks
 * - Automatically loads all feedback from localStorage on component mount
 * - Feedback items are sorted by thumbsUpCount in descending order
 * - Re-fetches and re-sorts data after each thumbs up action
 * - Displays an empty state message when no feedback exists
 * - Uses unique feedback IDs as React keys for optimal rendering performance
 */
export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);

  /**
   * Loads all feedback items from storage
   * 
   * Fetches feedback from feedbackStorage, updates component state,
   * and handles any errors that occur during the loading process.
   * 
   * @returns {void}
   */
  const loadFeedbacks = (): void => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const allFeedbacks = feedbackStorage.getAll();
      setFeedbacks(allFeedbacks);
    } catch (error) {
      setLoadError(error instanceof Error ? error : new Error('Failed to load feedbacks'));
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Effect hook to load feedbacks on component mount
   * 
   * Runs once when the component is first mounted to fetch initial data.
   */
  useEffect(() => {
    loadFeedbacks();
  }, []);

  /**
   * Handles thumbs up action for a specific feedback item
   * 
   * Increments the thumbs up count for the given feedback ID,
   * then reloads all feedback to get the updated and re-sorted list.
   * 
   * @param {string} id - The unique identifier of the feedback item
   * @returns {void}
   */
  const handleThumbsUp = (id: string): void => {
    if (!id) {
      return;
    }

    try {
      feedbackStorage.addThumbsUp(id);
      // Reload to get updated and re-sorted list
      loadFeedbacks();
    } catch (error) {
      // Silently handle error
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Loading feedback...</p>
      </div>
    );
  }

  // Error state
  if (loadError) {
    return (
      <div className="text-center py-12 text-destructive">
        <p className="text-lg">Failed to load feedback. Please try refreshing the page.</p>
        <p className="text-sm mt-2">{loadError.message}</p>
      </div>
    );
  }

  // Empty state
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">{EMPTY_STATE_MESSAGE}</p>
      </div>
    );
  }

  // Main render with feedback list
  return (
    <div className="space-y-2">
      {feedbacks.map((feedback) => {
        // Validate feedback data before rendering
        if (!feedback.id) {
          return null;
        }

        return (
          <FeedbackItem
            key={feedback.id}
            feedback={feedback}
            onThumbsUp={handleThumbsUp}
          />
        );
      })}
    </div>
  );
}

