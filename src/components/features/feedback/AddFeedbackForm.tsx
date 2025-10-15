import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { feedbackStorage } from '@/utils/feedbackStorage';

// Constants
const TEXTAREA_MIN_HEIGHT = 120;
const TEXTAREA_ROWS = 5;
const FORM_LABELS = {
  TITLE: 'Add New Feedback',
  SUMMARY: 'Summary',
  COMMENT: 'Comment',
  SUBMIT: 'Submit Feedback',
  SUBMITTING: 'Submitting...',
} as const;

const PLACEHOLDERS = {
  SUMMARY: 'Brief summary of your feedback',
  COMMENT: 'Detailed description of your feedback',
} as const;

/**
 * Props for the AddFeedbackForm component
 * 
 * @interface AddFeedbackFormProps
 * @property {() => void} onFeedbackAdded - Callback function invoked after feedback is successfully added.
 *                                          Used to trigger parent component to reload the feedback list.
 */
interface AddFeedbackFormProps {
  onFeedbackAdded: () => void;
}

/**
 * AddFeedbackForm Component
 * 
 * A form component for submitting new feedback to the system. Features input validation,
 * loading states, and automatic form clearing upon successful submission.
 * 
 * @component
 * @param {AddFeedbackFormProps} props - Component props
 * @returns {JSX.Element} Rendered feedback submission form
 * 
 * @example
 * ```tsx
 * <AddFeedbackForm 
 *   onFeedbackAdded={() => {
 *     loadFeedbackList();
 *   }} 
 * />
 * ```
 * 
 * @remarks
 * - Validates that both summary and comment fields are non-empty before submission
 * - Trims whitespace from inputs before saving
 * - Automatically clears form fields after successful submission
 * - Disables submit button during submission to prevent duplicate entries
 */
export default function AddFeedbackForm({ onFeedbackAdded }: AddFeedbackFormProps) {
  const [summary, setSummary] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates form inputs
   * 
   * @returns {boolean} True if form is valid, false otherwise
   * @private
   */
  const validateForm = (): boolean => {
    const summaryValid = summary.trim().length > 0;
    const commentValid = comment.trim().length > 0;
    
    return summaryValid && commentValid;
  };

  /**
   * Handles form submission
   * 
   * Validates inputs, saves feedback to storage, clears form, and notifies parent component.
   * 
   * @param {React.FormEvent} e - Form submission event
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const trimmedSummary = summary.trim();
    const trimmedComment = comment.trim();

    setIsSubmitting(true);

    try {
      feedbackStorage.create({
        summary: trimmedSummary,
        comment: trimmedComment,
      });

      // Clear form
      setSummary('');
      setComment('');
      
      // Notify parent to reload feedback list
      onFeedbackAdded();
    } catch (error) {
      // Silently handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles summary input changes
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   * @returns {void}
   */
  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSummary(e.target.value);
  };

  /**
   * Handles comment textarea changes
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Textarea change event
   * @returns {void}
   */
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{FORM_LABELS.TITLE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">{FORM_LABELS.SUMMARY}</Label>
            <Input
              id="summary"
              placeholder={PLACEHOLDERS.SUMMARY}
              value={summary}
              onChange={handleSummaryChange}
              required
              aria-label={FORM_LABELS.SUMMARY}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">{FORM_LABELS.COMMENT}</Label>
            <textarea
              id="comment"
              placeholder={PLACEHOLDERS.COMMENT}
              value={comment}
              onChange={handleCommentChange}
              required
              rows={TEXTAREA_ROWS}
              aria-label={FORM_LABELS.COMMENT}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ minHeight: `${TEXTAREA_MIN_HEIGHT}px` }}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? FORM_LABELS.SUBMITTING : FORM_LABELS.SUBMIT}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

