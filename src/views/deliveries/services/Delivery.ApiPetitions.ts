import { apiClient } from "@/services/";
import { Delivery, adaptDelivery, adaptDeliveryForApi, deliveryApiRoutes } from "@/views/deliveries/";
import { TransformBinaryToPdf } from "@/utils";

export const getDeliveries = async (): Promise<Delivery[]> => {
   try {
      const response = await apiClient.get(deliveryApiRoutes.list);
      return response.data;
   } catch (error) {
      throw new Error("Failed to fetch deliveries.");
   }
};

export const getDelivery = async (deliveryId: string): Promise<Delivery> => {
   try {
      const response = await apiClient.get(deliveryApiRoutes.details(deliveryId));
      return adaptDelivery(response.data);
   } catch (error) {
      throw new Error(`Failed to fetch delivery with ID ${deliveryId}.`);
   }
};

export const postDeliveries = async (data: Delivery): Promise<Delivery> => {
   try {
      const payload = adaptDeliveryForApi(data);
      const response = await apiClient.post(deliveryApiRoutes.list, payload);
      return adaptDelivery(response.data);
   } catch (error) {
      throw new Error("Failed to create delivery.");
   }
};

export const putDeliveries = async (data: Delivery, deliveryId: string): Promise<Delivery> => {
   try {
      const payload = adaptDeliveryForApi(data);
      const response = await apiClient.put(deliveryApiRoutes.details(deliveryId), payload);
      return adaptDelivery(response.data);
   } catch (error) {
      throw new Error(`Failed to update delivery with ID ${deliveryId}.`);
   }
};

export const deleteDelivery = async (deliveryId: string): Promise<void> => {
   try {
      await apiClient.delete(deliveryApiRoutes.details(deliveryId));
   } catch (error) {
      throw new Error(`Failed to delete delivery with ID ${deliveryId}.`);
   }
};

export const getFilterDeliveries = async (params: Record<string, any>): Promise<Delivery[]> => {
   try {
      const response = await apiClient.get(deliveryApiRoutes.list, { params });
      return Array.isArray(response.data) ? response.data.map(adaptDelivery) : [adaptDelivery(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch filtered deliveries.");
   }
};

export const getPdfDelivery = async (deliveryId: string): Promise<void> => {
   try {
      const response = await apiClient.get(`/deliveries/${deliveryId}/download?ts=${Date.now()}`, {
         responseType: "blob",
      });

      TransformBinaryToPdf(response.data, "Delivery", deliveryId);
   } catch (error) {
      throw new Error("Failed to download delivery PDF.");
   }
};

export const getDeliveriesByClientId = async (clientId: string): Promise<Delivery[]> => {
   try {
      const response = await apiClient.get(`/deliveries/clients/${clientId}`);
      return response.data;
   } catch (error) {
      throw new Error("Failed to fetch deliveries by client ID.");
   }
};
