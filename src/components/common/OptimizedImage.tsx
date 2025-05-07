import Image, { ImageProps } from 'next/image';
import { useImageWithFallback, getImageFormats } from '@/utils/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src: initialSrc,
  fallbackSrc = '/images/placeholder.png',
  alt,
  ...props
}) => {
  const { src, onError } = useImageWithFallback(initialSrc);
  const formats = getImageFormats(initialSrc);

  return (
    <picture>
      <source srcSet={formats.avif} type="image/avif" />
      <source srcSet={formats.webp} type="image/webp" />
      <source srcSet={formats.jpg} type="image/jpeg" />
      <Image
        src={src}
        alt={alt}
        onError={onError}
        {...props}
      />
    </picture>
  );
}; 