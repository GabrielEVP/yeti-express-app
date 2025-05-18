import { useGetAxios, usePostAxios, usePutAxios, useDeleteAxios, useFilterGetAxios } from "@/services/";
import { TypePayment, typePaymentApiRoutes } from "@/views/type-payments";
import { adaptTypePayment, adaptTypePaymentForApi } from "@views/type-payments/adapters";

export const getTypePayments = async () => {
   try {
      const data = await useGetAxios(typePaymentApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptTypePayment) : [];
   } catch (error) {
      return error;
   }
};

export const postTypePayments = async (data: TypePayment) => {
   try {
      data = adaptTypePaymentForApi(data);
      return await usePostAxios(typePaymentApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putTypePayments = async (data: TypePayment, typePaymentsId: string) => {
   try {
      data = adaptTypePaymentForApi(data);
      return await usePutAxios(typePaymentApiRoutes.details(typePaymentsId), data);
   } catch (error) {
      return error;
   }
};

export const getTypePayment = async (typePaymentsId: string) => {
   try {
      const data = await useGetAxios(typePaymentApiRoutes.details(typePaymentsId));
      return adaptTypePayment(data);
   } catch (error) {
      return error;
   }
};

export const deleteTypePayment = async (typePaymentsId: string) => {
   try {
      return await useDeleteAxios(typePaymentApiRoutes.details(typePaymentsId));
   } catch (error) {
      return error;
   }
};

export const getFilterTypePayments = async (data: any) => {
   try {
      const result = await useFilterGetAxios(typePaymentApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptTypePayment) : [];
   } catch (error) {
      return error;
   }
};
