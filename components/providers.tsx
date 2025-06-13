"use client"

import type React from "react"

import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { ReviewsProvider } from "@/lib/reviews-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ReviewsProvider>{children}</ReviewsProvider>
      </WishlistProvider>
    </CartProvider>
  )
}
