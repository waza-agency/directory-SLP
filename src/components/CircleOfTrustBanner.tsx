import { ShieldCheckIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/solid';

export default function CircleOfTrustBanner() {
  return (
    <section className="relative w-full py-16 md:py-20 bg-gradient-to-r from-amber-500 to-orange-600 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-white text-center lg:text-left">
            <span className="inline-block text-white/80 font-semibold text-sm tracking-widest uppercase mb-4">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The Circle of Trust
            </h2>
            <p className="text-lg md:text-xl mb-4 text-white/95 max-w-xl">
              Everything we recommend on San Luis Way is <strong>safe and recommended by locals</strong>.
              We&apos;re not a generic directory - we&apos;re a curated community of places we know and trust.
            </p>
            <p className="text-base md:text-lg text-white/85 max-w-xl">
              Every place on our platform has been <strong>visited, tested, and approved</strong> by local residents.
            </p>
          </div>

          {/* Trust Badge */}
          <div className="flex-shrink-0 text-center">
            <div className="w-52 h-52 md:w-64 md:h-64 bg-white/15 rounded-full flex flex-col items-center justify-center border-4 border-white/30 mx-auto">
              <div className="text-5xl md:text-6xl mb-2">🤝</div>
              <p className="text-xl md:text-2xl font-bold text-white">Safe & Trusted</p>
              <p className="text-sm text-white/90">Recommended by Locals</p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 md:gap-8 mt-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs md:text-sm text-white/80">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">0</div>
                <div className="text-xs md:text-sm text-white/80">Random Places</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">Local</div>
                <div className="text-xs md:text-sm text-white/80">First</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Curated by Locals</h4>
            <p className="text-sm text-white/85">
              Every recommendation comes from someone who lives in SLP and knows the city
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-content mx-auto mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Safety Guaranteed</h4>
            <p className="text-sm text-white/85">
              Only places in safe areas with good reputation in the community
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Quality over Quantity</h4>
            <p className="text-sm text-white/85">
              We prefer fewer high-quality places than an endless unfiltered directory
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
