import { Team } from '../domain/types';
import Link from 'next/link';

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="h-20 w-full flex items-center justify-center mb-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <img src={team.logoUrl} alt={team.name} className="max-h-16 object-contain" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
          {team.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{team.base}</p>
        <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
          <Link href={`/teams/${team.id}`} className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition">
            Ver más <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}