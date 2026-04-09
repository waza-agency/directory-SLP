import Link from 'next/link';
import { useRouter } from 'next/router';
import NewsletterSignup from '@/components/NewsletterSignup';
import { ConversionEvents } from '@/lib/analytics';

interface RelatedLink {
  href: string;
  label: string;
  labelEs: string;
}

interface GuideCTAProps {
  relatedLinks: RelatedLink[];
}

export default function GuideCTA({ relatedLinks }: GuideCTAProps) {
  const { locale, asPath } = useRouter();
  const isEs = locale === 'es';

  return (
    <div className="mt-12 space-y-8">
      {/* Related content */}
      <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {isEs ? 'También te puede interesar' : 'You might also like'}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 font-medium text-sm"
              onClick={() => ConversionEvents.ctaClick('related-link', link.label, asPath)}
            >
              <span className="text-blue-600">→</span>
              {isEs ? link.labelEs : link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter inline signup */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">
            {isEs ? 'Recibe lo mejor de SLP en tu inbox' : 'Get the best of SLP in your inbox'}
          </h2>
          <p className="text-blue-100 mb-6 text-sm">
            {isEs
              ? 'Eventos gratis, nuevos restaurantes, guías actualizadas — cada semana.'
              : 'Free events, new restaurants, updated guides — every week.'}
          </p>
          <NewsletterSignup variant="footer" />
        </div>
      </section>
    </div>
  );
}
