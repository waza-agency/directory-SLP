import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function AgentConnectBanner() {
  const { t } = useTranslation('common');

  return (
    <section className="w-full px-4 py-3">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-lg bg-[#0d1117] p-5 font-mono text-sm text-[#e6edf3] shadow-lg">
          {/* Traffic light dots */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#f85149]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#d29922]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#3fb950]" />
            <span className="ml-2 text-xs text-[#8b949e]">terminal</span>
          </div>

          {/* Command line */}
          <div className="text-[#3fb950]">
            $ npx @sanluisway/cli events --json
          </div>
          <div className="mt-1.5 text-[#8b949e]">
            {t('agentConnect.bannerResponse')}
          </div>

          {/* CTA row */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/agent-connect"
              className="rounded-md bg-gradient-to-r from-[#6e40c9] to-[#2ea043] px-4 py-1.5 font-sans text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              {t('agentConnect.bannerCta')} →
            </Link>
            <span className="text-xs text-[#58a6ff]">
              {t('agentConnect.bannerTags')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
