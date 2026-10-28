export interface Team {
  id: string;
  name: string;
  base: string;
  championships: number;
  logoUrl: string;
}

export interface PaginatedResponse<T> {
  pagination: { page: number; limit: number; total: number; totalPages: number };
  data: T[];
}