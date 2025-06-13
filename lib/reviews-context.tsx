"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type Review = {
  id: string
  productId: number
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
}

type ReviewsContextType = {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date">) => void
  getProductReviews: (productId: number) => Review[]
  getAverageRating: (productId: number) => number
}

const ReviewsContext = createContext<ReviewsContextType>({
  reviews: [],
  addReview: () => {},
  getProductReviews: () => [],
  getAverageRating: () => 0,
})

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: "1",
    productId: 1,
    userName: "Drake_Fan_23",
    rating: 5,
    title: "Best Drake case ever!",
    comment:
      "This case is fire! The design is clean and the quality is top-notch. Definitely recommend to any Drake fan.",
    date: "2023-12-15",
    verified: true,
  },
  {
    id: "2",
    productId: 1,
    userName: "PhoneCaseCollector",
    rating: 4,
    title: "Great quality but a bit pricey",
    comment: "Love the design and the material feels premium. Only giving 4 stars because it's a bit expensive.",
    date: "2023-11-28",
    verified: true,
  },
  {
    id: "3",
    productId: 2,
    userName: "YeezyLover",
    rating: 5,
    title: "Donda case is amazing",
    comment:
      "This Kanye case is exactly what I wanted. The minimalist design is perfect and it fits my iPhone perfectly.",
    date: "2024-01-05",
    verified: true,
  },
  {
    id: "4",
    productId: 3,
    userName: "TravisScottStan",
    rating: 5,
    title: "UTOPIA vibes all day",
    comment: "This case is straight fire! The UTOPIA design is so clean and the case itself is super durable.",
    date: "2024-02-10",
    verified: true,
  },
  {
    id: "5",
    productId: 4,
    userName: "KendrickFan",
    rating: 4,
    title: "DAMN. good case",
    comment: "Love the Kendrick design. The case is sturdy and protects my phone well. Would recommend!",
    date: "2023-10-22",
    verified: false,
  },
  {
    id: "6",
    productId: 5,
    userName: "ColeWorld",
    rating: 5,
    title: "Off-Season case is perfect",
    comment: "This J. Cole case is exactly what I was looking for. Great quality and the design is clean.",
    date: "2024-01-18",
    verified: true,
  },
  {
    id: "7",
    productId: 1,
    userName: "OVOEnthusiast",
    rating: 3,
    title: "Decent but expected more",
    comment: "The design is nice but the case feels a bit thin. Not sure if it will protect my phone from big drops.",
    date: "2023-09-30",
    verified: true,
  },
  {
    id: "8",
    productId: 2,
    userName: "MusicLover99",
    rating: 5,
    title: "Kanye case is a must-have",
    comment: "This Donda case is amazing. The design is subtle yet recognizable. Love showing it off!",
    date: "2024-02-05",
    verified: true,
  },
  {
    id: "9",
    productId: 3,
    userName: "RagerForLife",
    rating: 5,
    title: "UTOPIA case is lit",
    comment: "This Travis Scott case is everything! The design is so cool and the quality is great.",
    date: "2023-11-15",
    verified: true,
  },
  {
    id: "10",
    productId: 4,
    userName: "HipHopHead",
    rating: 4,
    title: "Kendrick case is dope",
    comment: "Really like this DAMN. case. The design is clean and it fits my phone perfectly.",
    date: "2024-01-25",
    verified: false,
  },
]

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])

  // Load reviews from localStorage on initial render and add sample reviews
  useEffect(() => {
    const savedReviews = localStorage.getItem("rapcased-reviews")
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews))
      } catch (error) {
        console.error("Failed to parse reviews from localStorage", error)
        setReviews(sampleReviews)
      }
    } else {
      setReviews(sampleReviews)
    }
  }, [])

  // Save reviews to localStorage whenever it changes
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("rapcased-reviews", JSON.stringify(reviews))
    }
  }, [reviews])

  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: `${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }

    setReviews((currentReviews) => [...currentReviews, newReview])
  }

  const getProductReviews = (productId: number) => {
    return reviews.filter((review) => review.productId === productId)
  }

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0

    const sum = productReviews.reduce((total, review) => total + review.rating, 0)
    return Math.round((sum / productReviews.length) * 10) / 10
  }

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getProductReviews, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  return useContext(ReviewsContext)
}
