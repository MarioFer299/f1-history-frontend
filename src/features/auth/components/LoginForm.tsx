'use client';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-3 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50 transition"
      >
        {loading ? 'Entrando...' : 'Ingresar'}
      </button>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        ¿No tienes cuenta? <Link href="/registro" className="text-red-600 hover:underline font-semibold">Regístrate</Link>
      </p>
    </form>
  );
}