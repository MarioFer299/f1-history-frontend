'use client';
import Link from 'next/link';
import { useAuth } from '../../auth/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-600 dark:text-red-400">
          🏎️ F1 History
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
            Escuderías
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <Link href="/admin" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
                  Administración
                </Link>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Hola, <strong>{user?.nombre}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
                Ingresar
              </Link>
              <Link href="/registro" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}