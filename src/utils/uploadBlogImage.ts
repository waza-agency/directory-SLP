import { supabase } from '@/lib/supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image to the blog-images storage bucket
 * @param file - The image file to upload
 * @param fileName - Optional custom filename (will use original if not provided)
 * @returns Promise with upload result
 */
export async function uploadBlogImage(file: File, fileName?: string): Promise<UploadResult> {
  try {
    // Generate a clean filename
    const cleanFileName = fileName
      ? fileName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
      : file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();

    // Add timestamp to prevent conflicts
    const timestamp = Date.now();
    const finalFileName = `${timestamp}-${cleanFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(finalFileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(finalFileName);

    return {
      success: true,
      url: urlData.publicUrl
    };

  } catch (error) {
    console.error('Unexpected error during upload:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Delete an image from the blog-images storage bucket
 * @param fileName - The filename to delete (without the bucket path)
 * @returns Promise with deletion result
 */
export async function deleteBlogImage(fileName: string): Promise<UploadResult> {
  try {
    const { error } = await supabase.storage
      .from('blog-images')
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true
    };

  } catch (error) {
    console.error('Unexpected error during deletion:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Get the public URL for a blog image
 * @param fileName - The filename in the bucket
 * @returns The public URL
 */
export function getBlogImageUrl(fileName: string): string {
  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}