import { useGetAxios, useFilterGetAxios, usePostAxios, usePutAxios, useDeleteAxios } from "@/services/";
import { Purchase, adaptPurchase, adaptPurchaseForApi, purchaseApiRoutes } from "@/views/purchases";
import { apiClient } from "@/services/";
import { TransformBinaryToPdf } from "@/utils";

export const getPurchases = async () => {
   try {
      const data = await useGetAxios(purchaseApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptPurchase) : [];
   } catch (error) {
      return error;
   }
};

export const postPurchases = async (data: Purchase) => {
   try {
      data = { ...data };
      data = adaptPurchaseForApi(data);
      return await usePostAxios(purchaseApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putPurchases = async (data: Purchase, purchaseId: string) => {
   try {
      data = { ...data };
      data = adaptPurchaseForApi(data);
      return await usePutAxios(purchaseApiRoutes.details(purchaseId), data);
   } catch (error) {
      return error;
   }
};

export const getPurchase = async (purchaseId: string) => {
   try {
      const data = await useGetAxios(purchaseApiRoutes.details(purchaseId));
      return adaptPurchase(data);
   } catch (error) {
      return error;
   }
};

export const deletePurchase = async (purchaseId: string) => {
   try {
      return await useDeleteAxios(purchaseApiRoutes.details(purchaseId));
   } catch (error) {
      return error;
   }
};

export const getFilterPurchases = async (data: any) => {
   try {
      const result = await useFilterGetAxios(purchaseApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptPurchase) : [];
   } catch (error) {
      return error;
   }
};

export const getPurchasesBySupplierId = async (SupplierId: string): Promise<Purchase[]> => {
   try {
      const response = await apiClient.get(`/purchases/clients/${SupplierId}`);
      const data = Array.isArray(response.data) ? response.data.map(adaptPurchase) : [];
      return data;
   } catch (error) {
      throw new Error("Error al abrir PDF");
   }
};
