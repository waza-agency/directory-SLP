import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import SEO from '@/components/common/SEO';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface FactCheckPageProps {
  slug: string;
  title: string;
  content: string;
  articleUrl: string;
  verificationDate: string;
}

function extractMeta(markdown: string): { title: string; articleUrl: string; verificationDate: string } {
  const titleMatch = markdown.match(/^# (.+)$/m);
  const urlMatch = markdown.match(/\*\*Source Analyzed:\*\* (.+)$/m);
  const dateMatch = markdown.match(/\*\*Verification Date:\*\* (.+)$/m);

  return {
    title: titleMatch ? titleMatch[1] : 'Fact-Check Report',
    articleUrl: urlMatch ? urlMatch[1] : '',
    verificationDate: dateMatch ? dateMatch[1] : '',
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const factchecksDir = path.join(process.cwd(), 'public', 'factchecks');

  let paths: { params: { slug: string }; locale: string }[] = [];

  if (fs.existsSync(factchecksDir)) {
    const files = fs.readdirSync(factchecksDir).filter(f => f.endsWith('.md'));

    paths = files.flatMap(file => {
      const slug = file.replace('.md', '');
      return [
        { params: { slug }, locale: 'en' },
        { params: { slug }, locale: 'es' },
      ];
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<FactCheckPageProps> = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'public', 'factchecks', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const markdown = fs.readFileSync(filePath, 'utf-8');
  const meta = extractMeta(markdown);

  const renderer = new marked.Renderer();

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map(t => ('text' in t ? t.text : '')).join('');
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
    const headerHtml = header.map(cell =>
      `<th class="px-4 py-2 text-left bg-gray-100 font-semibold border">${cell.text}</th>`
    ).join('');

    const rowsHtml = rows.map(row =>
      `<tr class="hover:bg-gray-50">${row.map(cell =>
        `<td class="px-4 py-2 border">${cell.text}</td>`
      ).join('')}</tr>`
    ).join('');

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
    const itemsHtml = items.map(item => `<li class="ml-1">${item.text}</li>`).join('');
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

  renderer.hr = () => {
    return '<hr class="my-8 border-t-2 border-gray-200" />';
  };

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
      title: meta.title,
      content,
      articleUrl: meta.articleUrl,
      verificationDate: meta.verificationDate,
    },
  };
};

export default function FactCheckPage({ slug, title, content, articleUrl, verificationDate }: FactCheckPageProps) {
  return (
    <>
      <SEO
        title={`${title} | Fact-Check Report`}
        description={`Detailed fact-check investigation of claims made in the article. ${verificationDate}`}
        keywords="fact check, verification, sources, transparency"
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClaimReview",
              "url": `https://www.sanluisway.com/blog/factchecks/${slug}`,
              "datePublished": verificationDate,
              "itemReviewed": {
                "@type": "Article",
                "url": articleUrl
              },
              "author": {
                "@type": "Organization",
                "name": "San Luis Way"
              }
            })
          }}
        />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8">
            <Link href="/blog/factchecks" legacyBehavior>
              <a className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Fact-Checks
              </a>
            </Link>
          </nav>

          {articleUrl && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Original Article:</strong>
              </p>
              <a
                href={articleUrl}
                className="text-blue-600 hover:text-blue-800 underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {articleUrl}
              </a>
            </div>
          )}

          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link href="/blog/factchecks" legacyBehavior>
                <a className="text-blue-600 hover:text-blue-800 font-medium">
                  &larr; View All Fact-Checks
                </a>
              </Link>
              <Link href="/blog" legacyBehavior>
                <a className="text-gray-600 hover:text-gray-800">
                  Browse Blog Articles
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
