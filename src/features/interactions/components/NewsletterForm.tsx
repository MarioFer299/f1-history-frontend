'use client';
import { useState } from 'react';
import { http } from '@/features/common/http';

export function NewsletterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setLoading(true);
    try {
      await http('/api/interactions', {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'newsletter', 
          message: `Nombre: ${name} | Pregunta: ${message}` // Guardamos todo en el campo message de la BD
        }),
      });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg space-y-4 text-left">
      {status === 'success' && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-lg text-center font-semibold">
          ¡Gracias por suscribirte a la comunidad F1!
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg text-center font-semibold">
          Error al enviar. Asegúrate de haber iniciado sesión.
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Nombre completo</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          placeholder="Ej: Mario Fernandez"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">¿Cuál es tu escudería favorita y por qué?</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
          rows={3}
          placeholder="Me encanta McLaren porque..."
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
      >
        {loading ? 'Enviando...' : 'Suscribirme'}
      </button>
      
      {!status && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          * Debes haber iniciado sesión para enviar el formulario.
        </p>
      )}
    </form>
  );
}