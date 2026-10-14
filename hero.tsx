"use client"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Twitter } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

export function Hero() {
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 10000); // Slow, 10-second transition

    return () => clearInterval(intervalId);
  }, [heroImages.length]);
  
  if (heroImages.length === 0) {
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
             <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mb-4 text-sm uppercase tracking-widest text-primary-foreground/80 dark:text-primary/80">A Quiet Continuum</p>
                    <h1 className="font-headline text-5xl font-bold text-primary-foreground dark:text-primary md:text-6xl lg:text-7xl" style={{ letterSpacing: '0.05em' }}>
                        Still Moving Forward
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-base text-primary-foreground/90 md:text-lg dark:text-primary/90">
                        Light. Space. Continuity.
                    </p>
                </div>
            </div>
        </section>
    );
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {heroImages.map((img, index) => {
          if (index !== currentIndex) return null;
          const isPortrait = img.height > img.width;
          
          return (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0"
              aria-hidden={index !== currentIndex}
            >
              {/* Background layer for portrait images to create a seamless fill */}
              {isPortrait && (
                <Image
                  src={img.imageUrl}
                  alt="" // Decorative
                  fill
                  className="object-cover blur-2xl scale-110"
                  priority={index === 0}
                />
              )}
              
              {/* Main image */}
              <Image
                src={img.imageUrl}
                alt={img.description}
                fill
                className={cn(
                  "saturate-[.85]", // Slight desaturation
                  isPortrait ? "object-contain" : "object-cover"
                )}
                priority={index === 0}
                data-ai-hint={img.imageHint}
              />

              {/* Dimming and vignette overlay */}
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_100%)]" />

            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Text content on top */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-4 text-sm uppercase tracking-widest text-primary-foreground/80 dark:text-primary/80"
          >
            A Quiet Continuum
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-headline text-5xl font-bold text-primary-foreground dark:text-primary md:text-6xl lg:text-7xl" 
            style={{ letterSpacing: '0.05em' }}
          >
            Still Moving Forward
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-6 max-w-2xl mx-auto text-base text-primary-foreground/90 md:text-lg dark:text-primary/90"
          >
            Light. Space. Continuity.
          </motion.p>
        </motion.div>
      </div>

      {/* Socials */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-10 right-4 z-20 flex flex-col items-center gap-2 md:right-6"
      >
        <Button variant="ghost" size="icon" asChild className="text-primary-foreground/80 hover:bg-transparent hover:text-primary-foreground dark:text-primary/80 dark:hover:text-primary">
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="text-primary-foreground/80 hover:bg-transparent hover:text-primary-foreground dark:text-primary/80 dark:hover:text-primary">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
