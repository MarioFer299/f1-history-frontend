import { apiRequest } from '../../common/http';
import { User } from '../hooks/useAuth';

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (nombre: string, email: string, password: string) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password }),
    });
  },
};