"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
  theme: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (itemId: number) => void
  isInWishlist: (itemId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  isInWishlist: () => false,
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("rapcased-wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rapcased-wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: WishlistItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)
      if (!existingItem) {
        return [...currentItems, newItem]
      }
      return currentItems
    })
  }

  const removeItem = (itemId: number) => {
    setItems(items.filter((item) => item.id !== itemId))
  }

  const isInWishlist = (itemId: number) => {
    return items.some((item) => item.id === itemId)
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>{children}</WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
