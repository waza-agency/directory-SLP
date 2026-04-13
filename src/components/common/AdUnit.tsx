import { useEffect, useRef, useState } from 'react';

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
  const [isClient, setIsClient] = useState(false);
  const pushedRef = useRef(false);

  const config = SLOTS[placement];
  const finalAdSlot = adSlot || config.slot;
  const finalAdFormat = adFormat || config.format;

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

    if (window.adsbygoogle) {
      pushAd();
      return;
    }

    const observer = new MutationObserver(() => {
      if (window.adsbygoogle) {
        pushAd();
        observer.disconnect();
      }
    });

    observer.observe(document.head, { childList: true, subtree: true });

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

  const defaultStyle: React.CSSProperties = placement === 'sidebar'
    ? { display: 'inline-block', width: 300, height: 250 }
    : placement === 'in-article'
      ? { display: 'block', textAlign: 'center' as const }
      : { display: 'block' };

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
