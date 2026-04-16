import { useTranslation } from 'next-i18next';
import AffiliateCard from './AffiliateCard';

type Props = {
  productIds: string[];
  titleKey?: string;
  subtitleKey?: string;
  className?: string;
};

export default function AffiliateGrid({
  productIds,
  titleKey = 'affiliate.sectionTitle',
  subtitleKey,
  className = '',
}: Props) {
  const { t } = useTranslation('common');

  if (productIds.length === 0) return null;

  return (
    <section className={`my-12 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t(titleKey)}</h2>
        {subtitleKey && (
          <p className="text-gray-600 mt-2">{t(subtitleKey)}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productIds.map((id) => (
          <AffiliateCard key={id} productId={id} variant="grid" />
        ))}
      </div>
    </section>
  );
}
