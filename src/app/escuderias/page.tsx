'use client';
import Link from 'next/link';
import { useState } from 'react';

// Logos oficiales de los equipos (URLs públicas de Wikimedia)
const teamLogos: Record<string, string> = {
  'mclaren': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/McLaren_Racing_logo.svg/1200px-McLaren_Racing_logo.svg.png',
  'ferrari': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Scuderia_Ferrari_Logo.svg/1200px-Scuderia_Ferrari_Logo.svg.png',
  'redbull': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Red_Bull_Racing_logo.svg/1200px-Red_Bull_Racing_logo.svg.png',
  'mercedes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes_AMG_Petronas_F1_Team_Logo.svg/1200px-Mercedes_AMG_Petronas_F1_Team_Logo.svg.png',
  'aston-martin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Aston_Martin_F1_Team_logo.svg/1200px-Aston_Martin_F1_Team_logo.svg.png',
  'alpine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Alpine_F1_Team_Logo.svg/1200px-Alpine_F1_Team_Logo.svg.png',
  'haas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Haas_F1_Team_logo.svg/1200px-Haas_F1_Team_logo.svg.png',
  'rb': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Visa_Cash_App_RB_Formula_One_Team_Logo.svg/1200px-Visa_Cash_App_RB_Formula_One_Team_Logo.svg.png',
  'williams': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Williams_Racing_logo.svg/1200px-Williams_Racing_logo.svg.png',
  'sauber': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kick_Sauber_F1_Team_logo.svg/1200px-Kick_Sauber_F1_Team_logo.svg.png',
};

// Orden REAL del campeonato de constructores 2025
const teams = [
  {
    id: 'mclaren',
    name: 'McLaren',
    fullName: 'McLaren Formula 1 Team',
    points: 833,
    position: 1,
    foundation: 1963,
    base: 'Woking, Reino Unido',
    championships: 9,
    color: '#FF8700',
    drivers: [
      { name: 'Lando Norris', number: 4, id: 5 },
      { name: 'Oscar Piastri', number: 81, id: 6 }
    ]
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    fullName: 'Scuderia Ferrari HP',
    points: 652,
    position: 2,
    foundation: 1950,
    base: 'Maranello, Italia',
    championships: 16,
    color: '#DC0000',
    drivers: [
      { name: 'Charles Leclerc', number: 16, id: 3 },
      { name: 'Lewis Hamilton', number: 44, id: 4 }
    ]
  },
  {
    id: 'redbull',
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    points: 589,
    position: 3,
    foundation: 2005,
    base: 'Milton Keynes, Reino Unido',
    championships: 6,
    color: '#0600EF',
    drivers: [
      { name: 'Max Verstappen', number: 1, id: 1 },
      { name: 'Liam Lawson', number: 30, id: 2 }
    ]
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    fullName: 'Mercedes-AMG PETRONAS',
    points: 468,
    position: 4,
    foundation: 2010,
    base: 'Brackley, Reino Unido',
    championships: 8,
    color: '#00D2BE',
    drivers: [
      { name: 'George Russell', number: 63, id: 7 },
      { name: 'Kimi Antonelli', number: 12, id: 8 }
    ]
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    fullName: 'Aston Martin Aramco',
    points: 86,
    position: 5,
    foundation: 2021,
    base: 'Silverstone, Reino Unido',
    championships: 0,
    color: '#006F62',
    drivers: [
      { name: 'Fernando Alonso', number: 14, id: 9 },
      { name: 'Lance Stroll', number: 18, id: 10 }
    ]
  },
  {
    id: 'alpine',
    name: 'Alpine',
    fullName: 'Alpine F1 Team',
    points: 65,
    position: 6,
    foundation: 2021,
    base: 'Enstone, Reino Unido',
    championships: 2,
    color: '#0090FF',
    drivers: [
      { name: 'Pierre Gasly', number: 10, id: 11 },
      { name: 'Franco Colapinto', number: 43, id: 12 }
    ]
  },
  {
    id: 'haas',
    name: 'Haas',
    fullName: 'MoneyGram Haas F1 Team',
    points: 58,
    position: 7,
    foundation: 2016,
    base: 'Kannapolis, Estados Unidos',
    championships: 0,
    color: '#B6BABD',
    drivers: [
      { name: 'Esteban Ocon', number: 31, id: 13 },
      { name: 'Oliver Bearman', number: 87, id: 14 }
    ]
  },
  {
    id: 'rb',
    name: 'RB',
    fullName: 'Visa Cash App RB',
    points: 46,
    position: 8,
    foundation: 2006,
    base: 'Faenza, Italia',
    championships: 0,
    color: '#6692FF',
    drivers: [
      { name: 'Yuki Tsunoda', number: 22, id: 15 },
      { name: 'Isack Hadjar', number: 6, id: 16 }
    ]
  },
  {
    id: 'williams',
    name: 'Williams',
    fullName: 'Williams Racing',
    points: 17,
    position: 9,
    foundation: 1977,
    base: 'Grove, Reino Unido',
    championships: 9,
    color: '#005AFF',
    drivers: [
      { name: 'Alexander Albon', number: 23, id: 17 },
      { name: 'Carlos Sainz', number: 55, id: 18 }
    ]
  },
  {
    id: 'sauber',
    name: 'Kick Sauber',
    fullName: 'Stake F1 Team Kick Sauber',
    points: 0,
    position: 10,
    foundation: 1993,
    base: 'Hinwil, Suiza',
    championships: 0,
    color: '#52E252',
    drivers: [
      { name: 'Nico Hülkenberg', number: 27, id: 20 },
      { name: 'Gabriel Bortoleto', number: 5, id: 19 }
    ]
  },
];

