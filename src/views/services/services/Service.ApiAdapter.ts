import { apiClient } from '@/services/';
import { Service, adaptService, adaptServiceForApi } from '@/views/services';
import { serviceApiRoutes } from '@/views/services';

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await apiClient.get(serviceApiRoutes.list);
    return Array.isArray(response.data)
      ? response.data.map(adaptService)
      : [adaptService(response.data)];
  } catch (error) {
    throw new Error('Failed to fetch service.');
  }
};

export const getService = async (serviceId: string): Promise<Service> => {
  try {
    const response = await apiClient.get(serviceApiRoutes.details(serviceId));
    return adaptService(response.data);
  } catch (error) {
    throw new Error(`Failed to fetch service with ID ${serviceId}.`);
  }
};

export const postService = async (data: Service): Promise<Service> => {
  try {
    const payload = adaptServiceForApi(data);
    const response = await apiClient.post(serviceApiRoutes.list, payload);
    return adaptService(response.data);
  } catch (error) {
    throw new Error('Failed to create service.');
  }
};

export const putService = async (data: Service, serviceId: string): Promise<Service> => {
  try {
    const payload = adaptServiceForApi(data);
    const response = await apiClient.put(serviceApiRoutes.details(serviceId), payload);
    return adaptService(response.data);
  } catch (error) {
    throw new Error(`Failed to update service with ID ${serviceId}.`);
  }
};

export const deleteService = async (serviceId: string): Promise<void> => {
  try {
    await apiClient.delete(serviceApiRoutes.details(serviceId));
  } catch (error) {
    throw new Error(`Failed to delete service with ID ${serviceId}.`);
  }
};

export const getFilterServices = async (params: Record<string, any>): Promise<Service[]> => {
  try {
    const response = await apiClient.get(serviceApiRoutes.list, { params });
    return Array.isArray(response.data)
      ? response.data.map(adaptService)
      : [adaptService(response.data)];
  } catch (error) {
    throw new Error('Failed to fetch filtered service.');
  }
};
