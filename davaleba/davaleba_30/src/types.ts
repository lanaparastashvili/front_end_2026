export interface Item {
  id: number;
  name: string;
  description: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[];
}

export interface ApiError {
  error: string;
}
