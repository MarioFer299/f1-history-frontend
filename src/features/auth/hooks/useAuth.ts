'use client';
import { useState, useEffect } from 'react';
import { User } from '../domain/types';
import { authService } from '../services/authService';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Función para cargar usuario desde localStorage
  const loadUser = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();

    // Escuchar cuando otro componente cambie la autenticación
    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    if (res && res.token && res.user) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      
      // ¡Avisar al Navbar que el usuario cambió!
      window.dispatchEvent(new Event('authChange'));
      router.push('/');
    } else {
      throw new Error('Credenciales inválidas');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await authService.register({ name, email, password });
    if (res && res.token && res.user) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      
      window.dispatchEvent(new Event('authChange'));
      router.push('/');
    } else {
      throw new Error('Error al registrarse');
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  return { user, loading, login, register, logout };
}