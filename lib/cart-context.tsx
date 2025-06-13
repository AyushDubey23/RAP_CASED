"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  model: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: number, model: string) => void
  updateQuantity: (itemId: number, model: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("rapcased-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rapcased-cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id && item.model === newItem.model)

      if (existingItemIndex > -1) {
        // If the item already exists, update its quantity
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        }
        return updatedItems
      } else {
        // Otherwise, add the new item to the cart
        return [...currentItems, newItem]
      }
    })
  }

  const removeItem = (itemId: number, model: string) => {
    setItems(items.filter((item) => !(item.id === itemId && item.model === model)))
  }

  const updateQuantity = (itemId: number, model: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId, model)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === itemId && item.model === model ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
