import Image from 'next/image';
import Head from 'next/head';

export default function TestImages() {
  const images = [
    {
      src: 'https://omxporaecrqsqhzjzvnx.supabase.co/storage/v1/object/public/blog-images/corazon-de-xoconostle-adventure.jpg',
      alt: 'Supabase Image Test',
      domain: 'Supabase'
    },
    {
      src: 'https://static.wixstatic.com/media/11131f_e3a952f5434a40a195aa9b60aee03ed5~mv2.jpg/v1/fill/w_1095,h_504,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11131f_e3a952f5434a40a195aa9b60aee03ed5~mv2.jpg',
      alt: 'Wix Image Test',
      domain: 'Wix'
    },
    {
      src: 'https://assets.seobotai.com/sanluisway.com/68215f455e3fe4823b5f9297-1747036277552.jpg',
      alt: 'SeoBot Image Test',
      domain: 'SeoBot'
    },
    {
      src: '/images/logo.jpeg',
      alt: 'Local Image Test',
      domain: 'Local'
    }
  ];

  return (
    <>
      <Head>
        <title>Image Test Page</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Image Optimization Test</h1>

        <div className="space-y-8">
          {images.map((image, index) => (
            <div key={index} className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{image.domain} Image</h2>
              <p className="text-sm text-gray-600 mb-4 break-all">
                <strong>Source:</strong> {image.src}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Next.js optimized image */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Next.js Image Component</h3>
                  <div className="relative w-full h-48 bg-gray-100 rounded">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Regular img tag */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Regular img Tag</h3>
                  <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Check if Next.js optimized images load correctly</li>
            <li>Compare with regular img tags</li>
            <li>Open browser developer tools to see network requests</li>
            <li>Look for any 400 or other HTTP errors</li>
          </ul>
        </div>
      </div>
    </>
  );
}