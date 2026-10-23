'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Piloto {
  id: string;
  nombre: string;
  numero: number;
  escuderia: {
    nombre: string;
    color: string;
  };
}

export default function PilotosListPage() {
  const [pilotos, setPilotos] = useState<Piloto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        setLoading(true);
        // Necesitamos un endpoint que devuelva todos los pilotos
        const data = await apiRequest('/pilotos', { skipAuth: true });
        setPilotos(data);
      } catch (err: any) {
        setError('No se pudo cargar la lista de pilotos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPilotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-gray-600 dark:text-gray-300 animate-pulse">Cargando pilotos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Pilotos de la Temporada 2025
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pilotos.map((piloto) => (
            <Link
              key={piloto.id}
              href={`/pilotos/${piloto.nombre.toLowerCase().split(' ')[1] || piloto.nombre.toLowerCase()}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-t-4"
              style={{ borderColor: piloto.escuderia.color }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-3xl font-black italic"
                    style={{ color: piloto.escuderia.color }}
                  >
                    #{piloto.numero}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {piloto.nombre}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {piloto.escuderia.nombre}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}