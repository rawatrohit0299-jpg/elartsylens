import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Journal() {
  const journalImage = PlaceHolderImages.find(img => img.id === 'journal-cover');

  if (!journalImage) return null;

  return (
    <section id="journal" className="py-12 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">Journal</h2>
          <p className="mt-2 text-lg text-muted-foreground">Photo essays and stories from the field.</p>
        </div>
        
        <div className="grid gap-8 items-center md:grid-cols-2">
            <div className="order-2 md:order-1 space-y-4">
                <p className="text-sm text-muted-foreground">VISUAL DIARY &mdash; JULY 24, 2024</p>
                <h3 className="font-headline text-3xl font-bold tracking-tight">The Coast Watchers</h3>
                <p className="text-muted-foreground leading-relaxed">
                An exploration of solitude and the sea. This essay captures the quiet moments along the shoreline, focusing on the figures who watch the waves and the stories they might tell. A study in patience and perspective.
                </p>
                <Button variant="link" className="px-0 text-base">
                Read Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="order-1 md:order-2">
                <Image
                src={journalImage.imageUrl}
                alt={journalImage.description}
                width={journalImage.width}
                height={journalImage.height}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                data-ai-hint={journalImage.imageHint}
                />
            </div>
        </div>
      </div>
    </section>
  )
}
