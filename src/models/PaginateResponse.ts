export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  perPage: number;
  total: number;
}