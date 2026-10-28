'use client';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      const isDark = savedMode === 'true';
      setDarkMode(isDark);
      applyDarkMode(isDark);
    }
  }, []);

  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    applyDarkMode(newMode);
  };

  if (loading) {
    return (
      <nav className="bg-gray-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">F1 <span className="text-red-600">HISTORY</span></div>
          <div className="text-sm text-gray-400">Cargando...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          F1 <span className="text-red-600">HISTORY</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-red-500 transition">Inicio</Link>
          
          <div className="relative group">
            <button className="hover:text-red-500 transition flex items-center gap-1">
              Pilotos <span>▼</span>
            </button>
          </div>
          
          <div className="relative group">
            <button className="hover:text-red-500 transition flex items-center gap-1">
              Escuderías <span>▼</span>
            </button>
          </div>
          
          <div className="relative group">
            <button className="hover:text-red-500 transition flex items-center gap-1">
              Historia <span>▼</span>
            </button>
          </div>
          
          <Link href="#contacto" className="hover:text-red-500 transition">
            Contacto
          </Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 transition">
                  Admin
                </Link>
              )}
              <Link href="/mis-interacciones" className="hover:text-red-500 transition">
                Mis interacciones
              </Link>
              <span className="text-sm text-gray-300 border-l pl-4 border-gray-700 font-medium">
                {user.name}
              </span>
              <button 
                onClick={logout} 
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm font-semibold"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-red-500 transition">
                Ingresar
              </Link>
              <Link href="/registro" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm font-semibold">
                Registro
              </Link>
            </>
          )}
          
          <button
            onClick={toggleDarkMode}
            className="ml-4 flex items-center gap-2 bg-gray-800 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition border border-red-600/50"
            aria-label="Cambiar modo oscuro"
          >
            <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
            <span className="font-semibold text-sm">{darkMode ? 'Oscuro' : 'Claro'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}