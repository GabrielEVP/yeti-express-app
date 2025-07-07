import { apiClient } from '@/services/';
import { PaginatedResponse, PaginationParams } from '@/models';
import { handlePaginatedResponse } from '@/utils';
import { DetailCourier, FormCourier, ListCourier } from '@/views/couriers/models';

const base = '/couriers';

export const courierApiRoutes = {
  list: base,
  details: (id: string) => `${base}/${id}`,
  update: (id: string) => `${base}/${id}`,
  filter: `${base}/filter`,
  getDeliveryReport: (id: string) => `${base}/${id}/deliveries-report`,
  getAllDeliveriesReport: `${base}/deliveries-report`,
};

export const getAllCouriers = async (): Promise<ListCourier> => {
  const response = await apiClient.get(courierApiRoutes.list);
  return response.data;
};

export const getCourierById = async (courier_id: string): Promise<DetailCourier> => {
  const response = await apiClient.get(courierApiRoutes.details(courier_id));
  return response.data;
};

export const createCourier = async (courier: FormCourier): Promise<DetailCourier> => {
  const response = await apiClient.post(courierApiRoutes.list, courier);
  return response.data;
};

export const updateCourier = async (courier: FormCourier, id: string): Promise<DetailCourier> => {
  const response = await apiClient.put(courierApiRoutes.update(id), courier);
  return response.data;
};

export const deleteCourierById = async (courier_id: string): Promise<void> => {
  await apiClient.delete(courierApiRoutes.details(courier_id));
};

export const getFilteredCouriers = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<ListCourier>> => {
  const response = await apiClient.get(courierApiRoutes.filter, { params });
  return handlePaginatedResponse(response, params);
};

export const getCourierDeliveryReport = async (courier_id: string, startDate: string, endDate: string): Promise<any> => {
  const response = await apiClient.get(courierApiRoutes.getDeliveryReport(courier_id), {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
    responseType: 'blob',
  });
  return response.data;
};

export const getAllCouriersDeliveriesReport = async (startDate: string, endDate: string): Promise<any> => {
  const response = await apiClient.get(courierApiRoutes.getAllDeliveriesReport, {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
    responseType: 'blob',
  });
  return response.data;
};
