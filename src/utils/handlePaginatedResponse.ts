import { PaginatedResponse } from '@models';

export function handlePaginatedResponse<T>(
  response: any, 
  adapter: (data: any) => T,
  params: { page?: number; perPage?: number } = {}
): PaginatedResponse<T> {
  if (response.data.items && Array.isArray(response.data.items)) {
    return {
      items: response.data.items.map(adapter),
      currentPage: response.data.currentPage || 1,
      perPage: response.data.perPage || 15,
      total: response.data.total || 0
    };
  }

  const items = Array.isArray(response.data) ? response.data.map(adapter) : [adapter(response.data)];
  return {
    items,
    currentPage: params.page || 1,
    perPage: params.perPage || 15,
    total: items.length
  };
}
