'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { http } from '@/features/common/http';
import Link from 'next/link';

interface Team {
  id: string;
  name: string;
  base: string;
  championships: number;
  logoUrl: string;
}

export default function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      http<Team>(`/api/teams/${id}`, { skipAuth: true })
        .then(setTeam)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (!team) return <div className="p-10 text-center text-red-500">Escudería no encontrada</div>;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 p-8 text-center">
          <img src={team.logoUrl} alt={team.name} className="h-24 mx-auto mb-4 bg-white p-2 rounded" />
          <h1 className="text-4xl font-extrabold text-white">{team.name}</h1>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm">BASE</h3>
              <p className="text-xl font-semibold">{team.base}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-bold text-gray-500 dark:text-gray-400 text-sm">CAMPEONATOS</h3>
              <p className="text-xl font-semibold">🏆 {team.championships}</p>
            </div>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Historia</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {team.name} es una de las escuderías más emblemáticas de la Fórmula 1. 
              Con base en {team.base}, han logrado {team.championships} campeonatos de constructores. 
              (Aquí puedes expandir el texto con la historia real de tu Entrega 1).
            </p>
          </div>
          <Link href="/" className="inline-block text-red-600 hover:underline font-bold">← Volver al catálogo</Link>
        </div>
      </div>
    </main>
  );
}