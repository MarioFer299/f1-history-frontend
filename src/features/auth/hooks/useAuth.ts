'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  nombre: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('f1_token', token);
          localStorage.setItem('f1_user', JSON.stringify(user));
        }
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('f1_token');
          localStorage.removeItem('f1_user');
        }
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: 'f1-auth-storage',
    }
  )
);