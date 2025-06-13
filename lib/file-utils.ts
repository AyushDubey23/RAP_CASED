/**
 * Utility functions for file handling
 */

/**
 * Check if a file exists by making a HEAD request
 * @param path The path to check
 * @returns Promise<boolean> True if the file exists
 */
export async function fileExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(path, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking if file exists at ${path}:`, error)
    return false
  }
}

/**
 * Get a valid image path by trying multiple variations
 * @param basePath The base path to try
 * @returns Promise<string> The valid path or a placeholder
 */
export async function getValidImagePath(basePath: string, fallbackText: string): Promise<string> {
  // Try different path variations
  const pathsToTry = [basePath, `/public${basePath}`, basePath.startsWith("/") ? basePath.substring(1) : `/${basePath}`]

  for (const path of pathsToTry) {
    if (await fileExists(path)) {
      return path
    }
  }

  // If no valid path found, return placeholder
  return `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(fallbackText)}`
}
