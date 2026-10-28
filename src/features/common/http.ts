import { API_BASE_URL } from './config';

interface HttpOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function http<T>(endpoint: string, options: HttpOptions = {}): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (res.status === 401 && !skipAuth) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Error del servidor' }));
    throw new Error(error.error || 'Error desconocido');
  }

  if (res.status === 204) return {} as T;
  return res.json();
}