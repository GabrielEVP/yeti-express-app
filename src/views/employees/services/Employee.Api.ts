import { apiClient } from '@/services/';
import { DetailEmployee, FormEmployee, ListEmployee, Password } from '@/views/employees/models';
import { PaginatedResponse, PaginationParams } from '@models';
import { handlePaginatedResponse } from '@/utils/handlePaginatedResponse';

const base = '/employees';

export const employeeApiRoutes = {
  getById: (id: string) => `${base}/${id}`,
  create: base,
  update: (id: string) => `${base}/${id}`,
  delete: (id: string) => `${base}/${id}`,
  search: (query: string) => `${base}/search/${query}`,
  filter: base,
  updatePassword: (id: string) => `${base}/${id}/password`,
};

export const getEmployeeById = async (EmployeeId: string): Promise<DetailEmployee> => {
  const response = await apiClient.get(employeeApiRoutes.getById(EmployeeId));
  return response.data;
};

export const createEmployee = async (employee: FormEmployee): Promise<DetailEmployee> => {
  const response = await apiClient.post(employeeApiRoutes.create, employee);
  return response.data;
};

export const updateEmployee = async (employee: FormEmployee, id: string): Promise<DetailEmployee> => {
  const response = await apiClient.put(employeeApiRoutes.update(id), employee);
  return response.data;
};

export const deleteEmployeeById = async (id: string): Promise<void> => {
  await apiClient.delete(employeeApiRoutes.delete(id));
};

export const getFilteredEmployees = async (params: Record<string, any> & PaginationParams): Promise<PaginatedResponse<ListEmployee>> => {
  const response = await apiClient.get(employeeApiRoutes.filter, { params });
  return handlePaginatedResponse(response, params);
};

export async function updatePassword(password: Password, EmployeeId: string) {
  const response = await apiClient.put(employeeApiRoutes.updatePassword(EmployeeId), password);
  return response.data;
}
