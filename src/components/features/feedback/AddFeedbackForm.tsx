import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { feedbackStorage } from '@/utils/feedbackStorage';

// Constants
const MODULE_NAME = 'AddFeedbackForm';
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
 *     console.log('New feedback added, refreshing list...');
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
 * - Logs all state changes and errors for debugging and monitoring
 * 
 * @throws Will log error to console if feedbackStorage.create() fails
 */
export default function AddFeedbackForm({ onFeedbackAdded }: AddFeedbackFormProps) {
  const [summary, setSummary] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(`[${MODULE_NAME}:Component] Initialized | Summary length: ${summary.length}, Comment length: ${comment.length}`);

  /**
   * Validates form inputs
   * 
   * @returns {boolean} True if form is valid, false otherwise
   * @private
   */
  const validateForm = (): boolean => {
    const summaryValid = summary.trim().length > 0;
    const commentValid = comment.trim().length > 0;
    
    console.log(`[${MODULE_NAME}:validateForm] Validation result | Summary valid: ${summaryValid}, Comment valid: ${commentValid}`);
    
    if (!summaryValid || !commentValid) {
      console.warn(`[${MODULE_NAME}:validateForm] Validation failed | Empty fields detected`);
      return false;
    }
    
    return true;
  };

  /**
   * Handles form submission
   * 
   * Validates inputs, saves feedback to storage, clears form, and notifies parent component.
   * 
   * @param {React.FormEvent} e - Form submission event
   * @returns {void}
   * 
   * @throws Logs error if feedbackStorage.create() fails but does not throw to prevent UI crashes
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(`[${MODULE_NAME}:handleSubmit] Form submission started`);
    
    if (!validateForm()) {
      console.warn(`[${MODULE_NAME}:handleSubmit] Submission aborted | Form validation failed`);
      return;
    }

    const trimmedSummary = summary.trim();
    const trimmedComment = comment.trim();

    console.log(`[${MODULE_NAME}:handleSubmit] Setting submitting state | isSubmitting: true`);
    setIsSubmitting(true);

    try {
      console.log(`[${MODULE_NAME}:handleSubmit] Creating feedback | Summary: "${trimmedSummary}", Comment length: ${trimmedComment.length}`);
      
      feedbackStorage.create({
        summary: trimmedSummary,
        comment: trimmedComment,
      });

      console.log(`[${MODULE_NAME}:handleSubmit] Feedback created successfully | Clearing form`);

      // Clear form
      setSummary('');
      setComment('');
      
      console.log(`[${MODULE_NAME}:handleSubmit] Form cleared | Notifying parent component`);
      // Notify parent to reload feedback list
      onFeedbackAdded();
      
      console.log(`[${MODULE_NAME}:handleSubmit] Submission completed successfully`);
    } catch (error) {
      console.error(`[${MODULE_NAME}:handleSubmit] Error adding feedback | Error:`, error);
      console.error(`[${MODULE_NAME}:handleSubmit] Failed submission data | Summary: "${trimmedSummary}", Comment length: ${trimmedComment.length}`);
    } finally {
      console.log(`[${MODULE_NAME}:handleSubmit] Setting submitting state | isSubmitting: false`);
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
    const newValue = e.target.value;
    console.log(`[${MODULE_NAME}:handleSummaryChange] Summary updated | Length: ${newValue.length}`);
    setSummary(newValue);
  };

  /**
   * Handles comment textarea changes
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Textarea change event
   * @returns {void}
   */
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    console.log(`[${MODULE_NAME}:handleCommentChange] Comment updated | Length: ${newValue.length}`);
    setComment(newValue);
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

