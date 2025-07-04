import { apiClient } from '@/services/';
import { DetailService, FormService, ListService } from '@/views/services';
import { PaginatedResponse, PaginationParams } from '@/models';
import { handlePaginatedResponse } from '@/utils';

const base = '/services';

export const serviceApiRoutes = {
  list: base,
  details: (id: string) => `${base}/${id}`,
  update: (id: string) => `${base}/${id}`,
  filter: `${base}/filter`,
};

export const getAllServices = async (): Promise<ListService[]> => {
  const response = await apiClient.get(serviceApiRoutes.list);
  return response.data;
};

export const getServiceById = async (service_id: string): Promise<DetailService> => {
  const response = await apiClient.get(serviceApiRoutes.details(service_id));
  return response.data;
};

export const createService = async (service: FormService): Promise<DetailService> => {
  const response = await apiClient.post(serviceApiRoutes.list, service);
  return response.data;
};

export const updateService = async (service: FormService, id: string): Promise<DetailService> => {
  const response = await apiClient.put(serviceApiRoutes.details(id), service);
  return response.data;
};

export const deleteServiceById = async (id: string): Promise<void> => {
  await apiClient.delete(serviceApiRoutes.details(id));
};

export const getFilteredServices = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<ListService>> => {
  const response = await apiClient.get(serviceApiRoutes.filter, { params });
  return handlePaginatedResponse(response, params);
};
