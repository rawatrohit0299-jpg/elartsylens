'use server';

/**
 * @fileOverview AI-powered tool to automatically enhance uploaded images.
 *
 * - enhanceUploadedImage - A function that handles the image enhancement process.
 * - EnhanceUploadedImageInput - The input type for the enhanceUploadedImage function.
 * - EnhanceUploadedImageOutput - The return type for the enhanceUploadedImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceUploadedImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to enhance, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceUploadedImageInput = z.infer<typeof EnhanceUploadedImageInputSchema>;

const EnhanceUploadedImageOutputSchema = z.object({
  enhancedPhotoDataUri: z
    .string()
    .describe('The enhanced photo as a data URI.'),
});
export type EnhanceUploadedImageOutput = z.infer<typeof EnhanceUploadedImageOutputSchema>;

export async function enhanceUploadedImage(input: EnhanceUploadedImageInput): Promise<EnhanceUploadedImageOutput> {
  return enhanceUploadedImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceUploadedImagePrompt',
  input: {schema: EnhanceUploadedImageInputSchema},
  output: {schema: EnhanceUploadedImageOutputSchema},
  prompt: `You are an expert photography editor specializing in enhancing images to match a minimalist, high-contrast aesthetic.

  You will take the photo and enhance it by adjusting contrast, brightness and sharpness.

  Output the enhanced image as a WebP data URI.

  Photo: {{media url=photoDataUri}}
  `,
});

const enhanceUploadedImageFlow = ai.defineFlow(
  {
    name: 'enhanceUploadedImageFlow',
    inputSchema: EnhanceUploadedImageInputSchema,
    outputSchema: EnhanceUploadedImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
