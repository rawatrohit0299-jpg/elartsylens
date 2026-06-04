'use client';

import Image from 'next/image';
import { MapPin, Calendar, X } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Story } from '@/lib/stories';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StoryPopupProps {
  story: Story | null;
  onClose: () => void;
}

export function StoryPopup({ story, onClose }: StoryPopupProps) {
  if (!story) return null;

  const bodyParagraphs = story.body.split(/\n+/).filter(p => p.trim() !== '');

  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
      <DialogContent className="max-w-3xl w-full p-4 md:p-6 bg-transparent border-none shadow-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
        <DialogTitle className="sr-only">{story.title}</DialogTitle>
        <DialogDescription className="sr-only">{story.subtitle}</DialogDescription>
        <div className="relative w-full h-full" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <div className="bg-[#f5f3ee] dark:bg-zinc-900 rounded-lg overflow-auto shadow-2xl max-h-[90vh]">
            <div className="relative w-full h-auto">
              <Image
                src={story.thumbnailUrl}
                alt={story.title}
                width={story.width}
                height={story.height}
                className="w-full h-auto"
                data-ai-hint={story.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
                <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-white/80 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{story.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{story.year}</span>
                  </div>
                </div>
                <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight">{story.title}</h1>
                <p className="font-headline text-xl md:text-2xl italic mt-2 text-white/90">{story.subtitle}</p>
              </div>
            </div>
            
            <div className="p-8 md:p-12 lg:p-16">
              <motion.div 
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="max-w-prose mx-auto font-headline text-lg text-stone-800 dark:text-stone-300 leading-relaxed space-y-6 selection:bg-accent/30"
              >
                {bodyParagraphs.map((p, i) => (
                  <motion.p 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className={cn(
                      i === 0 && "first-letter:text-7xl first-letter:font-bold first-letter:font-headline first-letter:text-stone-900 dark:first-letter:text-stone-100 first-letter:mr-3 first-letter:float-left"
                    )}
                  >
                    {p}
                  </motion.p>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
        <button
            onClick={onClose}
            className="absolute -top-2 -right-2 md:top-0 md:right-0 z-50 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
            <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
