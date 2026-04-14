import { useEffect, useRef } from 'react';

type AdPlacement = 'top-banner' | 'mid-content' | 'in-article' | 'sidebar' | 'matched' | 'default';

interface AdUnitProps {
  placement?: AdPlacement;
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'autorelaxed';
  style?: React.CSSProperties;
  className?: string;
}

const AD_CLIENT = 'ca-pub-7339948154887436';

const SLOTS: Record<AdPlacement, { slot: string; format: string }> = {
  'top-banner':  { slot: '2757184561', format: 'auto' },
  'mid-content': { slot: '4012211476', format: 'auto' },
  'in-article':  { slot: '4637454477', format: 'fluid' },
  'sidebar':     { slot: '5191776214', format: 'rectangle' },
  'matched':     { slot: '3028550605', format: 'autorelaxed' },
  'default':     { slot: '9795283286', format: 'auto' },
};

const AdUnit: React.FC<AdUnitProps> = ({
  placement = 'default',
  adSlot,
  adFormat,
  style,
  className,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  const config = SLOTS[placement];
  const finalAdSlot = adSlot || config.slot;
  const finalAdFormat = adFormat || config.format;

  useEffect(() => {
    if (!adRef.current || pushedRef.current) return;

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

    if (typeof window !== 'undefined' && window.adsbygoogle) {
      pushAd();
      return;
    }

    // Poll for the adsbygoogle global while the AdSense script loads.
    // More reliable than MutationObserver across lazyOnload/afterInteractive.
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [finalAdSlot, finalAdFormat]);

  const defaultStyle: React.CSSProperties = placement === 'sidebar'
    ? { display: 'inline-block', width: 300, height: 250 }
    : placement === 'in-article'
      ? { display: 'block', textAlign: 'center' as const }
      : { display: 'block' };

  // Render the <ins> tag on both server and client so Google's crawler can
  // see the ad placement and so hydration doesn't flash missing ads.
  return (
    <ins
      ref={adRef}
      className={`adsbygoogle${className ? ` ${className}` : ''}`}
      style={style || defaultStyle}
      data-ad-client={AD_CLIENT}
      data-ad-slot={finalAdSlot}
      data-ad-format={finalAdFormat}
      data-full-width-responsive={placement !== 'sidebar' ? 'true' : undefined}
      {...(placement === 'in-article' ? { 'data-ad-layout': 'in-article' } : {})}
    />
  );
};

export default AdUnit;
