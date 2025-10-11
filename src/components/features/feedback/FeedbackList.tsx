import { useState, useEffect } from 'react';
import FeedbackItem from './FeedbackItem';
import { feedbackStorage } from '@/utils/feedbackStorage';
import type { Feedback } from '@/types/feedback';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const loadFeedbacks = () => {
    const allFeedbacks = feedbackStorage.getAll();
    setFeedbacks(allFeedbacks);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleThumbsUp = (id: string) => {
    feedbackStorage.addThumbsUp(id);
    loadFeedbacks(); // Reload to get updated and re-sorted list
  };

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No feedback yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          onThumbsUp={handleThumbsUp}
        />
      ))}
    </div>
  );
}

