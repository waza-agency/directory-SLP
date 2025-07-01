import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-[75vh] min-h-[600px] bg-secondary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="San Luis Potosí"
          fill
          className="object-cover brightness-90"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 border-2 border-primary/30 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-secondary/30 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          {/* Blue and gold accent line */}
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mb-6"></div>

          <span className="bg-primary/95 text-white px-6 py-3 rounded-full text-xl font-bold mb-6 backdrop-blur-md shadow-lg">
            Your Guide to San Luis Potosí
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Discover San Luis Potosí
          </h1>
          <p className="text-xl md:text-2xl text-white mb-4 max-w-3xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Your complete guide to living, working, and exploring this beautiful Mexican city
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            From local insider tips to practical expat advice
          </p>

          {/* Horizontal accent divider */}
          <div className="w-32 h-0.5 bg-white/30 my-6"></div>

          <Link
            href="#explore"
            className="block mt-8"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto animate-bounce"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}