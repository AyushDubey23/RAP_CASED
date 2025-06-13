"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { Menu, Moon, ShoppingCart, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { SearchResults } from "@/components/search-results"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()
  const { items } = useCart()
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isSearching && !(event.target as Element).closest("form")) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isSearching])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim().length > 0) {
      // In a real app, we would implement search functionality here
      toast({
        title: "Searching for...",
        description: `"${searchQuery}"`,
      })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300
                ${scrolled ? "bg-background border-b border-rapcased-gray shadow-md" : "bg-transparent"}`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 hover:bg-rapcased-red hover:text-white transition-colors duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] border-r-rapcased-red">
              <div className="py-6 flex flex-col gap-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <div className="text-2xl font-heading mb-6">RAPCASED</div>
                </Link>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-heading hover:text-rapcased-red transition-colors duration-300"
                  >
                    HOME
                  </Button>
                </Link>
                <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-heading hover:text-rapcased-red transition-colors duration-300"
                  >
                    WISHLIST
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-heading hover:text-rapcased-red transition-colors duration-300"
                    >
                      CREATOR INFO
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-rapcased-red sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-heading">CREATOR INFO</DialogTitle>
                      <DialogDescription>
                        <div className="space-y-6 pt-6">
                          <div className="relative">
                            <p className="text-2xl">Name: Ayush Dubey</p>
                            <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-rapcased-red"></div>
                          </div>
                          <div className="flex flex-col gap-3 mt-6">
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                            >
                              <a
                                href="https://www.instagram.com/_ayushhdubey_/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Instagram
                              </a>
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                            >
                              <a
                                href="https://www.linkedin.com/in/ayushdubey"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                LinkedIn
                              </a>
                            </Button>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                            >
                              <a
                                href="https://ayush-portfolio-three-xi.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Portfolio
                              </a>
                            </Button>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-heading hover:text-rapcased-red transition-colors duration-300"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
                </Button>
                <form onSubmit={handleSearch} className="mt-4">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="border-rapcased-gray focus-visible:border-rapcased-red focus-visible:ring-rapcased-red"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-rapcased-red hover:text-white transition-colors duration-300"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-rapcased-red hover:text-white transition-colors duration-300"
              >
                <span className="font-bold text-xl">i</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="border-rapcased-red sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-3xl font-heading">CREATOR INFO</DialogTitle>
                <DialogDescription>
                  <div className="space-y-6 pt-6">
                    <div className="relative">
                      <p className="text-2xl">Name: Ayush Dubey</p>
                      <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-rapcased-red"></div>
                    </div>
                    <div className="flex flex-col gap-3 mt-6">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                      >
                        <a href="https://www.instagram.com/_ayushhdubey_/" target="_blank" rel="noopener noreferrer">
                          Instagram
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                      >
                        <a href="https://www.linkedin.com/in/ayushdubey" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-rapcased-gray hover:border-rapcased-red hover:bg-rapcased-red hover:text-white transition-all duration-300"
                      >
                        <a href="https://ayush-portfolio-three-xi.vercel.app" target="_blank" rel="noopener noreferrer">
                          Portfolio
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Link href="/" className="group flex items-center">
            <span
              className="text-3xl md:text-4xl font-heading tracking-wider relative overflow-hidden
                         after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-rapcased-red 
                         after:transition-all after:duration-300 group-hover:after:w-full"
            >
              RAPCASED
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search by rapper or product..."
                className="w-64 border-rapcased-gray focus-visible:border-rapcased-red focus-visible:ring-rapcased-red"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearching(true)}
              />
              {isSearching && (
                <SearchResults
                  query={searchQuery}
                  onResultClick={() => {
                    setIsSearching(false)
                    setSearchQuery("")
                  }}
                />
              )}
            </div>
          </form>

          <Link href="/wishlist" className="hidden md:block">
            <Button
              variant="ghost"
              size="sm"
              className="nav-link font-heading hover:text-rapcased-red transition-colors duration-300"
            >
              WISHLIST
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-rapcased-red hover:text-white transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-sm text-white
                              bg-rapcased-red border border-white animate-pulse-hard"
                  >
                    {items.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l-rapcased-red">
              <div className="py-6">
                <h2 className="text-2xl font-heading mb-6 relative inline-block">
                  YOUR CART
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-rapcased-red"></span>
                </h2>
                {items.length > 0 ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.model}`}
                        className="flex items-center gap-4 border-b border-rapcased-gray pb-4"
                      >
                        <div className="h-16 w-16 bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Model: {item.model}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p>
                              ₹{item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-rapcased-gray pt-4 flex justify-between">
                      <p className="font-bold">Total</p>
                      <p className="font-bold">
                        ₹{items.reduce((total, item) => total + item.price * item.quantity, 0)}
                      </p>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Link href="/checkout" className="block">
                        <Button className="w-full bg-rapcased-red hover:bg-rapcased-darkred">CHECKOUT</Button>
                      </Link>
                      <Link href="/cart" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-rapcased-gray hover:bg-rapcased-gray hover:text-white"
                        >
                          VIEW CART
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="mt-6">Your cart is empty</p>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
