import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  parseFactCheck,
  buildClaimReviewSchema,
  ParsedReport,
  ParsedClaim,
} from '@/lib/factcheck-parser';

interface FactCheckPageProps {
  slug: string;
  content: string;
  report: ParsedReport;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const factchecksDir = path.join(process.cwd(), 'public', 'factchecks');
  let paths: { params: { slug: string }; locale: string }[] = [];

  if (fs.existsSync(factchecksDir)) {
    const files = fs.readdirSync(factchecksDir).filter((f) => f.endsWith('.md'));
    paths = files.flatMap((file) => {
      const slug = file.replace('.md', '');
      return [
        { params: { slug }, locale: 'en' },
        { params: { slug }, locale: 'es' },
      ];
    });
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<FactCheckPageProps> = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'public', 'factchecks', `${slug}.md`);
  if (!fs.existsSync(filePath)) return { notFound: true };

  const markdown = fs.readFileSync(filePath, 'utf-8');
  const report = parseFactCheck(markdown);

  const renderer = new marked.Renderer();

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ('text' in t ? t.text : '')).join('');
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    const sizes: Record<number, string> = {
      1: 'text-3xl font-bold mt-8 mb-4',
      2: 'text-2xl font-bold mt-8 mb-3',
      3: 'text-xl font-semibold mt-6 mb-2',
      4: 'text-lg font-semibold mt-4 mb-2',
    };
    return `<h${depth} id="${id}" class="${sizes[depth] || 'font-semibold'}">${text}</h${depth}>`;
  };

  renderer.table = ({ header, rows }) => {
    const headerHtml = header
      .map((cell) => `<th class="px-4 py-2 text-left bg-gray-100 font-semibold border">${cell.text}</th>`)
      .join('');
    const rowsHtml = rows
      .map(
        (row) =>
          `<tr class="hover:bg-gray-50">${row
            .map((cell) => `<td class="px-4 py-2 border">${cell.text}</td>`)
            .join('')}</tr>`
      )
      .join('');
    return `<div class="overflow-x-auto my-4"><table class="min-w-full border-collapse border">\n<thead><tr>${headerHtml}</tr></thead>\n<tbody>${rowsHtml}</tbody>\n</table></div>`;
  };

  renderer.blockquote = ({ text }) => {
    return `<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">${text}</blockquote>`;
  };

  renderer.link = ({ href, text }) => {
    return `<a href="${href}" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  renderer.list = ({ items, ordered }) => {
    const tag = ordered ? 'ol' : 'ul';
    const listClass = ordered ? 'list-decimal' : 'list-disc';
    const itemsHtml = items.map((item) => `<li class="ml-1">${item.text}</li>`).join('');
    return `<${tag} class="${listClass} ml-6 my-4 space-y-1">${itemsHtml}</${tag}>`;
  };

  renderer.paragraph = ({ text }) => {
    if (text.includes('VERDICT:')) {
      const verdictClass = text.includes('TRUE') && !text.includes('PARTIALLY')
        ? 'bg-green-100 text-green-800 border-green-300'
        : text.includes('PARTIALLY')
        ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
        : text.includes('UNVERIFIABLE')
        ? 'bg-gray-100 text-gray-800 border-gray-300'
        : text.includes('MISLEADING')
        ? 'bg-orange-100 text-orange-800 border-orange-300'
        : text.includes('OUTDATED')
        ? 'bg-purple-100 text-purple-800 border-purple-300'
        : 'bg-gray-100 text-gray-800 border-gray-300';
      return `<p class="my-2 px-4 py-2 rounded border ${verdictClass} font-semibold">${text}</p>`;
    }
    return `<p class="my-3 text-gray-700 leading-relaxed">${text}</p>`;
  };

  renderer.hr = () => '<hr class="my-8 border-t-2 border-gray-200" />';

  renderer.code = ({ text, lang }) => {
    return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang || 'text'}">${text}</code></pre>`;
  };

  renderer.strong = ({ text }) => {
    return `<strong class="font-semibold text-gray-900">${text}</strong>`;
  };

  marked.setOptions({ renderer });
  const content = await marked(markdown);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      slug,
      content,
      report,
    },
  };
};

