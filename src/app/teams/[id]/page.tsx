'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Driver {
  id: number;
  name: string;
  number: number;
}

interface TeamDetail {
  id: string;
  name: string;
  points: number;
  position: number;
  foundation: number;
  base: string;
  championships: number;
  teamPrincipal: string;
  engine: string;
  color: string;
  drivers: Driver[];
}

const teamsData: Record<string, TeamDetail> = {
  'mclaren': {
    id: 'mclaren',
    name: 'McLaren Formula 1 Team',
    points: 833,
    position: 1,
    foundation: 1963,
    base: 'Woking, Reino Unido',
    championships: 9,
    teamPrincipal: 'Andrea Stella',
    engine: 'Mercedes',
    color: '#FF8700',
    drivers: [
      { id: 5, name: 'Lando Norris', number: 4 },
      { id: 6, name: 'Oscar Piastri', number: 81 }
    ]
  },
  'ferrari': {
    id: 'ferrari',
    name: 'Scuderia Ferrari HP',
    points: 652,
    position: 2,
    foundation: 1950,
    base: 'Maranello, Italia',
    championships: 16,
    teamPrincipal: 'Frédéric Vasseur',
    engine: 'Ferrari',
    color: '#DC0000',
    drivers: [
      { id: 3, name: 'Charles Leclerc', number: 16 },
      { id: 4, name: 'Lewis Hamilton', number: 44 }
    ]
  },
  'redbull': {
    id: 'redbull',
    name: 'Oracle Red Bull Racing',
    points: 589,
    position: 3,
    foundation: 2005,
    base: 'Milton Keynes, Reino Unido',
    championships: 6,
    teamPrincipal: 'Christian Horner',
    engine: 'Ford',
    color: '#0600EF',
    drivers: [
      { id: 1, name: 'Max Verstappen', number: 1 },
      { id: 2, name: 'Liam Lawson', number: 30 }
    ]
  },
  'mercedes': {
    id: 'mercedes',
    name: 'Mercedes-AMG PETRONAS',
    points: 468,
    position: 4,
    foundation: 2010,
    base: 'Brackley, Reino Unido',
    championships: 8,
    teamPrincipal: 'Toto Wolff',
    engine: 'Mercedes',
    color: '#00D2BE',
    drivers: [
      { id: 7, name: 'George Russell', number: 63 },
      { id: 8, name: 'Kimi Antonelli', number: 12 }
    ]
  },
  'aston-martin': {
    id: 'aston-martin',
    name: 'Aston Martin Aramco',
    points: 86,
    position: 5,
    foundation: 2021,
    base: 'Silverstone, Reino Unido',
    championships: 0,
    teamPrincipal: 'Andy Cowell',
    engine: 'Mercedes',
    color: '#006F62',
    drivers: [
      { id: 9, name: 'Fernando Alonso', number: 14 },
      { id: 10, name: 'Lance Stroll', number: 18 }
    ]
  },
  'alpine': {
    id: 'alpine',
    name: 'Alpine F1 Team',
    points: 65,
    position: 6,
    foundation: 2021,
    base: 'Enstone, Reino Unido',
    championships: 2,
    teamPrincipal: 'Flavio Briatore',
    engine: 'Mercedes',
    color: '#0090FF',
    drivers: [
      { id: 11, name: 'Pierre Gasly', number: 10 },
      { id: 12, name: 'Franco Colapinto', number: 43 }
    ]
  },
  'haas': {
    id: 'haas',
    name: 'MoneyGram Haas F1 Team',
    points: 58,
    position: 7,
    foundation: 2016,
    base: 'Kannapolis, Estados Unidos',
    championships: 0,
    teamPrincipal: 'Ayao Komatsu',
    engine: 'Ferrari',
    color: '#B6BABD',
    drivers: [
      { id: 13, name: 'Esteban Ocon', number: 31 },
      { id: 14, name: 'Oliver Bearman', number: 87 }
    ]
  },
  'rb': {
    id: 'rb',
    name: 'Visa Cash App RB',
    points: 46,
    position: 8,
    foundation: 2006,
    base: 'Faenza, Italia',
    championships: 0,
    teamPrincipal: 'Laurent Mekies',
    engine: 'Ford',
    color: '#6692FF',
    drivers: [
      { id: 15, name: 'Yuki Tsunoda', number: 22 },
      { id: 16, name: 'Isack Hadjar', number: 6 }
    ]
  },
  'williams': {
    id: 'williams',
    name: 'Williams Racing',
    points: 17,
    position: 9,
    foundation: 1977,
    base: 'Grove, Reino Unido',
    championships: 9,
    teamPrincipal: 'James Vowles',
    engine: 'Mercedes',
    color: '#005AFF',
    drivers: [
      { id: 17, name: 'Alexander Albon', number: 23 },
      { id: 18, name: 'Carlos Sainz', number: 55 }
    ]
  },
  'sauber': {
    id: 'sauber',
    name: 'Stake F1 Team Kick Sauber',
    points: 0,
    position: 10,
    foundation: 1993,
    base: 'Hinwil, Suiza',
    championships: 0,
    teamPrincipal: 'Alessandro Alunni Bravi',
    engine: 'Ferrari',
    color: '#52E252',
    drivers: [
      { id: 20, name: 'Nico Hülkenberg', number: 27 },
      { id: 19, name: 'Gabriel Bortoleto', number: 5 }
    ]
  }
};

