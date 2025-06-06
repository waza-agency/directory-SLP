import { useEffect, useRef } from 'react';

interface AdUnitProps {
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'autorelaxed';
  style?: React.CSSProperties;
  isRelaxed?: boolean;
}

const AdUnit: React.FC<AdUnitProps> = ({
  adSlot,
  adFormat = 'auto',
  style,
  isRelaxed = false
}) => {
  const adRef = useRef<HTMLElement>(null);
  const isInitialized = useRef(false);

  // Use the relaxed ad slot if isRelaxed is true, otherwise use the default slot
  const finalAdSlot = isRelaxed ? "3028550605" : "9795283286";
  const finalAdFormat = isRelaxed ? "autorelaxed" : adFormat;

  useEffect(() => {
    // Only initialize if not already done and element exists
    if (!isInitialized.current && adRef.current) {
      try {
        // Check if the ad element already has ads
        const adElement = adRef.current;
        if (adElement.getAttribute('data-adsbygoogle-status')) {
          return; // Ad already loaded
        }

        // Push the ad only after component mounts and if not already initialized
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isInitialized.current = true;
      } catch (err) {
        console.error('Error initializing ad unit:', err);
      }
    }

    // Cleanup function
    return () => {
      isInitialized.current = false;
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="ca-pub-7339948154887436"
      data-ad-slot={adSlot || finalAdSlot}
      data-ad-format={finalAdFormat}
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;