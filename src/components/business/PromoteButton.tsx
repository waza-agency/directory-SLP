import React, { useState } from 'react';
import Link from 'next/link';
import { SparklesIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface PromoteButtonProps {
  variant?: 'inline' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  businessName?: string;
}

const plans = [
  {
    id: 'featured',
    name: 'Featured',
    price: 500,
    period: 'mes',
    color: 'bg-yellow-500',
    features: [
      'Top position in search results',
      'Badge "⭐ Destacado" on profile',
      'Featured in homepage carousel',
      'Basic analytics'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1000,
    period: 'mes',
    color: 'bg-primary',
    features: [
      'All Featured benefits',
      'Priority support',
      'Advanced analytics',
      'Custom banner on profile',
      'Early access to features'
    ]
  },
  {
    id: 'verified',
    name: 'Verified',
    price: 300,
    period: 'mes',
    color: 'bg-green-500',
    features: [
      'Badge "✓ Verificado" on profile',
      'Trust verification badge',
      'Verified status in search',
      'Trust signal for customers'
    ]
  }
];

export default function PromoteButton({ 
  variant = 'inline', 
  size = 'md',
  className = '',
  businessName 
}: PromoteButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      const subject = encodeURIComponent(
        businessName 
          ? `Upgrade to ${plan.name} - ${businessName}`
          : `Upgrade to ${plan.name}`
      );
      window.location.href = `/contact?subject=${subject}&plan=${planId}`;
    }
  };

  const buttonContent = (
    <>
      <SparklesIcon className="w-5 h-5" />
      <span>Promociona tu negocio</span>
    </>
  );

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`
          inline-flex items-center gap-2 rounded-full font-medium
          bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900
          hover:from-yellow-500 hover:to-orange-600 
          transition-all duration-200 shadow-md hover:shadow-lg
          ${sizeClasses[size]} ${className}
        `}
      >
        {buttonContent}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">🚀 Potencia Tu Negocio</h2>
                  <p className="text-gray-600">Selecciona el plan que mejor se adapte a tus necesidades</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Cerrar modal de promoción"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all
                    ${selectedPlan === plan.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  {plan.id === 'premium' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Más Popular
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 ${plan.color} rounded-xl flex items-center justify-center mb-4`}>
                    {plan.id === 'verified' ? (
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    ) : plan.id === 'featured' ? (
                      <StarIcon className="w-6 h-6 text-white" />
                    ) : (
                      <SparklesIcon className="w-6 h-6 text-white" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`
                      w-full py-3 rounded-lg font-semibold transition-colors
                      ${plan.id === 'premium' 
                        ? 'bg-primary text-white hover:bg-primary-dark' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                    `}
                  >
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <p className="text-center text-gray-600 text-sm">
                ¿Necesitas más información? 
                <Link href="/contact?subject=Plans%20Info" className="text-primary font-semibold hover:underline ml-1">
                  Contáctanos
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}