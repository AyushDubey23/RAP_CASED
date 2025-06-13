import { StarRating } from "@/components/star-rating"
import type { Review } from "@/lib/reviews-context"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="review-card p-4 border border-rapcased-gray bg-background">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg">{review.title}</h4>
        <StarRating rating={review.rating} size={14} />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <span className="font-medium">{review.userName}</span>
        <span>•</span>
        <span>{review.date}</span>
        {review.verified && (
          <>
            <span>•</span>
            <span className="text-green-500">Verified Purchase</span>
          </>
        )}
      </div>

      <p className="text-foreground">{review.comment}</p>
    </div>
  )
}
