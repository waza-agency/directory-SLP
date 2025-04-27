import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

export default function FestivalDelVino() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('festivalVino.pageTitle', 'International Wine Festival of San Luis Potosí 2025 | SLP Discover')}</title>
        <meta 
          name="description" 
          content={t('festivalVino.pageDescription', 'International Wine Festival 2025 in San Luis Potosí - Discover over 500 wines from around the world, national and international wineries, gastronomic experiences and much more.')}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-red-800/90">
          <Image
            src="/images/events/festival-del-vino.jpg"
            alt={t('festivalVino.title', 'International Wine Festival')}
            fill
            className="mix-blend-overlay object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-white">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-medium">{t('festivalVino.date', 'June 6 & 7, 2025')}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              {t('festivalVino.title', 'International Wine Festival of San Luis Potosí')}
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              {t('festivalVino.heroDescription', 'A unique experience for wine, gastronomy, and culture lovers in the heart of San Luis Potosí.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://festivaldelvino.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-white/90 text-red-900 font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('festivalVino.officialSite', 'Official Website')}
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
              <a
                href="https://festivaldelvino.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                {t('festivalVino.buyTickets', 'Buy Tickets')}
                <TicketIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 font-serif">{t('festivalVino.aboutFestival', 'About the Festival')}</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p>
                  {t('festivalVino.aboutParagraph1', 'The International Wine Festival of San Luis Potosí is one of the most important wine events in Mexico. For two days, the Arts Center transforms into a meeting point for wine lovers, sommeliers, producers, and gastronomy enthusiasts.')}
                </p>
                <p>
                  {t('festivalVino.aboutParagraph2', 'With more than 500 wines from around the world, national and international wineries, premium tastings, gastronomic experiences, and cultural events, the festival offers a complete experience for all attendees.')}
                </p>

                <h3>{t('festivalVino.whatYouWillFind', 'What you will find at the festival:')}</h3>
                <ul>
                  <li>{t('festivalVino.feature1', 'More than 500 wines from around the world')}</li>
                  <li>{t('festivalVino.feature2', 'National and international wineries')}</li>
                  <li>{t('festivalVino.feature4', 'Craft beer')}</li>
                  <li>{t('festivalVino.feature5', 'Mezcals')}</li>
                  <li>{t('festivalVino.feature3', 'Gastronomic experiences and premium tastings')}</li>
                  <li>{t('festivalVino.feature6', 'Premium tastings')}</li>
                  <li>{t('festivalVino.feature7', 'Gourmet products')}</li>
                  <li>{t('festivalVino.feature8', 'Winemakers and international guests')}</li>
                  <li>{t('festivalVino.feature9', 'Artwork')}</li>
                  <li>{t('festivalVino.feature10', 'Live music')}</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-3 text-red-900">{t('festivalVino.festivalZones', 'Festival Zones')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">{t('festivalVino.wineZone', 'Wine Tasting Zone')}</h4>
                    <p className="text-gray-600 text-sm">By Aeroméxico</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">{t('festivalVino.beerZone', 'Beer Fest Zone')}</h4>
                    <p className="text-gray-600 text-sm">By Heineken</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">{t('festivalVino.gastronomicZone', 'Gastronomic Zone')}</h4>
                    <p className="text-gray-600 text-sm">By Fiesta Americana</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">{t('festivalVino.tastingZone', 'Tastings and Pairing Zone')}</h4>
                    <p className="text-gray-600 text-sm">By Toneles</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">{t('festivalVino.argentinaZone', 'Argentina Zone')}</h4>
                    <p className="text-gray-600 text-sm">{t('festivalVino.argentineSpecialties', 'Argentine specialties')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">{t('festivalVino.wineCircus', 'Wine Circus')}</h4>
                    <p className="text-gray-600 text-sm">{t('festivalVino.thematicEntertainment', 'Thematic entertainment')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">{t('festivalVino.eventInfo', 'Event Information')}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('festivalVino.dateLabel', 'Date')}</p>
                      <p className="text-gray-600">{t('festivalVino.dateValue', 'June 6 & 7, 2025')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('festivalVino.locationLabel', 'Location')}</p>
                      <p className="text-gray-600">{t('festivalVino.locationValue1', 'Centro de las Artes')}</p>
                      <p className="text-gray-600">{t('festivalVino.locationValue2', 'San Luis Potosí, Mexico')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TicketIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('festivalVino.ticketsLabel', 'Tickets')}</p>
                      <div className="space-y-2 mt-2">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{t('festivalVino.silverAccess', 'Silver Access')}</p>
                          <p className="text-gray-600 text-sm">{t('festivalVino.silverPrice', '$899 MXN per person')}</p>
                          <p className="text-xs text-green-600">{t('festivalVino.specialPromo', 'Special promotion until May 15')}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{t('festivalVino.vipAccess', 'VIP Access')}</p>
                          <p className="text-gray-600 text-sm">{t('festivalVino.checkPrices', 'Check prices')}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{t('festivalVino.premiumTastings', 'Premium Tastings')}</p>
                          <p className="text-gray-600 text-sm">{t('festivalVino.additionalCost', 'Additional cost')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a
                    href="https://festivaldelvino.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-red-800 hover:bg-red-900 text-white font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    {t('festivalVino.visitOfficialSite', 'Visit Official Website')}
                  </a>
                  <a
                    href="https://festivaldelvino.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    {t('festivalVino.viewFullProgram', 'View Full Program')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Information */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">{t('festivalVino.travelInfo', 'Travel Information')}</h2>
            <p className="text-lg text-gray-600">
              {t('festivalVino.travelDescription', 'Plan your visit to San Luis Potosí to enjoy the International Wine Festival.')}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Image 
                src="/images/brands/aeromexico-logo.png" 
                alt="Aeroméxico" 
                width={120} 
                height={40} 
                className="object-contain" 
              />
              <div>
                <h3 className="font-medium">{t('festivalVino.specialDiscount', 'Special Discount on Flights')}</h3>
                <p className="text-gray-600 text-sm">{t('festivalVino.discountCode', 'Discount code: IT5MXRC01626C')}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              {t('festivalVino.aeromexicoDiscount', 'AEROMÉXICO has a special discount for you. Travel from anywhere in Mexico and/or USA, just contact the call center to get a quote for your flight.')}
            </p>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
              <p>{t('festivalVino.phone', 'Phone: 55 5133 4000')}</p>
              <p>{t('festivalVino.mentionCode', 'Mention the discount code when making your reservation.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Information Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">{t('festivalVino.visitorInfo', 'Visitor Information')}</h2>
            <p className="text-lg text-gray-600">
              {t('festivalVino.visitorDescription', 'Helpful information for visitors attending the International Wine Festival, especially those coming from out of town.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Accommodation Section */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('festivalVino.accommodation', 'Accommodation')}</h3>
              <p className="text-gray-700 mb-4">
                {t('festivalVino.accommodationDesc', 'San Luis Potosí offers a range of accommodation options for all budgets. We recommend booking in advance as rooms fill up quickly during the festival.')}
              </p>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{t('festivalVino.luxuryHotels', 'Luxury Hotels')}</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• {t('festivalVino.hotelOption1', 'Hyatt Regency San Luis Potosí - Festival special rates available')}</li>
                    <li>• {t('festivalVino.hotelOption2', 'Hilton San Luis Potosí - Downtown location')}</li>
                    <li>• {t('festivalVino.hotelOption3', 'Hotel Museo Palacio De San Agustín - Historic building')}</li>
                  </ul>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{t('festivalVino.midrangeHotels', 'Mid-range Options')}</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• {t('festivalVino.hotelOption4', 'City Express Plus - Modern accommodations')}</li>
                    <li>• {t('festivalVino.hotelOption5', 'Hotel Real de Minas - Festival shuttle service')}</li>
                    <li>• {t('festivalVino.hotelOption6', 'Hotel Fiesta Inn - Business district')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{t('festivalVino.budgetHotels', 'Budget-Friendly Stays')}</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• {t('festivalVino.hotelOption7', 'Hotel Panorama - Simple and central')}</li>
                    <li>• {t('festivalVino.hotelOption8', 'Maria Dolores Hotel - Good value option')}</li>
                    <li>• {t('festivalVino.hotelOption9', 'Various vacation rentals through Airbnb and VRBO')}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 p-3 rounded text-sm text-blue-800">
                <p className="font-medium">{t('festivalVino.specialOffer', 'Special Offer')}</p>
                <p>{t('festivalVino.specialOfferDesc', 'Mention "Wine Festival 2025" when booking at partner hotels for special rates and perks.')}</p>
              </div>
            </div>
            
            {/* Visitor Tips Section */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{t('festivalVino.visitorTips', 'Visitor Tips')}</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{t('festivalVino.gettingAround', 'Getting Around')}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('festivalVino.gettingAroundDesc', 'The festival venue is easily accessible by taxi or rideshare. Several hotels offer shuttle services to and from the venue. For exploring the city, consider rideshare apps (Uber, DiDi) which are widely available and affordable.')}
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{t('festivalVino.festivalTips', 'Festival Tips')}</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• {t('festivalVino.festivalTip1', 'Arrive early to avoid crowds and enjoy premium tasting sessions')}</li>
                    <li>• {t('festivalVino.festivalTip2', 'Download the official festival app for schedules and maps')}</li>
                    <li>• {t('festivalVino.festivalTip3', 'Use the spittoons available for wine tasting so you can enjoy more varieties')}</li>
                    <li>• {t('festivalVino.festivalTip4', 'Stay hydrated: water stations are available throughout the venue')}</li>
                    <li>• {t('festivalVino.festivalTip5', 'Bring a wine journal to note your favorite discoveries')}</li>
                  </ul>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h4 className="font-medium text-primary">{t('festivalVino.whatToSee', 'What to See in SLP')}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('festivalVino.whatToSeeDesc', 'While in town for the festival, take time to explore San Luis Potosí\'s UNESCO-listed historic center with its beautiful colonial architecture, Plaza de Armas, and the impressive San Luis Potosí Cathedral.')}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('festivalVino.whatToSeeMore', 'Don\'t miss the Mask Museum, Regional Museum, and Centro de las Artes (festival venue) which was once a penitentiary and now houses fascinating art exhibits.')}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">{t('festivalVino.language', 'Language')}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('festivalVino.languageDesc', 'While Spanish is the primary language, many festival staff speak English. The festival provides bilingual signage and materials. Basic Spanish phrases are appreciated by locals, but you can get by with English at most tourist establishments.')}
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-yellow-50 p-3 rounded text-sm text-yellow-800">
                <p className="font-medium">{t('festivalVino.insiderTip', 'Insider Tip')}</p>
                <p>{t('festivalVino.insiderTipDesc', 'The VIP access includes a guided tour of exclusive cellars not open to the general public, making it well worth the extra cost for wine enthusiasts.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-800 to-purple-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">{t('festivalVino.dontMissOut', "Don't Miss Out!")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('festivalVino.ctaDescription', 'The International Wine Festival is a unique experience that you cannot miss. Secure your spot and enjoy an unforgettable wine experience.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://festivaldelvino.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-white/90 text-red-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {t('festivalVino.buyTickets', 'Buy Tickets')}
              <TicketIcon className="w-5 h-5" />
            </a>
            <Link
              href="/events"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              {t('festivalVino.viewOtherEvents', 'View Other Events')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 