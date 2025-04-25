import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  TicketIcon, 
  ShareIcon, 
  ArrowTopRightOnSquareIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';
import { Event } from '@/types';
import { supabase } from '@/lib/supabase';

interface EventDetailProps {
  event: Event | null;
  relatedEvents: Event[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('id, category')
      .order('start_date', { ascending: true });

    if (error) throw error;

    const paths = events?.map((event) => ({
      params: {
        category: event.category,
        id: event.id,
      },
    })) || [];

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching event paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const category = params?.category as string;
    const id = params?.id as string;

    // Fetch the specific event
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    // Fetch related events from the same category
    const { data: relatedEvents, error: relatedError } = await supabase
      .from('events')
      .select('*')
      .eq('category', category)
      .neq('id', id)
      .gte('end_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(3);

    if (relatedError) throw relatedError;

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        event: event || null,
        relatedEvents: relatedEvents || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'es', ['common'])),
        event: null,
        relatedEvents: [],
      },
      revalidate: 3600,
    };
  }
};

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function EventDetail({ event, relatedEvents }: EventDetailProps) {
  const { t } = useTranslation('common');
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando evento...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Evento no encontrado</h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, el evento que estás buscando no existe o ha sido removido.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Ver todos los eventos
          </Link>
        </div>
      </div>
    );
  }

  // Get category label and color
  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { label: string; color: string }> = {
      sports: { label: t('sportsEvents'), color: 'bg-blue-500' },
      cultural: { label: t('culturalEvents'), color: 'bg-purple-500' },
      other: { label: t('otherEvents'), color: 'bg-amber-500' },
    };
    return categoryMap[category] || { label: category, color: 'bg-gray-500' };
  };

  const categoryInfo = getCategoryInfo(event.category);

  return (
    <>
      <Head>
        <title>{event.title} | SLP Descubre</title>
        <meta
          name="description"
          content={event.description || `Detalles del evento ${event.title} en San Luis Potosí`}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gray-900">
          {event.image_url && (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover opacity-40"
              priority
            />
          )}
        </div>
        <div className="relative container mx-auto px-4 py-24 text-white">
          <div className="max-w-4xl">
            <Link
              href="/events"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Todos los eventos
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${categoryInfo.color}`}></span>
              <span className="text-sm font-medium">{categoryInfo.label}</span>
              {event.featured && (
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Destacado
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Fecha</p>
                  <p className="font-medium">
                    {formatDate(event.start_date)}
                    {event.end_date && event.start_date.split('T')[0] !== event.end_date.split('T')[0] && (
                      <> - {formatDate(event.end_date)}</>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <ClockIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Hora</p>
                  <p className="font-medium">
                    {formatTime(event.start_date)} - {formatTime(event.end_date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Ubicación</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                Ver ubicación
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
              <button
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                onClick={() => {
                  navigator.share({
                    title: event.title,
                    text: event.description,
                    url: window.location.href,
                  }).catch(err => console.error('Error sharing:', err));
                }}
              >
                Compartir
                <ShareIcon className="w-5 h-5" />
              </button>
              {event.title.includes('Festival del Vino') && (
                <a
                  href="https://festivaldelvino.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
                >
                  Comprar Boletos
                  <TicketIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 font-serif">Sobre el evento</h2>
              <div className="prose prose-lg max-w-none mb-12">
                <p>{event.description}</p>
              </div>

              {event.title.includes('Festival del Vino') && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-3 text-red-900">Lo que encontrarás en el festival:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Más de 500 vinos de todo el mundo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Bodegas nacionales e internacionales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Cerveza artesanal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Mezcales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Experiencias gastronómicas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Catas premium</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Productos gourmet</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>Música en vivo</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Información del evento</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Fecha</p>
                      <p className="text-gray-600">{formatDate(event.start_date)}</p>
                      {event.end_date && event.start_date.split('T')[0] !== event.end_date.split('T')[0] && (
                        <p className="text-gray-600">{formatDate(event.end_date)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Hora</p>
                      <p className="text-gray-600">
                        {formatTime(event.start_date)} - {formatTime(event.end_date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    Ver en Google Maps
                  </a>
                  {event.title.includes('Festival del Vino') && (
                    <a
                      href="https://festivaldelvino.mx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-red-800 hover:bg-red-900 text-white font-medium px-4 py-3 rounded-lg text-center transition-colors"
                    >
                      Visitar Sitio Oficial
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-serif">Eventos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.category}/${relatedEvent.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {relatedEvent.image_url && (
                      <div className="relative h-48">
                        <Image
                          src={relatedEvent.image_url}
                          alt={relatedEvent.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                        {relatedEvent.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formatDate(relatedEvent.start_date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {relatedEvent.location}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Descubre más eventos en San Luis Potosí</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Explora nuestra agenda completa de eventos deportivos, culturales y de entretenimiento en la ciudad.
          </p>
          <Link
            href="/events"
            className="bg-white hover:bg-white/90 text-primary font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
          >
            Ver todos los eventos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
} 