'use client';
import Link from 'next/link';
import { useState } from 'react';

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

const drivers = [
  { id: 1, name: 'Max Verstappen', number: 1, team: 'Red Bull Racing', nationality: 'Neerlandés' },
  { id: 2, name: 'Liam Lawson', number: 30, team: 'Red Bull Racing', nationality: 'Neozelandés' },
  { id: 3, name: 'Charles Leclerc', number: 16, team: 'Ferrari', nationality: 'Monegasco' },
  { id: 4, name: 'Lewis Hamilton', number: 44, team: 'Ferrari', nationality: 'Británico' },
  { id: 5, name: 'Lando Norris', number: 4, team: 'McLaren', nationality: 'Británico' },
  { id: 6, name: 'Oscar Piastri', number: 81, team: 'McLaren', nationality: 'Australiano' },
  { id: 7, name: 'George Russell', number: 63, team: 'Mercedes', nationality: 'Británico' },
  { id: 8, name: 'Kimi Antonelli', number: 12, team: 'Mercedes', nationality: 'Italiano' },
  { id: 9, name: 'Fernando Alonso', number: 14, team: 'Aston Martin', nationality: 'Español' },
  { id: 10, name: 'Lance Stroll', number: 18, team: 'Aston Martin', nationality: 'Canadiense' },
  { id: 11, name: 'Pierre Gasly', number: 10, team: 'Alpine', nationality: 'Francés' },
  { id: 12, name: 'Franco Colapinto', number: 43, team: 'Alpine', nationality: 'Argentino' },
  { id: 13, name: 'Esteban Ocon', number: 31, team: 'Haas', nationality: 'Frances' },
  { id: 14, name: 'Oliver Bearman', number: 87, team: 'Haas', nationality: 'Británico' },
  { id: 15, name: 'Yuki Tsunoda', number: 22, team: 'RB', nationality: 'Japonés' },
  { id: 16, name: 'Isack Hadjar', number: 6, team: 'RB', nationality: 'Francés' },
  { id: 17, name: 'Alexander Albon', number: 23, team: 'Williams', nationality: 'Tailandés' },
  { id: 18, name: 'Carlos Sainz', number: 55, team: 'Williams', nationality: 'Español' },
  { id: 19, name: 'Gabriel Bortoleto', number: 5, team: 'Kick Sauber', nationality: 'Brasileño' },
  { id: 20, name: 'Nico Hülkenberg', number: 27, team: 'Kick Sauber', nationality: 'Alemán' },
];

export default function PilotosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Pilotos Temporada 2025</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-xl">
          Conoce a los 20 pilotos que compiten en la parrilla actual.
        </p>

        {/* Buscador */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Buscar piloto o equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-600 outline-none transition"
          />
        </div>

        {/* Grid de pilotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrivers.map((driver) => {
            const colors = teamColors[driver.team] || teamColors['Red Bull Racing'];
            return (
              <Link 
                key={driver.id} 
                href={`/pilotos/${driver.id}`}
                className={`bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-l-4 ${colors.border} group`}
              >
                <div className="text-center">
                  <div className={`text-5xl font-black ${colors.primary} mb-3`}>
                    #{driver.number}
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                    {driver.name}
                  </h2>
                  <p className={`text-sm font-semibold mb-1 ${colors.primary}`}>
                    {driver.team}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {driver.nationality}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredDrivers.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-xl mt-12">
            No se encontraron pilotos.
          </p>
        )}
      </div>
    </main>
  );
}