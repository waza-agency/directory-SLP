import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from '@/components/common/SEO';
import DataCategoryGrid from '@/components/agent-connect/DataCategoryGrid';
import AgentFAQ, { buildAgentFaqSchema } from '@/components/agent-connect/AgentFAQ';

const MCP_CONFIG = `{
  "mcpServers": {
    "sanluisway": {
      "command": "npx",
      "args": ["-y", "@sanluisway/mcp"]
    }
  }
}`;

const CLI_COMMAND = 'npx @sanluisway/cli events --limit 5 --json';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="absolute top-3 right-3 text-xs text-[#8b949e] hover:text-white transition-colors">
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function AgentConnectPage() {
  const { t } = useTranslation('common');

  const faqItems = Array.from({ length: 5 }, (_, i) => ({
    q: t(`agentConnect.faq${i + 1}q`),
    a: t(`agentConnect.faq${i + 1}a`),
  }));

  return (
    <>
      <SEO
        title={`${t('agentConnect.pageTitle')} | San Luis Way`}
        description={t('agentConnect.pageSubtitle')}
        keywords="MCP server, CLI, AI agent, San Luis Potosi, structured data, Claude Desktop, Cursor, Windsurf"
        ogType="website"
        structuredData={buildAgentFaqSchema(faqItems)}
      />

      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,122,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-[#6666b3] text-sm font-mono px-4 py-1.5 rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            MCP &middot; CLI &middot; OpenClaw
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('agentConnect.pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto">
            {t('agentConnect.pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Data categories */}
      <DataCategoryGrid />

      {/* Integration cards */}
      <section className="py-16 bg-[#0d1117]">
        <div className="container mx-auto px-4 max-w-4xl grid md:grid-cols-2 gap-6">
          {/* MCP card */}
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#6666b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">{t('agentConnect.mcpTitle')}</h3>
                <p className="text-sm text-[#8b949e]">{t('agentConnect.mcpDesc')}</p>
              </div>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-3 font-mono text-xs text-[#e6edf3] overflow-x-auto relative">
              <CopyButton text={MCP_CONFIG} />
              <pre>{MCP_CONFIG}</pre>
            </div>
            <Link href="/mcp" className="inline-block mt-4 text-sm text-[#58a6ff] hover:underline">
              {t('agentConnect.mcpTitle')} docs &rarr;
            </Link>
          </div>

          {/* CLI card */}
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">{t('agentConnect.cliTitle')}</h3>
                <p className="text-sm text-[#8b949e]">{t('agentConnect.cliDesc')}</p>
              </div>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-3 font-mono text-xs text-primary overflow-x-auto relative">
              <CopyButton text={CLI_COMMAND} />
              <span className="text-[#8b949e]">$ </span>{CLI_COMMAND}
            </div>
            <Link href="/cli" className="inline-block mt-4 text-sm text-[#58a6ff] hover:underline">
              {t('agentConnect.cliTitle')} docs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 bg-[#161b22]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{t('agentConnect.quickStart')}</h2>
          <p className="text-[#8b949e] mb-8">{t('agentConnect.noApiKey')}</p>
          <div className="space-y-4 text-left">
            <div>
              <p className="text-xs text-[#8b949e] font-mono mb-1">Claude Desktop &middot; claude_desktop_config.json</p>
              <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-xs text-[#e6edf3] overflow-x-auto relative border border-[#30363d]">
                <CopyButton text={MCP_CONFIG} />
                <pre>{MCP_CONFIG}</pre>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#8b949e] font-mono mb-1">Terminal</p>
              <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-xs text-primary overflow-x-auto relative border border-[#30363d]">
                <CopyButton text={CLI_COMMAND} />
                <span className="text-[#8b949e]">$ </span>{CLI_COMMAND}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <AgentFAQ />
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
