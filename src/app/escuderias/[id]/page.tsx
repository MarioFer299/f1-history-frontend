'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const teams = [
  {
    id: 'mclaren',
    name: 'McLaren Formula 1 Team',
    points: 833,
    foundation: 1963,
    base: 'Woking, Reino Unido',
    championships: 9,
    color: '#FF8700',
    colorClass: 'text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-900/20',
    drivers: [
      { name: 'Lando Norris', number: 4, id: 5 },
      { name: 'Oscar Piastri', number: 81, id: 6 }
    ],
    history: [
      { year: 1963, title: 'Fundación', text: 'Bruce McLaren fundó el equipo en 1963, comenzando su legado en el automovilismo.' },
      { year: 1968, title: 'Primera victoria', text: 'Bruce McLaren ganó el GP de Bélgica en Spa-Francorchamps, el primer triunfo del equipo.' },
      { year: 1974, title: 'Era Emerson Fittipaldi', text: 'Emerson Fittipaldi consiguió el Campeonato Mundial de Pilotos con McLaren.' },
      { year: '1988-1991', title: 'Dominio de Prost y Senna', text: 'La legendaria rivalidad entre Alain Prost y Ayrton Senna llevó a McLaren a dominar la F1 con motores Honda.' },
      { year: 1998, title: 'Era Häkkinen', text: 'Mika Häkkinen ganó dos campeonatos mundiales consecutivos con McLaren-Mercedes.' },
      { year: 2025, title: 'Campeonato de Constructores', text: 'McLaren ganó el Campeonato de Constructores 2025 con Lando Norris y Oscar Piastri.' }
    ]
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG PETRONAS',
    points: 469,
    foundation: 2010,
    base: 'Brackley, Reino Unido',
    championships: 8,
    color: '#00D2BE',
    colorClass: 'text-cyan-500 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20',
    drivers: [
      { name: 'George Russell', number: 63, id: 7 },
      { name: 'Kimi Antonelli', number: 12, id: 8 }
    ],
    history: [
      { year: 2010, title: 'Regreso de Mercedes', text: 'Mercedes regresó a la F1 como constructor tras comprar Brawn GP.' },
      { year: 2014, title: 'Era de dominación', text: 'Con la era de los motores turbo-híbridos, Mercedes comenzó una racha histórica de 8 campeonatos de constructores consecutivos.' },
      { year: '2014-2020', title: 'Era Hamilton', text: 'Lewis Hamilton ganó 6 de sus 7 títulos mundiales con Mercedes, formando la dupla más exitosa de la era moderna.' },
      { year: 2022, title: 'Victoria de Russell', text: 'George Russell consiguió su primera victoria en el GP de Brasil.' },
      { year: 2025, title: 'Nueva era', text: 'Con la llegada de Kimi Antonelli, Mercedes inicia una nueva etapa buscando recuperar la competitividad.' }
    ]
  },
  {
    id: 'redbull',
    name: 'Oracle Red Bull Racing',
    points: 451,
    foundation: 2005,
    base: 'Milton Keynes, Reino Unido',
    championships: 6,
    color: '#0600EF',
    colorClass: 'text-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-900/20',
    drivers: [
      { name: 'Max Verstappen', number: 1, id: 1 },
      { name: 'Liam Lawson', number: 30, id: 2 }
    ],
    history: [
      { year: 2005, title: 'Fundación', text: 'Red Bull compró el equipo Jaguar Racing y fundó Red Bull Racing.' },
      { year: '2010-2013', title: 'Era Vettel', text: 'Sebastian Vettel ganó 4 campeonatos mundiales consecutivos con Red Bull-Renault.' },
      { year: 2021, title: 'Primer título de Verstappen', text: 'Max Verstappen ganó su primer campeonato en una intensa batalla con Lewis Hamilton.' },
      { year: '2022-2024', title: 'Dominio absoluto', text: 'Verstappen y Red Bull dominaron tres temporadas consecutivas, estableciendo récords de victorias.' },
      { year: 2025, title: 'Nueva etapa', text: 'Con la salida de Pérez y la llegada de Liam Lawson, Red Bull busca mantener su competitividad.' }
    ]
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari HP',
    points: 398,
    foundation: 1950,
    base: 'Maranello, Italia',
    championships: 16,
    color: '#DC0000',
    colorClass: 'text-red-600 border-red-600 bg-red-50 dark:bg-red-900/20',
    drivers: [
      { name: 'Charles Leclerc', number: 16, id: 3 },
      { name: 'Lewis Hamilton', number: 44, id: 4 }
    ],
    history: [
      { year: 1950, title: 'Fundación', text: 'Enzo Ferrari fundó la Scuderia Ferrari, el equipo más antiguo y exitoso de la F1.' },
      { year: '1961-1964', title: 'Era Phil Hill y John Surtees', text: 'Ferrari ganó campeonatos con pilotos legendarios en los años 60.' },
      { year: '1975-1979', title: 'Era Niki Lauda', text: 'Niki Lauda ganó dos campeonatos mundiales con Ferrari.' },
      { year: '2000-2004', title: 'Era Schumacher', text: 'Michael Schumacher ganó 5 campeonatos consecutivos, la racha más larga de un piloto con un equipo.' },
      { year: 2025, title: 'Llegada de Hamilton', text: 'Lewis Hamilton se unió a Ferrari en 2025, formando dupla con Charles Leclerc en uno de los movimientos más históricos de la F1.' }
    ]
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    points: 137,
    foundation: 1977,
    base: 'Grove, Reino Unido',
    championships: 9,
    color: '#005AFF',
    colorClass: 'text-blue-700 border-blue-700 bg-blue-50 dark:bg-blue-900/20',
    drivers: [
      { name: 'Alexander Albon', number: 23, id: 17 },
      { name: 'Carlos Sainz', number: 55, id: 18 }
    ],
    history: [
      { year: 1977, title: 'Fundación', text: 'Frank Williams fundó Williams Grand Prix Engineering.' },
      { year: '1980-1997', title: 'Era dorada', text: 'Williams ganó 9 campeonatos de constructores con pilotos como Nelson Piquet, Nigel Mansell, Alain Prost y Damon Hill.' },
      { year: 2012, title: 'Último campeonato', text: 'Williams ganó su último campeonato de constructores en 2012.' },
      { year: 2025, title: 'Renacimiento', text: 'Con la llegada de Carlos Sainz, Williams busca volver a la competitividad tras años difíciles.' }
    ]
  },
  {
    id: 'rb',
    name: 'Visa Cash App RB',
    points: 92,
    foundation: 2006,
    base: 'Faenza, Italia',
    championships: 0,
    color: '#6692FF',
    colorClass: 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    drivers: [
      { name: 'Isack Hadjar', number: 6, id: 16 },
      { name: 'Yuki Tsunoda', number: 22, id: 15 }
    ],
    history: [
      { year: 2006, title: 'Fundación', text: 'El equipo fue fundado como Scuderia Toro Rosso, el equipo junior de Red Bull.' },
      { year: 2008, title: 'Primera victoria', text: 'Sebastian Vettel ganó el GP de Italia en Monza con Toro Rosso, la primera victoria del equipo.' },
      { year: 2020, title: 'AlphaTauri', text: 'El equipo cambió su nombre a AlphaTauri.' },
      { year: 2024, title: 'RB', text: 'El equipo se renombró a Visa Cash App RB.' },
      { year: 2025, title: 'Nueva generación', text: 'Con Hadjar y Tsunoda, RB continúa siendo el semillero de talentos de Red Bull.' }
    ]
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin Aramco',
    points: 89,
    foundation: 2021,
    base: 'Silverstone, Reino Unido',
    championships: 0,
    color: '#006F62',
    colorClass: 'text-green-700 border-green-700 bg-green-50 dark:bg-green-900/20',
    drivers: [
      { name: 'Fernando Alonso', number: 14, id: 9 },
      { name: 'Lance Stroll', number: 18, id: 10 }
    ],
    history: [
      { year: 2021, title: 'Renacimiento', text: 'Racing Point se rebrandeó como Aston Martin, marcando el regreso de la marca británica a la F1.' },
      { year: 2023, title: 'Resurgimiento', text: 'Con Fernando Alonso, Aston Martin logró múltiples podios y se consolidó como el tercer mejor equipo.' },
      { year: 2025, title: 'Nueva fábrica', text: 'Aston Martin inauguró su nueva fábrica de última generación en Silverstone.' }
    ]
  },
  {
    id: 'haas',
    name: 'MoneyGram Haas F1 Team',
    points: 79,
    foundation: 2016,
    base: 'Kannapolis, Estados Unidos',
    championships: 0,
    color: '#B6BABD',
    colorClass: 'text-gray-600 border-gray-600 bg-gray-50 dark:bg-gray-900/20',
    drivers: [
      { name: 'Esteban Ocon', number: 31, id: 13 },
      { name: 'Oliver Bearman', number: 87, id: 14 }
    ],
    history: [
      { year: 2016, title: 'Fundación', text: 'Gene Haas fundó el primer equipo estadounidense en F1 en más de 30 años.' },
      { year: 2018, title: 'Mejor temporada', text: 'Haas logró su mejor temporada con el 5º lugar en el campeonato de constructores.' },
      { year: 2025, title: 'Nueva era', text: 'Con Ocon y Bearman, Haas busca consolidarse en la mitad de la parrilla.' }
    ]
  },
  {
    id: 'sauber',
    name: 'Stake F1 Team Kick Sauber',
    points: 70,
    foundation: 1993,
    base: 'Hinwil, Suiza',
    championships: 0,
    color: '#52E252',
    colorClass: 'text-lime-500 border-lime-500 bg-lime-50 dark:bg-lime-900/20',
    drivers: [
      { name: 'Nico Hülkenberg', number: 27, id: 20 },
      { name: 'Gabriel Bortoleto', number: 5, id: 19 }
    ],
    history: [
      { year: 1993, title: 'Fundación', text: 'Peter Sauber fundó el equipo suizo que ha sido cuna de grandes pilotos.' },
      { year: 2010, title: 'Era BMW', text: 'BMW compró el equipo y compitió como BMW Sauber.' },
      { year: 2026, title: 'Era Audi', text: 'Sauber se convertirá en el equipo oficial de Audi a partir de 2026.' },
      { year: 2025, title: 'Transición', text: 'Con Hülkenberg y el rookie Bortoleto, Sauber se prepara para la transición a Audi.' }
    ]
  },
  {
    id: 'alpine',
    name: 'Alpine F1 Team',
    points: 22,
    foundation: 2021,
    base: 'Enstone, Reino Unido',
    championships: 2,
    color: '#0090FF',
    colorClass: 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    drivers: [
      { name: 'Pierre Gasly', number: 10, id: 11 },
      { name: 'Franco Colapinto', number: 43, id: 12 }
    ],
    history: [
      { year: 1981, title: 'Orígenes', text: 'El equipo fue fundado como Toleman, luego se convirtió en Benetton y ganó dos campeonatos con Michael Schumacher.' },
      { year: 2005, title: 'Era Renault', text: 'Renault ganó dos campeonatos mundiales con Fernando Alonso en 2005 y 2006.' },
      { year: 2021, title: 'Renacimiento Alpine', text: 'Renault se rebrandeó como Alpine, manteniendo la sede en Enstone.' },
      { year: 2025, title: 'Nueva generación', text: 'Con Gasly y el argentino Franco Colapinto, Alpine busca recuperar su competitividad.' }
    ]
  },
];

