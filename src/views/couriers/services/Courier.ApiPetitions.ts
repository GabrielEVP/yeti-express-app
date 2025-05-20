import { apiClient } from "@/services/";
import { Courier, adaptCourier, adaptCourierForApi, courierApiRoutes } from "@/views/couriers";

export const getCouriers = async (): Promise<Courier[]> => {
   try {
      const response = await apiClient.get(courierApiRoutes.list);
      return Array.isArray(response.data) ? response.data.map(adaptCourier) : [adaptCourier(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch couriers.");
   }
};

export const getCourier = async (courierId: string): Promise<Courier> => {
   try {
      const response = await apiClient.get(courierApiRoutes.details(courierId));
      return adaptCourier(response.data);
   } catch (error) {
      throw new Error(`Failed to fetch courier with ID ${courierId}.`);
   }
};

export const postCourier = async (data: Courier): Promise<Courier> => {
   try {
      const payload = adaptCourierForApi(data);
      const response = await apiClient.post(courierApiRoutes.list, payload);
      return adaptCourier(response.data);
   } catch (error) {
      throw new Error("Failed to create courier.");
   }
};

export const putCourier = async (data: Courier, courierId: string): Promise<Courier> => {
   try {
      const payload = adaptCourierForApi(data);
      const response = await apiClient.put(courierApiRoutes.details(courierId), payload);
      return adaptCourier(response.data);
   } catch (error) {
      throw new Error(`Failed to update courier with ID ${courierId}.`);
   }
};

export const deleteCourier = async (courierId: string): Promise<void> => {
   try {
      await apiClient.delete(courierApiRoutes.details(courierId));
   } catch (error) {
      throw new Error(`Failed to delete courier with ID ${courierId}.`);
   }
};

export const getFilterCouriers = async (params: Record<string, any>): Promise<Courier[]> => {
   try {
      const response = await apiClient.get(courierApiRoutes.list, { params });
      return Array.isArray(response.data) ? response.data.map(adaptCourier) : [adaptCourier(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch filtered couriers.");
   }
};
