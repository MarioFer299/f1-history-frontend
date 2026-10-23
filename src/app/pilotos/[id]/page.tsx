'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/features/common/http';
import Link from 'next/link';

interface Escuderia { nombre: string; color: string; }
interface Piloto {
  id: string; nombre: string; numero: number; nacionalidad: string;
  fechaNacimiento: string; lugarNacimiento: string; biografia: string;
  carreras: number; victorias: number; podios: number; poles: number;
  vueltasRapidas: number; puntos: number; logros: string; escuderia: Escuderia;
}

export default function PilotoDetailPage() {
  const params = useParams();
  const [piloto, setPiloto] = useState<Piloto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPiloto = async () => {
      try {
        const data = await apiRequest(`/pilotos/${params.id}`, { skipAuth: true });
        setPiloto(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    if (params.id) fetchPiloto();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Cargando...</div>;
  if (!piloto) return <div className="min-h-screen flex items-center justify-center text-red-500">Piloto no encontrado</div>;

  const StatBox = ({ label, value }: { label: string; value: number }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
      <div className="text-3xl font-bold" style={{ color: piloto.escuderia.color }}>{value}</div>
      <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{label}</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="w-full h-48 md:h-64 flex items-end p-6 md:p-12 relative overflow-hidden" style={{ backgroundColor: piloto.escuderia.color }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-white">
          <div className="text-6xl md:text-8xl font-black italic opacity-30 absolute -top-4 left-6">#{piloto.numero}</div>
          <h1 className="text-4xl md:text-6xl font-black relative z-10 drop-shadow-md">{piloto.nombre.toUpperCase()}</h1>
          <p className="text-xl md:text-2xl font-medium mt-2">{piloto.escuderia.nombre}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Biografía</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{piloto.biografia}</p>
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Datos Personales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="text-sm text-gray-500 uppercase">Nacionalidad</span><p className="text-lg font-semibold dark:text-white">{piloto.nacionalidad}</p></div>
                <div><span className="text-sm text-gray-500 uppercase">Fecha de Nacimiento</span><p className="text-lg font-semibold dark:text-white">{piloto.fechaNacimiento}</p></div>
                <div className="md:col-span-2"><span className="text-sm text-gray-500 uppercase">Lugar de Nacimiento</span><p className="text-lg font-semibold dark:text-white">{piloto.lugarNacimiento}</p></div>
              </div>
            </section>
          </div>
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Estadísticas</h2>
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="Carreras" value={piloto.carreras} />
                <StatBox label="Victorias" value={piloto.victorias} />
                <StatBox label="Podios" value={piloto.podios} />
                <StatBox label="Poles" value={piloto.poles} />
                <StatBox label="V. Rápidas" value={piloto.vueltasRapidas} />
                <StatBox label="Puntos" value={piloto.puntos} />
              </div>
            </section>
            {piloto.logros && (
              <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md p-6 text-white">
                <h2 className="text-xl font-bold mb-3">🏆 Logros</h2>
                <p className="text-gray-300 italic">"{piloto.logros}"</p>
              </section>
            )}
            <Link href="/pilotos" className="block w-full text-center py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition">← Ver todos los pilotos</Link>
          </div>
        </div>
      </div>
    </main>
  );
}