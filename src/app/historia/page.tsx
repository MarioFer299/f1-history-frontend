'use client';
import Link from 'next/link';

// Logos oficiales de los equipos
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

// Datos de las escuderías con resumen de historia
const teams = [
  {
    id: 'mclaren',
    name: 'McLaren Formula 1 Team',
    color: '#FF8700',
    summary: 'Fundada en 1963 por Bruce McLaren. 9 campeonatos de constructores y 12 de pilotos. Campeón de constructores 2025.'
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari HP',
    color: '#DC0000',
    summary: 'Fundada en 1950 por Enzo Ferrari. El equipo más antiguo y exitoso de la F1 con 16 campeonatos de constructores.'
  },
  {
    id: 'redbull',
    name: 'Oracle Red Bull Racing',
    color: '#0600EF',
    summary: 'Fundada en 2005 tras comprar Jaguar Racing. 6 campeonatos de constructores. Dominó con Vettel (2010-2013) y Verstappen (2021-2024).'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG PETRONAS',
    color: '#00D2BE',
    summary: 'Regresó a la F1 en 2010 tras comprar Brawn GP. 8 campeonatos de constructores consecutivos (2014-2021).'
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    color: '#005AFF',
    summary: 'Fundada en 1977 por Frank Williams. 9 campeonatos de constructores en su era dorada (1980-1997).'
  },
  {
    id: 'rb',
    name: 'Visa Cash App RB',
    color: '#6692FF',
    summary: 'Fundada en 2006 como Toro Rosso. Equipo junior de Red Bull. Cuna de Vettel, Verstappen y Ricciardo.'
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin Aramco',
    color: '#006F62',
    summary: 'Renacimiento en 2021 tras el rebranding de Racing Point. Múltiples podios con Fernando Alonso desde 2023.'
  },
  {
    id: 'haas',
    name: 'MoneyGram Haas F1 Team',
    color: '#B6BABD',
    summary: 'Fundada en 2016 por Gene Haas. Primer equipo estadounidense en F1 en más de 30 años.'
  },
  {
    id: 'sauber',
    name: 'Stake F1 Team Kick Sauber',
    color: '#52E252',
    summary: 'Fundada en 1993 por Peter Sauber. Se convertirá en el equipo oficial de Audi a partir de 2026.'
  },
  {
    id: 'alpine',
    name: 'Alpine F1 Team',
    color: '#0090FF',
    summary: 'Renacimiento en 2021 tras el rebranding de Renault. Raíces en Toleman (1981) y Benetton (campeón con Schumacher).'
  },
];

export default function HistoriaPage() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Historia de las Escuderías</h1>
        <p className="text-gray-400 text-center mb-12 text-xl">
          Conoce la historia de cada equipo que compite en la Fórmula 1.
        </p>

        {/* Grid de escuderías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/historia/${team.id}`}
              className="bg-[#1a1f2e] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] border-l-4 group"
              style={{ borderColor: team.color }}
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Logo */}
                <div className="bg-[#0a0e1a] rounded-lg p-3 h-20 w-20 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={teamLogos[team.id]} 
                    alt={`${team.name} logo`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-gray-200 transition">
                  {team.name}
                </h2>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {team.summary}
              </p>

              <div className="mt-4 text-right">
                <span className="text-sm font-semibold group-hover:underline" style={{ color: team.color }}>
                  Leer historia completa →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1f2e] py-8 text-center text-gray-400 mt-16">
        <p>© 2026 F1 History. Proyecto académico de Desarrollo Web.</p>
      </footer>
    </main>
  );
}