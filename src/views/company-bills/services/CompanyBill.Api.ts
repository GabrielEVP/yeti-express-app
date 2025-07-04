import { apiClient } from '@/services/';
import { DetailCompanyBill, FormCompanyBill, ListCompanyBill } from '@/views/company-bills/';
import { PaginatedResponse, PaginationParams } from '@models';
import { handlePaginatedResponse } from '@/utils/handlePaginatedResponse';

const base = '/company-bills';

export const companyBillApiRoutes = {
  getById: (id: string | number) => `${base}/${id}`,
  create: base,
  update: (id: string | number) => `${base}/${id}`,
  delete: (id: string | number) => `${base}/${id}`,
  filter: `${base}/filter`,
};

export const getCompanyBillById = async (id: string): Promise<DetailCompanyBill> => {
  const response = await apiClient.get(companyBillApiRoutes.getById(id));
  return response.data;
};

export const createCompanyBill = async (companyBill: FormCompanyBill): Promise<DetailCompanyBill> => {
  const response = await apiClient.post(companyBillApiRoutes.create, companyBill);
  return response.data;
};

export const updateCompanyBill = async (companyBill: FormCompanyBill, id: string): Promise<DetailCompanyBill> => {
  const response = await apiClient.put(companyBillApiRoutes.update(id), companyBill);
  return response.data;
};

export const deleteCompanyBillById = async (id: string): Promise<void> => {
  await apiClient.delete(companyBillApiRoutes.delete(id));
};

export const getFilteredCompanyBills = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<ListCompanyBill>> => {
  const response = await apiClient.get(companyBillApiRoutes.filter, { params });
  return handlePaginatedResponse(response, params);
};
