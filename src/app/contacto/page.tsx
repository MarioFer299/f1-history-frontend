'use client';
import { useState } from 'react';
import { http } from '@/features/common/http';

export default function ContactoPage() {
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
          type: 'contact', 
          message: `Nombre: ${name} | Email: ${email} | Mensaje: ${message}`
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
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contáctanos</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          {status === 'success' && (
            <div className="bg-green-900/30 border border-green-600 text-green-400 p-4 rounded-lg mb-6 text-center">
              ¡Mensaje enviado con éxito! Te responderemos pronto.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-900/30 border border-red-600 text-red-400 p-4 rounded-lg mb-6 text-center">
              Error al enviar. Asegúrate de haber iniciado sesión.
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Nombre completo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none" placeholder="Tu nombre" />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none" placeholder="tu@correo.com" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Mensaje</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none" rows={5} placeholder="Escribe tu mensaje aquí..." />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50">
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </main>
  );
}