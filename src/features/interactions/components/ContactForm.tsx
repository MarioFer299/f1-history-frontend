'use client';
import { useState } from 'react';
import { http } from '@/features/common/http';

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    try {
      await http('/api/interactions', {
        method: 'POST',
        body: JSON.stringify({ type: 'newsletter', message }),
      });
      setStatus('success');
      setMessage('');
    } catch (err: any) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Déjanos tu mensaje o correo para el boletín..."
        required
        className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
        rows={4}
      />
      <button type="submit" className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition">
        Suscribirse
      </button>
      {status === 'success' && <p className="text-green-500 text-center">¡Gracias por suscribirte!</p>}
      {status === 'error' && <p className="text-red-500 text-center">Error al enviar. Asegúrate de estar logueado.</p>}
    </form>
  );
}