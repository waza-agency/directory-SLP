import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  BeakerIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

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
  let colorClass = 'bg-gray-100 text-gray-800 ring-gray-200';
  let label = 'Unknown';

  if (numericScore >= 8) {
    colorClass = 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 ring-green-200';
    label = 'Highly Reliable';
  } else if (numericScore >= 6) {
    colorClass = 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 ring-yellow-200';
    label = 'Moderately Reliable';
  } else if (numericScore >= 4) {
    colorClass = 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-800 ring-orange-200';
    label = 'Low Reliability';
  } else if (numericScore > 0) {
    colorClass = 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 ring-red-200';
    label = 'Unreliable';
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ring-2 ${colorClass}`}>
        {score}/10
      </span>
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </div>
  );
}

function FactCheckCard({ factcheck, index }: { factcheck: FactCheck; index: number }) {
  const percentage = factcheck.totalClaims > 0
    ? Math.round((factcheck.trueCount / factcheck.totalClaims) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/blog/factchecks/${factcheck.slug}`} legacyBehavior>
        <a className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 group-hover:text-blue-600 transition-colors">
                  {factcheck.title}
                </h2>
                <ScoreBadge score={factcheck.reliabilityScore} />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <DocumentMagnifyingGlassIcon className="w-4 h-4" />
                <span>Verified: {factcheck.verificationDate}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-100">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-green-700">{factcheck.trueCount}</span>
                    <span className="text-xs text-green-600">True</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-50 border border-yellow-100">
                  <ShieldCheckIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-yellow-700">{factcheck.partiallyTrueCount}</span>
                    <span className="text-xs text-yellow-600">Partial</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-700">{factcheck.unverifiableCount}</span>
                    <span className="text-xs text-gray-600">Unclear</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {factcheck.totalClaims} claims analyzed
                    </div>
                    <div className="text-xs text-gray-500">
                      {percentage}% verified true
                    </div>
                  </div>
                </div>
                <span className="text-sm text-blue-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                  Read report
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}

function ReliabilityLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 mb-8"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <LightBulbIcon className="w-6 h-6 text-blue-600" />
        Reliability Score Guide
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">English</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">8-10</span>
              </div>
              <span className="text-sm text-gray-700">Highly Reliable - Most claims verified with primary sources</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-800">6-7.9</span>
              </div>
              <span className="text-sm text-gray-700">Moderately Reliable - Some claims need additional verification</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-orange-800">4-5.9</span>
              </div>
              <span className="text-sm text-gray-700">Low Reliability - Multiple unverified claims</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-red-800">&lt;4</span>
              </div>
              <span className="text-sm text-gray-700">Unreliable - Majority of claims cannot be verified</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Español</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">8-10</span>
              </div>
              <span className="text-sm text-gray-700">Alta Confiabilidad - Mayoría verificada con fuentes primarias</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-800">6-7.9</span>
              </div>
              <span className="text-sm text-gray-700">Confiabilidad Moderada - Algunas afirmaciones requieren verificación</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-orange-800">4-5.9</span>
              </div>
              <span className="text-sm text-gray-700">Baja Confiabilidad - Múltiples afirmaciones sin verificar</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-red-800">&lt;4</span>
              </div>
              <span className="text-sm text-gray-700">No Confiable - Mayoría de afirmaciones no verificables</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MethodologyCard() {
  const steps = [
    {
      icon: BeakerIcon,
      titleEn: 'AI-Powered Analysis',
      titleEs: 'Análisis con IA',
      descEn: 'Specialized AI agents scan and analyze current web information',
      descEs: 'Agentes de IA especializados escanean y analizan información web actual',
      color: 'blue'
    },
    {
      icon: MagnifyingGlassIcon,
      titleEn: 'Source Verification',
      titleEs: 'Verificación de Fuentes',
      descEn: 'Each claim is checked against government data, academic sources, and reputable outlets',
      descEs: 'Cada afirmación se verifica con datos gubernamentales, fuentes académicas y medios reconocidos',
      color: 'purple'
    },
    {
      icon: ChartBarIcon,
      titleEn: 'Scoring & Reports',
      titleEs: 'Puntuación e Informes',
      descEn: 'Comprehensive reports with reliability scores and primary source links',
      descEs: 'Informes completos con puntuaciones de confiabilidad y enlaces a fuentes primarias',
      color: 'indigo'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BeakerIcon className="w-7 h-7" />
          Our Methodology
        </h2>
        <p className="text-blue-100 mt-1">Nuestra Metodología</p>
      </div>

      {/* Proprietary AI Tools Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border-b border-indigo-100 px-6 py-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-indigo-900 leading-relaxed">
              <strong>Our AI verification tools are developed in-house</strong> by the San Luis Way team in collaboration with{' '}
              <a href="https://waza.baby" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-700 hover:text-purple-900 underline decoration-purple-300 hover:decoration-purple-500 transition-colors">
                waza.baby
              </a>
              . We continuously improve our algorithms to ensure more accurate and comprehensive fact-checking.
            </p>
            <p className="text-sm text-indigo-700 mt-2 leading-relaxed">
              <strong>Nuestras herramientas de verificación con IA son desarrolladas internamente</strong> por el equipo de San Luis Way en colaboración con{' '}
              <a href="https://waza.baby" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-700 hover:text-purple-900 underline decoration-purple-300 hover:decoration-purple-500 transition-colors">
                waza.baby
              </a>
              . Mejoramos continuamente nuestros algoritmos para asegurar una verificación más precisa y completa.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${step.color}-50 to-${step.color}-100 rounded-xl opacity-50`} />
              <div className="relative p-5">
                <div className={`w-12 h-12 bg-${step.color}-600 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{step.titleEn}</h3>
                <h4 className="text-sm font-semibold text-gray-600 mb-2">{step.titleEs}</h4>
                <p className="text-sm text-gray-700 mb-2">{step.descEn}</p>
                <p className="text-sm text-gray-600">{step.descEs}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CollaborationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-amber-200 overflow-hidden mb-8 shadow-lg"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Collaborate With Us / Colabora con Nosotros
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-amber-800 mb-3 leading-relaxed">
                  We acknowledge that some historical or statistical data cannot always be verified with absolute certainty.
                  Information about San Luis Potosí is constantly evolving.
                </p>
                <p className="text-amber-800 mb-4 leading-relaxed">
                  If you have <strong>verified information, primary sources, or official documentation</strong>,
                  we would love to hear from you. We are committed to building the most complete and accurate information base about our region.
                </p>
              </div>
              <div>
                <p className="text-amber-800 mb-3 leading-relaxed">
                  Reconocemos que algunos datos históricos o estadísticos no siempre pueden verificarse con certeza absoluta.
                  La información sobre San Luis Potosí está en constante evolución.
                </p>
                <p className="text-amber-800 mb-4 leading-relaxed">
                  Si cuentas con <strong>información verificada, fuentes primarias o documentación oficial</strong>,
                  nos encantaría escucharte. Estamos comprometidos con construir la base de información más completa y precisa sobre nuestra región.
                </p>
              </div>
            </div>

            <Link href="/contact" legacyBehavior>
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <UsersIcon className="w-5 h-5" />
                Contact us to collaborate / Contáctanos para colaborar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FactChecksPage({ factchecks }: FactChecksPageProps) {
  return (
    <>
      <SEO
        title="Fact-Check Reports | San Luis Way"
        description="Transparent fact-checking using AI agents. We verify claims with primary sources and welcome community collaboration to build the most accurate information about San Luis Potosí."
        keywords="fact check, verification, sources, transparency, san luis potosi, AI, artificial intelligence"
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

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50" />

          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 shadow-2xl border border-white/20"
              >
                <ShieldCheckIcon className="w-11 h-11 text-white" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Fact-Check Reports
                <span className="block text-2xl md:text-3xl font-semibold text-blue-200 mt-3">
                  Informes de Verificación
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-4 leading-relaxed">
                Transparency matters. Truth matters.
              </p>
              <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                We verify every claim in our articles using AI-powered analysis and share our sources
                so you can check them yourself. Because credibility is built on evidence, not promises.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">{factchecks.length}</div>
                  <div className="text-sm text-blue-200">Reports Published</div>
                  <div className="text-xs text-blue-300">Informes Publicados</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">
                    {factchecks.reduce((acc, fc) => acc + fc.totalClaims, 0)}
                  </div>
                  <div className="text-sm text-blue-200">Claims Verified</div>
                  <div className="text-xs text-blue-300">Afirmaciones Verificadas</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-blue-200">Transparency</div>
                  <div className="text-xs text-blue-300">Transparencia</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <ReliabilityLegend />
            <MethodologyCard />
            <CollaborationBanner />

            {/* Fact Check Reports Section */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Published Reports
                </h2>
                <p className="text-gray-600">Informes Publicados</p>
              </motion.div>

              {factchecks.length > 0 ? (
                <div className="grid gap-6">
                  {factchecks.map((factcheck, index) => (
                    <FactCheckCard key={factcheck.slug} factcheck={factcheck} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-gray-300"
                >
                  <DocumentMagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-600 mb-2">No fact-check reports available yet.</p>
                  <p className="text-gray-500">Check back soon for verified content.</p>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center pt-8 border-t border-gray-200"
            >
              <Link href="/blog" legacyBehavior>
                <a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg group transition-colors">
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blog / Volver al Blog
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
