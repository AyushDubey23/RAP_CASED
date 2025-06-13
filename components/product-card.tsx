"use client"

import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useWishlist } from "@/lib/wishlist-context"

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id))
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
    setInWishlist(!inWishlist)
  }

  // Try different image paths if the original fails
  const imageSrc = imageError
    ? `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(product.name)}`
    : product.image

  return (
    <div
      className="group relative overflow-hidden bg-background border border-rapcased-gray transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[5px_5px_0px_0px_rgba(255,0,0,1)] animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 z-20">
        <button
          onClick={toggleWishlist}
          className={`wishlist-btn p-1 sm:p-2 transition-all duration-300 transform ${inWishlist ? "bg-rapcased-red" : "bg-black bg-opacity-50 hover:bg-rapcased-red"}`}
        >
          <Heart
            className={`h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 ${inWishlist ? "fill-white text-white animate-pulse-hard" : "text-white"}`}
          />
          <span className="sr-only">Add to wishlist</span>
        </button>
      </div>

      <div className="relative h-40 sm:h-48 md:h-60 w-full overflow-hidden bg-gray-100">
        <Link href={`/product/${product.id}`}>
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10 transition-opacity duration-300 ${isHovered ? "opacity-70" : "opacity-40"}`}
          />

          {/* Regular image with Next.js Image component */}
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={product.name}
            className={`product-image object-contain transition-all duration-700 ${isHovered ? "scale-110 filter-none" : "scale-100"}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            onError={() => setImageError(true)}
            priority={index < 4} // Prioritize loading the first few images
          />

          {/* Fallback using regular img tag if needed */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-center p-2">
              {product.name}
            </div>
          )}
        </Link>
      </div>

      <div className="p-2 sm:p-3 flex flex-col gap-1 relative z-10">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-heading text-sm sm:text-base md:text-lg tracking-wide truncate">{product.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{product.theme}</p>
        </Link>

        <div className="mt-1 sm:mt-2 flex items-center justify-between">
          <p className="text-sm sm:text-base font-bold">₹{product.price}</p>
          <Link href={`/product/${product.id}`}>
            <Button
              size="sm"
              className={`text-xs px-2 py-0 h-6 sm:h-8 transition-all duration-300 ${isHovered ? "bg-rapcased-red hover:bg-rapcased-darkred" : "bg-rapcased-black hover:bg-rapcased-gray"} text-rapcased-white`}
            >
              VIEW
            </Button>
          </Link>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-rapcased-red transition-transform duration-500 ${isHovered ? "scale-x-100" : "scale-x-0"}`}
      ></div>
    </div>
  )
}
