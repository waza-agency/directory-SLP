import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  className?: string;
}

// Default testimonials for expats
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Digital Nomad',
    country: 'USA',
    rating: 5,
    text: 'San Luis Way made my relocation so much easier! Found my apartment, doctor, and favorite coffee shop all through this site. The expat community recommendations are gold.',
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'James P.',
    role: 'English Teacher',
    country: 'UK',
    rating: 5,
    text: 'As a newcomer who doesn\'t speak Spanish, this directory has been a lifesaver. The listings for English-speaking services are incredibly helpful.',
    date: '1 month ago'
  },
  {
    id: '3',
    name: 'Marie L.',
    role: 'Remote Worker',
    country: 'Canada',
    rating: 5,
    text: 'Love the weekly event updates! I\'ve met so many fellow expats through the meetups listed here. It\'s helped me feel at home in SLP.',
    date: '3 weeks ago'
  },
  {
    id: '4',
    name: 'David R.',
    role: 'Entrepreneur',
    country: 'Germany',
    rating: 5,
    text: 'The business directory is comprehensive and up-to-date. I\'ve discovered hidden gems I would never have found on my own. Highly recommend!',
    date: '1 week ago'
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
  className = ''
}) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by Expats in San Luis Potosí
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of expats who trust San Luis Way for their daily needs
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">5.0 from 200+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Want to share your experience?
          </p>
          <button
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={() => {
              // TODO: Implement review submission
              alert('Review submission coming soon!');
            }}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Structured Data for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "San Luis Way",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "200",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </section>
  );
};

// Individual testimonial card component
const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{testimonial.text}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-3">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircleIcon className="h-8 w-8 text-blue-600" />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500">
              {testimonial.role} • {testimonial.country}
            </div>
          </div>
        </div>

        {testimonial.date && (
          <div className="text-xs text-gray-400">
            {testimonial.date}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
export type { Testimonial, TestimonialsProps };
