import { useRouter } from 'next/router';
import { ConversionEvents } from '@/lib/analytics';

interface TrackedMapLinkProps {
  href: string;
  placeName: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedMapLink({ href, placeName, className, children }: TrackedMapLinkProps) {
  const { asPath } = useRouter();

  const handleClick = () => {
    ConversionEvents.outboundMapClick(placeName, asPath);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
