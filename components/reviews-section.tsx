"use client"

import { useState } from "react"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { useReviews } from "@/lib/reviews-context"

interface ReviewsSectionProps {
  productId: number
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const { getProductReviews, getAverageRating } = useReviews()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest")

  const reviews = getProductReviews(productId)
  const averageRating = getAverageRating(productId)

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0] // 5 stars to 1 star
  reviews.forEach((review) => {
    ratingCounts[5 - review.rating]++
  })

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else {
      return a.rating - b.rating
    }
  })

  const handleReviewSuccess = () => {
    setShowReviewForm(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-4">
          <h3 className="text-2xl font-heading">CUSTOMER REVIEWS</h3>

          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} size={24} />
            <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-8 text-right">{star} ★</span>
                <div className="flex-1 rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width: `${reviews.length ? (ratingCounts[5 - star] / reviews.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="w-8 text-muted-foreground text-sm">{ratingCounts[5 - star]}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className={`w-full ${showReviewForm ? "bg-rapcased-gray" : "bg-rapcased-red hover:bg-rapcased-darkred"}`}
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>
        </div>

        <div className="md:w-2/3">
          {showReviewForm ? (
            <div className="border border-rapcased-gray p-4">
              <h3 className="text-xl font-heading mb-4">WRITE A REVIEW</h3>
              <ReviewForm productId={productId} onSuccess={handleReviewSuccess} />
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-heading">
                  {reviews.length} {reviews.length === 1 ? "REVIEW" : "REVIEWS"}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-rapcased-gray bg-background p-1 text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-rapcased-gray">
              <p className="text-lg mb-4">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
