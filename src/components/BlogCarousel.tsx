import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClockIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/solid';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  category?: string;
  publishedAt: string;
  content: string;
}

interface BlogCarouselProps {
  posts: BlogPost[];
  title?: string;
  subtitle?: string;
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogCarousel({ posts, title = "From the Blog", subtitle = "Stories, tips, and insights for life in San Luis Potosí" }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const visiblePosts = posts.slice(0, 6);

  useEffect(() => {
    if (!isAutoPlaying || visiblePosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visiblePosts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, visiblePosts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + visiblePosts.length) % visiblePosts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % visiblePosts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (visiblePosts.length === 0) return null;

  const currentPost = visiblePosts[currentIndex];
  const readTime = estimateReadTime(currentPost.content);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BookOpenIcon className="w-4 h-4" />
              EXPAT INSIGHTS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors group"
          >
            View All Articles
            <ArrowRightIcon className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Featured Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant group">
              <Link href={`/blog/${currentPost.slug}`}>
                <Image
                  src={currentPost.imageUrl || '/images/blog-placeholder.jpg'}
                  alt={currentPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Category Badge */}
                {currentPost.category && (
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                      {currentPost.category}
                    </span>
                  </div>
                )}
              </Link>
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <time dateTime={currentPost.publishedAt}>
                  {new Date(currentPost.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {readTime} min read
                </span>
              </div>

              <Link href={`/blog/${currentPost.slug}`}>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight hover:text-secondary transition-colors">
                  {currentPost.title}
                </h3>
              </Link>

              <p className="text-lg text-gray-600 mb-8 line-clamp-3">
                {currentPost.excerpt}
              </p>

              <Link
                href={`/blog/${currentPost.slug}`}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3"
              >
                Read Article
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              {/* Dots Navigation */}
              <div className="flex items-center gap-3 mt-10">
                {visiblePosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-secondary'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
            aria-label="Previous post"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
            aria-label="Next post"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mini Cards Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {visiblePosts.slice(0, 4).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              onClick={() => goToSlide(index)}
              className={`group p-4 rounded-xl transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-secondary/10 ring-2 ring-secondary'
                  : 'bg-white hover:bg-gray-50 shadow-card'
              }`}
            >
              <h4 className={`font-semibold text-sm line-clamp-2 mb-2 transition-colors ${
                index === currentIndex ? 'text-secondary' : 'text-gray-900 group-hover:text-secondary'
              }`}>
                {post.title}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-full font-semibold"
          >
            View All Articles
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
