"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

export function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const isMobile = useMobile()

  // Use different video sources based on device type
  const videoSrc = isMobile ? "/assets/phone.mp4" : "/assets/pc.mp4"
  const fallbackImage = "/assets/h1.png"

  useEffect(() => {
    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
        setVideoError(true)
      })
    }

    // Fallback to image if video doesn't load within 3 seconds
    const timer = setTimeout(() => {
      if (!videoLoaded) {
        setVideoError(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [videoLoaded, videoSrc])

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black">
        {!videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            poster={fallbackImage}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            key={videoSrc} // Add key to force re-render when source changes
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
  

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-center px-4">
          <h1 className="premium-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading tracking-wider mb-2 whitespace-nowrap">
            PREMIUM RAP CASES
          </h1>
          <div className="w-full h-1 bg-rapcased-red mb-6 mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-10 whitespace-normal max-w-3xl mx-auto">
            ELEVATE YOUR PHONE GAME WITH CASES
            <br className="hidden sm:block" />
            INSPIRED BY THE LEGENDS
          </p>

          <Link href="#featured-cases">
            <Button className="bg-rapcased-red hover:bg-rapcased-darkred text-white text-xl px-10 py-6 shop-now-btn">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
