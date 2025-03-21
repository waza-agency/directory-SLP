import { ReactNode } from 'react';
import useEntranceAnimation from '@/hooks/useEntranceAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight';
  delay?: number;
  threshold?: number;
  staggerChildren?: boolean;
  id?: string;
}

export default function AnimatedSection({
  children,
  className = '',
  animationType = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  staggerChildren = false,
  id,
}: AnimatedSectionProps) {
  const [sectionRef, isVisible] = useEntranceAnimation({
    threshold,
    delay,
  });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className} ${isVisible ? `animate-${animationType}` : 'opacity-0'} ${staggerChildren ? 'staggered-animation' : ''}`}
    >
      {children}
    </section>
  );
} 