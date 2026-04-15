const GLAMLOCAL_URL = 'https://glamlocal.app/';

const GlamLocalIcon = ({ id = 'glG' }: { id?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {/* Stylized nail polish drop + sparkle */}
    <path
      d="M12 2C9.5 5.5 7 8.5 7 12a5 5 0 0010 0c0-3.5-2.5-6.5-5-10z"
      fill={`url(#${id})`}
    />
    <path
      d="M16.5 4.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5.5-1.3z"
      fill="#fff"
      opacity="0.95"
    />
    <path
      d="M5.5 16l.35.9.9.35-.9.35-.35.9-.35-.9-.9-.35.9-.35.35-.9z"
      fill="#fff"
      opacity="0.85"
    />
    <defs>
      <linearGradient id={id} x1="7" y1="2" x2="17" y2="22">
        <stop stopColor="#ec4899" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VARIANTS = {
  primary: {
    headline: 'Encuentra el salón de uñas perfecto en SLP',
    text: '68 salones verificados, filtros inteligentes por zona, precio y estilo. Encuentra tu favorito en segundos.',
    cta: 'Explorar directorio',
  },
  growth: {
    headline: '68 salones verificados en San Luis Potosí',
    text: 'Sin reseñas falsas, sin info desactualizada. Compara precios, ubicación y servicios antes de ir.',
    cta: 'Ver salones cerca de ti',
  },
  time: {
    headline: '¿No sabes qué uñas te convienen?',
    text: 'Toma el quiz personalizado, simula el color en tu tono de piel y compara el costo salón vs. hacerlas en casa.',
    cta: 'Tomar el quiz',
  },
  slim: {
    headline: 'Glam Local · Directorio de uñas SLP',
    text: '68 salones verificados, filtros por zona y precio.',
    cta: 'Explorar',
  },
};

type Variant = keyof typeof VARIANTS;

interface Props {
  variant?: Variant;
}

export default function GlamLocalBanner({ variant = 'primary' }: Props) {
  const v = VARIANTS[variant];
  const gradId = `glG-${variant}`;

  if (variant === 'slim') {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
        <a
          href={GLAMLOCAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 rounded-xl px-5 py-3.5 border border-pink-200 hover:border-pink-400 transition-all shadow-sm hover:shadow-md"
          aria-label={`${v.cta} — ${v.headline}`}
        >
          <div className="flex items-center gap-3">
            <GlamLocalIcon id={gradId} />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              <span className="font-semibold text-gray-900">{v.headline}</span>
              {' — '}{v.text}
            </span>
          </div>
          <span className="flex-shrink-0 text-xs font-semibold text-pink-600 group-hover:text-pink-700 flex items-center gap-1.5">
            {v.cta} <ArrowIcon />
          </span>
        </a>
      </div>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 rounded-2xl border border-pink-200 p-6 md:p-8 shadow-sm">
          {/* Sparkle pattern backdrop */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, #ec4899 1.5px, transparent 1.5px), radial-gradient(circle at 80% 60%, #f59e0b 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px, 60px 60px',
            }}
          />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-rose-500 to-amber-500" />

          <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-6">
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/15 to-amber-500/15 border border-pink-300/40 flex items-center justify-center">
                <GlamLocalIcon id={gradId} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">
                Glam Local
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wider border border-gray-300 rounded-full px-2 py-0.5 bg-white/60">
                  Sponsored
                </span>
                <span className="flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-pink-500 animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{v.headline}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.text}</p>
            </div>

            <div className="flex-shrink-0">
              <a
                href={GLAMLOCAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30"
                aria-label={`${v.cta} — ${v.headline}`}
              >
                {v.cta} <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
