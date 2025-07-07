import { PaginatedResponse } from '@models';

export function handlePaginatedResponse<T>(response: any, params: { page?: number; perPage?: number } = {}): PaginatedResponse<T> {
  if (response.data.items && Array.isArray(response.data.items)) {
    return {
      items: response.data.items,
      currentPage: response.data.currentPage || 1,
      perPage: response.data.perPage || 15,
      total: response.data.total || 0,
    };
  }

  const items = response.data;
  return {
    items,
    currentPage: params.page || 1,
    perPage: params.perPage || 15,
    total: items.length,
  };
}
