"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useReviews } from "@/lib/reviews-context"
import { Star } from "lucide-react"

interface ReviewFormProps {
  productId: number
  onSuccess?: () => void
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { addReview } = useReviews()
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [userName, setUserName] = useState("")
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    if (!userName.trim() || !title.trim() || !comment.trim()) {
      toast({
        title: "All fields are required",
        description: "Please fill in all fields before submitting your review.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Add the review
    addReview({
      productId,
      userName,
      rating,
      title,
      comment,
      verified: Math.random() > 0.3, // Randomly set some reviews as verified
    })

    // Show success message
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    })

    // Reset form
    setRating(0)
    setUserName("")
    setTitle("")
    setComment("")
    setIsSubmitting(false)

    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block font-bold">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                size={24}
                fill={(hoverRating || rating) >= star ? "#FF0000" : "none"}
                stroke={(hoverRating || rating) >= star ? "#FF0000" : "#ccc"}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="userName" className="block font-bold">
          Your Name
        </label>
        <Input
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border-rapcased-gray"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="block font-bold">
          Review Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-rapcased-gray"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="block font-bold">
          Your Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px] border-rapcased-gray"
          required
        />
      </div>

      <Button type="submit" className="bg-rapcased-red hover:bg-rapcased-darkred clip-angle" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
