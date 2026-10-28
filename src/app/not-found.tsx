import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-black text-red-600 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-bold">
          ¡Bandera roja! 🏁
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg">
          Lo sentimos, la página que estás buscando no existe, fue movida o nunca existió en este circuito.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link 
            href="/"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Volver al inicio
          </Link>
          <Link 
            href="/escuderias"
            className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-all duration-200"
          >
            Ver escuderías
          </Link>
        </div>
      </div>
    </div>
  );
}