function verdictStyles(verdict: ParsedClaim['verdict']): { bg: string; border: string; text: string; emoji: string } {
  switch (verdict) {
    case 'TRUE':
      return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-900', emoji: '✅' };
    case 'PARTIALLY_TRUE':
      return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-900', emoji: '⚠️' };
    case 'FALSE':
      return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', emoji: '❌' };
    case 'UNVERIFIABLE':
      return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-900', emoji: '❓' };
    case 'OUTDATED':
      return { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-900', emoji: '🔄' };
    case 'MISLEADING':
      return { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-900', emoji: '🔀' };
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-900', emoji: '❓' };
  }
}

export default function FactCheckPage({ slug, content, report }: FactCheckPageProps) {
  const pageUrl = `https://www.sanluisway.com/blog/factchecks/${slug}`;
  const hasStructuredClaims = report.claims.length > 0;
  const seoDescription = report.articleUrl
    ? `Fact-check of ${report.claims.length || report.totalClaims} claims from the article at ${report.articleUrl}. Reliability score ${report.reliabilityScore}. Verified ${report.verificationDate}.`
    : `Fact-check report with ${report.claims.length || report.totalClaims} claims analyzed. Reliability score ${report.reliabilityScore}. Verified ${report.verificationDate}.`;

  return (
    <>
      <SEO
        title={`${report.title} | Fact-Check Report`}
        description={seoDescription}
        keywords="fact check, verification, sources, transparency, san luis potosi, AI fact checking"
      />

      <Head>
        {/* One ClaimReview JSON-LD per claim — Google's Fact Check schema recommends this */}
        {report.claims.map((claim) => (
          <script
            key={claim.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildClaimReviewSchema(claim, report, pageUrl)),
            }}
          />
        ))}

        {/* Parent Article schema for the whole report */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: report.title,
              description: seoDescription,
              url: pageUrl,
              datePublished: report.verificationDateISO || undefined,
              dateModified: report.verificationDateISO || undefined,
              author: {
                '@type': 'Organization',
                name: 'San Luis Way',
                url: 'https://www.sanluisway.com',
              },
              publisher: {
                '@type': 'Organization',
                name: 'San Luis Way',
                url: 'https://www.sanluisway.com',
              },
              mainEntityOfPage: pageUrl,
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.speakable', '#quick-summary', '.claim-summary'],
              },
              about: report.articleUrl
                ? { '@type': 'Article', url: report.articleUrl }
                : undefined,
            }),
          }}
        />

        {/* Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://www.sanluisway.com/blog' },
                { '@type': 'ListItem', position: 2, name: 'Fact-Checks', item: 'https://www.sanluisway.com/blog/factchecks' },
                { '@type': 'ListItem', position: 3, name: report.title, item: pageUrl },
              ],
            }),
          }}
        />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/blog" className="hover:text-blue-700">Blog</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog/factchecks" className="hover:text-blue-700">Fact-Checks</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-900 font-medium truncate max-w-xs" aria-current="page">
                  {report.title}
                </li>
              </ol>
            </nav>

            {/* Title */}
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{report.title}</h1>
              <p className="text-sm text-gray-600">
                Verified {report.verificationDate} · Published by San Luis Way Editorial
              </p>
            </header>

            {/* Quick Summary — GEO-optimized */}
            <section
              id="quick-summary"
              aria-labelledby="quick-summary-heading"
              className="speakable bg-white rounded-2xl shadow-md border-2 border-gray-100 p-6 md:p-8 mb-8"
            >
              <h2 id="quick-summary-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Verification Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
                    Reliability score
                  </p>
                  <p className="text-4xl font-bold text-blue-900">{report.reliabilityScore || '—'}</p>
                  {report.confidenceLevel && (
                    <p className="text-sm text-blue-800 mt-1">{report.confidenceLevel.split('—')[0].trim()}</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Claims analyzed
                  </p>
                  <p className="text-4xl font-bold text-gray-900">{report.totalClaims || report.claims.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Individually verified</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Verdict breakdown
                  </p>
                  <ul className="space-y-1 text-sm">
                    {report.trueCount > 0 && (
                      <li><span className="font-bold text-green-700">{report.trueCount}</span> <span className="text-gray-700">True</span></li>
                    )}
                    {report.partiallyTrueCount > 0 && (
                      <li><span className="font-bold text-yellow-700">{report.partiallyTrueCount}</span> <span className="text-gray-700">Partially True</span></li>
                    )}
                    {report.falseCount > 0 && (
                      <li><span className="font-bold text-red-700">{report.falseCount}</span> <span className="text-gray-700">False</span></li>
                    )}
                    {report.unverifiableCount > 0 && (
                      <li><span className="font-bold text-gray-700">{report.unverifiableCount}</span> <span className="text-gray-700">Unverifiable</span></li>
                    )}
                    {report.outdatedCount > 0 && (
                      <li><span className="font-bold text-purple-700">{report.outdatedCount}</span> <span className="text-gray-700">Outdated</span></li>
                    )}
                  </ul>
                </div>
              </div>

              {report.articleUrl && (
                <div className="text-sm bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="font-semibold text-gray-700">Source article analyzed:</span>{' '}
                  <a
                    href={report.articleUrl}
                    className="text-blue-700 hover:text-blue-900 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {report.articleUrl}
                  </a>
                </div>
              )}
            </section>

            {/* Verdict at a glance — scannable claim list for LLM extraction */}
            {hasStructuredClaims && (
              <section aria-labelledby="verdicts-heading" className="speakable bg-white rounded-2xl shadow-md border-2 border-gray-100 p-6 md:p-8 mb-8">
                <h2 id="verdicts-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Verdicts at a glance
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Every claim in the source article, verified individually. Jump to any claim for full evidence.
                </p>
                <ol className="space-y-3">
                  {report.claims.map((claim) => {
                    const s = verdictStyles(claim.verdict);
                    return (
                      <li key={claim.id}>
                        <a
                          href={`#${claim.id}`}
                          className={`block ${s.bg} ${s.border} border-2 rounded-xl p-4 hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl mt-0.5" aria-hidden>{s.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`text-xs font-bold uppercase tracking-wide ${s.text}`}>
                                  Claim {claim.number} · {claim.verdictLabel}
                                </span>
                                {claim.confidence !== 'Unknown' && (
                                  <span className="text-xs text-gray-500">
                                    · Confidence: {claim.confidence}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm md:text-base font-medium ${s.text} claim-summary`}>
                                "{claim.text}"
                              </p>
                              {claim.summary && (
                                <p className="text-sm text-gray-700 mt-2">{claim.summary}</p>
                              )}
                              {claim.sources.length > 0 && (
                                <p className="text-xs text-gray-500 mt-2">
                                  {claim.sources.length} source{claim.sources.length !== 1 ? 's' : ''} cited
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {/* Structured claim cards with anchors — each has an id for deep linking */}
            {hasStructuredClaims && (
              <section aria-labelledby="detailed-findings-heading" className="mb-8">
                <h2 id="detailed-findings-heading" className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Detailed findings
                </h2>
                <div className="space-y-4">
                  {report.claims.map((claim) => {
                    const s = verdictStyles(claim.verdict);
                    return (
                      <article
                        key={claim.id}
                        id={claim.id}
                        className={`bg-white rounded-2xl shadow-sm border-l-4 ${s.border.replace('border-', 'border-l-')} p-6`}
                      >
                        <header className="flex flex-wrap items-baseline gap-3 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text} border ${s.border}`}>
                            <span aria-hidden>{s.emoji}</span>
                            {claim.verdictLabel}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900">
                            Claim {claim.number}: {claim.heading}
                          </h3>
                        </header>
                        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-800">
                          "{claim.text}"
                        </blockquote>
                        {claim.summary && (
                          <div className="mb-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                              Investigation summary
                            </p>
                            <p className="text-gray-700 leading-relaxed">{claim.summary}</p>
                          </div>
                        )}
                        {claim.sources.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                              Sources ({claim.sources.length})
                            </p>
                            <ul className="space-y-1 text-sm">
                              {claim.sources.map((src, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-gray-400 mt-1" aria-hidden>›</span>
                                  <a
                                    href={src.url}
                                    className="text-blue-700 hover:text-blue-900 underline break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {src.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {claim.confidence !== 'Unknown' && (
                          <p className="text-xs text-gray-500 border-t border-gray-100 pt-3 mt-3">
                            <span className="font-semibold">Confidence: {claim.confidence}</span>
                            {claim.confidenceNote && <span className="ml-1">— {claim.confidenceNote}</span>}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Full original markdown content — kept for context and for older reports that don't parse cleanly */}
            <details className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
              <summary className="cursor-pointer font-semibold text-gray-900 text-lg">
                View full original report
              </summary>
              <article
                className="prose prose-lg max-w-none mt-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </details>

            {/* Footer navigation */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
              <Link href="/blog/factchecks" className="text-blue-700 hover:text-blue-900 font-medium">
                ← View all fact-checks
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-800">
                Browse blog articles
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
