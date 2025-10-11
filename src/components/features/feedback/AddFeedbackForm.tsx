import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { feedbackStorage } from '@/utils/feedbackStorage';

interface AddFeedbackFormProps {
  onFeedbackAdded: () => void;
}

export default function AddFeedbackForm({ onFeedbackAdded }: AddFeedbackFormProps) {
  const [summary, setSummary] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!summary.trim() || !comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      feedbackStorage.create({
        summary: summary.trim(),
        comment: comment.trim(),
      });

      // Clear form
      setSummary('');
      setComment('');
      
      // Notify parent to reload feedback list
      onFeedbackAdded();
    } catch (error) {
      console.error('Error adding feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Input
              id="summary"
              placeholder="Brief summary of your feedback"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <textarea
              id="comment"
              placeholder="Detailed description of your feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={5}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

