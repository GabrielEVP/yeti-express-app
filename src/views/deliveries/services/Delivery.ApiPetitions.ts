import { useGetAxios, useFilterGetAxios, usePostAxios, usePutAxios, useDeleteAxios } from "@/services/";
import { Delivery, adaptDelivery, adaptDeliveryForApi, deliveryApiRoutes } from "@/views/deliveries";
import { apiClient } from "@/services/";
import { TransformBinaryToPdf } from "@/utils";

export const getDeliverys = async () => {
   try {
      const data = await useGetAxios(deliveryApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptDelivery) : [];
   } catch (error) {
      return error;
   }
};

export const postDeliverys = async (data: Delivery) => {
   try {
      data = { ...data };
      data = adaptDeliveryForApi(data);
      return await usePostAxios(deliveryApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putDeliverys = async (data: Delivery, deliveryId: string) => {
   try {
      data = { ...data };
      data = adaptDeliveryForApi(data);
      return await usePutAxios(deliveryApiRoutes.details(deliveryId), data);
   } catch (error) {
      return error;
   }
};

export const getDelivery = async (deliveryId: string) => {
   try {
      const data = await useGetAxios(deliveryApiRoutes.details(deliveryId));
      return adaptDelivery(data);
   } catch (error) {
      return error;
   }
};

export const deleteDelivery = async (deliveryId: string) => {
   try {
      return await useDeleteAxios(deliveryApiRoutes.details(deliveryId));
   } catch (error) {
      return error;
   }
};

export const getFilterDeliverys = async (data: any) => {
   try {
      const result = await useFilterGetAxios(deliveryApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptDelivery) : [];
   } catch (error) {
      return error;
   }
};

export const getPdfDelivery = async (deliveryId: string) => {
   try {
      const response = await apiClient.get(`/deliveries/${deliveryId}/download?ts=${Date.now()}`, {
         responseType: "blob",
      });

      TransformBinaryToPdf(response.data, "Delivery", deliveryId);
   } catch (error) {
      throw new Error("Error al abrir PDF");
   }
};

export const getDeliverysByClientId = async (clientId: string): Promise<Delivery[]> => {
   try {
      const response = await apiClient.get(`/deliveries/clients/${clientId}`);
      const data = Array.isArray(response.data) ? response.data.map(adaptDelivery) : [];
      return data;
   } catch (error) {
      throw new Error("Error al abrir PDF");
   }
};
