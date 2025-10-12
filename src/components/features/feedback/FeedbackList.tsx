import { useState, useEffect } from 'react';
import FeedbackItem from './FeedbackItem';
import { feedbackStorage } from '@/utils/feedbackStorage';
import type { Feedback } from '@/types/feedback';

// Constants
const MODULE_NAME = 'FeedbackList';
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
 * - Logs all data loading operations and state changes for monitoring
 * - Uses unique feedback IDs as React keys for optimal rendering performance
 * 
 * @throws Logs error to console if feedbackStorage operations fail
 */
export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);

  console.log(`[${MODULE_NAME}:Component] Rendered | Feedback count: ${feedbacks.length}, Loading: ${isLoading}`);

  /**
   * Loads all feedback items from storage
   * 
   * Fetches feedback from feedbackStorage, updates component state,
   * and handles any errors that occur during the loading process.
   * 
   * @returns {void}
   * 
   * @throws Catches and logs any errors from feedbackStorage.getAll()
   */
  const loadFeedbacks = (): void => {
    console.log(`[${MODULE_NAME}:loadFeedbacks] Loading feedbacks from storage`);
    setIsLoading(true);
    setLoadError(null);

    try {
      const allFeedbacks = feedbackStorage.getAll();
      console.log(`[${MODULE_NAME}:loadFeedbacks] Feedbacks loaded successfully | Count: ${allFeedbacks.length}`);
      
      // Log feedback statistics
      if (allFeedbacks.length > 0) {
        const totalThumbsUp = allFeedbacks.reduce((sum, fb) => sum + fb.thumbsUpCount, 0);
        const avgThumbsUp = (totalThumbsUp / allFeedbacks.length).toFixed(2);
        console.log(`[${MODULE_NAME}:loadFeedbacks] Feedback statistics | Total thumbs up: ${totalThumbsUp}, Average per feedback: ${avgThumbsUp}`);
      }

      setFeedbacks(allFeedbacks);
    } catch (error) {
      console.error(`[${MODULE_NAME}:loadFeedbacks] Error loading feedbacks | Error:`, error);
      setLoadError(error instanceof Error ? error : new Error('Failed to load feedbacks'));
      setFeedbacks([]);
    } finally {
      console.log(`[${MODULE_NAME}:loadFeedbacks] Loading complete | isLoading: false`);
      setIsLoading(false);
    }
  };

  /**
   * Effect hook to load feedbacks on component mount
   * 
   * Runs once when the component is first mounted to fetch initial data.
   */
  useEffect(() => {
    console.log(`[${MODULE_NAME}:useEffect] Component mounted | Initiating initial data load`);
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
   * 
   * @throws Catches and logs any errors from feedbackStorage.addThumbsUp()
   */
  const handleThumbsUp = (id: string): void => {
    console.log(`[${MODULE_NAME}:handleThumbsUp] Thumbs up action initiated | Feedback ID: ${id}`);

    if (!id) {
      console.error(`[${MODULE_NAME}:handleThumbsUp] Invalid feedback ID | Received: ${id}`);
      return;
    }

    try {
      feedbackStorage.addThumbsUp(id);
      console.log(`[${MODULE_NAME}:handleThumbsUp] Thumbs up added successfully | Feedback ID: ${id}, Reloading list`);
      
      // Reload to get updated and re-sorted list
      loadFeedbacks();
    } catch (error) {
      console.error(`[${MODULE_NAME}:handleThumbsUp] Error adding thumbs up | Feedback ID: ${id}, Error:`, error);
    }
  };

  // Loading state
  if (isLoading) {
    console.log(`[${MODULE_NAME}:render] Rendering loading state`);
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Loading feedback...</p>
      </div>
    );
  }

  // Error state
  if (loadError) {
    console.error(`[${MODULE_NAME}:render] Rendering error state | Error: ${loadError.message}`);
    return (
      <div className="text-center py-12 text-destructive">
        <p className="text-lg">Failed to load feedback. Please try refreshing the page.</p>
        <p className="text-sm mt-2">{loadError.message}</p>
      </div>
    );
  }

  // Empty state
  if (feedbacks.length === 0) {
    console.log(`[${MODULE_NAME}:render] Rendering empty state | No feedbacks available`);
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">{EMPTY_STATE_MESSAGE}</p>
      </div>
    );
  }

  // Main render with feedback list
  console.log(`[${MODULE_NAME}:render] Rendering feedback list | Count: ${feedbacks.length}`);
  return (
    <div className="space-y-2">
      {feedbacks.map((feedback) => {
        // Validate feedback data before rendering
        if (!feedback.id) {
          console.warn(`[${MODULE_NAME}:render] Skipping feedback with missing ID | Summary: ${feedback.summary}`);
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

