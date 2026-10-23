'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Escuderia { id: string; nombre: string; color: string; historia: string; fundacion: number; }

export default function HistoriaListPage() {
  const [escuderias, setEscuderias] = useState<Escuderia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiRequest('/escuderias?page=1&limit=10', { skipAuth: true });
        setEscuderias(res.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Cargando historia...</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Historia de la Fórmula 1</h1>
        <div className="space-y-8">
          {escuderias.map((esc) => (
            <article key={esc.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4" style={{ borderColor: esc.color }}>
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{esc.nombre}</h2>
                <span className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">Desde {esc.fundacion}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{esc.historia}</p>
              <Link href={`/historia/${esc.nombre.toLowerCase().split(' ')[0]}`} className="text-red-600 hover:text-red-700 font-medium text-sm">Leer historia completa →</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}