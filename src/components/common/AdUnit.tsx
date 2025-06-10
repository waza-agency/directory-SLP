import { useEffect, useRef, useState } from 'react';

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
  const [isClient, setIsClient] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  // Use the relaxed ad slot if isRelaxed is true, otherwise use the default slot
  const finalAdSlot = isRelaxed ? "3028550605" : (adSlot || "9795283286");
  const finalAdFormat = isRelaxed ? "autorelaxed" : adFormat;

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !adRef.current || adLoaded) return;

    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      console.log('AdSense: Development mode detected - ads may not load');
      // Show placeholder in development
      if (adRef.current) {
        adRef.current.innerHTML = `
          <div style="
            background: #f3f4f6;
            border: 2px dashed #d1d5db;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            border-radius: 8px;
            min-height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div>
              <div style="font-size: 14px; margin-bottom: 5px;">AdSense Ad Placeholder</div>
              <div style="font-size: 12px;">Slot: ${finalAdSlot}</div>
              <div style="font-size: 12px;">Format: ${finalAdFormat}</div>
            </div>
          </div>
        `;
      }
      return;
    }

    try {
      // Check if the ad element already has ads loaded
      const adElement = adRef.current;
      if (adElement.getAttribute('data-adsbygoogle-status')) {
        console.log('AdSense: Ad already loaded');
        return;
      }

      // Ensure adsbygoogle is available
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        console.log('AdSense: Initializing ad unit', { slot: finalAdSlot, format: finalAdFormat });

        // Push the ad configuration
        window.adsbygoogle.push({});
        setAdLoaded(true);

        // Add error handling for ad loading
        setTimeout(() => {
          if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
            console.warn('AdSense: Ad may not have loaded properly');
          }
        }, 3000);
      } else {
        console.error('AdSense: adsbygoogle not available');
      }
    } catch (err) {
      console.error('AdSense: Error initializing ad unit:', err);
    }
  }, [isClient, finalAdSlot, finalAdFormat, adLoaded]);

  // Don't render anything on server-side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="ca-pub-7339948154887436"
      data-ad-slot={finalAdSlot}
      data-ad-format={finalAdFormat}
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;