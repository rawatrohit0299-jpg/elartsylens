"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // When mounted on client, now we can show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // to prevent hydration mismatch, we can return a placeholder or null
    // a placeholder with the same size can prevent layout shift
    return <div className="h-10 w-[72px]" />
  }

  return (
    <div className="relative rounded-full p-1 border bg-secondary">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={`rounded-full h-8 w-8 transition-colors ${
          theme === 'light' ? 'bg-background text-foreground' : 'text-muted-foreground'
        }`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Set light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={`rounded-full h-8 w-8 transition-colors ${
          theme === 'dark' ? 'bg-background text-foreground' : 'text-muted-foreground'
        }`}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Set dark theme</span>
      </Button>
    </div>
  )
}
