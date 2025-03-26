import Image from 'next/image';
import { getResponsiveSizes, getImageDimensions, ImageSize } from '@/utils/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  size?: ImageSize;
  className?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill';
  objectPosition?: string;
  height?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  size = 'card',
  className = '',
  priority = false,
  quality = 75,
  objectFit = 'cover',
  objectPosition = 'center',
  height = '100%',
}) => {
  getImageDimensions(size); // Call is needed for side effects

  return (
    <div 
      className="relative w-full h-full" 
      style={{ 
        minHeight: height,
        position: 'relative',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={getResponsiveSizes(size)}
        className={`${className} transition-opacity duration-300`}
        priority={priority}
        quality={quality}
        style={{
          objectFit,
          objectPosition,
        }}
      />
    </div>
  );
}; 