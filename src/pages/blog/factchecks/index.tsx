import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface FactCheck {
  slug: string;
  title: string;
  articleUrl: string;
  verificationDate: string;
  reliabilityScore: string;
  totalClaims: number;
  trueCount: number;
  partiallyTrueCount: number;
  unverifiableCount: number;
}

interface FactChecksPageProps {
  factchecks: FactCheck[];
}

function parseMarkdownForMeta(content: string): Partial<FactCheck> {
  const titleMatch = content.match(/^# (.+)$/m);
  const urlMatch = content.match(/\*\*Source Analyzed:\*\* (.+)$/m);
  const dateMatch = content.match(/\*\*Verification Date:\*\* (.+)$/m);
  const scoreMatch = content.match(/\*\*Overall Reliability Score:\*\* (.+)$/m);
  const totalMatch = content.match(/\*\*Total Claims Analyzed\*\* \| (\d+)/);
  const trueMatch = content.match(/Verified TRUE \| (\d+)/);
  const partialMatch = content.match(/PARTIALLY TRUE \| (\d+)/);
  const unverifiableMatch = content.match(/UNVERIFIABLE \| (\d+)/);

  return {
    title: titleMatch ? titleMatch[1].replace('Fact-Check Investigation Report: ', '') : 'Untitled',
    articleUrl: urlMatch ? urlMatch[1] : '',
    verificationDate: dateMatch ? dateMatch[1] : '',
    reliabilityScore: scoreMatch ? scoreMatch[1] : '',
    totalClaims: totalMatch ? parseInt(totalMatch[1]) : 0,
    trueCount: trueMatch ? parseInt(trueMatch[1]) : 0,
    partiallyTrueCount: partialMatch ? parseInt(partialMatch[1]) : 0,
    unverifiableCount: unverifiableMatch ? parseInt(unverifiableMatch[1]) : 0,
  };
}

export const getStaticProps: GetStaticProps<FactChecksPageProps> = async ({ locale }) => {
  const factchecksDir = path.join(process.cwd(), 'public', 'factchecks');

  let factchecks: FactCheck[] = [];

  if (fs.existsSync(factchecksDir)) {
    const files = fs.readdirSync(factchecksDir).filter(f => f.endsWith('.md'));

    factchecks = files.map(file => {
      const slug = file.replace('.md', '');
      const content = fs.readFileSync(path.join(factchecksDir, file), 'utf-8');
      const meta = parseMarkdownForMeta(content);

      return {
        slug,
        title: meta.title || slug,
        articleUrl: meta.articleUrl || '',
        verificationDate: meta.verificationDate || '',
        reliabilityScore: meta.reliabilityScore || '',
        totalClaims: meta.totalClaims || 0,
        trueCount: meta.trueCount || 0,
        partiallyTrueCount: meta.partiallyTrueCount || 0,
        unverifiableCount: meta.unverifiableCount || 0,
      };
    });
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      factchecks,
    },
  };
};

function ScoreBadge({ score }: { score: string }) {
  const numericScore = parseFloat(score);
  let colorClass = 'bg-gray-100 text-gray-800';

  if (numericScore >= 8) {
    colorClass = 'bg-green-100 text-green-800';
  } else if (numericScore >= 6) {
    colorClass = 'bg-yellow-100 text-yellow-800';
  } else if (numericScore >= 4) {
    colorClass = 'bg-orange-100 text-orange-800';
  } else if (numericScore > 0) {
    colorClass = 'bg-red-100 text-red-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {score}
    </span>
  );
}

function FactCheckCard({ factcheck }: { factcheck: FactCheck }) {
  return (
    <Link href={`/blog/factchecks/${factcheck.slug}`} legacyBehavior>
      <a className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1 pr-4">
              {factcheck.title}
            </h2>
            <ScoreBadge score={factcheck.reliabilityScore} />
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Verificado: {factcheck.verificationDate}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-50 text-green-700">
              {factcheck.trueCount} Verificado
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-50 text-yellow-700">
              {factcheck.partiallyTrueCount} Parcial
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-50 text-gray-700">
              {factcheck.unverifiableCount} No verificable
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <strong>{factcheck.totalClaims}</strong> afirmaciones analizadas
          </div>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <span className="text-sm text-blue-600 font-medium">
            Ver reporte completo &rarr;
          </span>
        </div>
      </a>
    </Link>
  );
}

export default function FactChecksPage({ factchecks }: FactChecksPageProps) {
  return (
    <>
      <SEO
        title="Reportes de Verificación | San Luis Way"
        description="Verificación transparente de nuestro contenido. Utilizamos IA y agentes especializados para validar información con fuentes primarias. Abiertos a colaboración."
        keywords="fact check, verificación, fuentes, transparencia, san luis potosi, periodismo, inteligencia artificial"
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "San Luis Way Fact-Check Reports",
              "description": "Transparent fact-checking of blog content with detailed source verification",
              "url": "https://www.sanluisway.com/blog/factchecks",
              "publisher": {
                "@type": "Organization",
                "name": "San Luis Way"
              }
            })
          }}
        />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Reportes de Verificación
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La transparencia es importante. Verificamos las afirmaciones de nuestros artículos y compartimos nuestras fuentes para que puedas consultarlas.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Nuestra Metodología</h2>
                <p className="text-blue-800 text-sm mb-3">
                  Utilizamos <strong>tecnología de inteligencia artificial y agentes especializados</strong> desarrollados
                  por nuestro equipo que buscan y analizan información actualizada en la web para verificar cada
                  afirmación de nuestros artículos.
                </p>
                <p className="text-blue-800 text-sm">
                  Cada reporte incluye: verificación punto por punto, enlaces a fuentes primarias,
                  puntuación de confiabilidad y un veredicto claro para cada declaración. Consultamos
                  datos gubernamentales, fuentes académicas y medios de comunicación reconocidos.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-amber-900 mb-2">Colabora con Nosotros</h2>
                <p className="text-amber-800 text-sm mb-3">
                  Reconocemos que algunos datos históricos o estadísticos no siempre pueden ser
                  verificados con certeza absoluta. La información sobre San Luis Potosí está en
                  constante evolución.
                </p>
                <p className="text-amber-800 text-sm">
                  Si cuentas con <strong>información verificada, fuentes primarias o documentación oficial</strong> que
                  pueda enriquecer nuestro contenido, nos encantaría escucharte. Estamos comprometidos
                  con construir la base de información más completa y precisa sobre nuestra región.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center mt-3 text-sm font-medium text-amber-700 hover:text-amber-900"
                >
                  Contáctanos para colaborar
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {factchecks.length > 0 ? (
            <div className="grid gap-6">
              {factchecks.map((factcheck) => (
                <FactCheckCard key={factcheck.slug} factcheck={factcheck} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Aún no hay reportes de verificación disponibles.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog" legacyBehavior>
              <a className="text-blue-600 hover:text-blue-800 font-medium">
                &larr; Volver al Blog
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
