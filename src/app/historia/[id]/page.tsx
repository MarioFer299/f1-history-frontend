'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const teamLogos: Record<string, string> = {
  'mclaren': '/imagenes/teams/mclaren.jpg',
  'ferrari': '/imagenes/teams/ferrari.jpg',
  'redbull': '/imagenes/teams/redbull.jpg',
  'mercedes': '/imagenes/teams/mercedes.jpg',
  'aston-martin': '/imagenes/teams/aston-martin.jpg',
  'alpine': '/imagenes/teams/alpine.jpg',
  'haas': '/imagenes/teams/haas.jpg',
  'rb': '/imagenes/teams/racing-bulls.jpg',
  'williams': '/imagenes/teams/williams.jpg',
  'sauber': '/imagenes/teams/sauber.jpg',
};

interface TeamHistory {
  id: string;
  name: string;
  color: string;
  foundation: number;
  base: string;
  championships: number;
  biography: string;
  history: { year: string; title: string; text: string }[];
  achievements: string;
}

const teamsData: Record<string, TeamHistory> = {
  'mclaren': {
    id: 'mclaren',
    name: 'McLaren Formula 1 Team',
    color: '#FF8700',
    foundation: 1963,
    base: 'Woking, Reino Unido',
    championships: 9,
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
    color: '#DC0000',
    foundation: 1950,
    base: 'Maranello, Italia',
    championships: 16,
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
    color: '#0600EF',
    foundation: 2005,
    base: 'Milton Keynes, Reino Unido',
    championships: 6,
    biography: 'Red Bull Racing fue fundada en 2005 tras la compra de Jaguar Racing por parte de Red Bull. El equipo ha dominado la F1 en dos eras diferentes: con Sebastian Vettel (2010-2013) y con Max Verstappen (2021-2024).',
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
    color: '#00D2BE',
    foundation: 2010,
    base: 'Brackley, Reino Unido',
    championships: 8,
    biography: 'Mercedes regresó a la F1 como constructor en 2010 tras comprar Brawn GP. Desde 2014, dominó la era de los motores turbo-híbridos ganando 8 campeonatos de constructores consecutivos.',
    history: [
      { year: '2010', title: 'Regreso de Mercedes', text: 'Mercedes regresó a la F1 como constructor tras comprar Brawn GP.' },
      { year: '2014-2021', title: 'Era de dominación', text: 'Mercedes ganó 8 campeonatos de constructores consecutivos.' },
      { year: '2014-2020', title: 'Era Hamilton', text: 'Lewis Hamilton ganó 6 de sus 7 títulos mundiales con Mercedes.' },
      { year: '2022', title: 'Victoria de Russell', text: 'George Russell consiguió su primera victoria en el GP de Brasil.' },
      { year: '2025', title: 'Nueva era', text: 'Con la llegada de Kimi Antonelli, Mercedes inicia una nueva etapa.' }
    ],
    achievements: '8 Campeonatos de Constructores, 9 Campeonatos de Pilotos, 125 victorias en F1.'
  },
  'williams': {
    id: 'williams',
    name: 'Williams Racing',
    color: '#005AFF',
    foundation: 1977,
    base: 'Grove, Reino Unido',
    championships: 9,
    biography: 'Williams es una de las escuderías más legendarias de la F1. Fundada por Frank Williams en 1977, ganó 9 campeonatos de constructores en los años 80 y 90.',
    history: [
      { year: '1977', title: 'Fundación', text: 'Frank Williams fundó Williams Grand Prix Engineering.' },
      { year: '1980-1997', title: 'Era dorada', text: 'Williams ganó 9 campeonatos de constructores con Piquet, Mansell, Prost y Hill.' },
      { year: '2012', title: 'Último campeonato', text: 'Williams ganó su último campeonato de constructores.' },
      { year: '2025', title: 'Renacimiento', text: 'Con la llegada de Carlos Sainz, Williams busca volver a la competitividad.' }
    ],
    achievements: '9 Campeonatos de Constructores, 7 Campeonatos de Pilotos, 114 victorias en F1.'
  },
  'rb': {
    id: 'rb',
    name: 'Visa Cash App RB',
    color: '#6692FF',
    foundation: 2006,
    base: 'Faenza, Italia',
    championships: 0,
    biography: 'RB (anteriormente Toro Rosso y AlphaTauri) es el equipo junior de Red Bull Racing. Fundado en 2006, ha sido cuna de grandes talentos como Sebastian Vettel, Max Verstappen y Daniel Ricciardo.',
    history: [
      { year: '2006', title: 'Fundación', text: 'El equipo fue fundado como Scuderia Toro Rosso.' },
      { year: '2008', title: 'Primera victoria', text: 'Sebastian Vettel ganó el GP de Italia con Toro Rosso.' },
      { year: '2020', title: 'AlphaTauri', text: 'El equipo cambió su nombre a AlphaTauri.' },
      { year: '2024', title: 'RB', text: 'El equipo se renombró a Visa Cash App RB.' },
      { year: '2025', title: 'Nueva generación', text: 'Con Hadjar y Tsunoda, RB continúa siendo semillero de talentos.' }
    ],
    achievements: '1 victoria en F1 (Vettel, Monza 2008). Cuna de Verstappen, Vettel y Ricciardo.'
  },
  'aston-martin': {
    id: 'aston-martin',
    name: 'Aston Martin Aramco',
    color: '#006F62',
    foundation: 2021,
    base: 'Silverstone, Reino Unido',
    championships: 0,
    biography: 'Aston Martin regresó a la F1 en 2021 tras el rebranding de Racing Point. Con la experiencia de Fernando Alonso y la inversión de Lawrence Stroll, el equipo busca consolidarse.',
    history: [
      { year: '2021', title: 'Renacimiento', text: 'Racing Point se rebrandeó como Aston Martin.' },
      { year: '2023', title: 'Resurgimiento', text: 'Con Fernando Alonso, Aston Martin logró múltiples podios.' },
      { year: '2025', title: 'Nueva fábrica', text: 'Aston Martin inauguró su nueva fábrica de última generación en Silverstone.' }
    ],
    achievements: 'Múltiples podios desde 2023. Construcción de nueva fábrica de última generación.'
  },
  'haas': {
    id: 'haas',
    name: 'MoneyGram Haas F1 Team',
    color: '#B6BABD',
    foundation: 2016,
    base: 'Kannapolis, Estados Unidos',
    championships: 0,
    biography: 'Haas es el primer equipo estadounidense en F1 en más de 30 años. Fundado por Gene Haas en 2016, el equipo ha demostrado resiliencia y capacidad de adaptación.',
    history: [
      { year: '2016', title: 'Fundación', text: 'Gene Haas fundó el primer equipo estadounidense en F1 en más de 30 años.' },
      { year: '2018', title: 'Mejor temporada', text: 'Haas logró su mejor temporada con el 5º lugar en el campeonato.' },
      { year: '2025', title: 'Nueva era', text: 'Con Ocon y Bearman, Haas busca consolidarse.' }
    ],
    achievements: '5º lugar en campeonato de constructores 2018. Primer equipo estadounidense moderno en F1.'
  },
  'sauber': {
    id: 'sauber',
    name: 'Stake F1 Team Kick Sauber',
    color: '#52E252',
    foundation: 1993,
    base: 'Hinwil, Suiza',
    championships: 0,
    biography: 'Sauber es un equipo suizo fundado por Peter Sauber en 1993. Ha sido cuna de grandes pilotos como Kimi Räikkönen, Felipe Massa y Robert Kubica. En 2026 se convertirá en el equipo oficial de Audi.',
    history: [
      { year: '1993', title: 'Fundación', text: 'Peter Sauber fundó el equipo suizo.' },
      { year: '2010', title: 'Era BMW', text: 'BMW compró el equipo y compitió como BMW Sauber.' },
      { year: '2026', title: 'Era Audi', text: 'Sauber se convertirá en el equipo oficial de Audi.' },
      { year: '2025', title: 'Transición', text: 'Con Hülkenberg y Bortoleto, Sauber se prepara para la transición a Audi.' }
    ],
    achievements: 'Cuna de Räikkönen, Massa y Kubica. Futuro equipo oficial de Audi desde 2026.'
  },
  'alpine': {
    id: 'alpine',
    name: 'Alpine F1 Team',
    color: '#0090FF',
    foundation: 2021,
    base: 'Enstone, Reino Unido',
    championships: 2,
    biography: 'Alpine es la continuación del legado de Renault en la F1. El equipo tiene sus raíces en Toleman (1981), pasó por Benetton (campeón con Schumacher) y Renault (campeón con Alonso).',
    history: [
      { year: '1981', title: 'Orígenes', text: 'El equipo fue fundado como Toleman.' },
      { year: '1994-1995', title: 'Era Benetton', text: 'Michael Schumacher ganó dos campeonatos mundiales con Benetton.' },
      { year: '2005-2006', title: 'Era Renault', text: 'Fernando Alonso ganó dos campeonatos mundiales con Renault.' },
      { year: '2021', title: 'Renacimiento Alpine', text: 'Renault se rebrandeó como Alpine.' },
      { year: '2025', title: 'Nueva generación', text: 'Con Gasly y Franco Colapinto, Alpine busca recuperar competitividad.' }
    ],
    achievements: '2 Campeonatos de Pilotos (Alonso 2005-2006). Victoria en GP de Hungría 2021 con Ocon.'
  }
};

