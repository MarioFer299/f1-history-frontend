'use client';
import { useState, useEffect } from 'react';
import { teamService } from '../services/teamService';
import { PaginatedResponse, Team } from '../domain/types';

export function useTeams(page = 1) {
  const [data, setData] = useState<PaginatedResponse<Team> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    teamService.getAll(page)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  return { data, loading, error };
}