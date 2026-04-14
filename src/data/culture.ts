export interface CultureSite {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  path: string;
}

export const cultureSites: CultureSite[] = [
  {
    slug: 'history',
    titleKey: 'homepage.culture.history.title',
    descriptionKey: 'homepage.culture.history.description',
    image: '/images/cultura-1.jpg',
    path: '/cultural/history',
  },
  {
    slug: 'festivals',
    titleKey: 'homepage.culture.festivals.title',
    descriptionKey: 'homepage.culture.festivals.description',
    image: '/images/cultura-2.jpg',
    path: '/cultural/festivals',
  },
  {
    slug: 'customs',
    titleKey: 'homepage.culture.language.title',
    descriptionKey: 'homepage.culture.language.description',
    image: '/images/cultura-3.jpg',
    path: '/cultural/customs-etiquette',
  },
];
