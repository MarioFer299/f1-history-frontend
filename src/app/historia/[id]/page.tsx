'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function HistoriaDetailPage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    // Redirigimos al detalle de la escudería, que ya contiene la sección de historia completa
    router.replace(`/escuderias/${params.id}`);
  }, [params.id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-600 dark:text-gray-300 animate-pulse">Redirigiendo a la historia del equipo...</p>
    </div>
  );
}