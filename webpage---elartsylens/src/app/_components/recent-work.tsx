"use client"

import Image from "next/image"
import React, { useState, useEffect, useCallback } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function RecentWork() {
  const [galleryItems, setGalleryItems] = useState<(ImagePlaceholder & { tagline: string; href: string })[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const archiveImages = PlaceHolderImages
      .filter(img => img.id.startsWith("archive-"))
      .map((img, index) => ({
        ...img,
        tagline: img.tagline || `Visual Story #${index + 1}`,
        href: "#"
      }));

    // Fisher-Yates (aka Knuth) Shuffle
    let currentIndex = archiveImages.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [archiveImages[currentIndex], archiveImages[randomIndex]] = [
        archiveImages[randomIndex], archiveImages[currentIndex]];
    }
    
    setGalleryItems(archiveImages);
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % galleryItems.length);
  }, [selectedImageIndex, galleryItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + galleryItems.length) % galleryItems.length);
  }, [selectedImageIndex, galleryItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, handleNext, handlePrev]);

  const selectedImage = selectedImageIndex !== null ? galleryItems[selectedImageIndex] : null;

  return (
    <section id="archive" className="py-12 md:py-24 bg-background">
      <div className="w-full px-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">Archive</h2>
          <p className="mt-2 text-lg text-muted-foreground">A selection of my latest visual stories.</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-1 space-y-1"
        >
          {galleryItems.map((item, index) => {
            if (!item.imageUrl) return null;
            
            return (
              <motion.div 
                key={item.id} 
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1 }
                }}
                className="break-inside-avoid"
              >
                <div
                  className="group overflow-hidden relative cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.description}
                      width={item.width}
                      height={item.height}
                      className="w-full h-full object-cover grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:brightness-90"
                      data-ai-hint={item.imageHint}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start pointer-events-none">
                    <h3 className="font-headline text-lg text-white p-4 drop-shadow-md">{item.tagline}</h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && handleClose()}>
        <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
        <DialogContent className="bg-transparent border-none w-screen h-screen max-w-none p-4 md:p-8 flex items-center justify-center data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
          <DialogTitle className="sr-only">Image Gallery</DialogTitle>
          <DialogDescription className="sr-only">
            View full-size images from the archive.
          </DialogDescription>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && handleClose()}>
                <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
                />
                
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white/50 hover:text-white hover:bg-white/10" onClick={handleClose}>
                    <X className="w-6 h-6"/>
                </Button>

                <Button variant="ghost" size="icon" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 rounded-full" onClick={handlePrev}>
                    <ArrowLeft className="w-8 h-8"/>
                </Button>
                
                <Button variant="ghost" size="icon" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 rounded-full" onClick={handleNext}>
                    <ArrowRight className="w-8 h-8"/>
                </Button>

                {/* Navigation Pips */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {galleryItems.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                idx === selectedImageIndex ? "bg-white w-4" : "bg-white/30 hover:bg-white/50"
                            )}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
