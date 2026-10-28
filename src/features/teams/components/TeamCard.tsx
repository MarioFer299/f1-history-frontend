import { Team } from '../domain/types';
import Link from 'next/link';

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition">
      <img src={team.logoUrl} alt={team.name} className="h-16 mx-auto mb-3" />
      <h3 className="text-xl font-bold text-center">{team.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{team.base}</p>
      <p className="text-center mt-2">🏆 {team.championships} campeonatos</p>
      <Link href={`/teams/${team.id}`} className="block text-center mt-3 text-red-600 hover:underline">
        Ver más
      </Link>
    </div>
  );
}