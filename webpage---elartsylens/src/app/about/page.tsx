import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find(img => img.id === 'archive-7');

    return (
        <div className="bg-background">
            <section id="about" className="py-12 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                     <div className="mb-12 text-center">
                        <h1 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">About</h1>
                        <p className="mt-2 text-lg text-muted-foreground">The artist behind the lens.</p>
                    </div>

                    <div className="grid gap-12 items-center md:grid-cols-2">
                        <div>
                            {aboutImage && (
                                <Image
                                    src={aboutImage.imageUrl}
                                    alt={aboutImage.description}
                                    width={aboutImage.width}
                                    height={aboutImage.height}
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                    data-ai-hint={aboutImage.imageHint}
                                />
                            )}
                        </div>
                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p className="text-xl">
                                Welcome. I'm a visual storyteller, a photographer driven by a fascination with light, space, and the quiet moments that define our experience. My work is an exploration of continuity—the way a single instant can feel both fleeting and eternal.
                            </p>
                            <p>
                                Through my lens, I seek to distill the complexity of the world into clean, high-contrast compositions. Each photograph is a meditation on form and feeling, an invitation to pause and look closer. Whether capturing the stark lines of architecture or the subtle grace of a human expression, my goal is to create images that resonate with a sense of stillness and purpose.
                            </p>
                            <p>
                                This portfolio is a collection of those moments. It's a visual journal of my journey to find beauty in simplicity and meaning in the quiet continuum of life. Thank you for being here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
