import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  words,
  interval = 3500,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
      setTimeout(() => {
        setIsGlitching(false);
      }, 200);
    }, 350);
  }, [words.length]);

  useEffect(() => {
    const timer = setInterval(triggerGlitch, interval);
    return () => clearInterval(timer);
  }, [interval, triggerGlitch]);

  return (
    <span className={`glitch-wrapper ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={`glitch-text ${isGlitching ? 'glitching' : ''}`}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          data-text={words[currentIndex]}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>

      <style jsx>{`
        .glitch-wrapper {
          display: inline-block;
          position: relative;
        }

        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text.glitching {
          animation: glitch-skew 0.35s infinite linear alternate-reverse;
        }

        .glitch-text.glitching::before,
        .glitch-text.glitching::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-text.glitching::before {
          animation: glitch-before 0.35s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
          color: #00007A;
          text-shadow: -3px 0 #FFCB05;
          opacity: 0.8;
        }

        .glitch-text.glitching::after {
          animation: glitch-after 0.35s infinite linear alternate-reverse;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
          color: #FFCB05;
          text-shadow: 3px 0 #00007A;
          opacity: 0.8;
        }

        @keyframes glitch-before {
          0% {
            transform: translateX(-3px);
          }
          20% {
            transform: translateX(3px) skewX(3deg);
          }
          40% {
            transform: translateX(-2px);
          }
          60% {
            transform: translateX(4px) skewX(-2deg);
          }
          80% {
            transform: translateX(-4px);
          }
          100% {
            transform: translateX(2px) skewX(2deg);
          }
        }

        @keyframes glitch-after {
          0% {
            transform: translateX(3px);
          }
          20% {
            transform: translateX(-3px) skewX(-3deg);
          }
          40% {
            transform: translateX(2px);
          }
          60% {
            transform: translateX(-4px) skewX(2deg);
          }
          80% {
            transform: translateX(4px);
          }
          100% {
            transform: translateX(-2px) skewX(-2deg);
          }
        }

        @keyframes glitch-skew {
          0% {
            transform: skewX(0deg);
            text-shadow: 0 0 0 transparent;
          }
          10% {
            transform: skewX(-1deg);
            text-shadow: 2px 0 #00007A, -2px 0 #FFCB05;
          }
          20% {
            transform: skewX(2deg);
            text-shadow: -2px 0 #00007A, 2px 0 #FFCB05;
          }
          30% {
            transform: skewX(0deg);
            text-shadow: 0 0 0 transparent;
          }
          40% {
            transform: skewX(1deg);
            text-shadow: 3px 0 #FFCB05, -3px 0 #00007A;
          }
          50% {
            transform: skewX(-2deg);
            text-shadow: -1px 0 #FFCB05, 1px 0 #00007A;
          }
          60% {
            transform: skewX(0deg);
            text-shadow: 0 0 0 transparent;
          }
          70% {
            transform: skewX(-1deg);
            text-shadow: 2px 0 #00007A, -2px 0 #FFCB05;
          }
          80% {
            transform: skewX(2deg);
            text-shadow: -3px 0 #FFCB05, 3px 0 #00007A;
          }
          90% {
            transform: skewX(0deg);
            text-shadow: 0 0 0 transparent;
          }
          100% {
            transform: skewX(1deg);
            text-shadow: 1px 0 #00007A, -1px 0 #FFCB05;
          }
        }
      `}</style>
    </span>
  );
};

export default GlitchText;
