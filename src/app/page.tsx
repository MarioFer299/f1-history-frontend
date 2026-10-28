'use client';
import { useTeams } from '@/features/teams/hooks/useTeams';
import { TeamCard } from '@/features/teams/components/TeamCard';
import { useState, useEffect } from 'react';
import { NewsletterForm } from '@/features/interactions/components/NewsletterForm';

export default function Home() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'top5'>('all');
  const { data, loading, error } = useTeams(page);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const displayedTeams = filter === 'top5' && data ? data.data.slice(0, 5) : data?.data || [];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-900 text-white py-24 px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Historia de la Fórmula 1
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-2xl mx-auto">
            Descubre las escuderías, pilotos y momentos que marcaron la categoría reina. Temporada 2025.
          </p>
          <a href="#escuderias" className="inline-block bg-white text-red-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg">
            Ver Escuderías
          </a>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 p-3 rounded-full transition text-2xl"
          aria-label="Cambiar modo oscuro"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </section>

      {/* SECCIÓN ESCUDERÍAS */}
      <section id="escuderias" className="max-w-6xl mx-auto p-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Escuderías Temporada 2025</h2>
          <p className="text-gray-600 dark:text-gray-400">Las 10 escuderías que compiten en la parrilla actual.</p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-10">
          <button 
            onClick={() => { setFilter('all'); setPage(1); }}
            className={`px-6 py-2 rounded-full font-semibold transition ${filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}
          >
            Todas
          </button>
          <button 
            onClick={() => { setFilter('top5'); setPage(1); }}
            className={`px-6 py-2 rounded-full font-semibold transition ${filter === 'top5' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}
          >
            Top 5
          </button>
        </div>
        
        {loading && <p className="text-center py-10 text-gray-500">Cargando escuderías...</p>}
        {error && <p className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-900/20 rounded-lg">Error: {error}</p>}
        
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedTeams.map((team) => <TeamCard key={team.id} team={team} />)}
            </div>
            
            {/* Paginación */}
            {filter === 'all' && (
              <div className="flex justify-center gap-4 mt-12">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1} 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 hover:bg-red-700 transition"
                >
                  Anterior
                </button>
                <span className="py-2 font-bold text-gray-700 dark:text-gray-300">
                  Página {page} de {data.pagination.totalPages}
                </span>
                <button 
                  onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))} 
                  disabled={page === data.pagination.totalPages} 
                  className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 hover:bg-red-700 transition"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* SECCIÓN COMUNIDAD / BOLETÍN */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Únete a la Comunidad</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Recibe noticias y análisis de la F1 cada semana.</p>
          <NewsletterForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© 2025 F1 History. Sitio desarrollado para el curso de Desarrollo Web.</p>
      </footer>
    </main>
  );
}