import { useGetAxios, useFilterGetAxios, usePostAxios, usePutAxios, useDeleteAxios } from "@/services/";
import { Order, adaptOrder, adaptOrderForApi, orderApiRoutes } from "@/views/orders/";
import { apiClient } from "@/services/";

export const getOrders = async () => {
   try {
      const data = await useGetAxios(orderApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptOrder) : [];
   } catch (error) {
      return error;
   }
};

export const postOrders = async (data: Order) => {
   try {
      data = { ...data };
      data = adaptOrderForApi(data);
      return await usePostAxios(orderApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putOrders = async (data: Order, ordersId: string) => {
   try {
      data = { ...data };
      data = adaptOrderForApi(data);
      return await usePutAxios(orderApiRoutes.details(ordersId), data);
   } catch (error) {
      return error;
   }
};

export const getOrder = async (ordersId: string) => {
   try {
      const data = await useGetAxios(orderApiRoutes.details(ordersId));
      return adaptOrder(data);
   } catch (error) {
      return error;
   }
};

export const deleteOrder = async (ordersId: string) => {
   try {
      return await useDeleteAxios(orderApiRoutes.details(ordersId));
   } catch (error) {
      return error;
   }
};

export const getFilterOrders = async (data: any) => {
   try {
      const result = await useFilterGetAxios(orderApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptOrder) : [];
   } catch (error) {
      return error;
   }
};

export const getOrdersByClientId = async (clientId: string): Promise<Order[]> => {
   try {
      const response = await apiClient.get(`/orders/clients/${clientId}`);
      const data = response.data;
      return Array.isArray(data) ? data.map(adaptOrder) : [];
   } catch (error) {
      throw new Error("Error al abrir PDF");
   }
};
