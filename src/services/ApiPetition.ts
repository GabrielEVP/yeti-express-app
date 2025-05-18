import { toRaw } from "vue";
import { apiClient } from "@/services/";

export const useGetAxios = async (url: string) => {
   try {
      const response = await apiClient.get(url);
      return response.data;
   } catch (error) {
      return error;
   }
};

export const usePostAxios = async (url: string, data: any) => {
   try {
      return await apiClient.post(url, JSON.stringify(toRaw(data)), {
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      return error;
   }
};

export const usePutAxios = async (url: string, data: any) => {
   try {
      return await apiClient.put(url, JSON.stringify(toRaw(data)), {
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      return error;
   }
};

export const useDeleteAxios = async (url: string) => {
   try {
      const response = await apiClient.delete(url);
      return response.data;
   } catch (error) {
      return error;
   }
};

export const useFilterGetAxios = async (url: string, data: any) => {
   try {
      const response = await apiClient.get(url, { params: data });
      return response.data;
   } catch (error) {
      return error;
   }
};
