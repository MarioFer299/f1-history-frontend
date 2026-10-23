'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '../../common/http';

interface Escuderia {
  id: string;
  nombre: string;
  puntos2025: number;
  color: string;
  imagenLogo: string;
}

export default function EscuderiaGrid() {
  const [escuderias, setEscuderias] = useState<Escuderia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // ✅ NUEVO

  useEffect(() => {
    const fetchEscuderias = async () => {
      try {
        setLoading(true);
        const response = await apiRequest(`/escuderias?page=${page}&limit=4`, { skipAuth: true });
        setEscuderias(response.data);
        setTotalPages(response.pagination?.totalPages || 1); // ✅ Guardar total de páginas
      } catch (err: any) {
        setError('No se pudo cargar el catálogo. Verifica que el backend esté corriendo.');
      } finally {
        setLoading(false);
      }
    };
    fetchEscuderias();
  }, [page]);

  if (loading) {
    return <p className="text-center py-10 text-gray-600 dark:text-gray-300">Cargando escuderías...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500 font-semibold">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Catálogo de Escuderías 2025
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {escuderias.map((esc) => (
          <article 
            key={esc.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-t-4 transition-transform hover:scale-105 duration-200"
            style={{ borderColor: esc.color }}
          >
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{esc.nombre}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-semibold text-lg">
                {esc.puntos2025} PTS
              </p>
            </div>
          </article>
        ))}
      </div>
      
      {/* Controles de Paginación MEJORADOS */}
      <div className="flex justify-center gap-4 mt-10">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Anterior
        </button>
        
        <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
          Página {page} de {totalPages}
        </span>
        
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={page >= totalPages} // ✅ Deshabilitar si estamos en la última página
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}