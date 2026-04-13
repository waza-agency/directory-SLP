import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'autorelaxed';
  style?: React.CSSProperties;
  isRelaxed?: boolean;
}

const AD_CLIENT = 'ca-pub-7339948154887436';
const DEFAULT_SLOT = '9795283286';
const RELAXED_SLOT = '3028550605';

const AdUnit: React.FC<AdUnitProps> = ({
  adSlot,
  adFormat = 'auto',
  style,
  isRelaxed = false,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const [isClient, setIsClient] = useState(false);
  const pushedRef = useRef(false);

  const finalAdSlot = isRelaxed ? RELAXED_SLOT : (adSlot || DEFAULT_SLOT);
  const finalAdFormat = isRelaxed ? 'autorelaxed' : adFormat;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !adRef.current || pushedRef.current) return;

    const el = adRef.current;

    const pushAd = () => {
      if (pushedRef.current || el.getAttribute('data-adsbygoogle-status')) return;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch {
        // AdSense may throw if the slot is already filled
      }
    };

    // If adsbygoogle script is already loaded, push immediately
    if (window.adsbygoogle) {
      pushAd();
      return;
    }

    // Otherwise wait for the lazyOnload script to finish loading
    const observer = new MutationObserver(() => {
      if (window.adsbygoogle) {
        pushAd();
        observer.disconnect();
      }
    });

    observer.observe(document.head, { childList: true, subtree: true });

    // Fallback timeout in case MutationObserver misses it
    const timer = setTimeout(() => {
      if (window.adsbygoogle) pushAd();
      observer.disconnect();
    }, 8000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isClient, finalAdSlot, finalAdFormat]);

  if (!isClient) return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={finalAdSlot}
      data-ad-format={finalAdFormat}
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;
