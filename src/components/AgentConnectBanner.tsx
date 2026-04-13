import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

function useTypingAnimation(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
              clearInterval(interval);
              setDone(true);
            }
          }, speed);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, speed]);

  return { displayed, done, ref };
}

export default function AgentConnectBanner() {
  const { t } = useTranslation('common');
  const command = 'npx @sanluisway/cli events --json';
  const { displayed, done, ref } = useTypingAnimation(command, 35);

  return (
    <section ref={ref} className="w-full px-4 py-4">
      <div className="container mx-auto max-w-5xl">
        {/* Announcement header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            {t('agentConnect.bannerLabel', 'New')}
          </div>
          <p className="text-sm font-medium text-gray-700">
            {t('agentConnect.bannerHeadline', 'Your AI agent can now access San Luis Way data')}
          </p>
        </div>

        {/* Terminal window */}
        <div className="rounded-xl bg-[#0d1117] p-5 font-mono text-sm text-[#e6edf3] shadow-xl border border-[#30363d] overflow-hidden relative">
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)]" />

          {/* Traffic light dots + title */}
          <div className="mb-3 flex items-center gap-2 relative">
            <div className="h-2.5 w-2.5 rounded-full bg-[#f85149]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#d29922]" />
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="ml-2 text-xs text-[#8b949e]">san-luis-way &mdash; terminal</span>
          </div>

          {/* Command line with typing animation */}
          <div className="text-primary relative">
            <span className="text-[#8b949e]">$ </span>
            {displayed}
            {!done && (
              <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
            )}
          </div>

          {/* Response appears after typing finishes */}
          <div
            className={`mt-2 text-[#8b949e] transition-all duration-500 ${
              done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-primary">{"{"}</span>
            {' '}<span className="text-[#79c0ff]">&quot;ok&quot;</span>: <span className="text-primary">true</span>,{' '}
            <span className="text-[#79c0ff]">&quot;data&quot;</span>: <span className="text-[#8b949e]">[</span>{' '}
            <span className="text-[#ffa657]">12 events</span>{' '}
            <span className="text-[#8b949e]">]</span>{' '}
            <span className="text-primary">{"}"}</span>
          </div>

          {/* CTA row */}
          <div
            className={`mt-4 flex flex-wrap items-center gap-3 transition-all duration-500 delay-200 ${
              done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <Link
              href="/agent-connect"
              className="group rounded-lg bg-gradient-to-r from-secondary to-primary px-5 py-2 font-sans text-xs font-bold text-white hover:shadow-lg hover:shadow-secondary/20 transition-all duration-200 flex items-center gap-2"
            >
              {t('agentConnect.bannerCta')}
              <svg className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <span className="text-xs text-[#58a6ff] font-mono">
              {t('agentConnect.bannerTags')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
