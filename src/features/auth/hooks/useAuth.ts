'use client';
import { useState, useEffect } from 'react';
import { User } from '../domain/types';
import { authService } from '../services/authService';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    setUser(res.user);
    router.push('/');
    router.refresh(); // Esto fuerza la actualización del navbar
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await authService.register({ name, email, password });
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    setUser(res.user);
    router.push('/');
    router.refresh(); // Esto fuerza la actualización del navbar
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return { user, loading, login, register, logout };
}