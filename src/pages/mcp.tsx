import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from '@/components/common/SEO';
import CopyButton from '@/components/mcp/CopyButton';
import ClientTabs from '@/components/mcp/ClientTabs';
import ToolsTable from '@/components/mcp/ToolsTable';
import McpFAQ, { buildMcpFaqSchema } from '@/components/mcp/McpFAQ';

const MCP_CONFIG = `{
  "mcpServers": {
    "SanLuisWay": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp-server"]
    }
  }
}`;

const CAPABILITIES = [
  { key: 'cap1', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { key: 'cap2', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { key: 'cap3', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { key: 'cap4', icon: 'M3 21l7.5-7.5M21 3l-7.5 7.5M12 3v4m0 14v-4m9-5h-4M7 12H3m15.364-6.364l-2.828 2.828M9.464 14.536l-2.828 2.828m0-11.314l2.828 2.828m5.072 5.072l2.828 2.828' },
  { key: 'cap5', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4' },
  { key: 'cap6', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
];

const PROMPTS = ['prompt1', 'prompt2', 'prompt3', 'prompt4', 'prompt5'] as const;

export default function McpPage() {
  const { t } = useTranslation('common');

  const faqItems = Array.from({ length: 4 }, (_, i) => ({
    q: t(`mcpPage.faq${i + 1}q`),
    a: t(`mcpPage.faq${i + 1}a`),
  }));

  return (
    <>
      <SEO
        title={`${t('mcpPage.pageTitle')} | San Luis Way`}
        description={t('mcpPage.pageSubtitle')}
        keywords="MCP server, Model Context Protocol, San Luis Potosi, Claude Desktop, Cursor, AI agent, structured data"
        ogType="website"
        structuredData={buildMcpFaqSchema(faqItems)}
      />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,122,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-[#6666b3] text-sm font-mono px-4 py-1.5 rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {t('mcpPage.heroTag')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('mcpPage.pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto">
            {t('mcpPage.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-[#161b22]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{t('mcpPage.quickStartTitle')}</h2>
          <p className="text-[#8b949e] mb-8">{t('mcpPage.quickStartDesc')}</p>
          <div className="text-left">
            <p className="text-xs text-[#8b949e] font-mono mb-1">Claude Desktop &middot; claude_desktop_config.json</p>
            <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-xs text-[#e6edf3] overflow-x-auto relative border border-[#30363d]">
              <CopyButton text={MCP_CONFIG} />
              <pre>{MCP_CONFIG}</pre>
            </div>
            <div className="mt-3 space-y-1 text-xs text-[#8b949e] font-mono">
              <p>{t('mcpPage.configPathMac')}</p>
              <p>{t('mcpPage.configPathWin')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Tabs */}
      <ClientTabs />

      {/* Capabilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('mcpPage.capabilitiesTitle')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {CAPABILITIES.map(({ key, icon }) => (
              <div key={key} className="bg-gray-50 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-3">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">{t(`mcpPage.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Table */}
      <ToolsTable />

      {/* Example Prompts */}
      <section className="py-16 bg-[#161b22]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            {t('mcpPage.examplePromptsTitle')}
          </h2>
          <p className="text-center text-[#8b949e] mb-8">{t('mcpPage.examplePromptsDesc')}</p>
          <div className="space-y-3">
            {PROMPTS.map((key) => (
              <div key={key} className="bg-[#0d1117] rounded-lg px-5 py-3 border border-[#30363d] font-mono text-sm text-[#e6edf3]">
                <span className="text-[#6666b3]">&gt;</span> {t(`mcpPage.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is MCP? */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('mcpPage.whatIsMcpTitle')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{t('mcpPage.whatIsMcpText')}</p>
          <Link href="/agent-connect" className="inline-block mt-6 text-sm text-secondary hover:underline font-medium">
            &larr; {t('agentConnect.pageTitle')}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <McpFAQ />
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
