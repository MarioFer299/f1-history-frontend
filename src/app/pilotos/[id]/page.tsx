'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Colores por equipo
const teamColors: Record<string, { primary: string; border: string; light: string }> = {
  'Red Bull Racing': { primary: 'text-blue-600 dark:text-blue-400', border: 'border-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20' },
  'Ferrari': { primary: 'text-red-600 dark:text-red-500', border: 'border-red-600', light: 'bg-red-50 dark:bg-red-900/20' },
  'McLaren': { primary: 'text-orange-500 dark:text-orange-400', border: 'border-orange-500', light: 'bg-orange-50 dark:bg-orange-900/20' },
  'Mercedes': { primary: 'text-cyan-500 dark:text-cyan-400', border: 'border-cyan-500', light: 'bg-cyan-50 dark:bg-cyan-900/20' },
  'Aston Martin': { primary: 'text-green-600 dark:text-green-500', border: 'border-green-600', light: 'bg-green-50 dark:bg-green-900/20' },
  'Alpine': { primary: 'text-pink-500 dark:text-pink-400', border: 'border-pink-500', light: 'bg-pink-50 dark:bg-pink-900/20' },
  'Haas': { primary: 'text-gray-900 dark:text-gray-100', border: 'border-gray-900 dark:border-gray-600', light: 'bg-gray-100 dark:bg-gray-800' },
  'RB': { primary: 'text-blue-700 dark:text-blue-500', border: 'border-blue-700', light: 'bg-blue-50 dark:bg-blue-900/20' },
  'Williams': { primary: 'text-blue-800 dark:text-blue-600', border: 'border-blue-800', light: 'bg-blue-50 dark:bg-blue-900/20' },
  'Kick Sauber': { primary: 'text-lime-600 dark:text-lime-400', border: 'border-lime-600', light: 'bg-lime-50 dark:bg-lime-900/20' },
};

