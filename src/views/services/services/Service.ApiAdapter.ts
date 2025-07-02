import { apiClient } from '@/services/';
import { Service, adaptService, adaptServiceForApi } from '@/views/services';
import { PaginatedResponse, PaginationParams } from '@models';
import { handlePaginatedResponse } from '@utils';

export const serviceApiRoutes = {
  list: '/services',
  details: (id: number | string) => `/services/${id}`,
  filter: '/services/filter',
  search: (search: string) => `/services/search/${search}`,
};

export const getAllServices = async (): Promise<Service[]> => {
  try {
    const response = await apiClient.get(serviceApiRoutes.list);
    return Array.isArray(response.data) ? response.data.map(adaptService) : [adaptService(response.data)];
  } catch (error) {
    throw new Error('Failed to fetch services.');
  }
};

export const getServiceById = async (serviceId: string | number): Promise<Service> => {
  try {
    const response = await apiClient.get(serviceApiRoutes.details(serviceId));
    return adaptService(response.data);
  } catch (error) {
    throw new Error(`Failed to fetch service with ID ${serviceId}.`);
  }
};

export const createService = async (data: Service): Promise<Service> => {
  try {
    const payload = adaptServiceForApi(data);
    const response = await apiClient.post(serviceApiRoutes.list, payload);
    return adaptService(response.data);
  } catch (error) {
    throw new Error('Failed to create service.');
  }
};

export const updateService = async (data: Service, serviceId: string | number): Promise<Service> => {
  try {
    const payload = adaptServiceForApi(data);
    const response = await apiClient.put(serviceApiRoutes.details(serviceId), payload);
    return adaptService(response.data);
  } catch (error) {
    throw new Error(`Failed to update service with ID ${serviceId}.`);
  }
};

export const deleteServiceById = async (serviceId: string | number): Promise<void> => {
  try {
    await apiClient.delete(serviceApiRoutes.details(serviceId));
  } catch (error) {
    throw new Error(`Failed to delete service with ID ${serviceId}.`);
  }
};

export const getFilteredServices = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<Service>> => {
  const response = await apiClient.get(serviceApiRoutes.filter, { params });
  return handlePaginatedResponse(response, adaptService, params);
};
