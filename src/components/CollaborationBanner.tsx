import { EnvelopeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CollaborationBanner() {
  return (
    <section className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Building Together / Construyendo Juntos
              </h3>

              <p className="text-slate-600 mb-2">
                We&apos;re creating a collective information platform for San Luis Potosí.
                Have something to share or want to collaborate? We&apos;d love to hear from you!
              </p>

              <p className="text-slate-500 text-sm">
                Estamos creando una plataforma de información colectiva para San Luis Potosí.
                ¿Tienes algo que compartir o quieres colaborar? ¡Nos encantaría saber de ti!
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
