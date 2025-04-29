import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

const SubscriptionSuccessPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'pending' | 'error'>('pending');

  useEffect(() => {
    // Redirect if not authenticated
    if (!user && !isLoading) {
      router.push('/signin?redirect=/business/subscription');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!router.query.session_id || !user) return;

      try {
        const response = await fetch(`/api/subscriptions/check-session?session_id=${router.query.session_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        if (response.ok && data.status === 'active') {
          setSubscriptionStatus('active');
        } else if (response.ok && data.status === 'pending') {
          setSubscriptionStatus('pending');
        } else {
          setSubscriptionStatus('error');
        }
      } catch (err) {
        console.error('Error checking subscription:', err);
        setSubscriptionStatus('error');
      } finally {
        setIsChecking(false);
      }
    };

    if (router.query.session_id && user) {
      checkSubscription();
    }
  }, [router.query.session_id, user]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Subscription Confirmed | Directory SLP</title>
        <meta name="description" content="Your business subscription has been confirmed" />
      </Head>

      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {subscriptionStatus === 'active' 
                  ? '¡Suscripción Confirmada!' 
                  : subscriptionStatus === 'pending' 
                    ? 'Procesando Suscripción' 
                    : 'Estado de Suscripción'}
              </h1>
              <div className="text-lg text-gray-600">
                {subscriptionStatus === 'active' && (
                  <p>
                    ¡Gracias por suscribirte a Directory SLP! Tu perfil de negocio ahora está activo
                    y puedes comenzar a crear listados.
                  </p>
                )}
                {subscriptionStatus === 'pending' && (
                  <p>
                    ¡Gracias por suscribirte a Directory SLP! Tu pago está siendo procesado.
                    Tu perfil se activará en breve.
                  </p>
                )}
                {subscriptionStatus === 'error' && (
                  <p>
                    No pudimos confirmar el estado de tu suscripción. Si crees que esto es un error,
                    por favor contacta a nuestro equipo de soporte.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Siguientes Pasos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Completa tu <Link href="/account/profile" className="text-primary hover:underline">perfil de negocio</Link> con todos tus detalles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Crea tu primer <Link href="/submit-listing/business" className="text-primary hover:underline">listado de servicio</Link></span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Comparte tu perfil de negocio con clientes</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/account/profile"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
                >
                  Completar tu Perfil
                </Link>
                <Link
                  href="/submit-listing/business"
                  className="bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Crear Primer Listado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionSuccessPage; 