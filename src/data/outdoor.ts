export interface OutdoorActivity {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  path: string;
  linkTextKey: string;
  badgeKey: string;
  badgeColor: string;
}

export const outdoorActivities: OutdoorActivity[] = [
  {
    slug: 'hiking',
    titleKey: 'homepage.outdoors.hiking.title',
    descriptionKey: 'homepage.outdoors.hiking.description',
    image: '/images/outdoors/hiking.jpg',
    path: '/outdoors#hiking',
    linkTextKey: 'homepage.outdoors.hiking.linkText',
    badgeKey: 'homepage.outdoors.hiking.badge',
    badgeColor: 'bg-green-700',
  },
  {
    slug: 'camping',
    titleKey: 'homepage.outdoors.camping.title',
    descriptionKey: 'homepage.outdoors.camping.description',
    image: '/images/outdoors/camping.jpg',
    path: '/outdoors#camping',
    linkTextKey: 'homepage.outdoors.camping.linkText',
    badgeKey: 'homepage.outdoors.camping.badge',
    badgeColor: 'bg-blue-700',
  },
  {
    slug: 'real-catorce',
    titleKey: 'homepage.outdoors.realCatorce.title',
    descriptionKey: 'homepage.outdoors.realCatorce.description',
    image: '/images/outdoors/real-de-catorce-main.jpg',
    path: '/outdoors#real-catorce',
    linkTextKey: 'homepage.outdoors.realCatorce.linkText',
    badgeKey: 'homepage.outdoors.realCatorce.badge',
    badgeColor: 'bg-purple-700',
  },
  {
    slug: 'media-luna',
    titleKey: 'homepage.outdoors.mediaLuna.title',
    descriptionKey: 'homepage.outdoors.mediaLuna.description',
    image: '/images/outdoors/media-luna.jpg',
    path: '/outdoors#media-luna',
    linkTextKey: 'homepage.outdoors.mediaLuna.linkText',
    badgeKey: 'homepage.outdoors.mediaLuna.badge',
    badgeColor: 'bg-cyan-700',
  },
  {
    slug: 'huasteca',
    titleKey: 'homepage.outdoors.huasteca.title',
    descriptionKey: 'homepage.outdoors.huasteca.description',
    image: '/images/outdoors/huasteca-waterfall.jpg',
    path: '/outdoors#huasteca',
    linkTextKey: 'homepage.outdoors.huasteca.linkText',
    badgeKey: 'homepage.outdoors.huasteca.badge',
    badgeColor: 'bg-teal-700',
  },
  {
    slug: 'xilitla',
    titleKey: 'homepage.outdoors.xilitla.title',
    descriptionKey: 'homepage.outdoors.xilitla.description',
    image: '/images/outdoors/xilitla.webp',
    path: '/outdoors#xilitla',
    linkTextKey: 'homepage.outdoors.xilitla.linkText',
    badgeKey: 'homepage.outdoors.xilitla.badge',
    badgeColor: 'bg-pink-700',
  },
];
