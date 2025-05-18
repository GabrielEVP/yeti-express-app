import { apiClient } from "@/services/";
import { Supplier, adaptSupplier, adaptSupplierForApi, supplierApiRoutes } from "@/views/suppliers/";

export const getSuppliers = async (): Promise<Supplier[]> => {
   try {
      const response = await apiClient.get(supplierApiRoutes.list);
      return Array.isArray(response.data) ? response.data.map(adaptSupplier) : [adaptSupplier(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch clients.");
   }
};

export const getSupplier = async (clientId: string): Promise<Supplier> => {
   try {
      const response = await apiClient.get(supplierApiRoutes.details(clientId));
      return adaptSupplier(response.data);
   } catch (error) {
      throw new Error(`Failed to fetch client with ID ${clientId}.`);
   }
};

export const postSuppliers = async (data: Supplier): Promise<Supplier> => {
   try {
      const payload = adaptSupplierForApi(data);
      const response = await apiClient.post(supplierApiRoutes.list, payload);
      return adaptSupplier(response.data);
   } catch (error) {
      throw new Error("Failed to create client.");
   }
};

export const putSuppliers = async (data: Supplier, clientId: string): Promise<Supplier> => {
   try {
      const payload = adaptSupplierForApi(data);
      const response = await apiClient.put(supplierApiRoutes.details(clientId), payload);
      return adaptSupplier(response.data);
   } catch (error) {
      throw new Error(`Failed to update client with ID ${clientId}.`);
   }
};

export const deleteSupplier = async (clientId: string): Promise<void> => {
   try {
      await apiClient.delete(supplierApiRoutes.details(clientId));
   } catch (error) {
      throw new Error(`Failed to delete client with ID ${clientId}.`);
   }
};

export const getFilterSuppliers = async (params: Record<string, any>): Promise<Supplier[]> => {
   try {
      const response = await apiClient.get(supplierApiRoutes.list, { params });
      return Array.isArray(response.data) ? response.data.map(adaptSupplier) : [adaptSupplier(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch filtered clients.");
   }
};
