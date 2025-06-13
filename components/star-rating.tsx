import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  max?: number
  size?: number
  className?: string
}

export function StarRating({ rating, max = 5, size = 16, className = "" }: StarRatingProps) {
  return (
    <div className={`star-rating ${className}`}>
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`star ${i < rating ? "filled" : ""}`}
          size={size}
          fill={i < rating ? "#FF0000" : "none"}
          stroke={i < rating ? "#FF0000" : "#ccc"}
        />
      ))}
    </div>
  )
}
