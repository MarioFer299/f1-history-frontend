'use client';
import Link from 'next/link';
import { useAuth } from '../../auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [dropdownPilotos, setDropdownPilotos] = useState(false);
  const [dropdownEscuderias, setDropdownEscuderias] = useState(false);
  const [dropdownHistoria, setDropdownHistoria] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            F1 <span className="text-white">HISTORY</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-200 hover:text-red-600 transition font-medium">
              Inicio
            </Link>

            {/* Dropdown Pilotos */}
            <div className="relative">
              <button
                onClick={() => setDropdownPilotos(!dropdownPilotos)}
                className="text-gray-200 hover:text-red-600 transition font-medium flex items-center gap-1"
              >
                Pilotos ▼
              </button>
              {dropdownPilotos && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2">
                  <Link href="/pilotos/norris" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Lando Norris
                  </Link>
                  <Link href="/pilotos/verstappen" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Max Verstappen
                  </Link>
                  <Link href="/pilotos/leclerc" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Charles Leclerc
                  </Link>
                  <Link href="/pilotos" className="block px-4 py-2 text-red-600 hover:bg-gray-700 font-medium">
                    Ver todos →
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown Escuderías */}
            <div className="relative">
              <button
                onClick={() => setDropdownEscuderias(!dropdownEscuderias)}
                className="text-gray-200 hover:text-red-600 transition font-medium flex items-center gap-1"
              >
                Escuderías ▼
              </button>
              {dropdownEscuderias && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-2">
                  <Link href="/escuderias/mclaren" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    McLaren
                  </Link>
                  <Link href="/escuderias/mercedes" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Mercedes
                  </Link>
                  <Link href="/escuderias/redbull" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Red Bull
                  </Link>
                  <Link href="/escuderias/ferrari" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Ferrari
                  </Link>
                  <Link href="/escuderias" className="block px-4 py-2 text-red-600 hover:bg-gray-700 font-medium">
                    Ver todas →
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown Historia */}
            <div className="relative">
              <button
                onClick={() => setDropdownHistoria(!dropdownHistoria)}
                className="text-gray-200 hover:text-red-600 transition font-medium flex items-center gap-1"
              >
                Historia ▼
              </button>
              {dropdownHistoria && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg py-2">
                  <Link href="/historia/mclaren" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    McLaren
                  </Link>
                  <Link href="/historia/ferrari" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600">
                    Ferrari
                  </Link>
                  <Link href="/historia" className="block px-4 py-2 text-red-600 hover:bg-gray-700 font-medium">
                    Ver toda →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contacto" className="text-gray-200 hover:text-red-600 transition font-medium">
              Contacto
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 font-medium">
                    Admin
                  </Link>
                )}
                <span className="text-sm text-gray-300">Hola, {user?.nombre.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-200 hover:text-red-600 transition">
                  Ingresar
                </Link>
                <Link href="/registro" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}