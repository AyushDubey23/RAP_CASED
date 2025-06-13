import { products, type Product } from "./products"

export function searchProducts(query: string): Product[] {
  if (!query || query.trim() === "") {
    return []
  }

  const searchTerm = query.toLowerCase().trim()

  return products.filter(
    (product) => product.name.toLowerCase().includes(searchTerm) || product.theme.toLowerCase().includes(searchTerm),
  )
}
