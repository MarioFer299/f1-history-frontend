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
          message: `Nombre: ${name} | Email: ${email} | Pregunta: ${message}`
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
    <form onSubmit={handleSubmit} className="bg-gray-800 dark:bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-2xl mx-auto">
      {status === 'success' && (
        <div className="bg-green-900/30 border border-green-600 text-green-400 p-4 rounded-lg mb-6 text-center">
          ¡Gracias por suscribirte!
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-900/30 border border-red-600 text-red-400 p-4 rounded-lg mb-6 text-center">
          Error al enviar. Inicia sesión.
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2 text-gray-300">Nombre completo</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-600 outline-none"
          placeholder="Ej: Mario Fernandez"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2 text-gray-300">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-600 outline-none"
          placeholder="tu@correo.com"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-300">¿Cuál es tu escudería favorita y por qué?</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-600 outline-none"
          rows={4}
          placeholder="Me encanta McLaren porque..."
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Suscribirme'}
      </button>
    </form>
  );
}