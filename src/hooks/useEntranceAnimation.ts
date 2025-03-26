import { useEffect, useState, RefObject } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

interface EntranceAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  rootMargin?: string;
}

/**
 * A hook that adds entrance animation classes to elements when they enter the viewport
 * 
 * @param options Configuration options for the animation
 * @returns [ref, isVisible, animationClasses] - ref to attach to the element, visibility state, and animation classes
 */
export default function useEntranceAnimation<T extends HTMLElement>(options: EntranceAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    triggerOnce = true,
    delay = 0,
    rootMargin = '0px'
  } = options;
  
  const [elementRef, isIntersecting] = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin
  });
  
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isIntersecting) {
      const timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [isIntersecting, delay]);
  
  // Generate animation classes based on the visibility state
  const animationClasses = isVisible ? 'visible' : '';
  
  return [elementRef, isVisible, animationClasses] as [RefObject<T>, boolean, string];
} 