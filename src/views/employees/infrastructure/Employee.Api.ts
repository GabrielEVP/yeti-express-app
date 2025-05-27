import { apiClient } from '@/services/';
import { employerApiRoutes } from '@views/employees/infrastructure/routes/Employee.ApiRoutes';
import type { Employee } from '@/views/employees/domain/Employee';

export const EmployeeApi = {
  async getAll(): Promise<Employee[]> {
    const response = await apiClient.get(employerApiRoutes.list);
    return response.data;
  },

  async getById(id: string): Promise<Employee> {
    const response = await apiClient.get(employerApiRoutes.details(id));
    return response.data;
  },

  async create(data: Employee): Promise<Employee> {
    const response = await apiClient.post(employerApiRoutes.list, data);
    return response.data;
  },

  async update(id: string, data: Employee): Promise<Employee> {
    const response = await apiClient.put(employerApiRoutes.details(id), data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(employerApiRoutes.details(id));
  },

  async search(query: string): Promise<Employee[]> {
    const response = await apiClient.get(employerApiRoutes.search(query));
    return response.data;
  },
};
