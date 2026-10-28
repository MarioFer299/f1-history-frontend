'use client';
import { useTeams } from '@/features/teams/hooks/useTeams';
import { TeamCard } from '@/features/teams/components/TeamCard';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useTeams(page);

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        🏎️ Escuderías F1 2025
      </h1>
      
      {loading && <p className="text-center text-gray-600 dark:text-gray-300">Cargando escuderías...</p>}
      
      {error && (
        <p className="text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          Error: {error}
        </p>
      )}
      
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.data.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
          
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>
            
            <span className="py-2 text-gray-700 dark:text-gray-300 font-medium">
              Página {page} de {data.pagination.totalPages}
            </span>
            
            <button
              onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
              disabled={page === data.pagination.totalPages}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </main>
  );
}