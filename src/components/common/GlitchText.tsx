import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchTextProps {
  words: string[];
  interval?: number;
  className?: string;
  maxWidth?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  words,
  interval = 3500,
  className = '',
  maxWidth = '320px'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

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

  const currentWord = words[currentIndex];
  const wordLength = currentWord.length;

  const getFontScale = () => {
    if (wordLength <= 3) return 1.15;
    if (wordLength <= 4) return 1.05;
    if (wordLength <= 5) return 1;
    if (wordLength <= 6) return 0.9;
    if (wordLength <= 7) return 0.8;
    if (wordLength <= 8) return 0.72;
    return 0.65;
  };

  return (
    <span
      ref={containerRef}
      className={`glitch-wrapper ${className}`}
      style={{
        display: 'inline-block',
        minWidth: '80px',
        maxWidth: maxWidth,
        textAlign: 'center'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={`glitch-text ${isGlitching ? 'glitching' : ''}`}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)', scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1
          }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)', scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          data-text={currentWord}
          style={{
            display: 'inline-block',
            fontSize: `${getFontScale()}em`,
            transition: 'font-size 0.3s ease'
          }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>

      <style jsx>{`
        .glitch-wrapper {
          position: relative;
        }

        .glitch-text {
          position: relative;
          white-space: nowrap;
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
          0% { transform: translateX(-3px); }
          20% { transform: translateX(3px) skewX(3deg); }
          40% { transform: translateX(-2px); }
          60% { transform: translateX(4px) skewX(-2deg); }
          80% { transform: translateX(-4px); }
          100% { transform: translateX(2px) skewX(2deg); }
        }

        @keyframes glitch-after {
          0% { transform: translateX(3px); }
          20% { transform: translateX(-3px) skewX(-3deg); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-4px) skewX(2deg); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(-2px) skewX(-2deg); }
        }

        @keyframes glitch-skew {
          0% { transform: skewX(0deg); text-shadow: 0 0 0 transparent; }
          10% { transform: skewX(-1deg); text-shadow: 2px 0 #00007A, -2px 0 #FFCB05; }
          20% { transform: skewX(2deg); text-shadow: -2px 0 #00007A, 2px 0 #FFCB05; }
          30% { transform: skewX(0deg); text-shadow: 0 0 0 transparent; }
          40% { transform: skewX(1deg); text-shadow: 3px 0 #FFCB05, -3px 0 #00007A; }
          50% { transform: skewX(-2deg); text-shadow: -1px 0 #FFCB05, 1px 0 #00007A; }
          60% { transform: skewX(0deg); text-shadow: 0 0 0 transparent; }
          70% { transform: skewX(-1deg); text-shadow: 2px 0 #00007A, -2px 0 #FFCB05; }
          80% { transform: skewX(2deg); text-shadow: -3px 0 #FFCB05, 3px 0 #00007A; }
          90% { transform: skewX(0deg); text-shadow: 0 0 0 transparent; }
          100% { transform: skewX(1deg); text-shadow: 1px 0 #00007A, -1px 0 #FFCB05; }
        }
      `}</style>
    </span>
  );
};

export default GlitchText;
