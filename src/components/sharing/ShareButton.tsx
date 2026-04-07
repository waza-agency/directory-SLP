import React, { useState } from 'react';
import {
  ShareIcon,
  ClipboardIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import {
  ChatBubbleLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  variant?: 'inline' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const platformConfigs = {
  whatsapp: {
    icon: ChatBubbleLeftIcon,
    color: 'bg-green-500 hover:bg-green-600',
    getUrl: (text: string, url: string) => 
      `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
  },
  twitter: {
    icon: XMarkIcon,
    color: 'bg-black hover:bg-gray-800',
    getUrl: (text: string, url: string) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  facebook: {
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'bg-blue-600 hover:bg-blue-700',
    getUrl: (text: string, url: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  linkedin: {
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'bg-blue-700 hover:bg-blue-800',
    getUrl: (text: string, url: string) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  }
};

export default function ShareButton({ 
  title, 
  text, 
  url,
  variant = 'inline', 
  size = 'md',
  className = ''
}: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : url || '';
  const shareText = text || title;
  
  const sizeClasses = {
    sm: { button: 'px-3 py-1.5 text-xs', icon: 'w-4 h-4', menu: 'gap-1' },
    md: { button: 'px-4 py-2 text-sm', icon: 'w-5 h-5', menu: 'gap-2' },
    lg: { button: 'px-6 py-3 text-base', icon: 'w-6 h-6', menu: 'gap-3' }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: currentUrl
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setShowMenu(true);
        }
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePlatformClick = (platform: keyof typeof platformConfigs) => {
    const config = platformConfigs[platform];
    const fullUrl = config.getUrl(shareText, currentUrl);
    window.open(fullUrl, '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        onClick={handleShare}
        className={`
          inline-flex items-center gap-2 rounded-full font-medium
          bg-white border border-gray-200 text-gray-700
          hover:bg-gray-50 hover:border-gray-300 transition-all duration-200
          ${sizeClasses[size].button}
        `}
      >
        <ShareIcon className={sizeClasses[size].icon} />
        <span>Compartir</span>
      </button>

      {showMenu && (
        <div className={`
          absolute top-full left-0 mt-2 z-50
          bg-white rounded-xl shadow-lg border border-gray-100 p-2
          flex ${variant === 'floating' ? 'flex-row' : 'flex-col'}
          ${sizeClasses[size].menu}
          animate-fade-in
        `}>
          <button
            onClick={() => handlePlatformClick('whatsapp')}
            className={`${platformConfigs.whatsapp.color} text-white p-2 rounded-lg transition-transform hover:scale-110`}
            aria-label="Share on WhatsApp"
            title="Compartir en WhatsApp"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => handlePlatformClick('twitter')}
            className={`${platformConfigs.twitter.color} text-white p-2 rounded-lg transition-transform hover:scale-110`}
            aria-label="Share on X"
            title="Compartir en X"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => handlePlatformClick('facebook')}
            className={`${platformConfigs.facebook.color} text-white p-2 rounded-lg transition-transform hover:scale-110`}
            aria-label="Share on Facebook"
            title="Compartir en Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          <button
            onClick={() => handlePlatformClick('linkedin')}
            className={`${platformConfigs.linkedin.color} text-white p-2 rounded-lg transition-transform hover:scale-110`}
            aria-label="Share on LinkedIn"
            title="Compartir en LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
          
          <div className="w-px bg-gray-200 mx-1" />
          
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Copiar enlace"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ClipboardIcon className="w-5 h-5" />
            )}
            <span className="text-xs">{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
      )}
    </div>
  );
}