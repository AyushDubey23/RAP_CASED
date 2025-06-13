"use client"

import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="container py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>

        <h1 className="text-4xl font-anton">Order Successful!</h1>

        <p className="text-xl">Thank you for your purchase. Your order has been received and is being processed.</p>

        <p className="text-muted-foreground">A confirmation email has been sent to your email address.</p>

        <div className="pt-6">
          <Link href="/">
            <Button className="bg-rapcased-black hover:bg-rapcased-gray">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
