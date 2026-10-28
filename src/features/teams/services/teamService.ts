import { http } from '../../common/http';
import { PaginatedResponse, Team } from '../domain/types';

export const teamService = {
  getAll: (page = 1, limit = 5) =>
    http<PaginatedResponse<Team>>(`/api/teams?page=${page}&limit=${limit}`, { skipAuth: true }),

  getById: (id: string) =>
    http<Team>(`/api/teams/${id}`, { skipAuth: true }),

  create: (data: Omit<Team, 'id'>) =>
    http<Team>('/api/teams', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: Partial<Omit<Team, 'id'>>) =>
    http<Team>(`/api/teams/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: string) =>
    http<void>(`/api/teams/${id}`, { method: 'DELETE' }),
};