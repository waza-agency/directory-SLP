export interface Guide {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  image: string;
  path: string;
  badgeKey: string;
}

export const guides: Guide[] = [
  {
    slug: 'family-activities',
    titleKey: 'homepage.practical.family.title',
    descriptionKey: 'homepage.practical.family.description',
    tags: ['family', 'kids', 'entertainment'],
    image: '/images/practical-categories/family-activities.webp',
    path: '/category/family-activities',
    badgeKey: 'homepage.practical.family.badge',
  },
  {
    slug: 'rainy-day-activities',
    titleKey: 'homepage.practical.rainyDay.title',
    descriptionKey: 'homepage.practical.rainyDay.description',
    tags: ['indoor', 'rainy-day', 'entertainment'],
    image: '/images/practical-categories/activities-rainy-day.jpg',
    path: '/category/rainy-day-activities',
    badgeKey: 'homepage.practical.rainyDay.badge',
  },
  {
    slug: 'restaurants-with-playgrounds',
    titleKey: 'homepage.practical.playgrounds.title',
    descriptionKey: 'homepage.practical.playgrounds.description',
    tags: ['dining', 'kids', 'family'],
    image: '/images/practical-categories/restaurants-with-playgrounds.png',
    path: '/category/restaurants-with-playgrounds',
    badgeKey: 'homepage.practical.playgrounds.badge',
  },
  {
    slug: 'english-speaking-healthcare',
    titleKey: 'homepage.practical.healthcare.title',
    descriptionKey: 'homepage.practical.healthcare.description',
    tags: ['health', 'medical', 'english-friendly'],
    image: '/images/practical-categories/english-speaking-healthcare.jpg',
    path: '/category/english-speaking-healthcare',
    badgeKey: 'homepage.practical.healthcare.badge',
  },
  {
    slug: 'international-markets',
    titleKey: 'homepage.practical.markets.title',
    descriptionKey: 'homepage.practical.markets.description',
    tags: ['shopping', 'groceries', 'international'],
    image: '/images/practical-categories/international-markets.jpg',
    path: '/category/international-markets',
    badgeKey: 'homepage.practical.markets.badge',
  },
  {
    slug: 'easy-parking-spots',
    titleKey: 'homepage.practical.parking.title',
    descriptionKey: 'homepage.practical.parking.description',
    tags: ['parking', 'convenience', 'dining'],
    image: '/images/practical-categories/easy-parking-spots.png',
    path: '/category/easy-parking-spots',
    badgeKey: 'homepage.practical.parking.badge',
  },
  {
    slug: 'foodie-guide',
    titleKey: 'guides.foodie.title',
    descriptionKey: 'guides.foodie.description',
    tags: ['food', 'dining', 'gastronomy'],
    image: '/images/food/traditional-potosino-main.jpg',
    path: '/guides/foodie-guide',
    badgeKey: 'guides.foodie.badge',
  },
  {
    slug: 'potosino-wine-scene',
    titleKey: 'guides.wine.title',
    descriptionKey: 'guides.wine.description',
    tags: ['wine', 'drinks', 'gastronomy'],
    image: '/images/sponsored/potosino-wine.jpg',
    path: '/guides/potosino-wine-scene',
    badgeKey: 'guides.wine.badge',
  },
];
