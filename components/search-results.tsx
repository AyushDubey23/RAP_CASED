"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { searchProducts } from "@/lib/search"
import type { Product } from "@/lib/products"

interface SearchResultsProps {
  query: string
  onResultClick: () => void
}

export function SearchResults({ query, onResultClick }: SearchResultsProps) {
  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = searchProducts(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  if (query.trim().length === 0) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-background border border-rapcased-gray shadow-lg z-50 mt-1 p-4">
        <p className="text-center">No products found</p>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-background border border-rapcased-gray shadow-lg z-50 mt-1 max-h-[60vh] overflow-y-auto">
      <div className="p-2">
        <h3 className="text-sm font-bold mb-2">Search Results</h3>
        <div className="space-y-2">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center gap-3 p-2 hover:bg-muted transition-colors"
              onClick={onResultClick}
            >
              <div className="h-12 w-12 relative flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="product-image object-contain"
                />
              </div>
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.theme}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
