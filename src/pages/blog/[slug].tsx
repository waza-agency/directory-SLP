import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import AdUnit from '../../components/common/AdUnit';
// ... existing imports ...

export default function BlogPost({ post }) {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="bg-white min-h-screen py-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {/* ... other post metadata ... */}
        </section>

        {/* First ad unit after the hero */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '20px 0' }} />
          </div>
        </section>

        {/* Post content */}
        <article className="container mx-auto px-4 prose prose-lg max-w-none">
          {/* First half of content */}
          <div dangerouslySetInnerHTML={{ __html: post.content.slice(0, post.content.length / 2) }} />

          {/* Relaxed ad unit in the middle of the content */}
          <div className="my-8">
            <AdUnit isRelaxed={true} style={{ display: 'block', margin: '40px 0' }} />
          </div>

          {/* Second half of content */}
          <div dangerouslySetInnerHTML={{ __html: post.content.slice(post.content.length / 2) }} />
        </article>

        {/* Bottom ad unit */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <AdUnit style={{ display: 'block', margin: '20px 0' }} />
          </div>
        </section>
      </main>
    </>
  );
}