import { http } from '../../common/http';
// CORREGIDO: Agregamos 'User' a la importación de tipos
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../domain/types'; 

export const authService = {
  login: (data: LoginRequest) => http<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  }),

  register: (data: RegisterRequest) => http<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};