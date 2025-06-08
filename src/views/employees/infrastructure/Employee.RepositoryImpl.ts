import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';
import type { Employee } from '@/views/employees/domain/Employee';
import { EmployeeApi } from '@views/employees/infrastructure/Employee.Api';
import { EmployeeApiAdapter } from '@/views/employees/adapters';

export class EmployeeRepositoryImpl implements IEmployeeRepository {
  async getAll(): Promise<Employee[]> {
    const response = await EmployeeApi.getAll();
    return response.map((employee) => EmployeeApiAdapter.fromApi(employee));
  }

  async getById(id: string): Promise<Employee | null> {
    try {
      const response = await EmployeeApi.getById(id);
      return EmployeeApiAdapter.fromApi(response);
    } catch (error) {
      return null;
    }
  }

  async create(employee: Employee): Promise<Employee> {
    const payload = EmployeeApiAdapter.toApi(employee as Employee);
    const response = await EmployeeApi.create(payload);
    return EmployeeApiAdapter.fromApi(response);
  }

  async update(id: string, employee: Employee): Promise<Employee> {
    const payload = EmployeeApiAdapter.toApi(employee);
    const response = await EmployeeApi.update(id, payload);
    return EmployeeApiAdapter.fromApi(response);
  }

  async delete(id: string): Promise<void> {
    await EmployeeApi.delete(id);
  }

  async search(query: string): Promise<Employee[]> {
    const response = await EmployeeApi.search(query);
    return response.map((employee) => EmployeeApiAdapter.fromApi(employee));
  }
}
