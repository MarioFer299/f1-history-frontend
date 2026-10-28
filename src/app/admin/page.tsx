'use client';
import { useEffect, useState } from 'react';
import { http } from '@/features/common/http';
import { useRouter } from 'next/navigation';

interface Team {
  id: string;
  name: string;
  base: string;
  championships: number;
  logoUrl: string;
}

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', base: '', championships: 0, logoUrl: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/login'); return; }
    const parsed = JSON.parse(user);
    if (parsed.role !== 'admin') { router.push('/'); return; }
    loadTeams();
  }, [router]);

  const loadTeams = async () => {
    try {
      const res = await http<{ data: Team[] }>('/api/teams?page=1&limit=100');
      setTeams(res.data);
    } catch (err) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await http(`/api/teams/${editingId}`, { method: 'PUT', body: JSON.stringify(form) });
      } else {
        await http('/api/teams', { method: 'POST', body: JSON.stringify(form) });
      }
      setForm({ name: '', base: '', championships: 0, logoUrl: '' });
      setEditingId(null);
      loadTeams();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta escudería?')) return;
    try {
      await http(`/api/teams/${id}`, { method: 'DELETE' });
      loadTeams();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Administración de Escuderías</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="border p-2 rounded" />
        <input placeholder="Base" value={form.base} onChange={e => setForm({ ...form, base: e.target.value })} required className="border p-2 rounded" />
        <input type="number" placeholder="Campeonatos" value={form.championships} onChange={e => setForm({ ...form, championships: parseInt(e.target.value) || 0 })} required className="border p-2 rounded" />
        <input placeholder="Logo URL" value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} required className="border p-2 rounded" />
        <button type="submit" className="col-span-2 bg-red-600 text-white py-2 rounded">
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-bold">{team.name}</h3>
            <p className="text-sm">{team.base}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => { setEditingId(team.id); setForm(team); }} className="text-blue-600 text-sm">Editar</button>
              <button onClick={() => handleDelete(team.id)} className="text-red-600 text-sm">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}