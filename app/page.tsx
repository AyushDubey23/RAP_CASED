"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import LoadingAnimation from "@/components/loading-animation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getProductsByPage, getPageCount } from "@/lib/products"
import { VideoBanner } from "@/components/video-banner"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8 // Changed to 8 for better grid alignment (2x4 on mobile)
  const totalPages = getPageCount(productsPerPage)

  const products = getProductsByPage(currentPage, productsPerPage)

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <div className="page-transition-wrapper">
      <VideoBanner />

      <section id="featured-cases" className="container py-8 md:py-16 px-4 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-heading relative inline-block">
            FEATURED CASES
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-rapcased-red"></span>
          </h2>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1
                      ? "bg-rapcased-red hover:bg-rapcased-darkred"
                      : "border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {currentPage === totalPages && products.length < productsPerPage && (
          <div className="mt-12 md:mt-20 text-center border-t border-rapcased-gray pt-6 md:pt-10">
            <h3 className="text-2xl md:text-3xl font-heading mb-4 text-glow">MORE FIRE DROPPING SOON... 🔥</h3>
            <p className="text-lg md:text-xl">Stay tuned for exclusive drops.</p>
          </div>
        )}
      </section>
    </div>
  )
}
