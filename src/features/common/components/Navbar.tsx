'use client';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-red-600 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">️ F1 History</Link>
        <div className="flex gap-4 items-center">
          <Link href="/">Escuderías</Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link href="/admin">Admin</Link>}
              <Link href="/mis-interacciones">Mis interacciones</Link>
              <span className="text-sm">Hola, {user.name}</span>
              <button onClick={logout} className="bg-white text-red-600 px-3 py-1 rounded">Salir</button>
            </>
          ) : (
            <>
              <Link href="/login">Ingresar</Link>
              <Link href="/registro">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}