import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/hooks/useAuth';

const MONTHLY_PRICE = 250; // 250 MXN per month
const YEARLY_PRICE = 2500; // 2500 MXN per year (equivalent to 208.33 MXN per month)

const SubscriptionPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/business/subscription');
    }
  }, [user, isLoading, router]);

  const handleSelectPlan = (plan: 'monthly' | 'yearly') => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/subscriptions/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error creating subscription');
      }
      
      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Hubo un error al procesar tu suscripción. Intenta de nuevo más tarde.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Suscripción de Negocio | Directory SLP</title>
        <meta name="description" content="Suscríbete para crear tu perfil de negocio en Directory SLP" />
      </Head>

      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Suscripción de Negocio
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Crea tu perfil de negocio en Directory SLP y publica hasta 10 servicios o productos para llegar a más clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Monthly Plan */}
              <div 
                className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all ${
                  selectedPlan === 'monthly' ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => handleSelectPlan('monthly')}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Plan Mensual</h3>
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selectedPlan === 'monthly' && (
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${MONTHLY_PRICE} MXN</span>
                    <span className="text-gray-500"> / mes</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Perfil de negocio personalizado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Publica hasta 10 servicios o productos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Aparece en resultados de búsqueda</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Cancela cuando quieras</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Yearly Plan */}
              <div 
                className={`bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all relative ${
                  selectedPlan === 'yearly' ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => handleSelectPlan('yearly')}
              >
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Ahorra 17%
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Plan Anual</h3>
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selectedPlan === 'yearly' && (
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${YEARLY_PRICE} MXN</span>
                    <span className="text-gray-500"> / año</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Perfil de negocio personalizado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Publica hasta 10 servicios o productos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Aparece en resultados de búsqueda</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Mejor valor (equivale a ${(YEARLY_PRICE / 12).toFixed(2)} MXN/mes)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className={`
                  bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg
                  hover:bg-primary-dark transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  min-w-[200px]
                `}
              >
                {isSubmitting ? 'Procesando...' : 'Suscribirse Ahora'}
              </button>
            </div>

            <div className="mt-12 text-center text-gray-600 text-sm">
              <p>
                Al suscribirte, aceptas nuestros <a href="/terms" className="text-primary hover:underline">Términos y Condiciones</a> y 
                nuestras <a href="/privacy" className="text-primary hover:underline">Políticas de Privacidad</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage; 