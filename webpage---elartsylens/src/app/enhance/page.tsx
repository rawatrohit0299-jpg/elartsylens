import { ImageEnhancerForm } from "./image-enhancer-form";

export default function EnhanceImagePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">AI Image Enhancer</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload a photo to automatically enhance it to match the portfolio&apos;s minimalist, high-contrast aesthetic.
        </p>
      </div>
      <ImageEnhancerForm />
    </div>
  );
}
