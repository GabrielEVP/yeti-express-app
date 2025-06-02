import { apiClient } from "@/services/";
import { companyBillApiRoutes } from "@views/company-bills/infrastructure/routes/CompanyBill.ApiRoutes";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";

export const CompanyBillApi = {
  async getAll(): Promise<CompanyBill[]> {
    const response = await apiClient.get(companyBillApiRoutes.list);
    return response.data;
  },
  async getById(id: string): Promise<CompanyBill> {
    const response = await apiClient.get(companyBillApiRoutes.details(id));
    return response.data;
  },
  async create(data: any): Promise<CompanyBill> {
    const response = await apiClient.post(companyBillApiRoutes.list, data);
    return response.data;
  },
  async update(id: string, data: any): Promise<CompanyBill> {
    const response = await apiClient.put(companyBillApiRoutes.details(id), data);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(companyBillApiRoutes.details(id));
  },
  async search(query: string): Promise<CompanyBill[]> {
    const response = await apiClient.get(companyBillApiRoutes.search(query));
    return response.data;
  },
};
