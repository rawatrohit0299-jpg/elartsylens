"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Wand2, Download } from "lucide-react";
import { enhanceUploadedImage, EnhanceUploadedImageOutput } from "@/ai/flows/enhance-uploaded-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function ImageEnhancerForm() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<EnhanceUploadedImageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const convertToWebP = (dataUri: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/webp", 0.8));
      };
      img.onerror = (e) => {
        console.error("Image loading failed for WebP conversion:", e);
        reject(e);
      };
      img.src = dataUri;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEnhancedImage(null);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        try {
          const webpDataUri = await convertToWebP(dataUri);
          setOriginalImage(webpDataUri);
        } catch (error) {
          console.error("WebP conversion failed:", error);
          setOriginalImage(dataUri);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setEnhancedImage(null);

    try {
      const result = await enhanceUploadedImage({ photoDataUri: originalImage });
      setEnhancedImage(result);
    } catch (error) {
      console.error("Enhancement failed:", error);
      toast({
        title: "Enhancement Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (enhancedImage?.enhancedPhotoDataUri) {
        const link = document.createElement("a");
        link.href = enhancedImage.enhancedPhotoDataUri;
        link.download = "enhanced-image.webp";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-border p-12 text-center">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Drag & drop your image here, or click to browse.</p>
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
          </div>
        </CardContent>
      </Card>
      
      {originalImage && (
        <div className="text-center">
            <Button size="lg" onClick={handleSubmit} disabled={isLoading}>
                <Wand2 className="mr-2 h-5 w-5" />
                {isLoading ? "Enhancing..." : "Enhance Image"}
            </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-center text-lg font-medium text-muted-foreground">Original</h3>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
                {originalImage ? (
                    <Image src={originalImage} alt="Original" width={600} height={600} className="w-full h-auto object-contain" />
                ) : (
                    <Skeleton className="w-full aspect-square" />
                )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
            <h3 className="text-center text-lg font-medium text-muted-foreground">Enhanced</h3>
            <Card className="overflow-hidden relative">
                <CardContent className="p-0">
                    {isLoading ? (
                         <Skeleton className="w-full aspect-square" />
                    ) : enhancedImage ? (
                        <>
                            <Image src={enhancedImage.enhancedPhotoDataUri} alt="Enhanced" width={600} height={600} className="w-full h-auto object-contain" />
                             <Button size="icon" className="absolute top-4 right-4" onClick={handleDownload}>
                                <Download className="h-5 w-5"/>
                                <span className="sr-only">Download</span>
                             </Button>
                        </>
                    ) : (
                        <Skeleton className="w-full aspect-square" />
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
