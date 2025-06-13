"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function Footer() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (email.trim().length > 0) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive updates on new releases.",
      })
      setEmail("")
    }
  }

  return (
    <footer className="bg-rapcased-black text-rapcased-white">
      <div className="container py-8 md:py-12 px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading relative inline-block">
              RAPCASED
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-rapcased-red"></span>
            </h2>
            <p className="text-base md:text-lg">Premium phone cases inspired by rap culture.</p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://ayush-portfolio-three-xi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rapcased-red transition-colors"
              >
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/ayushdubey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rapcased-red transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold relative inline-block">
              QUICK LINKS
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-rapcased-red"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-rapcased-red transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-rapcased-red transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-rapcased-red transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rapcased-red transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rapcased-red transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold relative inline-block">
              CONTACT
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-rapcased-red"></span>
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-rapcased-red">Email:</span>
                <span>info@rapcased.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rapcased-red">Phone:</span>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rapcased-red">Address:</span>
                <span>123 Rap Street, Music City</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold relative inline-block">
              SUBSCRIBE
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-rapcased-red"></span>
            </h3>
            <p>Get updates on new releases and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-rapcased-gray border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-rapcased-red hover:bg-rapcased-darkred text-rapcased-white">
                JOIN
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-rapcased-gray">
        <div className="container py-4 md:py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-gray-400">
              © {new Date().getFullYear()} RAPCASED. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
              <a href="#" className="text-gray-400 hover:text-rapcased-red transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-rapcased-red transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-rapcased-red transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
