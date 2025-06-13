"use client"

import { ArrowLeft, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { getProductById, phoneModels } from "@/lib/products"
import { useWishlist } from "@/lib/wishlist-context"
import LoadingAnimation from "@/components/loading-animation"
import { StarRating } from "@/components/star-rating"
import { useReviews } from "@/lib/reviews-context"
import { ReviewsSection } from "@/components/reviews-section"
import { ShareButton } from "@/components/share-button"

export default function ProductPage() {
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { getAverageRating, getProductReviews } = useReviews()

  const productId = Number(params.id)
  const product = getProductById(productId)
  const averageRating = getAverageRating(productId)
  const reviewCount = getProductReviews(productId).length

  const [selectedPhoneType, setSelectedPhoneType] = useState<"apple" | "android">("apple")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [showAltView, setShowAltView] = useState(false)
  const [inWishlist, setInWishlist] = useState(isInWishlist(productId))
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description")
  const [mainImageError, setMainImageError] = useState(false)
  const [altImageError, setAltImageError] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation duration={1000} />
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedModel) {
      toast({
        title: "Please select a phone model",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      model: selectedModel,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedModel}) added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
    setInWishlist(!inWishlist)

    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${inWishlist ? "removed from" : "added to"} your wishlist.`,
    })
  }

  // Get image sources with fallbacks
  const mainImageSrc = mainImageError
    ? `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`
    : product.image

  const altImageSrc = altImageError
    ? `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name + " Alt")}`
    : product.altImage

  return (
    <div className="page-transition-wrapper container py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-8 hover:text-rapcased-red transition-colors duration-300 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="border-b border-transparent hover:border-rapcased-red transition-colors duration-300">
          Back to products
        </span>
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative h-[60vh] border border-rapcased-gray bg-gray-100">
          <div className="absolute top-0 right-0 z-10">
            <button
              onClick={handleToggleWishlist}
              className={`wishlist-btn p-3 transition-all duration-300 ${inWishlist ? "bg-rapcased-red" : "bg-black bg-opacity-50 hover:bg-rapcased-red"}`}
            >
              <Heart
                className={`h-5 w-5 transition-all duration-300 ${inWishlist ? "fill-white text-white animate-pulse-hard" : "text-white"}`}
              />
              <span className="sr-only">Add to wishlist</span>
            </button>
          </div>

          {/* Main product image */}
          <Image
            src={showAltView ? altImageSrc : mainImageSrc}
            alt={product.name}
            fill
            priority
            className="product-image object-contain transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => {
              if (showAltView) {
                setAltImageError(true)
              } else {
                setMainImageError(true)
              }
            }}
          />

          {/* Fallback content if image fails */}
          {((showAltView && altImageError) || (!showAltView && mainImageError)) && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <div>
                <p className="text-xl font-bold">{product.name}</p>
                <p>{product.theme}</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              className={`h-16 w-16 border-2 transition-all duration-300 
                        ${!showAltView ? "border-rapcased-red" : "border-white hover:border-rapcased-red"}`}
              onClick={() => setShowAltView(false)}
            >
              <div className="relative h-full w-full">
                <Image
                  src={mainImageSrc || "/placeholder.svg"}
                  alt="Main View"
                  fill
                  className="object-cover h-full w-full"
                  onError={() => setMainImageError(true)}
                />
              </div>
            </button>

            <button
              className={`h-16 w-16 border-2 transition-all duration-300
                        ${showAltView ? "border-rapcased-red" : "border-white hover:border-rapcased-red"}`}
              onClick={() => setShowAltView(true)}
            >
              <div className="relative h-full w-full">
                <Image
                  src={altImageSrc || "/placeholder.svg"}
                  alt="Alternate View"
                  fill
                  className="object-cover h-full w-full"
                  onError={() => setAltImageError(true)}
                />
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-heading relative inline-block">
              {product.name}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-rapcased-red"></span>
            </h1>
            <p className="text-2xl text-muted-foreground mt-4">{product.theme}</p>

            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={averageRating} />
              <span className="text-muted-foreground">
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            </div>

            <p className="text-3xl font-bold mt-4">₹{product.price}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-bold text-lg">Select Device Type:</p>
              <div className="flex gap-4">
                <Button
                  variant={selectedPhoneType === "apple" ? "default" : "outline"}
                  onClick={() => setSelectedPhoneType("apple")}
                  className={
                    selectedPhoneType === "apple"
                      ? "bg-rapcased-red hover:bg-rapcased-darkred"
                      : "border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
                  }
                >
                  Apple
                </Button>
                <Button
                  variant={selectedPhoneType === "android" ? "default" : "outline"}
                  onClick={() => setSelectedPhoneType("android")}
                  className={
                    selectedPhoneType === "android"
                      ? "bg-rapcased-red hover:bg-rapcased-darkred"
                      : "border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
                  }
                >
                  Android
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-lg">Select Phone Model:</p>
              <Select onValueChange={setSelectedModel}>
                <SelectTrigger className="w-full border-rapcased-gray">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {phoneModels[selectedPhoneType].map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-lg">Quantity:</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  disabled={quantity <= 1}
                  className="border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
                >
                  -
                </Button>
                <span className="w-8 text-center text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-rapcased-black hover:bg-rapcased-gray clip-angle text-lg py-6"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
              <Button
                className="flex-1 bg-rapcased-red hover:bg-rapcased-darkred clip-angle text-lg py-6"
                onClick={handleBuyNow}
              >
                BUY NOW
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex gap-2 border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? "fill-rapcased-red text-rapcased-red" : ""}`} />
                {inWishlist ? "SAVED" : "WISHLIST"}
              </Button>

              <ShareButton
                title={`RAPCASED - ${product.name} Case`}
                text={`Check out this ${product.name} case from RAPCASED!`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="border-b border-rapcased-gray mb-8">
          <div className="flex">
            <button
              className={`px-6 py-3 font-heading text-lg ${
                activeTab === "description"
                  ? "border-b-2 border-rapcased-red text-rapcased-red"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("description")}
            >
              DESCRIPTION
            </button>
            <button
              className={`px-6 py-3 font-heading text-lg ${
                activeTab === "reviews" ? "border-b-2 border-rapcased-red text-rapcased-red" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              REVIEWS ({reviewCount})
            </button>
          </div>
        </div>

        {activeTab === "description" ? (
          <div className="space-y-4">
            <p>
              Premium {product.name} phone case featuring the iconic "{product.theme}" design. Made with high-quality
              materials for maximum protection and style.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1 w-4 bg-rapcased-red"></span>
                Premium shock-absorbent material
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-4 bg-rapcased-red"></span>
                Precise cutouts for easy access to all ports
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-4 bg-rapcased-red"></span>
                Raised edges for screen & camera protection
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-4 bg-rapcased-red"></span>
                Slim profile with enhanced grip
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-4 bg-rapcased-red"></span>
                Supports wireless charging
              </li>
            </ul>
          </div>
        ) : (
          <ReviewsSection productId={productId} />
        )}
      </div>
    </div>
  )
}
