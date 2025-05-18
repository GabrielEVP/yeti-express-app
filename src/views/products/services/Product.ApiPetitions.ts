import { useGetAxios, useFilterGetAxios, usePostAxios, usePutAxios, useDeleteAxios } from "@/services/";
import { Product, adaptProduct, adaptProductForApi, productApiRoutes } from "@views/products";

export const getProducts = async () => {
   try {
      const data = await useGetAxios(productApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptProduct) : [];
   } catch (error) {
      return error;
   }
};

export const postProducts = async (data: Product) => {
   try {
      data = adaptProductForApi(data);
      return await usePostAxios(productApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putProducts = async (data: Product, productId: string) => {
   try {
      data = adaptProductForApi(data);
      return await usePutAxios(productApiRoutes.details(productId), data);
   } catch (error) {
      return error;
   }
};

export const getProduct = async (productId: string) => {
   try {
      const data = await useGetAxios(productApiRoutes.details(productId));
      return adaptProduct(data);
   } catch (error) {
      return error;
   }
};

export const deleteProduct = async (productId: string) => {
   try {
      return await useDeleteAxios(productApiRoutes.details(productId));
   } catch (error) {
      return error;
   }
};

export const getFilterProducts = async (data: any) => {
   try {
      const result = await useFilterGetAxios(productApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptProduct) : [];
   } catch (error) {
      return error;
   }
};
