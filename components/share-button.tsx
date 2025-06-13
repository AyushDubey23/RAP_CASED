"use client"

import { Share2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  title: string
  text: string
  url?: string
  className?: string
}

export function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
  const { toast } = useToast()
  const [isSupported, setIsSupported] = useState(() => typeof navigator !== "undefined" && !!navigator.share)

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
        toast({
          title: "Shared successfully!",
          description: "Content has been shared.",
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Link copied!",
          description: "Link copied to clipboard.",
        })
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error)
        // Copy to clipboard as fallback
        await navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Link copied!",
          description: "Link copied to clipboard.",
        })
      }
    }
  }

  if (isSupported) {
    return (
      <Button
        variant="outline"
        className={`flex gap-2 border-rapcased-gray hover:border-rapcased-gray hover:bg-rapcased-gray hover:text-white transition-all duration-300 ${className}`}
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        SHARE
      </Button>
    )
  }

  // Fallback for browsers without Web Share API
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex gap-2 border-rapcased-gray hover:border-rapcased-gray hover:bg-rapcased-gray hover:text-white transition-all duration-300 ${className}`}
        >
          <Share2 className="h-4 w-4" />
          SHARE
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(shareUrl)
            toast({
              title: "Link copied!",
              description: "Link copied to clipboard.",
            })
          }}
        >
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Twitter
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Facebook
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on WhatsApp
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