// Datos completos de los 20 pilotos
const drivers = [
  {
    id: 1,
    name: 'Max Verstappen',
    number: 1,
    team: 'Red Bull Racing',
    nationality: 'Neerlandés',
    birthDate: '30 de septiembre de 1997',
    birthPlace: 'Hasselt, Bélgica',
    biography: 'Max Verstappen es uno de los pilotos más dominantes de la historia de la F1. Campeón mundial en 2021, 2022, 2023 y 2024.',
    stats: { races: 198, wins: 62, podiums: 107, poles: 40, fastestLaps: 33, points: 2841 },
    teamHistory: [{ years: '2015', team: 'Toro Rosso', races: 1 }, { years: '2016-Presente', team: 'Red Bull Racing', races: 197 }],
    achievements: '4 veces Campeón Mundial. Piloto más joven en ganar un GP (18 años).'
  },
  {
    id: 2,
    name: 'Liam Lawson',
    number: 30,
    team: 'Red Bull Racing',
    nationality: 'Neozelandés',
    birthDate: '11 de febrero de 2002',
    birthPlace: 'Hastings, Nueva Zelanda',
    biography: 'Liam Lawson llegó a la F1 tras años como piloto de reservas de Red Bull. Su oportunidad llegó en 2025.',
    stats: { races: 12, wins: 0, podiums: 1, poles: 0, fastestLaps: 1, points: 48 },
    teamHistory: [{ years: '2023', team: 'AlphaTauri', races: 5 }, { years: '2025-Presente', team: 'Red Bull Racing', races: 7 }],
    achievements: 'Podio en GP de Singapur 2023. Subcampeón de Super Formula 2024.'
  },
  {
    id: 3,
    name: 'Charles Leclerc',
    number: 16,
    team: 'Ferrari',
    nationality: 'Monegasco',
    birthDate: '16 de octubre de 1997',
    birthPlace: 'Monte Carlo, Mónaco',
    biography: 'Charles Leclerc es considerado uno de los pilotos más talentosos de su generación. Ha logrado múltiples victorias con Ferrari.',
    stats: { races: 138, wins: 8, podiums: 38, poles: 26, fastestLaps: 9, points: 1247 },
    teamHistory: [{ years: '2018', team: 'Sauber', races: 21 }, { years: '2019-Presente', team: 'Ferrari', races: 117 }],
    achievements: 'Subcampeón Mundial 2022. Múltiples victorias con Ferrari.'
  },
  {
    id: 4,
    name: 'Lewis Hamilton',
    number: 44,
    team: 'Ferrari',
    nationality: 'Británico',
    birthDate: '7 de enero de 1985',
    birthPlace: 'Stevenage, Reino Unido',
    biography: 'Lewis Hamilton es siete veces campeón del mundo y el piloto con más victorias en la historia de la F1. En 2025 dio el salto histórico a Ferrari.',
    stats: { races: 358, wins: 105, podiums: 201, poles: 105, fastestLaps: 67, points: 4847 },
    teamHistory: [{ years: '2007-2012', team: 'McLaren', races: 102 }, { years: '2013-2024', team: 'Mercedes', races: 243 }, { years: '2025-Presente', team: 'Ferrari', races: 13 }],
    achievements: '7 veces Campeón Mundial. Máximo ganador de la historia de la F1.'
  },
  {
    id: 5,
    name: 'Lando Norris',
    number: 4,
    team: 'McLaren',
    nationality: 'Británico',
    birthDate: '13 de noviembre de 1999',
    birthPlace: 'Bristol, Reino Unido',
    biography: 'Lando Norris es uno de los pilotos más prometedores de su generación. Conocido por su carisma y habilidad bajo presión, ha demostrado ser un piloto completo capaz de luchar por victorias.',
    stats: { races: 118, wins: 4, podiums: 22, poles: 6, fastestLaps: 8, points: 834 },
    teamHistory: [{ years: '2019-Presente', team: 'McLaren', races: 118 }],
    achievements: 'Campeón de la F1 en 2025 con McLaren. Considerado uno de los mejores pilotos jóvenes de la década.'
  },
  {
    id: 6,
    name: 'Oscar Piastri',
    number: 81,
    team: 'McLaren',
    nationality: 'Australiano',
    birthDate: '6 de abril de 2001',
    birthPlace: 'Melbourne, Australia',
    biography: 'Oscar Piastri llegó a la F1 tras ganar los campeonatos de F3 y F2 de manera consecutiva. Su adaptación a la categoría reina ha sido excepcional.',
    stats: { races: 42, wins: 2, podiums: 9, poles: 0, fastestLaps: 3, points: 292 },
    teamHistory: [{ years: '2023-Presente', team: 'McLaren', races: 42 }],
    achievements: 'Subcampeón de la F1 en 2025. Rookie del Año 2023.'
  },
  {
    id: 7,
    name: 'George Russell',
    number: 63,
    team: 'Mercedes',
    nationality: 'Británico',
    birthDate: '15 de febrero de 1998',
    birthPlace: 'King\'s Lynn, Reino Unido',
    biography: 'George Russell demostró su talento en Williams antes de unirse a Mercedes. Conocido por su consistencia y velocidad pura.',
    stats: { races: 108, wins: 2, podiums: 12, poles: 3, fastestLaps: 7, points: 567 },
    teamHistory: [{ years: '2019-2021', team: 'Williams', races: 60 }, { years: '2022-Presente', team: 'Mercedes', races: 48 }],
    achievements: 'Victoria en GP de Brasil 2022. Primer piloto de Williams en conseguir pole desde 2018.'
  },
  {
    id: 8,
    name: 'Kimi Antonelli',
    number: 12,
    team: 'Mercedes',
    nationality: 'Italiano',
    birthDate: '25 de agosto de 2006',
    birthPlace: 'Bolonia, Italia',
    biography: 'El joven prodigio italiano llegó a la F1 directamente desde la F2, siendo considerado uno de los talentos más prometedores de los últimos años.',
    stats: { races: 3, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, points: 8 },
    teamHistory: [{ years: '2025-Presente', team: 'Mercedes', races: 3 }],
    achievements: 'Rookie de la temporada 2025. Campeón de F2 en 2024.'
  },
  {
    id: 9,
    name: 'Fernando Alonso',
    number: 14,
    team: 'Aston Martin',
    nationality: 'Español',
    birthDate: '29 de julio de 1981',
    birthPlace: 'Oviedo, España',
    biography: 'Fernando Alonso es dos veces campeón del mundo y uno de los pilotos más respetados de la parrilla. Su experiencia es invaluable.',
    stats: { races: 398, wins: 32, podiums: 106, poles: 22, fastestLaps: 26, points: 2357 },
    teamHistory: [{ years: '2001', team: 'Minardi', races: 1 }, { years: '2003-2006, 2008-2009', team: 'Renault', races: 107 }, { years: '2007, 2015-2018', team: 'McLaren', races: 73 }, { years: '2010-2014', team: 'Ferrari', races: 95 }, { years: '2023-Presente', team: 'Aston Martin', races: 62 }],
    achievements: '2 veces Campeón Mundial (2005, 2006). 32 victorias en F1.'
  },
  {
    id: 10,
    name: 'Lance Stroll',
    number: 18,
    team: 'Aston Martin',
    nationality: 'Canadiense',
    birthDate: '29 de octubre de 1998',
    birthPlace: 'Montreal, Canadá',
    biography: 'Lance Stroll ha demostrado ser un piloto sólido y consistente, con varios podios en su carrera.',
    stats: { races: 158, wins: 0, podiums: 3, poles: 1, fastestLaps: 0, points: 287 },
    teamHistory: [{ years: '2017-2018', team: 'Williams', races: 39 }, { years: '2019-2020', team: 'Racing Point', races: 34 }, { years: '2021-Presente', team: 'Aston Martin', races: 85 }],
    achievements: 'Podio en GP de Azerbaiyán 2021. Pole en GP de Turquía 2020.'
  },
  {
    id: 11,
    name: 'Pierre Gasly',
    number: 10,
    team: 'Alpine',
    nationality: 'Francés',
    birthDate: '7 de febrero de 1996',
    birthPlace: 'Ruan, Francia',
    biography: 'Pierre Gasly ha demostrado gran talento y consistencia, logrando victorias y podios a lo largo de su carrera.',
    stats: { races: 148, wins: 1, podiums: 4, poles: 0, fastestLaps: 3, points: 412 },
    teamHistory: [{ years: '2017-2018, 2019', team: 'Toro Rosso', races: 43 }, { years: '2019', team: 'Red Bull Racing', races: 12 }, { years: '2020-2022', team: 'AlphaTauri', races: 62 }, { years: '2023-Presente', team: 'Alpine', races: 31 }],
    achievements: 'Victoria en GP de Italia 2020. Múltiples podios.'
  },
  {
    id: 12,
    name: 'Franco Colapinto',
    number: 43,
    team: 'Alpine',
    nationality: 'Argentino',
    birthDate: '27 de mayo de 2003',
    birthPlace: 'Pilar, Argentina',
    biography: 'Franco Colapinto es el primer piloto argentino en F1 en décadas. Llegó como reemplazo en 2024 y se ganó un asiento titular.',
    stats: { races: 12, wins: 0, podiums: 0, poles: 0, fastestLaps: 1, points: 27 },
    teamHistory: [{ years: '2024', team: 'Williams', races: 9 }, { years: '2025-Presente', team: 'Alpine', races: 3 }],
    achievements: 'Primer argentino en F1 desde 1997. Puntos en su debut.'
  },
  {
    id: 13,
    name: 'Esteban Ocon',
    number: 31,
    team: 'Haas',
    nationality: 'Francés',
    birthDate: '17 de septiembre de 1996',
    birthPlace: 'Évreux, Francia',
    biography: 'Esteban Ocon es campeón del mundo de GP3 y ha demostrado gran talento en la F1, logrando una victoria memorable.',
    stats: { races: 148, wins: 1, podiums: 3, poles: 0, fastestLaps: 1, points: 458 },
    teamHistory: [{ years: '2016', team: 'Manor', races: 9 }, { years: '2017-2018', team: 'Force India/Racing Point', races: 39 }, { years: '2020-2024', team: 'Renault/Alpine', races: 89 }, { years: '2025-Presente', team: 'Haas', races: 11 }],
    achievements: 'Victoria en GP de Hungría 2021. Podios múltiples.'
  },
  {
    id: 14,
    name: 'Oliver Bearman',
    number: 87,
    team: 'Haas',
    nationality: 'Británico',
    birthDate: '8 de mayo de 2005',
    birthPlace: 'Chelmsford, Reino Unido',
    biography: 'Oliver Bearman es uno de los rookies más prometedores de 2025, llegando tras destacar en las categorías inferiores.',
    stats: { races: 8, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, points: 12 },
    teamHistory: [{ years: '2024 (Reemplazo)', team: 'Ferrari', races: 1 }, { years: '2025-Presente', team: 'Haas', races: 7 }],
    achievements: 'Puntos en su debut con Ferrari 2024. Rookie 2025.'
  },
  {
    id: 15,
    name: 'Yuki Tsunoda',
    number: 22,
    team: 'RB',
    nationality: 'Japonés',
    birthDate: '11 de julio de 2000',
    birthPlace: 'Saitama, Japón',
    biography: 'Yuki Tsunoda es un piloto japonés que ha mostrado gran potencial en F1, destacando por su habilidad en circuitos cerrados.',
    stats: { races: 36, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, points: 72 },
    teamHistory: [{ years: '2021-2022', team: 'Toro Rosso', races: 18 }, { years: '2023-Presente', team: 'AlphaTauri', races: 18 }],
    achievements: 'Primer piloto japonés en F1 desde 2021. Puntos en su debut.'
  },
  {
    id: 16,
    name: 'Isack Hadjar',
    number: 6,
    team: 'RB',
    nationality: 'Francés',
    birthDate: '28 de septiembre de 2004',
    birthPlace: 'París, Francia',
    biography: 'Joven talento francés que llegó a la F1 tras destacar en las categorías inferiores del automovilismo.',
    stats: { races: 3, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, points: 2 },
    teamHistory: [{ years: '2025-Presente', team: 'Racing Bulls', races: 3 }],
    achievements: 'Rookie 2025. Tercer lugar en F2 2024.'
  },
  {
    id: 17,
    name: 'Alexander Albon',
    number: 23,
    team: 'Williams',
    nationality: 'Tailandés',
    birthDate: '23 de marzo de 1996',
    birthPlace: 'Londres, Reino Unido',
    biography: 'Alexander Albon ha demostrado gran consistencia y habilidad. Su regreso a Williams en 2025 marcó un nuevo capítulo en su carrera.',
    stats: { races: 89, wins: 0, podiums: 2, poles: 0, fastestLaps: 1, points: 238 },
    teamHistory: [{ years: '2019', team: 'Toro Rosso', races: 12 }, { years: '2019-2020', team: 'Red Bull Racing', races: 26 }, { years: '2022-Presente', team: 'Williams', races: 51 }],
    achievements: 'Podios con Red Bull Racing. Rescate de Williams en 2022-2024.'
  },
  {
    id: 18,
    name: 'Carlos Sainz',
    number: 55,
    team: 'Williams',
    nationality: 'Español',
    birthDate: '1 de septiembre de 1994',
    birthPlace: 'Madrid, España',
    biography: 'Carlos Sainz Jr. es conocido por su consistencia y habilidad en condiciones difíciles. En 2025 se unió a Williams buscando un nuevo desafío.',
    stats: { races: 198, wins: 4, podiums: 24, poles: 6, fastestLaps: 5, points: 1247 },
    teamHistory: [{ years: '2015-2017', team: 'Toro Rosso', races: 52 }, { years: '2017-2018', team: 'Renault', races: 33 }, { years: '2019-2020', team: 'McLaren', races: 39 }, { years: '2021-2024', team: 'Ferrari', races: 64 }, { years: '2025-Presente', team: 'Williams', races: 10 }],
    achievements: 'Victoria en GP de Singapur 2022. Múltiples podios con Ferrari.'
  },
  {
    id: 19,
    name: 'Gabriel Bortoleto',
    number: 5,
    team: 'Kick Sauber',
    nationality: 'Brasileño',
    birthDate: '14 de octubre de 2004',
    birthPlace: 'São Paulo, Brasil',
    biography: 'Gabriel Bortoleto es campeón de F3 y llegó a la F1 como uno de los rookies más esperados de 2025.',
    stats: { races: 3, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, points: 0 },
    teamHistory: [{ years: '2025-Presente', team: 'Sauber', races: 3 }],
    achievements: 'Campeón de F3 2023. Rookie 2025.'
  },
  {
    id: 20,
    name: 'Nico Hülkenberg',
    number: 27,
    team: 'Kick Sauber',
    nationality: 'Alemán',
    birthDate: '19 de agosto de 1987',
    birthPlace: 'Emmerich, Alemania',
    biography: 'Nico Hülkenberg es conocido como uno de los pilotos más experimentados sin victoria, pero con gran consistencia.',
    stats: { races: 218, wins: 0, podiums: 0, poles: 1, fastestLaps: 2, points: 567 },
    teamHistory: [{ years: '2010', team: 'Williams', races: 19 }, { years: '2011-2012, 2014-2016', team: 'Force India', races: 95 }, { years: '2013', team: 'Sauber', races: 19 }, { years: '2017-2019', team: 'Renault', races: 59 }, { years: '2020', team: 'Aston Martin', races: 0 }, { years: '2023-2024', team: 'Haas', races: 44 }, { years: '2025-Presente', team: 'Sauber', races: 10 }],
    achievements: 'Pole en GP de Brasil 2010. 24 horas de Le Mans ganador 2015.'
  },
];

