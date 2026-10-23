'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Escuderia { 
  id: string; 
  nombre: string; 
  color: string; 
  historia: string;
  fundacion: number;
  campeonatos: number;
}

export default function HistoriaDetailPage() {
  const params = useParams();
  const [escuderia, setEscuderia] = useState<Escuderia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoria = async () => {
      try {
        const data = await apiRequest(`/escuderias/${params.id}`, { skipAuth: true });
        setEscuderia(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    if (params.id) fetchHistoria();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Cargando historia...</div>;
  if (!escuderia) return <div className="min-h-screen flex items-center justify-center text-red-500">Historia no encontrada</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Header */}
      <div className="w-full h-32 md:h-48 flex items-center p-6 md:p-12 relative" style={{ backgroundColor: escuderia.color }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-black drop-shadow-md">
            Historia de {escuderia.nombre}
          </h1>
        </div>
      </div>

      {/* Contenido: SOLO la historia narrativa */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 md:p-12">
          {/* Stats rápidas arriba */}
          <div className="flex gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: escuderia.color }}>{escuderia.fundacion}</div>
              <div className="text-xs text-gray-500 uppercase">Fundación</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: escuderia.color }}>{escuderia.campeonatos}</div>
              <div className="text-xs text-gray-500 uppercase">Campeonatos</div>
            </div>
          </div>

          {/* Historia completa */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {escuderia.historia}
            </p>
          </div>
        </article>

        <div className="mt-8 flex justify-between">
          <Link 
            href="/historia" 
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            ← Ver todas las historias
          </Link>
          <Link 
            href={`/escuderias/${params.id}`}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Ver escudería completa →
          </Link>
        </div>
      </div>
    </main>
  );
}