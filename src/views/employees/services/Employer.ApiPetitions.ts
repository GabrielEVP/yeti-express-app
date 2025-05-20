import { apiClient } from "@/services/";
import { Employer, adaptEmployer, adaptEmployerForApi, employerApiRoutes } from "@/views/employees";

export const getEmployers = async (): Promise<Employer[]> => {
   try {
      const response = await apiClient.get(employerApiRoutes.list);
      return Array.isArray(response.data) ? response.data.map(adaptEmployer) : [adaptEmployer(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch employers.");
   }
};

export const getEmployer = async (employerId: string): Promise<Employer> => {
   try {
      const response = await apiClient.get(employerApiRoutes.details(employerId));
      return adaptEmployer(response.data);
   } catch (error) {
      throw new Error(`Failed to fetch employer with ID ${employerId}.`);
   }
};

export const postEmployer = async (data: Employer): Promise<Employer> => {
   try {
      const payload = adaptEmployerForApi(data);
      const response = await apiClient.post(employerApiRoutes.list, payload);
      return adaptEmployer(response.data);
   } catch (error) {
      throw new Error("Failed to create employer.");
   }
};

export const putEmployer = async (data: Employer, employerId: string): Promise<Employer> => {
   try {
      const payload = adaptEmployerForApi(data);
      const response = await apiClient.put(employerApiRoutes.details(employerId), payload);
      return adaptEmployer(response.data);
   } catch (error) {
      throw new Error(`Failed to update employer with ID ${employerId}.`);
   }
};

export const deleteEmployer = async (employerId: string): Promise<void> => {
   try {
      await apiClient.delete(employerApiRoutes.details(employerId));
   } catch (error) {
      throw new Error(`Failed to delete employer with ID ${employerId}.`);
   }
};

export const getFilterEmployers = async (params: Record<string, any>): Promise<Employer[]> => {
   try {
      const response = await apiClient.get(employerApiRoutes.list, { params });
      return Array.isArray(response.data) ? response.data.map(adaptEmployer) : [adaptEmployer(response.data)];
   } catch (error) {
      throw new Error("Failed to fetch filtered employers.");
   }
};
