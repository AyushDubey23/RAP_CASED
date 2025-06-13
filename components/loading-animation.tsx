"use client"

import { useEffect, useState } from "react"

interface LoadingAnimationProps {
  duration?: number
}

export default function LoadingAnimation({ duration = 2000 }: LoadingAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 500) // Exit animation duration
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-rapcased-black
                ${isExiting ? "animate-page-transition-out" : ""}`}
    >
      <div className="relative">
        <div
          className="react-loading text-7xl md:text-9xl font-heading text-rapcased-white
                  before:absolute before:-inset-1 before:block before:bg-rapcased-red before:content-[''] before:-z-10 before:skew-y-2"
        >
          {Array.from("RAPCASED").map((letter, index) => (
            <span key={index} className="react-loading-letter inline-block">
              {letter}
            </span>
          ))}
        </div>
        <div className="absolute -bottom-6 left-0 w-full h-1 bg-rapcased-red">
          <div
            className="h-full bg-rapcased-white"
            style={{
              width: "100%",
              animationName: "loadingProgress",
              animationDuration: `${duration}ms`,
              animationTimingFunction: "linear",
            }}
          ></div>
        </div>
      </div>
      <p className="mt-10 text-rapcased-white text-xl animate-pulse">PREMIUM RAP CASES</p>
    </div>
  )
}