export default function TeamHistoryPage() {
  const params = useParams();
  const teamId = params.id as string;
  const team = teamsData[teamId];

  if (!team) {
    return (
      <main className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Escudería no encontrada</h1>
          <Link href="/historia" className="text-red-600 hover:underline">
            ← Volver a historia
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/historia" className="hover:underline mb-8 inline-block font-semibold" style={{ color: team.color }}>
          ← Volver a historia
        </Link>

        {/* Header CON LOGO VISIBLE */}
        <div className="mb-8">
          <div className="bg-[#1a1f2e] p-8 rounded-xl border-l-4 flex items-center gap-6" style={{ borderColor: team.color }}>
            <div className="bg-[#0a0e1a] rounded-lg p-6 h-32 w-40 flex items-center justify-center flex-shrink-0">
              <img 
                src={teamLogos[team.id]} 
                alt={`${team.name} logo`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
              <p className="text-gray-400 italic text-lg">
                La historia de una de las escuderías más exitosas y reconocidas de la Fórmula 1.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-[#1a1f2e] p-6 rounded-lg border-t-4" style={{ borderColor: team.color }}>
            <strong className="block text-sm text-gray-400 mb-2">Fundación</strong>
            <span className="text-2xl font-bold">{team.foundation}</span>
          </div>
          <div className="bg-[#1a1f2e] p-6 rounded-lg border-t-4" style={{ borderColor: team.color }}>
            <strong className="block text-sm text-gray-400 mb-2">Base</strong>
            <span className="text-lg font-semibold">{team.base}</span>
          </div>
          <div className="bg-[#1a1f2e] p-6 rounded-lg border-t-4" style={{ borderColor: team.color }}>
            <strong className="block text-sm text-gray-400 mb-2">Campeonatos</strong>
            <span className="text-2xl font-bold"> {team.championships}</span>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: team.color }}>Biografía</h2>
          <div className="bg-[#1a1f2e] p-8 rounded-lg">
            <p className="text-gray-300 leading-relaxed text-lg">{team.biography}</p>
          </div>
        </section>

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

        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: team.color }}>Logros Destacados</h2>
          <div className="bg-[#1a1f2e] p-8 rounded-lg border-l-4" style={{ borderColor: team.color }}>
            <p className="text-gray-300 leading-relaxed text-lg">{team.achievements}</p>
          </div>
        </section>
      </div>

      <footer className="bg-[#1a1f2e] py-8 text-center text-gray-400 mt-16">
        <p>© 2026 F1 History. Proyecto académico de Desarrollo Web.</p>
      </footer>
    </main>
  );
}