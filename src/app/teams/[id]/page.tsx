'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

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
  biography: string;
  history: { year: string; title: string; text: string }[];
  achievements: string;
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
    ],
    biography: 'McLaren es una de las escuderías más exitosas y reconocidas de la Fórmula 1. Fundada por Bruce McLaren en 1963, ha logrado 9 campeonatos de constructores y 12 de pilotos. En 2025, McLaren ganó el campeonato de constructores con Lando Norris y Oscar Piastri, marcando un regreso triunfal a la cima.',
    history: [
      { year: '1963', title: 'Fundación', text: 'Bruce McLaren fundó el equipo en 1963, comenzando su legado en el automovilismo.' },
      { year: '1968', title: 'Primera victoria', text: 'Bruce McLaren ganó el GP de Bélgica en Spa-Francorchamps, el primer triunfo del equipo.' },
      { year: '1974', title: 'Era Emerson Fittipaldi', text: 'Emerson Fittipaldi consiguió el Campeonato Mundial de Pilotos con McLaren.' },
      { year: '1984-1988', title: 'Dominio de Prost y Lauda', text: 'Alain Prost y Niki Lauda dominaron la F1 con McLaren-Porsche.' },
      { year: '1988-1991', title: 'Era Senna', text: 'Ayrton Senna ganó tres campeonatos mundiales con McLaren-Honda.' },
      { year: '1998-1999', title: 'Era Häkkinen', text: 'Mika Häkkinen ganó dos campeonatos mundiales consecutivos.' },
      { year: '2025', title: 'Campeonato de Constructores', text: 'McLaren ganó el Campeonato de Constructores 2025 con Lando Norris y Oscar Piastri.' }
    ],
    achievements: '9 Campeonatos de Constructores, 12 Campeonatos de Pilotos, 183 victorias en F1. Campeón de Constructores 2025.'
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
    ],
    biography: 'Ferrari es el equipo más antiguo y exitoso de la Fórmula 1. Fundada por Enzo Ferrari en 1950, ha participado en todas las temporadas del campeonato mundial. Con 16 campeonatos de constructores y 15 de pilotos, Ferrari es sinónimo de pasión, velocidad y tradición italiana.',
    history: [
      { year: '1950', title: 'Fundación', text: 'Enzo Ferrari fundó la Scuderia Ferrari, participando en la primera temporada de F1.' },
      { year: '1961', title: 'Era Phil Hill', text: 'Phil Hill ganó el campeonato mundial con Ferrari.' },
      { year: '1975-1979', title: 'Era Niki Lauda', text: 'Niki Lauda ganó dos campeonatos mundiales con Ferrari.' },
      { year: '1999-2004', title: 'Era Schumacher', text: 'Michael Schumacher ganó 5 campeonatos consecutivos, la racha más larga de un piloto con un equipo.' },
      { year: '2007-2008', title: 'Era Räikkönen', text: 'Kimi Räikkönen ganó el campeonato mundial 2007 con Ferrari.' },
      { year: '2025', title: 'Llegada de Hamilton', text: 'Lewis Hamilton se unió a Ferrari, formando dupla con Charles Leclerc.' }
    ],
    achievements: '16 Campeonatos de Constructores, 15 Campeonatos de Pilotos, 243 victorias en F1. El equipo más exitoso de la historia.'
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
    ],
    biography: 'Red Bull Racing fue fundada en 2005 tras la compra de Jaguar Racing por parte de Red Bull. El equipo ha dominado la F1 en dos eras diferentes: con Sebastian Vettel (2010-2013) y con Max Verstappen (2021-2024). En 2025, buscan mantener su competitividad con una nueva alineación.',
    history: [
      { year: '2005', title: 'Fundación', text: 'Red Bull compró Jaguar Racing y fundó Red Bull Racing.' },
      { year: '2010-2013', title: 'Era Vettel', text: 'Sebastian Vettel ganó 4 campeonatos mundiales consecutivos con Red Bull-Renault.' },
      { year: '2021', title: 'Primer título de Verstappen', text: 'Max Verstappen ganó su primer campeonato en una intensa batalla con Lewis Hamilton.' },
      { year: '2022-2024', title: 'Dominio absoluto', text: 'Verstappen y Red Bull dominaron tres temporadas consecutivas, estableciendo récords.' },
      { year: '2025', title: 'Nueva etapa', text: 'Con la llegada de Liam Lawson, Red Bull busca mantener su competitividad.' }
    ],
    achievements: '6 Campeonatos de Constructores, 7 Campeonatos de Pilotos, 121 victorias en F1.'
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
    ],
    biography: 'Mercedes regresó a la F1 como constructor en 2010 tras comprar Brawn GP. Desde 2014, dominó la era de los motores turbo-híbridos ganando 8 campeonatos de constructores consecutivos. En 2025, inician una nueva era con George Russell y el joven Kimi Antonelli.',
    history: [
      { year: '2010', title: 'Regreso de Mercedes', text: 'Mercedes regresó a la F1 como constructor tras comprar Brawn GP.' },
      { year: '2014-2021', title: 'Era de dominación', text: 'Mercedes ganó 8 campeonatos de constructores consecutivos.' },
      { year: '2014-2020', title: 'Era Hamilton', text: 'Lewis Hamilton ganó 6 de sus 7 títulos mundiales con Mercedes.' },
      { year: '2022', title: 'Victoria de Russell', text: 'George Russell consiguió su primera victoria en el GP de Brasil.' },
      { year: '2025', title: 'Nueva era', text: 'Con la llegada de Kimi Antonelli, Mercedes inicia una nueva etapa.' }
    ],
    achievements: '8 Campeonatos de Constructores, 9 Campeonatos de Pilotos, 125 victorias en F1.'
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
    ],
    biography: 'Aston Martin regresó a la F1 en 2021 tras el rebranding de Racing Point. Con la experiencia de Fernando Alonso y la inversión de Lawrence Stroll, el equipo busca consolidarse como un competidor de primer nivel.',
    history: [
      { year: '2021', title: 'Renacimiento', text: 'Racing Point se rebrandeó como Aston Martin.' },
      { year: '2023', title: 'Resurgimiento', text: 'Con Fernando Alonso, Aston Martin logró múltiples podios.' },
      { year: '2025', title: 'Nueva fábrica', text: 'Aston Martin inauguró su nueva fábrica de última generación en Silverstone.' }
    ],
    achievements: 'Múltiples podios desde 2023. Construcción de nueva fábrica de última generación.'
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
    ],
    biography: 'Alpine es la continuación del legado de Renault en la F1. El equipo tiene sus raíces en Toleman (1981), pasó por Benetton (campeón con Schumacher) y Renault (campeón con Alonso). En 2025, buscan recuperar su competitividad con Gasly y Colapinto.',
    history: [
      { year: '1981', title: 'Orígenes', text: 'El equipo fue fundado como Toleman.' },
      { year: '1994-1995', title: 'Era Benetton', text: 'Michael Schumacher ganó dos campeonatos mundiales con Benetton.' },
      { year: '2005-2006', title: 'Era Renault', text: 'Fernando Alonso ganó dos campeonatos mundiales con Renault.' },
      { year: '2021', title: 'Renacimiento Alpine', text: 'Renault se rebrandeó como Alpine.' },
      { year: '2025', title: 'Nueva generación', text: 'Con Gasly y Franco Colapinto, Alpine busca recuperar competitividad.' }
    ],
    achievements: '2 Campeonatos de Pilotos (Alonso 2005-2006). Victoria en GP de Hungría 2021 con Ocon.'
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
    ],
    biography: 'Haas es el primer equipo estadounidense en F1 en más de 30 años. Fundado por Gene Haas en 2016, el equipo ha demostrado resiliencia y capacidad de adaptación. En 2025, con Ocon y Bearman, buscan consolidarse en la mitad de la parrilla.',
    history: [
      { year: '2016', title: 'Fundación', text: 'Gene Haas fundó el primer equipo estadounidense en F1 en más de 30 años.' },
      { year: '2018', title: 'Mejor temporada', text: 'Haas logró su mejor temporada con el 5º lugar en el campeonato.' },
      { year: '2025', title: 'Nueva era', text: 'Con Ocon y Bearman, Haas busca consolidarse.' }
    ],
    achievements: '5º lugar en campeonato de constructores 2018. Primer equipo estadounidense moderno en F1.'
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
    ],
    biography: 'RB (anteriormente Toro Rosso y AlphaTauri) es el equipo junior de Red Bull Racing. Fundado en 2006, ha sido cuna de grandes talentos como Sebastian Vettel, Max Verstappen y Daniel Ricciardo. En 2025, continúan formando pilotos para el futuro.',
    history: [
      { year: '2006', title: 'Fundación', text: 'El equipo fue fundado como Scuderia Toro Rosso.' },
      { year: '2008', title: 'Primera victoria', text: 'Sebastian Vettel ganó el GP de Italia con Toro Rosso.' },
      { year: '2020', title: 'AlphaTauri', text: 'El equipo cambió su nombre a AlphaTauri.' },
      { year: '2024', title: 'RB', text: 'El equipo se renombró a Visa Cash App RB.' },
      { year: '2025', title: 'Nueva generación', text: 'Con Hadjar y Tsunoda, RB continúa siendo semillero de talentos.' }
    ],
    achievements: '1 victoria en F1 (Vettel, Monza 2008). Cuna de Verstappen, Vettel y Ricciardo.'
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
    ],
    biography: 'Williams es una de las escuderías más legendarias de la F1. Fundada por Frank Williams en 1977, ganó 9 campeonatos de constructores en los años 80 y 90. Tras años difíciles, en 2025 buscan renacer con la llegada de Carlos Sainz.',
    history: [
      { year: '1977', title: 'Fundación', text: 'Frank Williams fundó Williams Grand Prix Engineering.' },
      { year: '1980-1997', title: 'Era dorada', text: 'Williams ganó 9 campeonatos de constructores con Piquet, Mansell, Prost y Hill.' },
      { year: '2012', title: 'Último campeonato', text: 'Williams ganó su último campeonato de constructores.' },
      { year: '2025', title: 'Renacimiento', text: 'Con la llegada de Carlos Sainz, Williams busca volver a la competitividad.' }
    ],
    achievements: '9 Campeonatos de Constructores, 7 Campeonatos de Pilotos, 114 victorias en F1.'
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
    ],
    biography: 'Sauber es un equipo suizo fundado por Peter Sauber en 1993. Ha sido cuna de grandes pilotos como Kimi Räikkönen, Felipe Massa y Robert Kubica. En 2026 se convertirá en el equipo oficial de Audi, marcando una nueva era.',
    history: [
      { year: '1993', title: 'Fundación', text: 'Peter Sauber fundó el equipo suizo.' },
      { year: '2010', title: 'Era BMW', text: 'BMW compró el equipo y compitió como BMW Sauber.' },
      { year: '2026', title: 'Era Audi', text: 'Sauber se convertirá en el equipo oficial de Audi.' },
      { year: '2025', title: 'Transición', text: 'Con Hülkenberg y Bortoleto, Sauber se prepara para la transición a Audi.' }
    ],
    achievements: 'Cuna de Räikkönen, Massa y Kubica. Futuro equipo oficial de Audi desde 2026.'
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
            La historia de una de las escuderías más exitosas y reconocidas de la Fórmula 1.
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

        {/* Biografía */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: team.color }}>Biografía</h2>
          <div className="bg-[#1a1f2e] p-8 rounded-lg">
            <p className="text-gray-300 leading-relaxed text-lg">{team.biography}</p>
          </div>
        </section>

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

        {/* Historia */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: team.color }}>Historia</h2>
          <div className="space-y-4">
            {team.history.map((event, idx) => (
              <div key={idx} className="bg-[#1a1f2e] p-6 rounded-lg border-l-4" style={{ borderColor: team.color }}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-black flex-shrink-0" style={{ color: team.color }}>
                    {event.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{event.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logros */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: team.color }}>Logros Destacados</h2>
          <div className="bg-[#1a1f2e] p-8 rounded-lg border-l-4" style={{ borderColor: team.color }}>
            <p className="text-gray-300 leading-relaxed text-lg">{team.achievements}</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] py-8 text-center text-gray-400 mt-16">
        <p>© 2026 F1 History. Proyecto académico de Desarrollo Web.</p>
      </footer>
    </main>
  );
}