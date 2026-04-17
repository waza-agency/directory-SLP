export type AffiliateAudience = 'expat' | 'tourist' | 'mixed';

export type AffiliateProduct = {
  id: string;
  audience: AffiliateAudience;
  titleKey: string;
  descriptionKey: string;
  priceRangeMxn: string;
  affiliateUrl: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  tags: string[];
};

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'brita-jarra-filtro',
    audience: 'expat',
    titleKey: 'affiliate.products.brita.title',
    descriptionKey: 'affiliate.products.brita.description',
    priceRangeMxn: '$400–800 MXN',
    affiliateUrl: 'https://meli.la/2s9PKrz',
    image: { src: '/images/affiliate/brita.webp', width: 500, height: 500 },
    tags: ['water', 'home', 'kitchen', 'expat-essential'],
  },
  {
    id: 'termo-acero-inoxidable',
    audience: 'mixed',
    titleKey: 'affiliate.products.termo.title',
    descriptionKey: 'affiliate.products.termo.description',
    priceRangeMxn: '$900–1,500 MXN',
    affiliateUrl: 'https://meli.la/17y8D6p',
    image: { src: '/images/affiliate/termo.webp', width: 500, height: 500 },
    tags: ['outdoor', 'hydration', 'daily-use'],
  },
  {
    id: 'columbia-tenis-senderismo',
    audience: 'tourist',
    titleKey: 'affiliate.products.columbia.title',
    descriptionKey: 'affiliate.products.columbia.description',
    priceRangeMxn: '$1,200–2,500 MXN',
    affiliateUrl: 'https://meli.la/2jQtBwk',
    image: { src: '/images/affiliate/columbia.webp', width: 500, height: 500 },
    tags: ['outdoor', 'hiking', 'footwear', 'real-de-catorce', 'huasteca'],
  },
  {
    id: 'mochila-hidratacion-tactica',
    audience: 'tourist',
    titleKey: 'affiliate.products.mochila.title',
    descriptionKey: 'affiliate.products.mochila.description',
    priceRangeMxn: '$500–1,200 MXN',
    affiliateUrl: 'https://meli.la/1dN2H5K',
    image: { src: '/images/affiliate/mochila.webp', width: 500, height: 500 },
    tags: ['outdoor', 'hiking', 'hydration', 'tamul', 'sierra'],
  },
  {
    id: 'dubery-lentes-polarizados',
    audience: 'mixed',
    titleKey: 'affiliate.products.dubery.title',
    descriptionKey: 'affiliate.products.dubery.description',
    priceRangeMxn: '$500–1,200 MXN',
    affiliateUrl: 'https://meli.la/1GDLhE4',
    image: { src: '/images/affiliate/dubery.webp', width: 500, height: 500 },
    tags: ['outdoor', 'eyewear', 'uv-protection', 'daily-use'],
  },
  {
    id: 'sandalias-acuaticas',
    audience: 'tourist',
    titleKey: 'affiliate.products.sandalias.title',
    descriptionKey: 'affiliate.products.sandalias.description',
    priceRangeMxn: '$400–800 MXN',
    affiliateUrl: 'https://meli.la/2xznpGL',
    image: { src: '/images/affiliate/sandalias.webp', width: 500, height: 500 },
    tags: ['outdoor', 'water', 'footwear', 'media-luna', 'huasteca'],
  },
  {
    id: 'levoit-purificador-aire',
    audience: 'expat',
    titleKey: 'affiliate.products.levoit.title',
    descriptionKey: 'affiliate.products.levoit.description',
    priceRangeMxn: '$1,500–3,500 MXN',
    affiliateUrl: 'https://meli.la/2Pc1BMy',
    image: { src: '/images/affiliate/levoit.webp', width: 500, height: 500 },
    tags: ['home', 'health', 'expat-essential', 'dry-climate'],
  },
  {
    id: 'black-diamond-lampara-frontal',
    audience: 'tourist',
    titleKey: 'affiliate.products.blackdiamond.title',
    descriptionKey: 'affiliate.products.blackdiamond.description',
    priceRangeMxn: '$1,200–2,000 MXN',
    affiliateUrl: 'https://meli.la/2dAa6rm',
    image: { src: '/images/affiliate/blackdiamond.webp', width: 500, height: 500 },
    tags: ['outdoor', 'camping', 'real-de-catorce', 'night-gear'],
  },
];

export function getAffiliateProduct(id: string): AffiliateProduct | undefined {
  return AFFILIATE_PRODUCTS.find((p) => p.id === id);
}

export function getAffiliateProductsByTag(tag: string): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.tags.includes(tag));
}

export function getAffiliateProductsByAudience(audience: AffiliateAudience): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.audience === audience || p.audience === 'mixed');
}

export function getAffiliateProductsForPost(options: {
  tags?: string[];
  category?: string;
  slug?: string;
  limit?: number;
}): AffiliateProduct[] {
  const { tags = [], category, slug, limit = 3 } = options;

  const searchTerms = new Set<string>();
  tags.forEach((t) => searchTerms.add(t.toLowerCase()));
  if (category) searchTerms.add(category.toLowerCase());
  if (slug) {
    slug
      .toLowerCase()
      .split(/[-_\s/]+/)
      .forEach((part) => {
        if (part.length >= 4) searchTerms.add(part);
      });
  }

  if (searchTerms.size === 0) return [];

  const searchTermList = Array.from(searchTerms);
  const scored = AFFILIATE_PRODUCTS.map((product) => {
    const productTerms = product.tags.map((t) => t.toLowerCase());
    let score = 0;
    for (const term of searchTermList) {
      for (const pt of productTerms) {
        if (pt === term) {
          score += 3;
        } else if (term.length >= 4 && (pt.includes(term) || term.includes(pt))) {
          score += 1;
        }
      }
    }
    return { product, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
}
