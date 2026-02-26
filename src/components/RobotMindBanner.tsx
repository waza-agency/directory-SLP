const ROBOTMIND_URL = 'https://robotmind.io';

const RobotMindIcon = ({ id = 'rmG' }: { id?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke={`url(#${id})`} strokeWidth="1.5" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="10" r="1.2" fill="#3b82f6" />
    <circle cx="15" cy="10" r="1.2" fill="#8b5cf6" />
    <path d="M12 2V0M4.93 4.93L3.51 3.51M19.07 4.93l1.42-1.42" stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round" />
    <defs>
      <linearGradient id={id} x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VARIANTS = {
  primary: {
    headline: 'Your AI Assistant That Gets Things Done',
    text: 'RobotMind works the way you do — handling tasks, answering questions, and keeping your business moving forward.',
    cta: 'Join Waiting List',
  },
  growth: {
    headline: 'Work Smarter, Your Way',
    text: 'An AI assistant that adapts to how you work — so you can focus on strategy and growth.',
    cta: 'Get Early Access',
  },
  time: {
    headline: 'Get 10+ Hours Back Every Week',
    text: 'RobotMind handles your daily tasks — emails, scheduling, research, and more — your way.',
    cta: 'Learn More',
  },
  slim: {
    headline: 'Meet your AI assistant',
    text: 'RobotMind — Does things your way, so you don\'t have to.',
    cta: 'Join Waiting List',
  },
};

type Variant = keyof typeof VARIANTS;

interface Props {
  variant?: Variant;
}

export default function RobotMindBanner({ variant = 'primary' }: Props) {
  const v = VARIANTS[variant];
  const gradId = `rmG-${variant}`;

  if (variant === 'slim') {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
        <a
          href={ROBOTMIND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-900/90 rounded-xl px-5 py-3.5 border border-gray-800 hover:border-blue-500/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <RobotMindIcon id={gradId} />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              <span className="font-semibold text-white">{v.headline}</span>
              {' — '}{v.text}
            </span>
          </div>
          <span className="flex-shrink-0 text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1.5">
            {v.cta} <ArrowIcon />
          </span>
        </a>
      </div>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="relative overflow-hidden bg-gray-900/95 rounded-2xl border border-gray-800 p-6 md:p-8">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

          <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-6">
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center">
                <RobotMindIcon id={gradId} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RobotMind
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider border border-gray-700 rounded-full px-2 py-0.5">
                  Sponsored
                </span>
                <span className="flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <span className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">{v.headline}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.text}</p>
            </div>

            <div className="flex-shrink-0">
              <a
                href={ROBOTMIND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
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
