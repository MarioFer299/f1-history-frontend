'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Piloto { id: string; nombre: string; numero: number; }
interface Escuderia { id: string; nombre: string; puntos2025: number; fundacion: number; base: string; campeonatos: number; color: string; historia: string; pilotos: Piloto[]; }

export default function EscuderiaDetailPage() {
  const params = useParams();
  const [escuderia, setEscuderia] = useState<Escuderia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscuderia = async () => {
      try {
        const data = await apiRequest(`/escuderias/${params.id}`, { skipAuth: true });
        setEscuderia(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    if (params.id) fetchEscuderia();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Cargando...</div>;
  if (!escuderia) return <div className="min-h-screen flex items-center justify-center text-red-500">Escudería no encontrada</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="w-full h-48 md:h-64 flex items-center p-6 md:p-12 relative" style={{ backgroundColor: escuderia.color }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-black drop-shadow-md">{escuderia.nombre.toUpperCase()}</h1>
          <p className="text-xl mt-2">Fundada en {escuderia.fundacion} · {escuderia.base}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Historia</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{escuderia.historia}</p>
            </section>
          </div>
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Datos del Equipo</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                  <span className="text-gray-500">Puntos 2025</span>
                  <span className="font-bold dark:text-white" style={{ color: escuderia.color }}>{escuderia.puntos2025} PTS</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                  <span className="text-gray-500">Campeonatos</span>
                  <span className="font-bold dark:text-white">🏆 {escuderia.campeonatos}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                  <span className="text-gray-500">Base</span>
                  <span className="font-bold dark:text-white text-right">{escuderia.base}</span>
                </div>
              </div>
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pilotos 2025</h2>
              <div className="space-y-3">
                {escuderia.pilotos.map((p) => (
                  <Link key={p.id} href={`/pilotos/${p.nombre.toLowerCase().split(' ')[1] || p.nombre.toLowerCase()}`} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <span className="text-2xl font-black italic" style={{ color: escuderia.color }}>#{p.numero}</span>
                    <span className="font-semibold dark:text-white">{p.nombre}</span>
                  </Link>
                ))}
              </div>
            </section>
            <Link href="/escuderias" className="block w-full text-center py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition">← Ver todas las escuderías</Link>
          </div>
        </div>
      </div>
    </main>
  );
}