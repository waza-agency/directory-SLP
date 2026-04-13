import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from '@/components/common/SEO';
import CopyButton from '@/components/mcp/CopyButton';
import CliCommandsTable from '@/components/cli/CliCommandsTable';
import CliComparison from '@/components/cli/CliComparison';
import CliFAQ, { buildCliFaqSchema } from '@/components/cli/CliFAQ';

const QUICK_START_CMD = 'npx @sanluisway/cli events --limit 5 --json';
const INSTALL_GLOBAL = 'npm install -g @sanluisway/cli';
const INSTALL_NPX = 'npx @sanluisway/cli --help';

const EXAMPLES = `# List this weekend's events
npx @sanluisway/cli events --limit 10 --json

# Get details for a specific event
npx @sanluisway/cli event fenapo-2026

# Find restaurants in Centro Historico
npx @sanluisway/cli places --category restaurant --limit 5

# Get a specific place
npx @sanluisway/cli place cafe-tipico

# List travel guides
npx @sanluisway/cli guides

# Check the weather
npx @sanluisway/cli weather --json

# Get latest news
npx @sanluisway/cli news --limit 3

# Search across all data
npx @sanluisway/cli search "tacos al pastor"

# Get exchange rates
npx @sanluisway/cli exchange-rates

# Explore outdoor activities
npx @sanluisway/cli outdoor --limit 5 --json`;

const JSON_ENVELOPE = `{
  "ok": true,
  "data": [ ... ],
  "meta": {
    "total": 42,
    "limit": 5,
    "source": "sanluisway.com"
  }
}`;

export default function CliPage() {
  const { t } = useTranslation('common');

  const faqItems = Array.from({ length: 4 }, (_, i) => ({
    q: t(`cliPage.faq${i + 1}q`),
    a: t(`cliPage.faq${i + 1}a`),
  }));

  return (
    <>
      <SEO
        title={`${t('cliPage.pageTitle')} | San Luis Way`}
        description={t('cliPage.pageSubtitle')}
        keywords="CLI, command line, San Luis Potosi, terminal, npx, npm, developer tools, API, JSON"
        ogType="website"
        structuredData={buildCliFaqSchema(faqItems)}
      />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,122,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-[#6666b3] text-sm font-mono px-4 py-1.5 rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {t('cliPage.heroTag')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('cliPage.pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto">
            {t('cliPage.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-[#161b22]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{t('cliPage.quickStartTitle')}</h2>
          <p className="text-[#8b949e] mb-8">{t('cliPage.quickStartDesc')}</p>
          <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm text-[#e6edf3] overflow-x-auto relative border border-[#30363d] text-left">
            <CopyButton text={QUICK_START_CMD} />
            <span className="text-primary">$</span> {QUICK_START_CMD}
          </div>
        </div>
      </section>

      {/* OpenClaw */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('cliPage.openClawTitle')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{t('cliPage.openClawDesc')}</p>
          <a
            href="https://clawhub.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
          >
            {t('cliPage.openClawLink')} &rarr;
          </a>
        </div>
      </section>

      {/* Install */}
      <section className="py-16 bg-[#161b22]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">{t('cliPage.installTitle')}</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#8b949e] font-mono mb-1">{t('cliPage.installGlobalLabel')}</p>
              <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm text-[#e6edf3] overflow-x-auto relative border border-[#30363d]">
                <CopyButton text={INSTALL_GLOBAL} />
                <span className="text-primary">$</span> {INSTALL_GLOBAL}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#8b949e] font-mono mb-1">{t('cliPage.installOnDemandLabel')}</p>
              <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm text-[#e6edf3] overflow-x-auto relative border border-[#30363d]">
                <CopyButton text={INSTALL_NPX} />
                <span className="text-primary">$</span> {INSTALL_NPX}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Table */}
      <CliCommandsTable />

      {/* Example Commands */}
      <section className="py-16 bg-[#161b22]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-2">{t('cliPage.examplesTitle')}</h2>
          <p className="text-center text-[#8b949e] mb-8">{t('cliPage.examplesDesc')}</p>
          <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-xs text-[#e6edf3] overflow-x-auto relative border border-[#30363d]">
            <CopyButton text={EXAMPLES} />
            <pre>{EXAMPLES}</pre>
          </div>
        </div>
      </section>

      {/* JSON Output */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('cliPage.jsonTitle')}</h2>
          <p className="text-gray-600 mb-8">{t('cliPage.jsonDesc')}</p>
          <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-sm text-[#e6edf3] overflow-x-auto relative border border-[#30363d] text-left">
            <CopyButton text={JSON_ENVELOPE} />
            <pre>{JSON_ENVELOPE}</pre>
          </div>
        </div>
      </section>

      {/* CLI vs MCP */}
      <CliComparison />

      {/* Back link */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <Link href="/agent-connect" className="text-sm text-secondary hover:underline font-medium">
            &larr; {t('agentConnect.pageTitle')}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <CliFAQ />
    </>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
}
