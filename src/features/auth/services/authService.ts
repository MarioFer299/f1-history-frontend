import { http } from '../../common/http';
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    
    // Protección contra valores corruptos como "undefined" o "null"
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      localStorage.removeItem('user');
      return null;
    }
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      localStorage.removeItem('user');
      return null;
    }
  },
};