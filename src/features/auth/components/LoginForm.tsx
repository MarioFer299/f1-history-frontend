'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/auth.service';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'El correo es requerido.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de correo no válido.';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await authService.login(formData.email, formData.password);
      login(response.user, response.token);
      
      // Redirigir según el rol
      if (response.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'Credenciales inválidas' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Iniciar Sesión</h2>
      
      {errors.general && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="tu@correo.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white ${
            errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        ¿No tienes cuenta?{' '}
        <a href="/registro" className="text-red-600 hover:underline font-medium">
          Regístrate aquí
        </a>
      </p>
    </form>
  );
}