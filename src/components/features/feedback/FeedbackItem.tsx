import { useState } from 'react';
import { ThumbsUp, CaretDown, CaretUp } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import type { Feedback } from '@/types/feedback';

interface FeedbackItemProps {
  feedback: Feedback;
  onThumbsUp: (id: string) => void;
}

export default function FeedbackItem({ feedback, onThumbsUp }: FeedbackItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 h-6 w-6 p-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <CaretUp size={16} weight="bold" />
            ) : (
              <CaretDown size={16} weight="bold" />
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
              onClick={() => onThumbsUp(feedback.id)}
              className="gap-1.5 h-7 px-2"
            >
              <ThumbsUp size={14} weight="regular" />
              <span className="text-xs font-semibold">{feedback.thumbsUpCount}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