export default function TeamDetailPage() {
  const params = useParams();
  const teamId = params.id as string;
  const team = teams.find(t => t.id === teamId);

  if (!team) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Escudería no encontrada</h1>
          <Link href="/escuderias" className="text-red-600 hover:underline">← Volver a escuderías</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/escuderias" className="hover:underline mb-8 inline-block font-semibold" style={{ color: team.color }}>
          ← Volver a escuderías
        </Link>

        {/* Header de la escudería */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8 border-l-8" style={{ borderColor: team.color }}>
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 italic">Conoce a los pilotos de la temporada 2025.</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black" style={{ color: team.color }}>
                  {team.points}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">pts · Temporada 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Datos de la escudería */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-l-4 shadow" style={{ borderColor: team.color }}>
            <strong className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Fundación</strong>
            <span className="text-2xl font-bold">{team.foundation}</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-l-4 shadow" style={{ borderColor: team.color }}>
            <strong className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Base</strong>
            <span className="text-lg font-bold">{team.base}</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-l-4 shadow" style={{ borderColor: team.color }}>
            <strong className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Campeonatos</strong>
            <span className="text-2xl font-bold">{team.championships}</span>
          </div>
        </div>

        {/* Pilotos 2025 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Pilotos 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.drivers.map((driver, idx) => (
              <Link
                key={idx}
                href={`/pilotos/${driver.id}`}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center gap-4"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-black flex-shrink-0"
                  style={{ backgroundColor: team.color }}
                >
                  #{driver.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    {driver.name} <span style={{ color: team.color }}>#{driver.number}</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ver perfil →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Historia de la escudería */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Historia de {team.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 italic mb-8 text-lg">
            La historia de una de las escuderías más exitosas y reconocidas de la Fórmula 1.
          </p>
          <div className="space-y-6">
            {team.history.map((event, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border-l-4 shadow" style={{ borderColor: team.color }}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-black flex-shrink-0" style={{ color: team.color }}>
                    {event.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logros destacados */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Logros Destacados</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl border-l-4 shadow" style={{ borderColor: team.color }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-black" style={{ color: team.color }}>{team.championships}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Campeonatos</div>
              </div>
              <div>
                <div className="text-4xl font-black" style={{ color: team.color }}>{team.points}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Puntos 2025</div>
              </div>
              <div>
                <div className="text-4xl font-black" style={{ color: team.color }}>{team.foundation}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fundación</div>
              </div>
              <div>
                <div className="text-4xl font-black" style={{ color: team.color }}>{team.drivers.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pilotos</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}