export default function EscuderiasPage() {
  const [filter, setFilter] = useState<'all' | 'top5'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams
    .filter(team =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, filter === 'top5' ? 5 : undefined);

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Escuderías Temporada 2025</h1>
        <p className="text-gray-400 text-center mb-12 text-xl">
          Clasificación final del campeonato de constructores.
        </p>

        {/* Buscador */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Buscar escudería..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 bg-[#1a1f2e] border border-gray-700 rounded-full text-white placeholder-gray-500 focus:ring-2 focus:ring-red-600 outline-none transition"
          />
        </div>

        {/* Filtros */}
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

        {/* Grid de escuderías con LOGOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <Link
              key={team.id}
              href={`/teams/${team.id}`}
              className="bg-[#1a1f2e] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-l-4 group"
              style={{ borderColor: team.color }}
            >
              <div className="text-center">
                {/* LOGO DEL EQUIPO */}
                <div className="bg-[#0a0e1a] rounded-lg p-3 mb-4 h-24 flex items-center justify-center overflow-hidden">
                  <img 
                    src={teamLogos[team.id]} 
                    alt={`${team.name} logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                {/* Posición pequeña */}
                <div className="text-sm font-bold mb-1" style={{ color: team.color }}>
                  #{team.position}
                </div>
                
                {/* Nombre */}
                <h2 className="text-xl font-bold mb-2 text-white group-hover:text-gray-200 transition">
                  {team.name}
                </h2>
                
                {/* Puntos */}
                <p className="text-sm font-semibold mb-1" style={{ color: team.color }}>
                  {team.points} pts
                </p>
                
                {/* Base */}
                <p className="text-gray-500 text-xs mb-4">{team.base}</p>
                
                {/* Pilotos */}
                <div className="space-y-1 border-t border-gray-700 pt-3">
                  {team.drivers.map((driver, idx) => (
                    <div key={idx} className="text-xs text-gray-400">
                      #{driver.number} {driver.name}
                    </div>
                  ))}
                </div>

                {/* Ver más */}
                <div className="mt-4">
                  <span className="text-sm font-semibold group-hover:underline" style={{ color: team.color }}>
                    Ver más →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <p className="text-center text-gray-500 text-xl mt-12">
            No se encontraron escuderías.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] py-8 text-center text-gray-400 mt-16">
        <p>© 2026 F1 History. Proyecto académico de Desarrollo Web.</p>
      </footer>
    </main>
  );
}