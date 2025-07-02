import { apiClient } from '@/services/';
import { CompanyBill } from '@/views/company-bills/';
import { adaptCompanyBill, adaptCompanyBillForApi } from '@/views/company-bills/';
import { PaginatedResponse, PaginationParams } from '@models';
import { handlePaginatedResponse } from '@/utils/handlePaginatedResponse';

export const companyBillApiRoutes = {
  getAll: '/company-bills',
  getById: (id: string | number) => `/company-bills/${id}`,
  create: '/company-bills',
  update: (id: string | number) => `/company-bills/${id}`,
  delete: (id: string | number) => `/company-bills/${id}`,
  search: (query: string) => `/company-bills/search/${query}`,
  filter: '/company-bills/filter',
};

export const getAllCompanyBills = async (): Promise<CompanyBill[]> => {
  const response = await apiClient.get(companyBillApiRoutes.getAll);
  return Array.isArray(response.data) ? response.data.map(adaptCompanyBill) : [adaptCompanyBill(response.data)];
};

export const getCompanyBillById = async (id: string): Promise<CompanyBill> => {
  const response = await apiClient.get(companyBillApiRoutes.getById(id));
  return adaptCompanyBill(response.data);
};

export const createCompanyBill = async (bill: CompanyBill): Promise<CompanyBill> => {
  const payload = adaptCompanyBillForApi(bill);
  const response = await apiClient.post(companyBillApiRoutes.create, payload);
  return adaptCompanyBill(response.data);
};

export const updateCompanyBill = async (bill: CompanyBill, id: string): Promise<CompanyBill> => {
  const payload = adaptCompanyBillForApi(bill);
  const response = await apiClient.put(companyBillApiRoutes.update(id), payload);
  return adaptCompanyBill(response.data);
};

export const deleteCompanyBillById = async (id: string): Promise<void> => {
  await apiClient.delete(companyBillApiRoutes.delete(id));
};

export const searchCompanyBills = async (query: string): Promise<CompanyBill[]> => {
  const response = await apiClient.get(companyBillApiRoutes.search(query));
  return Array.isArray(response.data) ? response.data.map(adaptCompanyBill) : [adaptCompanyBill(response.data)];
};

export const getFilteredCompanyBills = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<CompanyBill>> => {
  const response = await apiClient.get(companyBillApiRoutes.filter, { params });
  return handlePaginatedResponse(response, adaptCompanyBill, params);
};
