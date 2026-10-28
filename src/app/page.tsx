'use client';
import Link from 'next/link';
import { useTeams } from '@/features/teams/hooks/useTeams';
import { useState, useEffect } from 'react';

const championshipOrder = [
  { id: 'mclaren', name: 'McLaren', fullName: 'McLaren Formula 1 Team', points: 833, position: 1, color: '#FF8700', drivers: [{ name: 'Lando Norris', number: 4 }, { name: 'Oscar Piastri', number: 81 }] },
  { id: 'ferrari', name: 'Ferrari', fullName: 'Scuderia Ferrari HP', points: 652, position: 2, color: '#DC0000', drivers: [{ name: 'Charles Leclerc', number: 16 }, { name: 'Lewis Hamilton', number: 44 }] },
  { id: 'redbull', name: 'Red Bull Racing', fullName: 'Oracle Red Bull Racing', points: 589, position: 3, color: '#0600EF', drivers: [{ name: 'Max Verstappen', number: 1 }, { name: 'Yuki Tsunoda', number: 22 }] },
  { id: 'mercedes', name: 'Mercedes', fullName: 'Mercedes-AMG PETRONAS', points: 468, position: 4, color: '#00D2BE', drivers: [{ name: 'George Russell', number: 63 }, { name: 'Kimi Antonelli', number: 12 }] },
  { id: 'aston-martin', name: 'Aston Martin', fullName: 'Aston Martin Aramco', points: 86, position: 5, color: '#006F62', drivers: [{ name: 'Fernando Alonso', number: 14 }, { name: 'Lance Stroll', number: 18 }] },
  { id: 'alpine', name: 'Alpine', fullName: 'Alpine F1 Team', points: 65, position: 6, color: '#0090FF', drivers: [{ name: 'Pierre Gasly', number: 10 }, { name: 'Franco Colapinto', number: 43 }] },
  { id: 'haas', name: 'Haas', fullName: 'MoneyGram Haas F1 Team', points: 58, position: 7, color: '#B6BABD', drivers: [{ name: 'Esteban Ocon', number: 31 }, { name: 'Oliver Bearman', number: 87 }] },
  { id: 'rb', name: 'RB', fullName: 'Visa Cash App RB', points: 46, position: 8, color: '#6692FF', drivers: [{ name: 'Liam Lawson', number: 30 }, { name: 'Isack Hadjar', number: 6 }] },
  { id: 'williams', name: 'Williams', fullName: 'Williams Racing', points: 17, position: 9, color: '#005AFF', drivers: [{ name: 'Alexander Albon', number: 23 }, { name: 'Carlos Sainz', number: 55 }] },
  { id: 'sauber', name: 'Kick Sauber', fullName: 'Stake F1 Team Kick Sauber', points: 0, position: 10, color: '#52E252', drivers: [{ name: 'Gabriel Bortoleto', number: 5 }, { name: 'Nico Hülkenberg', number: 27 }] },
];

export default function Home() {
  const { data: apiData, loading, error } = useTeams(1);
  const [filter, setFilter] = useState<'all' | 'top5'>('all');

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, []);

  const teamsWithOrder = championshipOrder.map((ordered) => {
    const apiTeam = apiData?.data.find((t) => t.id === ordered.id);
    return {
      ...ordered,
      base: apiTeam?.base || '',
      championships: apiTeam?.championships || 0,
    };
  });

  const displayedTeams = filter === 'top5' ? teamsWithOrder.slice(0, 5) : teamsWithOrder;

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">
      <section 
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: 'url(/imagenes/f1.jpg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0a0e1a',
          minHeight: '600px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto pt-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-2xl">
            Historia de la <span className="text-red-500">Fórmula 1</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Descubre las escuderías, pilotos y momentos que marcaron la categoría reina. Temporada 2025.
          </p>
          <a href="#escuderias" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition shadow-xl">
            Ver Escuderías
          </a>
        </div>
      </section>

      <section id="escuderias" className="max-w-7xl mx-auto p-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Escuderías Temporada 2025</h2>
          <p className="text-gray-400 text-lg">Clasificación final del campeonato de constructores.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
              filter === 'all' ? 'bg-red-600 text-white' : 'bg-[#1a1f2e] text-gray-300 hover:bg-[#252b3d]'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('top5')}
            className={`px-8 py-3 rounded-full font-semibold transition text-lg ${
              filter === 'top5' ? 'bg-red-600 text-white' : 'bg-[#1a1f2e] text-gray-300 hover:bg-[#252b3d]'
            }`}
          >
            Top 5
          </button>
        </div>

        {loading && <p className="text-center py-10 text-gray-400 text-xl animate-pulse">Cargando escuderías...</p>}
        {error && <p className="text-center text-red-500 py-10 text-xl">Error: {error}</p>}

        {displayedTeams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedTeams.map((team) => (
              <Link
                key={team.id}
                href={`/teams/${team.id}`}
                className="bg-[#1a1f2e] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-l-4 group"
                style={{ borderColor: team.color }}
              >
                <div className="text-center">
                  <div className="bg-[#0a0e1a] rounded-lg p-6 mb-4 h-40 flex items-center justify-center">
                    <img 
                      src={`/imagenes/teams/${team.id}.jpg`} 
                      alt={`${team.name} logo`} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-gray-200 transition">
                    {team.name}
                  </h2>
                  
                  <p className="text-sm font-semibold mb-1" style={{ color: team.color }}>
                    {team.points} pts
                  </p>
                  
                  <p className="text-gray-500 text-xs mb-4">{team.base}</p>
                  
                  <div className="space-y-1 border-t border-gray-700 pt-3">
                    {team.drivers.map((driver, idx) => (
                      <div key={idx} className="text-xs text-gray-400">
                        #{driver.number} {driver.name}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <span className="text-sm font-semibold group-hover:underline" style={{ color: team.color }}>
                      Ver más →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-[#1a1f2e] py-8 text-center text-gray-400">
        <p>© 2026 F1 History. Proyecto académico de Desarrollo Web.</p>
      </footer>
    </main>
  );
}