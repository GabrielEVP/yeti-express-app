import { apiClient } from '@/services/';
import { Employee, adaptEmployee, adaptEmployeeForApi } from '@/views/employees';

export const EmployeeApiRoutes = {
  getAll: '/employees',
  getById: (id: string) => `/employees/${id}`,
  create: '/employees',
  update: (id: string) => `/employees/${id}`,
  delete: (id: string) => `/employees/${id}`,
  search: (query: string) => `/employees/search/${query}`,
  filter: '/employees',
};

const processResponse = (data: any): Employee[] => (Array.isArray(data) ? data.map(adaptEmployee) : [adaptEmployee(data)]);

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await apiClient.get(EmployeeApiRoutes.getAll);
    return processResponse(response.data);
  } catch {
    throw new Error('Failed to fetch all Employees.');
  }
};

export const getEmployeeById = async (EmployeeId: string): Promise<Employee> => {
  try {
    const response = await apiClient.get(EmployeeApiRoutes.getById(EmployeeId));
    return adaptEmployee(response.data);
  } catch {
    throw new Error(`Failed to fetch Employee with ID ${EmployeeId}.`);
  }
};

export const createEmployee = async (data: Employee): Promise<Employee> => {
  try {
    const payload = adaptEmployeeForApi(data);
    const response = await apiClient.post(EmployeeApiRoutes.create, payload);
    return adaptEmployee(response.data);
  } catch {
    throw new Error('Failed to create Employee.');
  }
};

export const updateEmployee = async (data: Employee, EmployeeId: string): Promise<Employee> => {
  try {
    const payload = adaptEmployeeForApi(data);
    const response = await apiClient.put(EmployeeApiRoutes.update(EmployeeId), payload);
    return adaptEmployee(response.data);
  } catch {
    throw new Error(`Failed to update Employee with ID ${EmployeeId}.`);
  }
};

export const deleteEmployeeById = async (EmployeeId: string): Promise<void> => {
  try {
    await apiClient.delete(EmployeeApiRoutes.delete(EmployeeId));
  } catch {
    throw new Error(`Failed to delete Employee with ID ${EmployeeId}.`);
  }
};

export const searchEmployees = async (query: string): Promise<Employee[]> => {
  try {
    const response = await apiClient.get(EmployeeApiRoutes.search(query));
    return processResponse(response.data);
  } catch {
    throw new Error('Failed to search Employees.');
  }
};

export const filterEmployees = async (params: Record<string, any>): Promise<Employee[]> => {
  try {
    const response = await apiClient.get(EmployeeApiRoutes.filter, { params });
    return processResponse(response.data);
  } catch {
    throw new Error('Failed to fetch filtered Employees.');
  }
};
