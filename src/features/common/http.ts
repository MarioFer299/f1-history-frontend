import { API_BASE_URL } from './config';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { skipAuth, headers, ...restOptions } = options;
  
  // 1. Obtener token del localStorage (solo en el navegador)
  const token = typeof window !== 'undefined' ? localStorage.getItem('f1_token') : null;

  // 2. Construir headers
  const customHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // 3. Agregar token si existe y no se indica saltar autenticación
  if (token && !skipAuth) {
    customHeaders['Authorization'] = `Bearer ${token}`;
  }

  // 4. Hacer la petición
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: customHeaders,
  });

  // 5. Manejo centralizado de sesión expirada (401)
  if (response.status === 401) {
    localStorage.removeItem('f1_token');
    localStorage.removeItem('f1_user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
  }

  // 6. Manejo de otros errores
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error HTTP: ${response.status}`);
  }

  return response.json();
}