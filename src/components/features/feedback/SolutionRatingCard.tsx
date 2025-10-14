import { useRating } from '@/context/RatingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Excellent',
} as const;

export default function SolutionRatingCard() {
  const { ratingStats, setUserRating } = useRating();

  const handleRatingClick = (score: number) => {
    setUserRating(score);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Rate this Proposed Solution</CardTitle>
        <CardDescription>
          How would you rate the overall quality of this exam login system?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Rating Buttons */}
          <div className="flex gap-3 flex-wrap">
            {([1, 2, 3, 4] as const).map((score) => (
              <Button
                key={score}
                onClick={() => handleRatingClick(score)}
                variant={ratingStats.userRating === score ? 'default' : 'outline'}
                className={`flex-1 min-w-[120px] h-auto py-4 flex flex-col gap-1 ${
                  ratingStats.userRating === score 
                    ? 'ring-2 ring-primary ring-offset-2' 
                    : ''
                }`}
              >
                <span className="text-2xl font-bold">{score}</span>
                <span className="text-sm">{RATING_LABELS[score]}</span>
              </Button>
            ))}
          </div>

          {/* Stats Display */}
          <div className="pt-4 border-t">
            {ratingStats.totalRatings > 0 ? (
              <div className="text-center space-y-1">
                <p className="text-lg font-semibold">
                  Average Score: {ratingStats.averageScore.toFixed(1)}/4
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on {ratingStats.totalRatings} {ratingStats.totalRatings === 1 ? 'rating' : 'ratings'}
                </p>
                {ratingStats.userRating && (
                  <p className="text-sm text-primary font-medium">
                    You rated this solution: {ratingStats.userRating}/4 ({RATING_LABELS[ratingStats.userRating as keyof typeof RATING_LABELS]})
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No ratings yet. Be the first to rate!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

