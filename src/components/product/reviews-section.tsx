import { Avatar, AvatarFallback } from "./reviewer-avatar";
import type { Review } from "@/types";
import { ProductRating } from "./product-rating";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

const ratingBreakdown = [5, 4, 3, 2, 1];

export function ReviewsSection({ reviews, rating, reviewCount }: ReviewsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 rounded-3xl border bg-background/60 p-6 shadow-sm md:grid-cols-[280px,1fr]">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-4xl font-bold text-foreground">{rating.toFixed(1)}</h3>
          <ProductRating rating={rating} reviewCount={reviewCount} className="justify-center md:justify-start" />
          <p className="text-sm text-muted-foreground">Based on {reviewCount} verified reviews</p>
          <Button size="sm" className="mt-2">
            Write a review
          </Button>
        </div>
        <div className="space-y-3">
          {ratingBreakdown.map((value) => {
            const percentage = Math.round(
              (reviews.filter((review) => review.rating === value).length / Math.max(reviewCount, 1)) * 100
            );
            return (
              <div key={value} className="flex items-center gap-3 text-sm">
                <span className="w-12 text-muted-foreground">{value} stars</span>
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                </div>
                <span className="w-12 text-right text-xs text-muted-foreground">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-3xl border bg-background p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{review.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              <ProductRating rating={review.rating} />
            </div>
            <Separator className="my-4" />
            <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Was this helpful?</span>
              <button className="rounded-full border px-3 py-1 hover:bg-muted">Yes</button>
              <button className="rounded-full border px-3 py-1 hover:bg-muted">No</button>
              {review.verified && <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">Verified buyer</span>}
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="rounded-3xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No reviews yet. Be the first to share your experience.
          </div>
        )}
      </div>
    </div>
  );
}
