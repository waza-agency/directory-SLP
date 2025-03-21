import React from 'react';

/**
 * A component that renders text with a translation key.
 * This adds data-i18n-key and data-translation-key attributes
 * which will be processed by our client-side translation script.
 */
export const T = ({ 
  id, 
  defaultText, 
  className = '' 
}: { 
  id: string; 
  defaultText: string; 
  className?: string;
}) => {
  return (
    <span 
      data-i18n-key={id} 
      data-translation-key={id} 
      className={className}
    >
      {defaultText}
    </span>
  );
};

/**
 * A hook to get a translation function that can be used in other contexts
 * For example, when you need to format a string or use it in a non-JSX context
 */
export const useTranslation = () => {
  const t = (key: string, defaultText: string) => {
    // In the browser, return the defaultText which will be replaced client-side
    if (typeof window !== 'undefined') {
      return defaultText;
    }
    
    // During SSR, just return the default text
    return defaultText;
  };

  return { t };
};

/**
 * A function to wrap static text that needs translation
 * It returns an object with data attributes that the client-side script will use
 */
export const tAttr = (id: string) => ({
  'data-i18n-key': id,
  'data-translation-key': id
}); 