"use client"

import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="mb-8">Add some products to your wishlist to see them here.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-anton mb-8">Your Wishlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border group relative">
            <div className="relative h-40 sm:h-48 md:h-60 w-full overflow-hidden">
              <Link href={`/product/${item.id}`}>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(item.name)}`
                  }}
                />
              </Link>
            </div>

            <div className="p-2 sm:p-3 flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <Link href={`/product/${item.id}`} className="block">
                  <h3 className="font-heading text-sm sm:text-base md:text-lg tracking-wide truncate">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.theme}</p>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>

              <div className="mt-1 sm:mt-2 flex items-center justify-between">
                <p className="text-sm sm:text-base font-bold">₹{item.price}</p>
                <Link href={`/product/${item.id}`}>
                  <Button
                    size="sm"
                    className="text-xs px-2 py-0 h-6 sm:h-8 bg-rapcased-black hover:bg-rapcased-gray text-rapcased-white"
                  >
                    VIEW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
