import React, { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface NewsletterSignupProps {
  variant?: 'footer' | 'inline' | 'modal';
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  variant = 'footer',
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Integrate with your email service (Mailchimp, SendGrid, etc.)
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store email in localStorage as backup (replace with actual API call)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      subscribers.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      setStatus('success');
      setMessage('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);

    } catch (error) {
      setStatus('error');
      setMessage('Oops! Something went wrong. Please try again.');
    }
  };

  const footerStyles = variant === 'footer';
  const inlineStyles = variant === 'inline';

  return (
    <div className={`${className}`}>
      {footerStyles && (
        <div className="max-w-md">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Stay in the Loop
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Get weekly updates on new places, events, and expat tips delivered to your inbox.
          </p>
        </div>
      )}

      {inlineStyles && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Join 1,000+ Expats
          </h2>
          <p className="text-lg text-gray-600">
            Get the best of San Luis Potosí delivered weekly
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={`
              w-full px-4 py-3 rounded-lg border
              ${footerStyles ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            disabled={status === 'loading' || status === 'success'}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${footerStyles
              ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
              : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            }
            ${status === 'loading' ? 'animate-pulse' : ''}
          `}
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>

      {/* Status messages */}
      {message && (
        <div
          className={`
            mt-3 p-3 rounded-lg flex items-center text-sm
            ${status === 'success'
              ? footerStyles ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-800'
              : footerStyles ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-800'
            }
          `}
        >
          {status === 'success' && <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />}
          <span>{message}</span>
        </div>
      )}

      {footerStyles && (
        <p className="text-xs text-gray-400 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
