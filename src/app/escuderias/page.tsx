'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Escuderia { id: string; nombre: string; puntos2025: number; color: string; campeonatos: number; }

export default function EscuderiasListPage() {
  const [escuderias, setEscuderias] = useState<Escuderia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscuderias = async () => {
      try {
        // Pedimos limit=10 para traer todas en la lista
        const res = await apiRequest('/escuderias?page=1&limit=10', { skipAuth: true });
        setEscuderias(res.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchEscuderias();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Cargando escuderías...</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Escuderías Temporada 2025</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {escuderias.map((esc) => (
            <Link key={esc.id} href={`/escuderias/${esc.nombre.toLowerCase().split(' ')[0]}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-t-4" style={{ borderColor: esc.color }}>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{esc.nombre}</h2>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{esc.puntos2025} PTS</span>
                  <span>🏆 {esc.campeonatos} Campeonatos</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}