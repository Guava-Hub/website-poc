import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export function ProductRating({ rating, reviewCount, className }: ProductRatingProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className={`flex items-center gap-1 text-sm ${className ?? ""}`}>
      {stars.map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
      {typeof reviewCount === "number" && (
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
}
