import { API_BASE_URL } from './config';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { skipAuth, headers, ...restOptions } = options;
  
  // Obtener token del localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('f1_token') : null;

  // Construir headers
  const customHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token && !skipAuth) {
    customHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Hacer la petición
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: customHeaders,
  });

  // Manejo del 401 (sesión expirada)
  if (response.status === 401) {
    localStorage.removeItem('f1_token');
    localStorage.removeItem('f1_user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
  }

  // Manejo de otros errores
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error HTTP: ${response.status}`);
  }

  return response.json();
}