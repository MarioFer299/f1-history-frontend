'use client';
import Link from 'next/link';
import { useAuth } from '../../auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [dropdownPilotos, setDropdownPilotos] = useState(false);
  const [dropdownEscuderias, setDropdownEscuderias] = useState(false);
  const [dropdownHistoria, setDropdownHistoria] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setDropdownPilotos(false);
        setDropdownEscuderias(false);
        setDropdownHistoria(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para cerrar todos los dropdowns
  const closeAllDropdowns = () => {
    setDropdownPilotos(false);
    setDropdownEscuderias(false);
    setDropdownHistoria(false);
  };

  return (
    <nav ref={navbarRef} className="bg-gray-900 dark:bg-gray-950 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600" onClick={closeAllDropdowns}>
            F1 <span className="text-white">HISTORY</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-200 hover:text-red-600 transition font-medium" onClick={closeAllDropdowns}>
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
                  <Link 
                    href="/pilotos/norris" 
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600"
                    onClick={closeAllDropdowns}
                  >
                    Lando Norris
                  </Link>
                  <Link 
                    href="/pilotos/verstappen" 
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600"
                    onClick={closeAllDropdowns}
                  >
                    Max Verstappen
                  </Link>
                  <Link 
                    href="/pilotos/leclerc" 
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600"
                    onClick={closeAllDropdowns}
                  >
                    Charles Leclerc
                  </Link>
                  <Link 
                    href="/pilotos" 
                    className="block px-4 py-2 text-red-600 hover:bg-gray-700 font-medium"
                    onClick={closeAllDropdowns}
                  >
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
                  <Link href="/escuderias/mclaren" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600" onClick={closeAllDropdowns}>
                    McLaren
                  </Link>
                  <Link href="/escuderias/mercedes" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600" onClick={closeAllDropdowns}>
                    Mercedes
                  </Link>
                  <Link href="/escuderias/redbull" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600" onClick={closeAllDropdowns}>
                    Red Bull
                  </Link>
                  <Link href="/escuderias/ferrari" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600" onClick={closeAllDropdowns}>
                    Ferrari
                  </Link>
                  <Link href="/escuderias" className="block px-4 py-2 text-red-600 hover:bg-gray-700 font-medium" onClick={closeAllDropdowns}>
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
                  <Link href="/historia/mclaren" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600" onClick={closeAllDropdowns}>
                    McLaren
                  </Link>
                  <Link href="/historia/ferrari" className="block px-4 py-2 text-gray-200 hover:bg-gray-700 hover:text-red-600" onClick={closeAllDropdowns}>
                    Ferrari
                  </Link>
                  <Link href="/historia" className="block px-4 py-2 text-red-600 hover:bg-gray-700 font-medium" onClick={closeAllDropdowns}>
                    Ver toda →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contacto" className="text-gray-200 hover:text-red-600 transition font-medium" onClick={closeAllDropdowns}>
              Contacto
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 font-medium" onClick={closeAllDropdowns}>
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
                <Link href="/login" className="text-gray-200 hover:text-red-600 transition" onClick={closeAllDropdowns}>
                  Ingresar
                </Link>
                <Link href="/registro" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm" onClick={closeAllDropdowns}>
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