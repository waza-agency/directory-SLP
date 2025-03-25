/**
 * Image size configurations for different use cases
 */
export const ImageSizes = {
  thumbnail: {
    width: 400,
    height: 300,
  },
  card: {
    width: 800,
    height: 600,
  },
  banner: {
    width: 1200,
    height: 800,
  },
  full: {
    width: 1920,
    height: 1080,
  },
} as const;

export type ImageSize = keyof typeof ImageSizes;

/**
 * Configuration for different image formats
 */
export const supportedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'] as const;
export type ImageExtension = typeof supportedImageExtensions[number];

interface ImageConfig {
  size?: ImageSize;
  quality?: number;
  format?: ImageExtension;
}

/**
 * Get the dimensions for a specific image size
 */
export const getImageDimensions = (size: ImageSize = 'card') => {
  return ImageSizes[size];
};

/**
 * Utility function to get the image URL with the correct extension
 * @param basePath - The base path of the image without extension
 * @param config - Configuration object for the image
 * @returns The complete image URL with size and format parameters
 */
export const getImageUrl = (
  basePath: string,
  config: ImageConfig = {}
): string => {
  const { size = 'card', quality = 75, format = '.jpg' } = config;
  const dimensions = getImageDimensions(size);
  
  // Remove any existing extension from basePath
  const cleanBasePath = basePath.replace(/\.(jpg|jpeg|png|webp|avif)$/, '');
  
  return `${cleanBasePath}${format}`;
};

/**
 * Get responsive image sizes for different breakpoints
 */
export const getResponsiveSizes = (size: ImageSize = 'card'): string => {
  switch (size) {
    case 'thumbnail':
      return '(max-width: 640px) 100vw, 400px';
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px';
    case 'banner':
      return '(max-width: 1200px) 100vw, 1200px';
    case 'full':
      return '100vw';
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px';
  }
};

/**
 * Get image dimensions as a string (for aspect ratio)
 */
export const getAspectRatio = (size: ImageSize = 'card'): string => {
  const dimensions = getImageDimensions(size);
  return `${dimensions.width} / ${dimensions.height}`;
}; 