import { useGetAxios, useFilterGetAxios, usePostAxios, usePutAxios, useDeleteAxios } from "@/services/";
import { Invoice, adaptInvoice, adaptInvoiceForApi, invoiceApiRoutes } from "@/views/invoices";
import { apiClient } from "@/services/";
import { TransformBinaryToPdf } from "@/utils";

export const getInvoices = async () => {
   try {
      const data = await useGetAxios(invoiceApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptInvoice) : [];
   } catch (error) {
      return error;
   }
};

export const postInvoices = async (data: Invoice) => {
   try {
      data = { ...data };
      data = adaptInvoiceForApi(data);
      return await usePostAxios(invoiceApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putInvoices = async (data: Invoice, invoiceId: string) => {
   try {
      data = { ...data };
      data = adaptInvoiceForApi(data);
      return await usePutAxios(invoiceApiRoutes.details(invoiceId), data);
   } catch (error) {
      return error;
   }
};

export const getInvoice = async (invoiceId: string) => {
   try {
      const data = await useGetAxios(invoiceApiRoutes.details(invoiceId));
      return adaptInvoice(data);
   } catch (error) {
      return error;
   }
};

export const deleteInvoice = async (invoiceId: string) => {
   try {
      return await useDeleteAxios(invoiceApiRoutes.details(invoiceId));
   } catch (error) {
      return error;
   }
};

export const getFilterInvoices = async (data: any) => {
   try {
      const result = await useFilterGetAxios(invoiceApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptInvoice) : [];
   } catch (error) {
      return error;
   }
};

export const getPdfInvoice = async (invoiceId: string) => {
   try {
      const response = await apiClient.get(`/invoices/${invoiceId}/download?ts=${Date.now()}`, {
         responseType: "blob",
      });

      TransformBinaryToPdf(response.data, "Factura", invoiceId);
   } catch (error) {
      throw new Error("Error al abrir PDF");
   }
};

export const getInvoicesByClientId = async (clientId: string): Promise<Invoice[]> => {
   try {
      const response = await apiClient.get(`/invoices/clients/${clientId}`);
      const data = Array.isArray(response.data) ? response.data.map(adaptInvoice) : [];
      return data;
   } catch (error) {
      throw new Error("Error al abrir PDF");
   }
};
