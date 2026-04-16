import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { AffiliateProduct, getAffiliateProduct } from '@/data/affiliate-products';
import { ConversionEvents } from '@/lib/analytics';

export type AffiliateCardVariant = 'grid' | 'inline' | 'checklist';

type Props = {
  productId: string;
  variant?: AffiliateCardVariant;
};

const LINK_ATTRS = {
  target: '_blank' as const,
  rel: 'sponsored nofollow noopener noreferrer',
};

export default function AffiliateCard({ productId, variant = 'grid' }: Props) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const product = getAffiliateProduct(productId);

  if (!product) return null;

  const handleClick = () => {
    ConversionEvents.outboundAffiliateClick(
      'mercadolibre',
      product.id,
      router.asPath,
    );
  };

  const title = t(product.titleKey);
  const description = t(product.descriptionKey);
  const cta = t('affiliate.cta');
  const disclosure = t('affiliate.disclosure');

  if (variant === 'checklist') {
    return (
      <ChecklistVariant
        product={product}
        title={title}
        description={description}
        cta={cta}
        disclosure={disclosure}
        onClick={handleClick}
      />
    );
  }

  if (variant === 'inline') {
    return (
      <InlineVariant
        product={product}
        title={title}
        description={description}
        cta={cta}
        disclosure={disclosure}
        onClick={handleClick}
      />
    );
  }

  return (
    <GridVariant
      product={product}
      title={title}
      description={description}
      cta={cta}
      disclosure={disclosure}
      onClick={handleClick}
    />
  );
}

type VariantProps = {
  product: AffiliateProduct;
  title: string;
  description: string;
  cta: string;
  disclosure: string;
  onClick: () => void;
};

function GridVariant({ product, title, description, cta, disclosure, onClick }: VariantProps) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.image.src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
          quality={80}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">{description}</p>
        <p className="text-sm font-medium text-gray-900 mb-4">{product.priceRangeMxn}</p>
        <a
          href={product.affiliateUrl}
          onClick={onClick}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          {...LINK_ATTRS}
          data-testid="affiliate-cta"
        >
          {cta}
        </a>
        <p className="text-xs text-gray-400 mt-2 text-center">{disclosure}</p>
      </div>
    </article>
  );
}

function InlineVariant({ product, title, description, cta, disclosure, onClick }: VariantProps) {
  return (
    <aside className="my-8 border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-48 aspect-square bg-white flex-shrink-0">
          <Image
            src={product.image.src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 192px"
            className="object-contain p-3"
            quality={80}
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
            {disclosure}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between gap-4 mt-auto">
            <span className="text-sm font-medium text-gray-900">{product.priceRangeMxn}</span>
            <a
              href={product.affiliateUrl}
              onClick={onClick}
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap"
              {...LINK_ATTRS}
              data-testid="affiliate-cta"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ChecklistVariant({ product, title, description, cta, disclosure, onClick }: VariantProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors">
      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={product.image.src}
          alt={title}
          fill
          sizes="64px"
          className="object-contain p-1"
          quality={80}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">{description}</p>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="text-xs font-medium text-gray-900">{product.priceRangeMxn}</span>
          <a
            href={product.affiliateUrl}
            onClick={onClick}
            className="text-xs font-medium text-primary hover:underline"
            {...LINK_ATTRS}
            data-testid="affiliate-cta"
          >
            {cta} →
          </a>
          <span className="text-xs text-gray-400">{disclosure}</span>
        </div>
      </div>
    </div>
  );
}
