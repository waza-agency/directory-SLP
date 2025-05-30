import { useEffect } from 'react';

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
  // Use the relaxed ad slot if isRelaxed is true, otherwise use the default slot
  const finalAdSlot = isRelaxed ? "3028550605" : "9795283286";
  const finalAdFormat = isRelaxed ? "autorelaxed" : adFormat;

  useEffect(() => {
    try {
      // Push the ad only after component mounts
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error initializing ad unit:', err);
    }
  }, []);

  return (
    <ins
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