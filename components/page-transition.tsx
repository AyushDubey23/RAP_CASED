"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import LoadingAnimation from "./loading-animation"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPath, setPrevPath] = useState("")

  useEffect(() => {
    if (prevPath && prevPath !== pathname) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
    setPrevPath(pathname)
  }, [pathname, prevPath])

  if (isLoading) {
    return <LoadingAnimation duration={1000} />
  }

  return <div className="page-transition-wrapper">{children}</div>
}
