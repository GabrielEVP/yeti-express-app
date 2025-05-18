import { useGetAxios, usePostAxios, usePutAxios, useDeleteAxios, useFilterGetAxios } from "@/services/";
import { TypePrice, typePriceApiRoutes } from "@/views/type-prices";
import { adaptTypePrice, adaptTypePriceForApi } from "@views/type-prices/adapters";

export const getTypePrices = async () => {
   try {
      const data = await useGetAxios(typePriceApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptTypePrice) : [];
   } catch (error) {
      return error;
   }
};

export const postTypePrices = async (data: TypePrice) => {
   try {
      data = adaptTypePriceForApi(data);
      return await usePostAxios(typePriceApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putTypePrices = async (data: TypePrice, typePricesId: string) => {
   try {
      data = adaptTypePriceForApi(data);
      return await usePutAxios(typePriceApiRoutes.details(typePricesId), data);
   } catch (error) {
      return error;
   }
};

export const getTypePrice = async (typePricesId: string) => {
   try {
      const data = await useGetAxios(typePriceApiRoutes.details(typePricesId));
      return adaptTypePrice(data);
   } catch (error) {
      return error;
   }
};

export const deleteTypePrice = async (typePricesId: string) => {
   try {
      return await useDeleteAxios(typePriceApiRoutes.details(typePricesId));
   } catch (error) {
      return error;
   }
};

export const getFilterTypePrices = async (data: any) => {
   try {
      const result = await useFilterGetAxios(typePriceApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptTypePrice) : [];
   } catch (error) {
      return error;
   }
};