export default function TeamDetailPage() {
  const params = useParams();
  const teamId = params.id as string;
  const team = teamsData[teamId];

  if (!team) {
    return (
      <main className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Escudería no encontrada</h1>
          <Link href="/escuderias" className="text-red-600 hover:underline">
            ← Volver a escuderías
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/escuderias" className="hover:underline mb-8 inline-block font-semibold" style={{ color: team.color }}>
          ← Volver a escuderías
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">{team.name}</h1>
          <p className="text-gray-400 italic text-lg">
            Información del equipo · Temporada 2025
          </p>
        </div>

        {/* Tarjeta destacada con posición y puntos */}
        <div 
          className="rounded-xl p-8 mb-12 flex items-center justify-between flex-wrap gap-4"
          style={{ 
            backgroundColor: '#1a1f2e',
            borderLeft: `4px solid ${team.color}`
          }}
        >
          <div className="flex items-center gap-6">
            <div className="text-6xl font-black text-gray-700">#{team.position}</div>
            <div>
              <h2 className="text-3xl font-bold">{team.name}</h2>
              <p className="text-gray-400">Temporada 2025</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl font-black" style={{ color: team.color }}>
              {team.points}
            </div>
            <div className="text-sm text-gray-400">pts · Campeonato 2025</div>
          </div>
        </div>

        {/* Datos de la escudería */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div 
            className="bg-[#1a1f2e] p-6 rounded-lg"
            style={{ borderTop: `3px solid ${team.color}` }}
          >
            <strong className="block text-sm text-gray-400 mb-2">Fundación</strong>
            <span className="text-2xl font-bold">{team.foundation}</span>
          </div>
          <div 
            className="bg-[#1a1f2e] p-6 rounded-lg"
            style={{ borderTop: `3px solid ${team.color}` }}
          >
            <strong className="block text-sm text-gray-400 mb-2">Base</strong>
            <span className="text-lg font-semibold">{team.base}</span>
          </div>
          <div 
            className="bg-[#1a1f2e] p-6 rounded-lg"
            style={{ borderTop: `3px solid ${team.color}` }}
          >
            <strong className="block text-sm text-gray-400 mb-2">Campeonatos</strong>
            <span className="text-2xl font-bold">🏆 {team.championships}</span>
          </div>
          <div 
            className="bg-[#1a1f2e] p-6 rounded-lg"
            style={{ borderTop: `3px solid ${team.color}` }}
          >
            <strong className="block text-sm text-gray-400 mb-2">Jefe de Equipo</strong>
            <span className="text-lg font-semibold">{team.teamPrincipal}</span>
          </div>
        </div>

        {/* Pilotos 2025 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: team.color }}>Pilotos 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.drivers.map((driver) => (
              <Link
                key={driver.id}
                href={`/pilotos/${driver.id}`}
                className="bg-[#1a1f2e] p-6 rounded-lg hover:bg-[#252b3d] transition-all flex items-center gap-4"
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: team.color }}
                >
                  <span className="text-white text-2xl font-black">#{driver.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {driver.name} <span style={{ color: team.color }}>#{driver.number}</span>
                  </h3>
                  <p className="text-sm text-gray-400">Ver perfil →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Enlace a la historia completa */}
        <section className="mb-12">
          <Link 
            href={`/historia/${team.id}`}
            className="block bg-[#1a1f2e] p-8 rounded-lg border-l-4 hover:bg-[#252b3d] transition-all group"
            style={{ borderColor: team.color }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: team.color }}>
                  📖 Conoce la historia completa
                </h3>
                <p className="text-gray-400">
                  Biografía, historia cronológica y logros destacados de {team.name}.
                </p>
              </div>
              <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] py-8 text-center text-gray-400 mt-16">
        <p>© 2026 F1 History. Proyecto académico de Desarrollo Web.</p>
      </footer>
    </main>
  );
}