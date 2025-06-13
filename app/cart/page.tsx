"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 99 : 0
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-8">Add some products to your cart to see them here.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-anton mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.model}`} className="flex gap-4 p-4 border">
              <div className="h-24 w-24 bg-muted flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(item.name)}`
                  }}
                />
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-muted-foreground">Model: {item.model}</p>
                <p className="font-bold">₹{item.price}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.model, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.model, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.model)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="border p-6 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <Button className="w-full bg-rapcased-red hover:bg-red-700">Proceed to Checkout</Button>
            </Link>
          </div>

          <div className="border p-6 space-y-4">
            <h2 className="text-lg font-bold">Have a promo code?</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
              />
              <Button>Apply</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
