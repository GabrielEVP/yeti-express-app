import { apiClient } from "@/services/";
import { Courier, adaptDealer, adaptDealerForApi, dealerApiRoutes } from "@/views/couriers";

export const getDealers = async (): Promise<Courier[]> => {
   try {
      const response = await apiClient.get(dealerApiRoutes.list);
      return Array.isArray(response.data) ? response.data.map(adaptDealer) : [adaptDealer(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch couriers.");
   }
};

export const getDealer = async (dealerId: string): Promise<Courier> => {
   try {
      const response = await apiClient.get(dealerApiRoutes.details(dealerId));
      return adaptDealer(response.data);
   } catch (error) {
      throw new Error(`Failed to fetch courier with ID ${dealerId}.`);
   }
};

export const postDealer = async (data: Courier): Promise<Courier> => {
   try {
      const payload = adaptDealerForApi(data);
      const response = await apiClient.post(dealerApiRoutes.list, payload);
      return adaptDealer(response.data);
   } catch (error) {
      throw new Error("Failed to create courier.");
   }
};

export const putDealer = async (data: Courier, dealerId: string): Promise<Courier> => {
   try {
      const payload = adaptDealerForApi(data);
      const response = await apiClient.put(dealerApiRoutes.details(dealerId), payload);
      return adaptDealer(response.data);
   } catch (error) {
      throw new Error(`Failed to update courier with ID ${dealerId}.`);
   }
};

export const deleteDealer = async (dealerId: string): Promise<void> => {
   try {
      await apiClient.delete(dealerApiRoutes.details(dealerId));
   } catch (error) {
      throw new Error(`Failed to delete courier with ID ${dealerId}.`);
   }
};

export const getFilterDealers = async (params: Record<string, any>): Promise<Courier[]> => {
   try {
      const response = await apiClient.get(dealerApiRoutes.list, { params });
      return Array.isArray(response.data) ? response.data.map(adaptDealer) : [adaptDealer(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch filtered couriers.");
   }
};
