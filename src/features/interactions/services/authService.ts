import { http } from '../../common/http';
import { AuthResponse, LoginRequest, RegisterRequest } from '../domain/types';

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