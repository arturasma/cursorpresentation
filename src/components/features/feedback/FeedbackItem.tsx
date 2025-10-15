import { useState } from 'react';
import { ThumbsUp, CaretDown, CaretUp } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import type { Feedback } from '@/types/feedback';

// Constants
const ICON_SIZE = {
  CARET: 16,
  THUMBS_UP: 14,
} as const;

const ICON_WEIGHT = {
  BOLD: 'bold',
  REGULAR: 'regular',
} as const;

const ARIA_LABELS = {
  EXPAND: 'Expand',
  COLLAPSE: 'Collapse',
  THUMBS_UP: 'Give thumbs up',
} as const;

/**
 * Props for the FeedbackItem component
 * 
 * @interface FeedbackItemProps
 * @property {Feedback} feedback - The feedback object containing id, summary, comment, and thumbsUpCount
 * @property {(id: string) => void} onThumbsUp - Callback function invoked when user clicks thumbs up button.
 *                                               Receives the feedback id as parameter.
 */
interface FeedbackItemProps {
  feedback: Feedback;
  onThumbsUp: (id: string) => void;
}

/**
 * FeedbackItem Component
 * 
 * Displays a single feedback item with expandable/collapsible content and thumbs up functionality.
 * The component shows a summary by default and reveals the full comment when expanded.
 * 
 * @component
 * @param {FeedbackItemProps} props - Component props
 * @returns {JSX.Element} Rendered feedback item with expand/collapse and thumbs up controls
 * 
 * @example
 * ```tsx
 * <FeedbackItem
 *   feedback={{
 *     id: '123',
 *     summary: 'Great feature!',
 *     comment: 'This feature really improves the user experience...',
 *     thumbsUpCount: 5,
 *     createdAt: new Date()
 *   }}
 *   onThumbsUp={(id) => handleThumbsUp(id)}
 * />
 * ```
 * 
 * @remarks
 * - Uses local state to manage expand/collapse functionality
 * - Displays caret icon indicating current expansion state
 * - Shows thumbs up count with interactive button
 * - Preserves whitespace and line breaks in comment text
 * - Fully accessible with proper ARIA labels
 */
export default function FeedbackItem({ feedback, onThumbsUp }: FeedbackItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Toggles the expanded/collapsed state of the feedback item
   * 
   * @returns {void}
   */
  const handleToggleExpand = (): void => {
    setIsExpanded(!isExpanded);
  };

  /**
   * Handles thumbs up button click
   * 
   * @returns {void}
   */
  const handleThumbsUpClick = (): void => {
    onThumbsUp(feedback.id);
  };

  return (
    <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleExpand}
            className="flex-shrink-0 h-6 w-6 p-0"
            aria-label={isExpanded ? ARIA_LABELS.COLLAPSE : ARIA_LABELS.EXPAND}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <CaretUp size={ICON_SIZE.CARET} weight={ICON_WEIGHT.BOLD} />
            ) : (
              <CaretDown size={ICON_SIZE.CARET} weight={ICON_WEIGHT.BOLD} />
            )}
          </Button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm leading-tight py-1">{feedback.summary}</h3>
            
            {isExpanded && (
              <p className="text-muted-foreground text-sm whitespace-pre-wrap mt-2 pb-1">
                {feedback.comment}
              </p>
            )}
          </div>

          {/* Thumbs Up Section */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleThumbsUpClick}
              className="gap-1.5 h-7 px-2"
              aria-label={`${ARIA_LABELS.THUMBS_UP} (${feedback.thumbsUpCount} total)`}
            >
              <ThumbsUp size={ICON_SIZE.THUMBS_UP} weight={ICON_WEIGHT.REGULAR} />
              <span className="text-xs font-semibold">{feedback.thumbsUpCount}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

