import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CulturalExperiencesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/san-luis-potosi-cultural-services');
  }, [router]);

  return null;
} 