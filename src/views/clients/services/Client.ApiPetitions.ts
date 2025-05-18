import { apiClient } from "@/services/";
import { Client, adaptClient, adaptClientForApi, clientApiRoutes } from "@/views/clients/";

export const getClients = async (): Promise<Client[]> => {
   try {
      const response = await apiClient.get(clientApiRoutes.list);
      return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch clients.");
   }
};

export const getClient = async (clientId: string): Promise<Client> => {
   try {
      const response = await apiClient.get(clientApiRoutes.details(clientId));
      return adaptClient(response.data);
   } catch (error) {
      throw new Error(`Failed to fetch client with ID ${clientId}.`);
   }
};

export const postClients = async (data: Client): Promise<Client> => {
   try {
      const payload = adaptClientForApi(data);
      const response = await apiClient.post(clientApiRoutes.list, payload);
      return adaptClient(response.data);
   } catch (error) {
      throw new Error("Failed to create client.");
   }
};

export const putClients = async (data: Client, clientId: string): Promise<Client> => {
   try {
      const payload = adaptClientForApi(data);
      const response = await apiClient.put(clientApiRoutes.details(clientId), payload);
      return adaptClient(response.data);
   } catch (error) {
      throw new Error(`Failed to update client with ID ${clientId}.`);
   }
};

export const deleteClient = async (clientId: string): Promise<void> => {
   try {
      await apiClient.delete(clientApiRoutes.details(clientId));
   } catch (error) {
      throw new Error(`Failed to delete client with ID ${clientId}.`);
   }
};

export const getFilterClients = async (params: Record<string, any>): Promise<Client[]> => {
   try {
      const response = await apiClient.get(clientApiRoutes.list, { params });
      return Array.isArray(response.data) ? response.data.map(adaptClient) : [adaptClient(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch filtered clients.");
   }
};
