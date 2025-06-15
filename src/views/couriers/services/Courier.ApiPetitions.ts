import { apiClient } from '@/services/';
import { Courier } from '../models';
import { adaptCourier, adaptCourierForApi } from '@/views/couriers';

export const courierApiRoutes = {
  list: '/couriers',
  details: (courierId: string | number) => `/couriers/${courierId}`,
  search: (search: string) => `/couriers/search/${search}`,
};

export const getAllCouriers = async (): Promise<Courier[]> => {
  try {
    const response = await apiClient.get(courierApiRoutes.list);
    return Array.isArray(response.data) ? response.data.map(adaptCourier) : [adaptCourier(response.data)];
  } catch (error) {
    throw new Error('Failed to fetch couriers.');
  }
};

export const getCourierById = async (courierId: string | number): Promise<Courier> => {
  try {
    const response = await apiClient.get(courierApiRoutes.details(courierId));
    return adaptCourier(response.data);
  } catch (error) {
    throw new Error(`Failed to fetch courier with ID ${courierId}.`);
  }
};

export const createCourier = async (data: Courier): Promise<Courier> => {
  try {
    const payload = adaptCourierForApi(data);
    const response = await apiClient.post(courierApiRoutes.list, payload);
    return adaptCourier(response.data);
  } catch (error) {
    throw new Error('Failed to create courier.');
  }
};

export const updateCourier = async (data: Courier, courierId: string | number): Promise<Courier> => {
  try {
    const payload = adaptCourierForApi(data);
    const response = await apiClient.put(courierApiRoutes.details(courierId), payload);
    return adaptCourier(response.data);
  } catch (error) {
    throw new Error(`Failed to update courier with ID ${courierId}.`);
  }
};

export const deleteCourierById = async (courierId: string | number): Promise<void> => {
  try {
    await apiClient.delete(courierApiRoutes.details(courierId));
  } catch (error) {
    throw new Error(`Failed to delete courier with ID ${courierId}.`);
  }
};

export const searchCouriers = async (search: string): Promise<Courier[]> => {
  try {
    const response = await apiClient.get(courierApiRoutes.search(search));
    return Array.isArray(response.data) ? response.data.map(adaptCourier) : [adaptCourier(response.data)];
  } catch (error) {
    throw new Error('Failed to search couriers.');
  }
};
