import { apiClient } from '@/services/';
import { Delivery, DetailDelivery, FormDelivery, ListDelivery } from '@/views/deliveries/models';
import { PaginatedResponse, PaginationParams } from '@/models';
import { handlePaginatedResponse } from '@/utils';

const base = '/deliveries';

export const deliveryApiRoutes = {
  getById: (id: string | number) => `${base}/${id}`,
  create: `${base}`,
  update: (id: string | number) => `${base}/${id}`,
  delete: (id: string | number) => `${base}/${id}`,
  search: (query: string) => `${base}/search/${query}`,
  filter: `${base}/filter`,
  updateStatus: (id: string | number) => `${base}/${id}/status`,
  cancel: (id: string | number) => `${base}/${id}/cancel`,
  getTicket: (id: string | number) => `${base}/${id}/ticket`,
  withDebt: `${base}/with-debt`,
};

export const getDeliveryById = async (id: string | number): Promise<DetailDelivery> => {
  const response = await apiClient.get(deliveryApiRoutes.getById(id));
  return response.data;
};

export const createDelivery = async (delivery: FormDelivery): Promise<Delivery> => {
  const response = await apiClient.post(deliveryApiRoutes.create, delivery);
  return response.data;
};

export const updateDelivery = async (delivery: FormDelivery, id: string): Promise<Delivery> => {
  const response = await apiClient.put(deliveryApiRoutes.update(id), delivery);
  return response.data;
};

export const deleteDeliveryById = async (id: string): Promise<void> => {
  await apiClient.delete(deliveryApiRoutes.delete(id));
};

export const getFilteredDeliveries = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<ListDelivery>> => {
  const response = await apiClient.get(deliveryApiRoutes.filter, { params });
  return handlePaginatedResponse(response, params);
};

export const updateDeliveryStatus = async (id: string, status: string): Promise<void> => {
  await apiClient.put(deliveryApiRoutes.updateStatus(id), { status });
};

export const CancelDelivery = async (id: string, data: any): Promise<void> => {
  await apiClient.put(deliveryApiRoutes.cancel(id), data);
};

export const getDeliveryTicket = async (id: string): Promise<Blob> => {
  const response = await apiClient.get(deliveryApiRoutes.getTicket(id), { responseType: 'blob' });
  return response.data;
};
