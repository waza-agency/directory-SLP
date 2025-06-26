import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircleIcon, BuildingOfficeIcon, PresentationChartLineIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/supabase-auth';

const SubscriptionSuccessPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'pending' | 'error'>('pending');
  const [businessName, setBusinessName] = useState<string>('');
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  // Remove aggressive redirect - only redirect after reasonable wait and multiple failures
  useEffect(() => {
    // Only redirect if user is clearly not authenticated after loading completes
    // and we've had time to check the session
    if (!isLoading && !user && hasCheckedSession) {
      // Add a delay to prevent immediate redirects during payment flow
      const redirectTimer = setTimeout(() => {
        console.log('No user found after session check, redirecting to signin');
        router.push('/signin?redirect=/business/subscription');
      }, 3000); // Wait 3 seconds before redirecting

      return () => clearTimeout(redirectTimer);
    }
  }, [user, isLoading, router, hasCheckedSession]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user && isLoading) {
        // Still loading auth, wait
        return;
      }

      try {
        setIsChecking(true);
        console.log('Checking user subscription status');

        // Try to check subscription even without user (in case auth is delayed)
        if (user?.id) {
          const { data: userData } = await fetch('/api/user/me').then(res => res.json());

          // Try to get the business profile to show the business name
          if (userData?.id) {
            const response = await fetch(`/api/user/business-profile?user_id=${userData.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              if (data?.business_name) {
                setBusinessName(data.business_name);
              }
              if (data?.subscription_status === 'active') {
                setSubscriptionStatus('active');
              }
            }
          }
        }

        // If there's a session_id, check it - this is the primary success indicator
        if (router.query.session_id) {
          console.log('Checking session ID:', router.query.session_id);

          // Retry logic for session check
          const maxRetries = 3;
          let retryCount = 0;
          let sessionCheckSuccess = false;

          while (retryCount < maxRetries && !sessionCheckSuccess) {
            try {
              const response = await fetch(`/api/subscriptions/check-session?session_id=${router.query.session_id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();
              console.log('Session check response:', data);

              if (response.ok) {
                sessionCheckSuccess = true;
                if (data.status === 'active') {
                  setSubscriptionStatus('active');
                } else if (data.status === 'pending') {
                  setSubscriptionStatus('pending');
                } else {
                  setSubscriptionStatus('error');
                }
              } else if (response.status === 401) {
                // Auth issue, but don't immediately redirect - payment might still be processing
                console.log('Auth issue during session check, will retry');
                retryCount++;
                if (retryCount < maxRetries) {
                  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
                }
              } else {
                console.error('Error in session check response:', data);
                retryCount++;
                if (retryCount < maxRetries) {
                  await new Promise(resolve => setTimeout(resolve, 2000));
                }
              }
            } catch (error) {
              console.error('Error during session check retry:', error);
              retryCount++;
              if (retryCount < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 2000));
              }
            }
          }

          if (!sessionCheckSuccess) {
            console.error('Failed to check session after retries');
            setSubscriptionStatus('error');
          }
        } else {
          // No session ID in URL, but user might still have an active subscription
          console.log('No session ID found, but user might have existing subscription');
          // The business profile check above should handle this case
        }

      } catch (err) {
        console.error('Error checking subscription:', err);
        setSubscriptionStatus('error');
      } finally {
        setIsChecking(false);
        setHasCheckedSession(true);
      }
    };

    // Always try to check subscription, even if user is not immediately available
    // This handles cases where payment completed but auth is still loading
    checkSubscription();
  }, [router.query.session_id, user, isLoading]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-primary text-lg mb-2">Verificando tu suscripción...</div>
          <div className="text-sm text-gray-600">Esto puede tomar unos momentos</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>¡Suscripción Confirmada! | Directory SLP</title>
        <meta name="description" content="Tu suscripción de negocio en Directory SLP ha sido confirmada. Comienza a crear listados ahora." />
      </Head>

      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Top banner with checkmark */}
            <div className="bg-primary/10 p-6 text-center">
              <CheckCircleIcon className="h-20 w-20 mx-auto text-green-500 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {subscriptionStatus === 'active'
                  ? '¡Suscripción Confirmada!'
                  : subscriptionStatus === 'pending'
                    ? 'Procesando Tu Suscripción'
                    : 'Estado de Suscripción'}
              </h1>
              <p className="text-xl text-gray-700">
                {businessName ? `¡Bienvenido ${businessName}!` : '¡Bienvenido a Directory SLP!'}
              </p>
            </div>

            <div className="p-8">
              <div className="mb-8 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  {subscriptionStatus === 'active'
                    ? 'Gracias por subscribirte a Directory SLP. Tu negocio ahora es parte de nuestra comunidad. ¡Tu perfil ya está activo y puedes comenzar a crear listados!'
                    : subscriptionStatus === 'pending'
                      ? 'Tu pago está siendo procesado. Pronto recibirás una confirmación por correo electrónico cuando tu suscripción esté activa.'
                      : 'No pudimos confirmar el estado de tu suscripción. Si acabas de completar el pago, por favor espera unos minutos mientras procesamos tu información.'}
                </p>
                {subscriptionStatus === 'error' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <p className="text-orange-600">
                      Si acabas de completar el pago, tu suscripción puede estar siendo procesada.
                      Esto puede tomar hasta 10 minutos. Si continúas viendo este mensaje después de ese tiempo,
                      por favor contacta a nuestro equipo de soporte.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-3 text-primary hover:underline text-sm font-medium"
                    >
                      Actualizar Estado
                    </button>
                  </div>
                )}
              </div>

              {/* Benefits section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Beneficios de tu Suscripción:
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <BuildingOfficeIcon className="h-10 w-10 text-primary mb-3" />
                    <h3 className="font-medium text-gray-900 mb-2">Perfil de Negocio</h3>
                    <p className="text-gray-600">Perfil profesional personalizado para tu negocio visible a toda la comunidad de Directory SLP.</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <PresentationChartLineIcon className="h-10 w-10 text-primary mb-3" />
                    <h3 className="font-medium text-gray-900 mb-2">10 Listados de Servicios</h3>
                    <p className="text-gray-600">Publica hasta 10 servicios o productos diferentes para mostrar todo lo que ofreces.</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <MegaphoneIcon className="h-10 w-10 text-primary mb-3" />
                    <h3 className="font-medium text-gray-900 mb-2">Visibilidad</h3>
                    <p className="text-gray-600">Destaca en los resultados de búsqueda y llega a más clientes potenciales.</p>
                  </div>
                </div>
              </div>

              {/* Next steps section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Siguientes Pasos:
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Completa tu perfil:</span>
                        <p className="text-gray-600">Añade la información de tu negocio, horarios, ubicación y fotos para que los clientes puedan conocerte mejor.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Crea tus listados:</span>
                        <p className="text-gray-600">Añade detalles sobre los servicios o productos que ofreces con precios, descripciones y fotos.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Comparte tu perfil:</span>
                        <p className="text-gray-600">Usa las redes sociales para promocionar tu presencia en Directory SLP y atraer más clientes.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/business/profile"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
                >
                  Completar mi Perfil
                </Link>
                <Link
                  href="/submit-listing/business"
                  className="bg-white text-primary border border-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Crear Primer Listado
                </Link>
                <Link
                  href="/business/dashboard"
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
                >
                  Ir al Dashboard
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