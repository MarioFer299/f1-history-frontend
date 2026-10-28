'use client';
import { useEffect, useState } from 'react';
import { http } from '@/features/common/http';
import { useRouter } from 'next/navigation';

interface Interaction {
  id: string;
  type: string;
  message: string | null;
  createdAt: string;
}

export default function MisInteraccionesPage() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    http<Interaction[]>('/api/interactions/mias')
      .then(setInteractions)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis interacciones</h1>
      {interactions.length === 0 ? (
        <p>No tienes interacciones registradas.</p>
      ) : (
        <ul className="space-y-3">
          {interactions.map((i) => (
            <li key={i.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p><strong>Tipo:</strong> {i.type}</p>
              {i.message && <p><strong>Mensaje:</strong> {i.message}</p>}
              <p className="text-sm text-gray-500">{new Date(i.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}