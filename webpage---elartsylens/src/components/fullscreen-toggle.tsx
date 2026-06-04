"use client"

import * as React from "react"
import { Expand, Minimize } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FullScreenToggle() {
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullScreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullScreenChange)
  }, [])

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullScreen}
      className="hidden md:inline-flex"
    >
      {isFullscreen ? (
        <Minimize className="h-5 w-5" />
      ) : (
        <Expand className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle fullscreen</span>
    </Button>
  )
}
