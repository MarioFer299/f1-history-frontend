'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Piloto { id: string; nombre: string; numero: number; }
interface Escuderia { 
  id: string; 
  nombre: string; 
  puntos2025: number; 
  fundacion: number; 
  base: string; 
  campeonatos: number; 
  color: string; 
  historia: string; 
  pilotos: Piloto[]; 
}

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
      {/* Hero con color de escudería */}
      <div className="w-full h-48 md:h-64 flex items-center p-6 md:p-12 relative" style={{ backgroundColor: escuderia.color }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-black drop-shadow-md">{escuderia.nombre.toUpperCase()}</h1>
          <p className="text-xl mt-2">{escuderia.base}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna principal: Datos del equipo + Pilotos */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SOLO datos técnicos, NO historia */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                Datos del Equipo
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold" style={{ color: escuderia.color }}>{escuderia.fundacion}</div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mt-1">Fundación</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold" style={{ color: escuderia.color }}>{escuderia.campeonatos}</div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mt-1">Campeonatos</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold" style={{ color: escuderia.color }}>{escuderia.puntos2025}</div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mt-1">Puntos 2025</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center col-span-2 md:col-span-1">
                  <div className="text-sm font-bold" style={{ color: escuderia.color }}>{escuderia.base}</div>
                  <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mt-1">Base</div>
                </div>
              </div>
            </section>

            {/* Pilotos actuales */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                Pilotos 2025
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {escuderia.pilotos.map((piloto) => (
                  <Link 
                    key={piloto.id} 
                    href={`/pilotos/${piloto.nombre.toLowerCase().split(' ')[1] || piloto.nombre.toLowerCase()}`}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    <span className="text-4xl font-black italic" style={{ color: escuderia.color }}>
                      #{piloto.numero}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{piloto.nombre}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ver perfil →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Resumen MUY corto de historia con enlace a la página completa */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Resumen Histórico
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4">
                {escuderia.historia}
              </p>
              <Link 
                href={`/historia/${params.id}`}
                className="inline-block mt-4 text-red-600 hover:text-red-700 font-medium"
              >
                Leer historia completa →
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Link 
              href="/escuderias" 
              className="block w-full text-center py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              ← Ver todas las escuderías
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}