export default function DriverDetailPage() {
  const params = useParams();
  const driverId = parseInt(params.id as string);
  const driver = drivers.find(d => d.id === driverId);

  if (!driver) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Piloto no encontrado</h1>
          <Link href="/pilotos" className="text-red-600 hover:underline">← Volver a pilotos</Link>
        </div>
      </main>
    );
  }

  const colors = teamColors[driver.team] || teamColors['Red Bull Racing'];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/pilotos" className={`${colors.primary} hover:underline mb-8 inline-block font-semibold`}>
          ← Volver a pilotos
        </Link>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Foto y número */}
            <div className="text-center">
              <div className={`w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 ${colors.border}`}>
                <div className={`w-full h-full ${colors.light} flex items-center justify-center text-6xl font-black`}>
                  #{driver.number}
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">{driver.name}</h1>
              <div className={`text-6xl font-black ${colors.primary} mb-2`}>#{driver.number}</div>
              <p className={`text-xl font-semibold ${colors.primary}`}>{driver.team}</p>
            </div>

            {/* Biografía e información */}
            <div className="md:col-span-2">
              <h2 className={`text-2xl font-bold ${colors.primary} mb-4`}>Biografía</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{driver.biography}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className={`${colors.light} p-4 rounded-lg border-l-4 ${colors.border}`}>
                  <strong className="text-gray-900 dark:text-white block mb-1">Nacionalidad:</strong>
                  <p className="text-gray-700 dark:text-gray-300">{driver.nationality}</p>
                </div>
                <div className={`${colors.light} p-4 rounded-lg border-l-4 ${colors.border}`}>
                  <strong className="text-gray-900 dark:text-white block mb-1">Fecha de nacimiento:</strong>
                  <p className="text-gray-700 dark:text-gray-300">{driver.birthDate}</p>
                </div>
                <div className={`${colors.light} p-4 rounded-lg border-l-4 ${colors.border}`}>
                  <strong className="text-gray-900 dark:text-white block mb-1">Lugar de nacimiento:</strong>
                  <p className="text-gray-700 dark:text-gray-300">{driver.birthPlace}</p>
                </div>
              </div>

              {/* Estadísticas */}
              <h2 className={`text-2xl font-bold ${colors.primary} mb-4`}>Estadísticas de Carrera</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                <div className={`${colors.light} p-4 rounded-lg text-center border-t-4 ${colors.border}`}>
                  <div className={`text-3xl font-bold ${colors.primary}`}>{driver.stats.races}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">CARRERAS</div>
                </div>
                <div className={`${colors.light} p-4 rounded-lg text-center border-t-4 ${colors.border}`}>
                  <div className={`text-3xl font-bold ${colors.primary}`}>{driver.stats.wins}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">VICTORIAS</div>
                </div>
                <div className={`${colors.light} p-4 rounded-lg text-center border-t-4 ${colors.border}`}>
                  <div className={`text-3xl font-bold ${colors.primary}`}>{driver.stats.podiums}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">PODIOS</div>
                </div>
                <div className={`${colors.light} p-4 rounded-lg text-center border-t-4 ${colors.border}`}>
                  <div className={`text-3xl font-bold ${colors.primary}`}>{driver.stats.poles}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">POLE POSITIONS</div>
                </div>
                <div className={`${colors.light} p-4 rounded-lg text-center border-t-4 ${colors.border}`}>
                  <div className={`text-3xl font-bold ${colors.primary}`}>{driver.stats.fastestLaps}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">VUELTAS RÁPIDAS</div>
                </div>
                <div className={`${colors.light} p-4 rounded-lg text-center border-t-4 ${colors.border}`}>
                  <div className={`text-3xl font-bold ${colors.primary}`}>{driver.stats.points}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">PUNTOS</div>
                </div>
              </div>

              {/* Historial de equipos */}
              <h2 className={`text-2xl font-bold ${colors.primary} mb-4`}>Historial de Escuderías</h2>
              <div className="space-y-2 mb-8">
                {driver.teamHistory.map((th, index) => (
                  <div key={index} className={`${colors.light} p-4 rounded-lg flex justify-between items-center border-l-4 ${colors.border}`}>
                    <span className="font-semibold text-gray-900 dark:text-white">{th.years}</span>
                    <span className={`font-semibold ${colors.primary}`}>{th.team}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{th.races} carreras</span>
                  </div>
                ))}
              </div>

              {/* Logros */}
              <h2 className={`text-2xl font-bold ${colors.primary} mb-4`}>Logros Destacados</h2>
              <div className={`${colors.light} p-6 rounded-lg border-l-4 ${colors.border}`}>
                <p className="text-gray-700 dark:text-gray-300">{driver.achievements}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}