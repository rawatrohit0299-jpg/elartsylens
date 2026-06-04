'use client';

import Image from 'next/image';
import { useState } from 'react';
import { stories, type Story } from '@/lib/stories';
import { StoryPopup } from '@/app/_components/story-popup';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NarrativesPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  if (!stories || stories.length === 0) {
    return (
        <div className="bg-background">
            <section className="py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12 text-center">
                        <h1 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">Narratives</h1>
                        <p className="mt-2 text-lg text-muted-foreground">No narratives found.</p>
                    </div>
                </div>
            </section>
        </div>
    );
  }

  return (
    <>
      <div className="bg-background">
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h1 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">Narratives</h1>
              <p className="mt-2 text-lg text-muted-foreground">Photo essays and stories from the field.</p>
            </div>
            
            <div className="space-y-16 md:space-y-24">
              {stories.map((story, index) => (
                <div key={story.id} className="grid gap-8 items-center md:grid-cols-2">
                  <div className={cn("space-y-4 order-2", index % 2 !== 0 ? 'md:order-2' : 'md:order-1')}>
                      <p className="text-sm text-muted-foreground">{story.location.toUpperCase()} &mdash; {story.year}</p>
                      <h3 className="font-headline text-3xl font-bold tracking-tight">{story.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {story.description}
                      </p>
                      <Button variant="link" className="px-0 text-base" onClick={() => setSelectedStory(story)}>
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </div>
                  <div className={cn("order-1", index % 2 !== 0 ? 'md:order-1' : 'md:order-2')}>
                      <Image
                        src={story.thumbnailUrl}
                        alt={story.title}
                        width={story.width}
                        height={story.height}
                        className="w-full aspect-[3/2] object-cover object-top rounded-lg shadow-lg"
                        data-ai-hint={story.imageHint}
                      />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <StoryPopup story={selectedStory} onClose={() => setSelectedStory(null)} />
    </>
  );
}
